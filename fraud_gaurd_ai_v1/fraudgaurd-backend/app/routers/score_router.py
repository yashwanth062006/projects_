import json
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import Transaction
from app.schemas import ScoreRequest, ScoreResponse
from app.ml.scoring import score_transaction

router = APIRouter(tags=["scoring"])


@router.post("/score", response_model=ScoreResponse)
def score(payload: ScoreRequest, db: Session = Depends(get_db)):
    result = score_transaction(
        amount=payload.amount,
        new_device=payload.newDevice,
        location=payload.location,
        hour=payload.hour,
        velocity=payload.velocity or 1,
        merchant_risk=payload.merchantRisk or "standard",
    )

    txn_id = f"TXN-{uuid.uuid4().hex[:6].upper()}"

    record = Transaction(
        id=txn_id,
        amount=payload.amount,
        merchant=payload.merchant,
        location=payload.location,
        hour=payload.hour,
        new_device=payload.newDevice,
        velocity=payload.velocity or 1,
        merchant_risk=payload.merchantRisk or "standard",
        score=result["score"],
        verdict=result["verdict"],
        reasons=json.dumps(result["reasons"]),
    )
    db.add(record)
    db.commit()

    return ScoreResponse(
        id=txn_id,
        score=result["score"],
        verdict=result["verdict"],
        reasons=result["reasons"],
    )
