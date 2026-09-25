from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import db_models  # noqa: F401 (registers models with Base)
from app.routers import auth_router, score_router, transactions_router, stats_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FraudGuard AI API",
    description="Real-time transaction fraud scoring for the FraudGuard AI console.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your frontend origin before shipping past the hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(score_router.router)
app.include_router(transactions_router.router)
app.include_router(stats_router.router)


@app.get("/", tags=["health"])
def health():
    return {"status": "ok", "service": "fraudguard-api"}
