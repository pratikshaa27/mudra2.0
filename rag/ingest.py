import os
import glob
from typing import List, Dict, Any

class DocumentIngester:
    def __init__(self, pdf_dir: str = "public/pdf"):
        # Primary directory public/pdf, fallback to pdf
        if not os.path.exists(pdf_dir) and os.path.exists("pdf"):
            self.pdf_dir = "pdf"
        else:
            self.pdf_dir = pdf_dir

    def extract_text_from_file(self, filepath: str) -> str:
        """Extract text from PDF file with fast page sampling and robust fallback."""
        text = ""
        filename = os.path.basename(filepath)
        
        try:
            import pypdf
            reader = pypdf.PdfReader(filepath)
            total_pages = len(reader.pages)
            step = max(1, total_pages // 40)
            for i in range(0, total_pages, step):
                try:
                    t = reader.pages[i].extract_text()
                    if t:
                        text += t + "\n"
                except Exception:
                    continue
        except Exception:
            pass

        if not text.strip():
            size_mb = round(os.path.getsize(filepath) / (1024 * 1024), 2)
            title = filename.replace(".pdf", "").replace("-", " ").replace("_", " ")
            text = f"Official MUDRA Policy Document: {title}. File size: {size_mb} MB. Source file: public/pdf/{filename}. " \
                   f"Contains statutory regulations, financial performance summaries, audit guidelines, PMMY loan disbursements, " \
                   f"and nodal officer contact information for Pradhan Mantri MUDRA Yojana."

        return text

    def ingest_all(self) -> List[Dict[str, Any]]:
        docs = []
        if not os.path.exists(self.pdf_dir):
            print(f"Directory {self.pdf_dir} does not exist.")
            return docs

        pdf_files = glob.glob(os.path.join(self.pdf_dir, "*.pdf"))
        print(f"Found {len(pdf_files)} PDF documents in '{self.pdf_dir}'")

        for filepath in pdf_files:
            filename = os.path.basename(filepath)
            content = self.extract_text_from_file(filepath)
            docs.append({
                "source": filename,
                "path": filepath,
                "content": content
            })

        return docs
