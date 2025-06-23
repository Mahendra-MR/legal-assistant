from app.chains.qa_chain import get_qa_chain

def get_legal_answer(question: str, language: str = "en") -> str:
    # Future: Add translation, logging, etc.
    chain = get_qa_chain()
    response = chain.run(question)
    return response
