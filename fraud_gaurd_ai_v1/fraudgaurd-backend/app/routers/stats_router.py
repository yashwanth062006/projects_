from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.db_models import Transaction
from app.schemas import StatsResponse, TrendResponse

router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    total = db.query(func.count(Transaction.id)).scalar() or 0
    flagged = db.query(func.count(Transaction.id)).filter(Transaction.verdict == "fraud").scalar() or 0
    review = db.query(func.count(Transaction.id)).filter(Transaction.verdict == "review").scalar() or 0
    blocked_amount = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0.0))
        .filter(Transaction.verdict == "fraud")
        .scalar()
        or 0.0
    )

    return StatsResponse(
        totalScanned=total,
        flagged=flagged,
        review=review,
        blockedAmount=float(blocked_amount),
        avgResponseMs=182,
    )
@router.get("/trend", response_model=list[TrendResponse])
def get_trend(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).all()

    trend = []

    for hour in range(0, 24, 3):
        count = 0

        for transaction in transactions:
            if transaction.hour is not None:
                if hour <= transaction.hour < hour + 3:
                    count += 1

        trend.append({
            "h": f"{hour:02d}",
            "v": count
        })

    return trend