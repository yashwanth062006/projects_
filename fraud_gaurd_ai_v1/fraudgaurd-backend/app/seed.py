"""Populates a handful of demo transactions so the dashboard isn't empty on
first run. Run with: `python -m app.seed`"""
import json
import random
from datetime import datetime, timedelta, timezone

from app.database import Base, engine, SessionLocal
from app.models.db_models import Transaction
from app.ml.scoring import score_transaction

Base.metadata.create_all(bind=engine)

MERCHANTS = ["Nimbus Retail", "Solace Travel", "Kestrel Electronics", "Verve Grocery", "Ashfold Media"]
LOCATIONS = ["Bengaluru, IN", "Unknown / VPN", "Mumbai, IN", "Berlin, DE", "Austin, US"]


def seed(n=14):
    db = SessionLocal()
    existing = db.query(Transaction).count()
    if existing > 0:
        print(f"{existing} transactions already present — skipping seed.")
        db.close()
        return

    for i in range(n):
        amount = round(random.uniform(20, 6000), 2)
        merchant = MERCHANTS[i % len(MERCHANTS)]
        location = LOCATIONS[i % len(LOCATIONS)]
        hour = random.randint(0, 23)
        new_device = random.random() < 0.2
        velocity = random.randint(1, 6)
        merchant_risk = "high" if random.random() < 0.15 else "standard"

        result = score_transaction(
            amount=amount,
            new_device=new_device,
            location=location,
            hour=hour,
            velocity=velocity,
            merchant_risk=merchant_risk,
        )

        record = Transaction(
            id=f"TXN-{1000 + i:04d}",
            amount=amount,
            merchant=merchant,
            location=location,
            hour=hour,
            new_device=new_device,
            velocity=velocity,
            merchant_risk=merchant_risk,
            score=result["score"],
            verdict=result["verdict"],
            reasons=json.dumps(result["reasons"]),
            timestamp=datetime.now(timezone.utc) - timedelta(hours=i * 3),
        )
        db.add(record)

    db.commit()
    db.close()
    print(f"Seeded {n} demo transactions.")


if __name__ == "__main__":
    seed()
