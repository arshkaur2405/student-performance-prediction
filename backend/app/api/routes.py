from fastapi import APIRouter
from app.models.student import StudentInput
from app.services.model_service import predict_performance

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "API is running"}

@router.post("/predict")
def predict(student: StudentInput):
    return predict_performance(student)