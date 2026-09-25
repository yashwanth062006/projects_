from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    name: str
    email: str


class LoginResponse(BaseModel):
    token: str
    user: UserOut


class ScoreRequest(BaseModel):
    amount: float = Field(..., ge=0)
    merchant: str
    location: Optional[str] = None
    hour: Optional[int] = Field(default=None, ge=0, le=23)
    newDevice: bool = False
    velocity: Optional[int] = 1
    merchantRisk: Optional[str] = "standard"


class ScoreResponse(BaseModel):
    id: str
    score: float
    verdict: str
    reasons: List[str]


class TransactionOut(BaseModel):
    id: str
    amount: float
    merchant: str
    location: Optional[str]
    timestamp: datetime
    score: float
    verdict: str

    class Config:
        from_attributes = True


class StatsResponse(BaseModel):
    totalScanned: int
    flagged: int
    review: int
    blockedAmount: float
    avgResponseMs: int
class TrendResponse(BaseModel):
    h: str
    v: int