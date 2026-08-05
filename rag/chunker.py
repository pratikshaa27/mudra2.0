import re
from typing import List, Dict, Any

class Chunk:
    def __init__(self, text: str, chunk_id: int, source: str, metadata: Dict[str, Any] = None):
        self.text = text
        self.chunk_id = chunk_id
        self.source = source
        self.metadata = metadata or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "chunk_id": self.chunk_id,
            "text": self.text,
            "source": self.source,
            "metadata": self.metadata
        }

    def __repr__(self):
        return f"<Chunk id={self.chunk_id} source='{self.source}'>"


class TextChunker:
    def __init__(self, chunk_size: int = 400, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def split_text(self, text: str, source: str, start_id: int = 0) -> List[Chunk]:
        clean_text = re.sub(r'\s+', ' ', text).strip()
        if not clean_text:
            return []

        words = clean_text.split()
        chunks = []
        current_id = start_id

        i = 0
        while i < len(words):
            chunk_words = words[i:i + self.chunk_size]
            chunk_text = " ".join(chunk_words)
            if len(chunk_text.strip()) > 20:
                chunks.append(Chunk(
                    text=chunk_text,
                    chunk_id=current_id,
                    source=source,
                    metadata={"word_count": len(chunk_words)}
                ))
                current_id += 1
            i += (self.chunk_size - self.overlap)
            if i >= len(words) and len(words) > 0 and len(chunks) == 0:
                break

        return chunks
