import os
import pickle
import numpy as np
import faiss
from typing import List, Dict, Any

from .embeddings import embed_texts, embed_query


class VectorStore:
    def __init__(self, store_dir: str = "vector_store"):
        self.store_dir = store_dir
        self.chunks: List[Dict[str, Any]] = []
        self.index = None

    def add_chunks(self, chunks_data: List[Dict[str, Any]]):
        if not chunks_data:
            return
        vectors = embed_texts([c["text"] for c in chunks_data])
        dim = vectors.shape[1]
        if self.index is None:
            self.index = faiss.IndexFlatIP(dim)
        self.index.add(vectors)
        self.chunks.extend(chunks_data)

    def search(self, query: str, top_k: int = 3):
        if self.index is None or self.index.ntotal == 0:
            return []
        q_vec = np.expand_dims(embed_query(query), axis=0)
        scores, indices = self.index.search(q_vec, min(top_k, self.index.ntotal))
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx == -1:
                continue
            chunk = dict(self.chunks[idx])
            chunk["score"] = round(float(score), 4)
            results.append(chunk)
        return results

    def save(self):
        os.makedirs(self.store_dir, exist_ok=True)
        chunks_pkl_path = os.path.join(self.store_dir, "chunks.pkl")
        faiss_bin_path = os.path.join(self.store_dir, "faiss_index.bin")

        with open(chunks_pkl_path, "wb") as f:
            pickle.dump(self.chunks, f)
        print(f"Saved {len(self.chunks)} chunks to '{chunks_pkl_path}'")

        if self.index is not None:
            faiss.write_index(self.index, faiss_bin_path)
            print(f"Saved FAISS index to '{faiss_bin_path}'")

    def load(self):
        chunks_pkl_path = os.path.join(self.store_dir, "chunks.pkl")
        faiss_bin_path = os.path.join(self.store_dir, "faiss_index.bin")

        if os.path.exists(chunks_pkl_path):
            with open(chunks_pkl_path, "rb") as f:
                self.chunks = pickle.load(f)

        if os.path.exists(faiss_bin_path):
            self.index = faiss.read_index(faiss_bin_path)
