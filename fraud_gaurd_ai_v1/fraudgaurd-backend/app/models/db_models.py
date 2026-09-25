from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from datetime import datetime, timezone
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    merchant = Column(String, nullable=False)
    location = Column(String, nullable=True)
    hour = Column(Integer, nullable=True)
    new_device = Column(Boolean, default=False)
    velocity = Column(Integer, default=1)
    merchant_risk = Column(String, default="standard")
    score = Column(Float, nullable=False)
    verdict = Column(String, nullable=False)
    reasons = Column(String, nullable=False)  # JSON-encoded list
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
