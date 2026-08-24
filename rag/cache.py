import os
import json
import numpy as np
from typing import Any, Dict, List, Optional

# Calibrated against this corpus, not guessed: sibling loan categories phrased
# with identical sentence structure score up to ~0.78 similarity against each
# other despite having different correct answers — e.g. "What is Shishu loan
# limit?" vs "What is Kishore loan limit?" = 0.78, HIGHER than some genuine
# paraphrase pairs (e.g. "Is collateral required for PMMY loan?" vs "Do I need
# collateral for a mudra loan?" = 0.70). There is no threshold that separates
# "same question reworded" from "different category, same sentence shape" in
# that overlap zone, so this sits well above it (measured collisions topped
# out at 0.78) and only fires on genuine near-duplicates: typos, capitalization,
# minor phrasing changes. It intentionally won't catch big paraphrases — those
# still get a full, correct RAG+LLM answer, just not from cache.
SIMILARITY_THRESHOLD = 0.90


class RAGCache:
    """Semantic cache: looks up answers by embedding similarity instead of
    exact string match, so trivial rewordings/typos hit cache too."""

    def __init__(self, cache_file: str = "vector_store/cache.json"):
        self.cache_file = cache_file
        self.entries: List[Dict[str, Any]] = []
        self.load()

    def load(self):
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                # Older exact-match cache used a {query: answer} dict — discard
                # it rather than crash, since it carries no embeddings to reuse.
                self.entries = data if isinstance(data, list) else []
            except Exception as e:
                print(f"Error loading cache: {e}")
                self.entries = []
        else:
            self.entries = []

    def save(self):
        os.makedirs(os.path.dirname(self.cache_file) or ".", exist_ok=True)
        try:
            with open(self.cache_file, "w", encoding="utf-8") as f:
                json.dump(self.entries, f, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving cache: {e}")

    def get(self, query: str) -> Optional[str]:
        if not self.entries:
            return None
        from .embeddings import embed_query
        q_vec = embed_query(query.strip())

        best_score, best_answer = -1.0, None
        for entry in self.entries:
            score = float(np.dot(q_vec, entry["embedding"]))
            if score > best_score:
                best_score, best_answer = score, entry["answer"]

        return best_answer if best_score >= SIMILARITY_THRESHOLD else None

    def set(self, query: str, answer: str):
        from .embeddings import embed_query
        q_vec = embed_query(query.strip()).tolist()

        # Update the existing near-duplicate entry instead of piling up copies.
        for entry in self.entries:
            if float(np.dot(q_vec, entry["embedding"])) >= SIMILARITY_THRESHOLD:
                entry["query"] = query.strip()
                entry["embedding"] = q_vec
                entry["answer"] = answer
                self.save()
                return

        self.entries.append({"query": query.strip(), "embedding": q_vec, "answer": answer})
        self.save()

    def clear(self):
        self.entries = []
        self.save()
