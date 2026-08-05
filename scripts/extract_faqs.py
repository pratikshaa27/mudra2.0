import re
import json
import PyPDF2

def parse_pdf_faqs():
    reader = PyPDF2.PdfReader('public/pdf/FAQ.pdf')
    raw_text = ' '.join([p.extract_text() for p in reader.pages])
    clean = re.sub(r'\s+', ' ', raw_text)

    # Regex to capture question numbers and questions
    pattern = r'(\d+\.\s+[A-Z0-9\s\?\(\)\,\.\-\/\:\;\“\”\’\']+\?)'
    parts = re.split(pattern, clean)

    faqs = []
    if len(parts) > 1:
        for i in range(1, len(parts)-1, 2):
            q_text = parts[i].strip()
            a_text = parts[i+1].strip()
            # Clean up trailing numbers or next sections
            a_text = re.sub(r'\s+\d+\.\s*$', '', a_text)
            if len(q_text) > 5 and len(a_text) > 10:
                faqs.append({
                    "question": q_text,
                    "answer": a_text,
                    "source": "FAQ.pdf",
                    "category": "MUDRA Official FAQ"
                })

    print(f"Extracted {len(faqs)} Q&A pairs from public/pdf/FAQ.pdf")
    return faqs

if __name__ == "__main__":
    faqs = parse_pdf_faqs()
    with open("faq_parsed.json", "w", encoding="utf-8") as f:
        json.dump(faqs, f, indent=2, ensure_ascii=False)
