# FraudGuard AI — Backend

FastAPI service that scores transactions for fraud risk using a trained
scikit-learn model, and backs the FraudGuard AI frontend's dashboard.

## Stack
- **FastAPI** + **Uvicorn**
- **SQLite** via SQLAlchemy (zero setup — a `data/fraudguard.db` file is created automatically)
- **scikit-learn** GradientBoostingClassifier, trained on synthetic transaction data at build time
- **JWT** auth (python-jose) with bcrypt password hashing

## Setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Train the fraud model (a pre-trained `app/ml/model.joblib` is already included,
so this step is optional unless you want to retrain):

```bash
python -m app.ml.train
```

Seed a few demo transactions so the dashboard isn't empty on first load:

```bash
python -m app.seed
```

Run the API:

```bash
uvicorn app.main:app --reload --port 8000
```

The API is now live at `http://localhost:8000` — interactive docs at
`http://localhost:8000/docs`. The frontend's `services/api.js` already points
here by default.

## Endpoints

| Method | Path             | Description                                      |
|--------|------------------|---------------------------------------------------|
| POST   | `/auth/login`    | Logs in, auto-registering the email on first use  |
| POST   | `/score`         | Scores a transaction, returns score/verdict/reasons, and stores it |
| GET    | `/transactions`  | Recent scored transactions (`?verdict=fraud`, `?limit=50`) |
| GET    | `/stats`         | Dashboard aggregate metrics                        |
| GET    | `/`              | Health check                                       |

### `POST /score` request body
```json
{
  "amount": 7200,
  "merchant": "Kestrel Electronics",
  "location": "Unknown / VPN",
  "hour": 2,
  "newDevice": true,
  "velocity": 5,
  "merchantRisk": "high"
}
```

### Response
```json
{
  "id": "TXN-21E0D2",
  "score": 99.5,
  "verdict": "fraud",
  "reasons": [
    "Unusually high transaction amount",
    "First transaction from this device",
    "Location signal is masked or unrecognized",
    "Activity outside usual hours (00:00–05:00)",
    "5 transactions in a short window",
    "Merchant category flagged as high-risk"
  ]
}
```

## How the model works

`app/ml/train.py` generates 20,000 synthetic transactions where fraud
probability is driven by a weighted combination of six signals (amount,
new device, unknown location, night-time activity, velocity, merchant risk
tier), then trains a `GradientBoostingClassifier` on them. `app/ml/scoring.py`
loads that model and, for each incoming transaction, returns a 0–100 score,
a `safe` / `review` / `fraud` verdict, and plain-language reasons for the
score — so the frontend's `FraudResult` panel has something meaningful to
show judges, not just a number.

Swap in real transaction data by replacing `generate_dataset()` in
`train.py` with a loader for your own labeled dataset, keeping the same
six feature columns (or extending `FEATURE_NAMES` and retraining).

## Project structure

```
app/
├── main.py              # FastAPI app, CORS, router registration
├── database.py           # SQLAlchemy engine/session (SQLite)
├── auth.py                # JWT + bcrypt helpers
├── deps.py                 # get_current_user dependency
├── schemas.py               # Pydantic request/response models
├── seed.py                   # Populates demo transactions
├── models/
│   └── db_models.py           # User, Transaction ORM models
├── ml/
│   ├── train.py                # Synthetic data + model training
│   ├── scoring.py               # Loads model, scores transactions
│   └── model.joblib              # Trained model (generated)
└── routers/
    ├── auth_router.py
    ├── score_router.py
    ├── transactions_router.py
    └── stats_router.py
```

## Connecting the frontend

In the frontend project, set (or leave default):
```
VITE_API_URL=http://localhost:8000
```
Run both `npm run dev` (frontend) and `uvicorn app.main:app --reload` (backend)
side by side — CORS is already open for local development.
