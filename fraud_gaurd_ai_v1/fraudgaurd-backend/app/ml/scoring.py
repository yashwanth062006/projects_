import os
import joblib
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

_bundle = None


def _load():
    global _bundle
    if _bundle is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                "Model not found. Run `python -m app.ml.train` first to train it."
            )
        _bundle = joblib.load(MODEL_PATH)
    return _bundle


def _reasons(features: dict, fraud_prob: float) -> list[str]:
    reasons = []
    if features["amount"] > 5000:
        reasons.append("Unusually high transaction amount")
    elif features["amount"] > 1500:
        reasons.append("Amount above typical range")
    if features["new_device"]:
        reasons.append("First transaction from this device")
    if features["unknown_location"]:
        reasons.append("Location signal is masked or unrecognized")
    if features["night_hour"]:
        reasons.append("Activity outside usual hours (00:00–05:00)")
    if features["velocity"] > 3:
        reasons.append(f"{features['velocity']} transactions in a short window")
    if features["merchant_risk_high"]:
        reasons.append("Merchant category flagged as high-risk")
    if not reasons:
        reasons.append("No anomalies detected against baseline behavior")
    return reasons


def score_transaction(
    amount: float,
    new_device: bool,
    location: str | None,
    hour: int | None,
    velocity: int,
    merchant_risk: str,
) -> dict:
    bundle = _load()
    model = bundle["model"]

    unknown_location = bool(location and any(
        kw in location.lower() for kw in ["unknown", "vpn", "proxy"]
    ))
    night_hour = bool(hour is not None and (hour < 5 or hour > 23))
    merchant_risk_high = merchant_risk == "high"

    features = {
        "amount": float(amount),
        "new_device": int(bool(new_device)),
        "unknown_location": int(unknown_location),
        "night_hour": int(night_hour),
        "velocity": int(velocity or 1),
        "merchant_risk_high": int(merchant_risk_high),
    }

    X = np.array([[
        features["amount"],
        features["new_device"],
        features["unknown_location"],
        features["night_hour"],
        features["velocity"],
        features["merchant_risk_high"],
    ]])

    fraud_prob = float(model.predict_proba(X)[0][1])
    score = round(fraud_prob * 100, 1)

    if score >= 70:
        verdict = "fraud"
    elif score >= 35:
        verdict = "review"
    else:
        verdict = "safe"

    return {
        "score": score,
        "verdict": verdict,
        "reasons": _reasons(features, fraud_prob),
    }
