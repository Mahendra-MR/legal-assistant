import os
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_ollama import OllamaLLM
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings


load_dotenv()

def get_qa_chain() -> RetrievalQA:
    vectordb = Chroma(
        persist_directory="vectorstore/",
        embedding_function=HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
    )

    retriever = vectordb.as_retriever(search_kwargs={"k": 5})

    # ✅ Use local Mistral via Ollama
    llm = OllamaLLM(model="mistral")


    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=False
    )
