import os
import sys
from typing import Dict, Any

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from rag.retriever import RAGRetriever
from rag.cache import RAGCache

class RAGPipeline:
    def __init__(self):
        self.retriever = RAGRetriever()
        self.cache = RAGCache()

    def query(self, user_query: str, top_k: int = 3) -> Dict[str, Any]:
        cached_resp = self.cache.get(user_query)
        if cached_resp:
            return {
                "query": user_query,
                "answer": cached_resp,
                "cached": True,
                "sources": ["Cache-Hit"]
            }

        chunks = self.retriever.retrieve(user_query, top_k=top_k)
        sources = list(set([c["source"] for c in chunks]))

        context_str = "\n---\n".join([f"[{c['source']}] {c['text']}" for c in chunks])

        return {
            "query": user_query,
            "context": context_str,
            "chunks": chunks,
            "sources": sources,
            "cached": False
        }

if __name__ == "__main__":
    pipeline = RAGPipeline()
    res = pipeline.query("What is Shishu loan limit?", top_k=2)
    print(f"Query: {res['query']}")
    print(f"Sources: {res['sources']}")
    print(f"Context snippet: {res.get('context', res.get('answer'))[:200]}")
