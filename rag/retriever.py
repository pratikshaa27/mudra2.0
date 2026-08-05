import numpy as np
from typing import List, Dict, Any
from .vectorstore import VectorStore

class RAGRetriever:
    def __init__(self, vectorstore: VectorStore = None):
        if vectorstore is None:
            self.vectorstore = VectorStore()
            self.vectorstore.load()
        else:
            self.vectorstore = vectorstore

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        if not self.vectorstore.chunks or not self.vectorstore.vectors:
            return []

        query_vec = self.vectorstore._simple_embedding(query)
        q_arr = np.array(query_vec, dtype=np.float32)

        scores = []
        for idx, vec in enumerate(self.vectorstore.vectors):
            v_arr = np.array(vec, dtype=np.float32)
            denom = (np.linalg.norm(q_arr) * np.linalg.norm(v_arr))
            score = float(np.dot(q_arr, v_arr) / denom) if denom > 0 else 0.0
            scores.append((score, idx))

        scores.sort(key=lambda x: x[0], reverse=True)

        results = []
        for score, idx in scores[:top_k]:
            chunk = dict(self.vectorstore.chunks[idx])
            chunk["score"] = round(score, 4)
            results.append(chunk)

        return results
