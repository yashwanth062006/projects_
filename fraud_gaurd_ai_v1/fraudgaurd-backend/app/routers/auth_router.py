from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import User

from app.schemas import (
    RegisterRequest,
    LoginRequest,
    LoginResponse,
    UserOut
)

from app.auth import (
    hash_password,
    verify_password,
    create_access_token
)


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/register", response_model=UserOut)
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == payload.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = User(
        name=payload.name,
        email=payload.email,
        hashed_password=hash_password(payload.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return UserOut(
        name=user.name,
        email=user.email
    )


@router.post("/login", response_model=LoginResponse)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):
    """Authenticate an existing registered user."""

    user = db.query(User).filter(
        User.email == payload.email
    ).first()

    print("LOGIN EMAIL:", payload.email)
    print("USER FOUND:", user is not None)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Account not found"
        )

    password_match = verify_password(
        payload.password,
        user.hashed_password
    )

    print("PASSWORD MATCH:", password_match)

    if not password_match:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )

    token = create_access_token(
        subject=user.email
    )

    return LoginResponse(
        token=token,
        user=UserOut(
            name=user.name,
            email=user.email
        )
    )