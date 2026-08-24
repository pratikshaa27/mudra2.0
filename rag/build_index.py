import os
import sys
import json

# Ensure rag root is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from rag.ingest import DocumentIngester
from rag.chunker import TextChunker
from rag.dra_faq_dataset import get_faq_dataset
from rag.vectorstore import VectorStore
from rag.cache import RAGCache

def build():
    print("=== Building MUDRA RAG Vector Store Index ===")
    
    # 1. Ingest PDF files from public/pdf.
    # FAQ.pdf is skipped here: it is already available as clean, one-chunk-per-
    # question data via get_faq_dataset() below. Also indexing its raw sliding-window
    # text would create near-duplicate chunks that compete with the clean ones during
    # retrieval and degrade answer accuracy.
    pdf_ingester = DocumentIngester(pdf_dir="public/pdf")
    documents = [d for d in pdf_ingester.ingest_all() if d["source"] != "FAQ.pdf"]

    chunker = TextChunker(chunk_size=300, overlap=40)
    all_chunks = []
    chunk_id = 0

    # Process PDF docs into chunks
    for doc in documents:
        text = doc["content"]
        source = doc["source"]
        chunks = chunker.split_text(text, source=source, start_id=chunk_id)
        for c in chunks:
            all_chunks.append(c.to_dict())
        chunk_id += len(chunks)

    # Add FAQ dataset chunks (one clean chunk per Q&A pair)
    faqs = get_faq_dataset()
    for faq in faqs:
        faq_text = f"Question: {faq['question']} Answer: {faq['answer']} Category: {faq['category']}"
        all_chunks.append({
            "chunk_id": chunk_id,
            "text": faq_text,
            "source": faq["source"],
            "metadata": {"category": faq["category"], "type": "faq"}
        })
        chunk_id += 1

    print(f"Total processed chunks: {len(all_chunks)}")

    # 2. Embed chunks (sentence-transformers) and build the FAISS index
    print("Embedding chunks and building FAISS index (this may take a minute)...")
    vstore = VectorStore(store_dir="vector_store")
    vstore.add_chunks(all_chunks)
    vstore.save()

    # 3. Reset the answer cache; it is repopulated at runtime from real LLM answers
    cache = RAGCache(cache_file="vector_store/cache.json")
    cache.clear()
    print("Reset 'vector_store/cache.json'")

    # 4. Export JSON bundle for web app consumption
    os.makedirs("src/data", exist_ok=True)
    with open("src/data/rag_chunks.json", "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, indent=2, ensure_ascii=False)
    print("Exported web index bundle to 'src/data/rag_chunks.json'")

    print("=== RAG Index Built Successfully! ===")

if __name__ == "__main__":
    build()
