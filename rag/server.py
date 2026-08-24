import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from rag.pipeline import RAGPipeline
from rag.llm import warmup, active_provider
from rag.embeddings import warmup as embeddings_warmup

app = Flask(__name__)
CORS(app)

pipeline = None


def get_pipeline():
    global pipeline
    if pipeline is None:
        print("Loading RAG pipeline (vector store + embeddings)...")
        pipeline = RAGPipeline()
        print(f"Ready. {len(pipeline.retriever.vectorstore.chunks)} chunks indexed.")
        # The embedding model (used by both cache lookups and retrieval) is
        # otherwise lazy-loaded on first use — a ~12-14s cost that would
        # land on whichever visitor asks the first question. Pay it here
        # instead, once, at startup.
        print("Warming up embedding model...")
        embeddings_warmup()
        print(f"LLM backend: {active_provider()} (falls back through the others on failure)")
        warmup()
        print("Warm-up complete.")
    return pipeline


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "MUDRA RAG server active"})


@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json(silent=True) or {}
    message = (body.get("message") or "").strip()

    if not message:
        return jsonify({"error": "message is required"}), 400

    result = get_pipeline().query(message)
    return jsonify(result)


@app.route("/api/chat/stream", methods=["POST"])
def chat_stream():
    body = request.get_json(silent=True) or {}
    message = (body.get("message") or "").strip()

    if not message:
        return jsonify({"error": "message is required"}), 400

    def generate():
        for event in get_pipeline().query_stream(message):
            yield json.dumps(event) + "\n"

    return Response(generate(), mimetype="application/x-ndjson")


@app.route("/api/rag/query", methods=["GET"])
def rag_query():
    q = request.args.get("q", "")
    top_k = int(request.args.get("top_k", 3))
    chunks = get_pipeline().retriever.retrieve(q, top_k=top_k)
    return jsonify({
        "query": q,
        "chunks": chunks,
        "sources": list(dict.fromkeys(c["source"] for c in chunks)),
    })


if __name__ == "__main__":
    get_pipeline()
    port = int(os.environ.get("PORT", os.environ.get("RAG_SERVER_PORT", 8080)))
    print(f"MUDRA RAG API server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, threaded=True)
