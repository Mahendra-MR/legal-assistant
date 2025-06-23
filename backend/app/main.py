from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints.ask import router as ask_router
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = FastAPI(
    title="Legal Assistant API",
    description="LangChain-powered Legal Assistant backend",
    version="1.0.0"
)

# Allow CORS for frontend during development
origins = [
    "http://localhost:3000",   # Next.js dev
    "https://yourfrontendurl.com",  # Future production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(ask_router, prefix="/api/v1/ask", tags=["Ask"])

