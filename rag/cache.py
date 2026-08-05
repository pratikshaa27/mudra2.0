import os
import json
from typing import Dict, Any, Optional

class RAGCache:
    def __init__(self, cache_file: str = "vector_store/cache.json"):
        self.cache_file = cache_file
        self.cache: Dict[str, Any] = {}
        self.load()

    def load(self):
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r", encoding="utf-8") as f:
                    self.cache = json.load(f)
            except Exception as e:
                print(f"Error loading cache: {e}")
                self.cache = {}
        else:
            self.cache = {}

    def save(self):
        os.makedirs(os.path.dirname(self.cache_file), exist_ok=True)
        try:
            with open(self.cache_file, "w", encoding="utf-8") as f:
                json.dump(self.cache, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving cache: {e}")

    def get(self, query: str) -> Optional[Any]:
        return self.cache.get(query.strip().lower())

    def set(self, query: str, value: Any):
        self.cache[query.strip().lower()] = value
        self.save()

    def clear(self):
        self.cache = {}
        self.save()
