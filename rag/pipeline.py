import os
import sys
from typing import Dict, Any

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from rag.retriever import RAGRetriever
from rag.cache import RAGCache
from rag.llm import (
    generate_answer,
    generate_answer_stream,
    is_smalltalk,
    looks_like_path,
    DECLINE_MESSAGE,
    SMALLTALK_RESPONSE,
    LLMUnavailableError,
)

def _extractive_fallback(chunks) -> str:
    """Answer straight from the best-matching retrieved chunk when every LLM
    backend is unreachable (e.g. Enlight blocked from a cloud host and no
    Groq key configured) — a plain-retrieval answer beats a hard failure,
    and FAQ.pdf chunks are already one-question-each so the raw text reads
    fine on its own."""
    return chunks[0]["text"] if chunks else DECLINE_MESSAGE


class RAGPipeline:
    def __init__(self):
        self.retriever = RAGRetriever()
        self.cache = RAGCache()

    def query(self, user_query: str) -> Dict[str, Any]:
        if looks_like_path(user_query):
            return {
                "query": user_query,
                "answer": DECLINE_MESSAGE,
                "chunks": [],
                "sources": [],
                "cached": False,
            }

        cached_answer = self.cache.get(user_query)
        if cached_answer:
            return {
                "query": user_query,
                "answer": cached_answer,
                "cached": True,
                "sources": [],
            }

        chunks = self.retriever.retrieve_relevant(user_query)
        sources = list(dict.fromkeys(c["source"] for c in chunks))

        # No retrieved context at all: decide locally instead of trusting the
        # LLM to follow the CONTEXT-is-N/A decline rule every time — direct
        # testing showed it doesn't always (e.g. "what is 2+2?" got answered
        # "4" instead of declined). Small talk still gets a friendly reply;
        # everything else with zero context is out of scope by definition.
        if not chunks:
            answer = SMALLTALK_RESPONSE if is_smalltalk(user_query) else DECLINE_MESSAGE
            self.cache.set(user_query, answer)
            return {
                "query": user_query,
                "answer": answer,
                "chunks": chunks,
                "sources": sources,
                "cached": False,
            }

        try:
            answer = generate_answer(user_query, chunks)
        except LLMUnavailableError:
            return {
                "query": user_query,
                "answer": _extractive_fallback(chunks),
                "chunks": chunks,
                "cached": False,
                "sources": sources,
                "fallback": True,
            }

        self.cache.set(user_query, answer)

        return {
            "query": user_query,
            "answer": answer,
            "chunks": chunks,
            "sources": sources,
            "cached": False,
        }

    def query_stream(self, user_query: str):
        """Generator yielding {"type": ...} events as the answer is produced,
        so the caller can render the answer incrementally instead of waiting
        for the full generation to finish."""
        if looks_like_path(user_query):
            yield {"type": "chunk", "text": DECLINE_MESSAGE}
            yield {"type": "done", "sources": [], "cached": False}
            return

        cached_answer = self.cache.get(user_query)
        if cached_answer:
            yield {"type": "chunk", "text": cached_answer}
            yield {"type": "done", "sources": [], "cached": True}
            return

        chunks = self.retriever.retrieve_relevant(user_query)
        sources = list(dict.fromkeys(c["source"] for c in chunks))

        if not chunks:
            answer = SMALLTALK_RESPONSE if is_smalltalk(user_query) else DECLINE_MESSAGE
            self.cache.set(user_query, answer)
            yield {"type": "chunk", "text": answer}
            yield {"type": "done", "sources": sources, "cached": False}
            return

        full_answer = ""

        try:
            for piece in generate_answer_stream(user_query, chunks):
                full_answer += piece
                yield {"type": "chunk", "text": piece}
        except LLMUnavailableError:
            yield {"type": "chunk", "text": _extractive_fallback(chunks)}
            yield {"type": "done", "sources": sources, "cached": False, "fallback": True}
            return

        full_answer = full_answer.strip() or DECLINE_MESSAGE
        self.cache.set(user_query, full_answer)

        yield {"type": "done", "sources": sources, "cached": False}


if __name__ == "__main__":
    pipeline = RAGPipeline()
    res = pipeline.query("What is Shishu loan limit?")
    print(f"Query: {res['query']}")
    print(f"Sources: {res['sources']}")
    print(f"Answer: {res['answer']}")
