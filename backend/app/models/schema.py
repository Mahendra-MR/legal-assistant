from pydantic import BaseModel, Field
from typing import Optional

class QuestionRequest(BaseModel):
    question: str = Field(..., example="What is IPC Section 302?")
    language: Optional[str] = Field("en", example="en")  # Future-ready: en, kn, hi

class AnswerResponse(BaseModel):
    answer: str = Field(..., example="Section 302 of the IPC refers to punishment for murder...")
