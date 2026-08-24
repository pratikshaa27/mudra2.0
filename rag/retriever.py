from typing import List, Dict, Any
from .vectorstore import VectorStore

FAQ_SOURCE = "FAQ.pdf"

# Cosine-similarity floor (IndexFlatIP over normalized vectors == cosine sim).
# General document chunks (annual reports etc.) are long, noisy, and can score
# deceptively high on shared vocabulary alone, so they need a real bar.
RELEVANCE_THRESHOLD = 0.35
MAX_GENERAL_CHUNKS = 1

# FAQ.pdf chunks are short, clean, one-question-each, and never compete fairly
# on raw cosine score against long statistical report chunks for vaguer,
# paraphrased questions. So FAQ chunks get their own low floor and are always
# considered on their own merits (see retrieve_relevant) — genuinely off-topic
# queries score well under 0.2 against every FAQ entry, so this stays safe.
FAQ_FLOOR = 0.25
MAX_FAQ_CHUNKS = 3


class RAGRetriever:
    def __init__(self, vectorstore: VectorStore = None):
        if vectorstore is None:
            self.vectorstore = VectorStore()
            self.vectorstore.load()
        else:
            self.vectorstore = vectorstore

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        return self.vectorstore.search(query, top_k=top_k)

    def retrieve_relevant(self, query: str) -> List[Dict[str, Any]]:
        """Retrieve the most relevant chunks for a query.

        FAQ.pdf chunks are ranked separately from general document chunks so
        that a good FAQ match is never crowded out by a long, keyword-heavy
        report chunk that happens to score higher on raw cosine similarity.
        """
        total = self.vectorstore.index.ntotal if self.vectorstore.index else 0
        if not total:
            return []

        all_results = self.retrieve(query, top_k=total)

        faq_chunks = [r for r in all_results if r["source"] == FAQ_SOURCE and r["score"] >= FAQ_FLOOR]
        general_chunks = [r for r in all_results if r["source"] != FAQ_SOURCE and r["score"] >= RELEVANCE_THRESHOLD]

        # Each group keeps its own slice regardless of the other group's scores —
        # re-sorting the merged list by raw score and truncating would let long
        # general chunks (which score higher on shared vocabulary) crowd out a
        # correct FAQ match again, defeating the point of splitting them above.
        combined = faq_chunks[:MAX_FAQ_CHUNKS] + general_chunks[:MAX_GENERAL_CHUNKS]
        combined.sort(key=lambda r: r["score"], reverse=True)
        return combined
