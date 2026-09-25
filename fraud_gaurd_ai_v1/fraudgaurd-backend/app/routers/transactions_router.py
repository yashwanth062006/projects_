from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models.db_models import Transaction
from app.schemas import TransactionOut

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.get("", response_model=List[TransactionOut])
def list_transactions(
    verdict: Optional[str] = Query(default=None),
    limit: int = Query(default=50, le=200),
    db: Session = Depends(get_db),
):
    q = db.query(Transaction)
    if verdict and verdict != "all":
        q = q.filter(Transaction.verdict == verdict)
    rows = q.order_by(Transaction.timestamp.desc()).limit(limit).all()
    return rows
