"""
Sentence-embedding model wrapper used by the vector store for real
semantic retrieval (replaces the old bag-of-words placeholder).
"""

import numpy as np

# Tuned for asymmetric question -> passage retrieval (a short user question
# matched against a longer answer chunk), which fits this RAG use case much
# better than a general-purpose sentence-similarity model.
_MODEL_NAME = "sentence-transformers/multi-qa-MiniLM-L6-cos-v1"
_model = None


def get_model():
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer(_MODEL_NAME)
    return _model


def embed_texts(texts):
    """Encode a list of strings into L2-normalized embedding vectors."""
    model = get_model()
    vectors = model.encode(
        texts,
        convert_to_numpy=True,
        normalize_embeddings=True,
        show_progress_bar=False,
    )
    return vectors.astype(np.float32)


def embed_query(text):
    return embed_texts([text])[0]


def warmup():
    """Force the embedding model to load now, at process startup, instead of
    during whichever real query happens to be first. Measured cost of that
    first load: ~12-14s (SentenceTransformer init) — paying it once here
    means no visitor ever eats it as part of their chat response time."""
    embed_query("warmup")
