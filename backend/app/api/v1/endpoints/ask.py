from fastapi import APIRouter, HTTPException
from app.models.schema import QuestionRequest, AnswerResponse
from app.services.rag_service import get_legal_answer

router = APIRouter()

@router.post("/", response_model=AnswerResponse)
async def ask_question(payload: QuestionRequest):
    try:
        response = get_legal_answer(payload.question, payload.language)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
