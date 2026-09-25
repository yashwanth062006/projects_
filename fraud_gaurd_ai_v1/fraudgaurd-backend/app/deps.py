from fastapi import Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.models.db_models import User
from app.auth import decode_access_token


def get_current_user(
    authorization: Optional[str] = Header(default=None),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """Returns the authenticated user if a valid bearer token is present,
    otherwise None. Endpoints that should stay demo-friendly (no hard login
    wall) can treat a None user as an anonymous/demo caller."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.removeprefix("Bearer ").strip()
    email = decode_access_token(token)
    if not email:
        return None
    return db.query(User).filter(User.email == email).first()
