import os
import sys
import json
import pickle
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from rag.retriever import RAGRetriever

class RAGRequestHandler(BaseHTTPRequestHandler):
    retriever = None

    @classmethod
    def init_retriever(cls):
        if cls.retriever is None:
            print("Loading vector_store/chunks.pkl and faiss_chunks.pkl...")
            cls.retriever = RAGRetriever()
            print(f"Loaded {len(cls.retriever.vectorstore.chunks)} chunks from pickle store!")

    def do_GET(self):
        self.init_retriever()
        parsed = urlparse(self.path)
        
        if parsed.path == "/api/rag/query":
            params = parse_qs(parsed.query)
            q = params.get("q", [""])[0]
            top_k = int(params.get("top_k", [3])[0])

            results = self.retriever.retrieve(q, top_k=top_k)
            response = {
                "query": q,
                "chunks": results,
                "sources": list(set([c["source"] for c in results]))
            }

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response, indent=2).encode("utf-8"))
        else:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "MUDRA RAG Pickle Server Active"}).encode("utf-8"))

def run_server(port=8080):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RAGRequestHandler)
    print(f"MUDRA RAG Pickle API Server running on http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
