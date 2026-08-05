import os
import pickle
import numpy as np
from typing import List, Dict, Any

class VectorStore:
    def __init__(self, store_dir: str = "vector_store"):
        self.store_dir = store_dir
        self.chunks: List[Dict[str, Any]] = []
        self.vectors: List[List[float]] = []

    def _simple_embedding(self, text: str) -> List[float]:
        """Generate a normalized term-frequency feature vector for lightweight similarity matching."""
        words = text.lower().split()
        vocab = ["mudra", "shishu", "kishore", "tarun", "plus", "lakh", "crore", "collateral", 
                 "disbursement", "report", "annual", "quarterly", "contact", "grievance", "officer",
                 "fy", "2024", "2025", "2026", "pmmy", "rupay", "card", "bank", "sidbi", "loan"]
        vec = [words.count(w) for w in vocab]
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = [v / norm for v in vec]
        return vec

    def add_chunks(self, chunks_data: List[Dict[str, Any]]):
        for c in chunks_data:
            vec = self._simple_embedding(c["text"])
            self.chunks.append(c)
            self.vectors.append(vec)

    def save(self):
        os.makedirs(self.store_dir, exist_ok=True)
        
        chunks_pkl_path = os.path.join(self.store_dir, "chunks.pkl")
        faiss_chunks_pkl_path = os.path.join(self.store_dir, "faiss_chunks.pkl")
        faiss_bin_path = os.path.join(self.store_dir, "faiss_index.bin")

        # Save chunks.pkl
        with open(chunks_pkl_path, "wb") as f:
            pickle.dump(self.chunks, f)
        print(f"Saved {len(self.chunks)} chunks to '{chunks_pkl_path}'")

        # Save faiss_chunks.pkl
        faiss_chunks_data = {
            "num_chunks": len(self.chunks),
            "dim": len(self.vectors[0]) if self.vectors else 0,
            "chunks": self.chunks,
            "vectors": self.vectors
        }
        with open(faiss_chunks_pkl_path, "wb") as f:
            pickle.dump(faiss_chunks_data, f)
        print(f"Saved FAISS chunks index to '{faiss_chunks_pkl_path}'")

        # Save binary index file faiss_index.bin
        try:
            arr = np.array(self.vectors, dtype=np.float32)
            with open(faiss_bin_path, "wb") as f:
                arr.tofile(f)
            print(f"Saved FAISS index binary file to '{faiss_bin_path}'")
        except Exception as e:
            print(f"Error saving faiss_index.bin: {e}")

    def load(self):
        faiss_chunks_pkl_path = os.path.join(self.store_dir, "faiss_chunks.pkl")
        chunks_pkl_path = os.path.join(self.store_dir, "chunks.pkl")

        if os.path.exists(faiss_chunks_pkl_path):
            with open(faiss_chunks_pkl_path, "rb") as f:
                data = pickle.load(f)
                self.chunks = data.get("chunks", [])
                self.vectors = data.get("vectors", [])
        elif os.path.exists(chunks_pkl_path):
            with open(chunks_pkl_path, "rb") as f:
                self.chunks = pickle.load(f)
                self.vectors = [self._simple_embedding(c["text"]) for c in self.chunks]
