"""
Generates realistic synthetic transaction data and trains a Gradient Boosting
classifier to flag fraud. Run once at build time: `python -m app.ml.train`.
The resulting model.joblib is loaded by the /score endpoint at request time.
"""
import numpy as np
import joblib
import os
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

RNG = np.random.default_rng(42)
MODEL_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(MODEL_DIR, "model.joblib")

FEATURE_NAMES = [
    "amount",
    "new_device",
    "unknown_location",
    "night_hour",
    "velocity",
    "merchant_risk_high",
]


def generate_dataset(n=20000):
    """Simulate transactions where fraud correlates with known risk signals,
    with realistic noise so the model isn't trivially perfect."""
    amount = RNG.gamma(shape=2.0, scale=350, size=n)
    new_device = RNG.binomial(1, 0.18, size=n)
    unknown_location = RNG.binomial(1, 0.12, size=n)
    night_hour = RNG.binomial(1, 0.20, size=n)
    velocity = RNG.poisson(1.3, size=n) + 1
    merchant_risk_high = RNG.binomial(1, 0.15, size=n)

    # latent fraud probability driven by a weighted combination of signals
    logit = (
        -4.2
        + 0.0009 * amount
        + 1.9 * new_device
        + 2.1 * unknown_location
        + 1.1 * night_hour
        + 0.55 * np.clip(velocity - 1, 0, 10)
        + 1.3 * merchant_risk_high
    )
    prob = 1 / (1 + np.exp(-logit))
    label = RNG.binomial(1, prob)

    X = np.column_stack(
        [amount, new_device, unknown_location, night_hour, velocity, merchant_risk_high]
    )
    return X, label


def train():
    X, y = generate_dataset()
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    clf = GradientBoostingClassifier(
        n_estimators=150, max_depth=3, learning_rate=0.08, random_state=42
    )
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    print(classification_report(y_test, preds, target_names=["legit", "fraud"]))

    joblib.dump({"model": clf, "feature_names": FEATURE_NAMES}, MODEL_PATH)
    print(f"Saved model to {MODEL_PATH}")


if __name__ == "__main__":
    train()
