import os
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

DATA_DIR = "data"
VECTOR_DIR = "vectorstore"

def load_documents():
    documents = []
    for file in os.listdir(DATA_DIR):
        file_path = os.path.join(DATA_DIR, file)
        if file.endswith(".txt"):
            loader = TextLoader(file_path)
            documents.extend(loader.load())
        elif file.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
            documents.extend(loader.load())
    return documents

def main():
    print("📚 Loading legal documents...")
    docs = load_documents()

    print("✂️ Splitting text...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    split_docs = splitter.split_documents(docs)

    print("🧠 Creating embeddings...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    print("💾 Storing in vectorstore...")
    Chroma.from_documents(split_docs, embedding=embeddings, persist_directory=VECTOR_DIR)

    print("✅ Vectorstore built and saved to:", VECTOR_DIR)

if __name__ == "__main__":
    main()
