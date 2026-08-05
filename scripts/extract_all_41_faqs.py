import re
import json
import PyPDF2

def extract_exact_41_faqs():
    reader = PyPDF2.PdfReader('public/pdf/FAQ.pdf')
    pages_text = [p.extract_text() for p in reader.pages]
    raw = ' '.join(pages_text)
    clean = re.sub(r'\s+', ' ', raw).strip()

    # Split by number headers: 1., 2., 3., ... 41.
    pattern = r'(\b\d{1,2}\.\s+[A-Z0-9\s\?\(\)\,\.\-\/\:\;\“\”\’\']+)'
    
    # Split text on numbers 1 to 41
    # We can split by regex \b(\d{1,2}\.\s+[A-[#A-Z...])
    q_indices = []
    for num in range(1, 42):
        # Find position of "1. WHAT", "2. WHY", etc.
        pos = re.search(r'\b' + str(num) + r'\.\s+[A-Z]', clean)
        if pos:
            q_indices.append((num, pos.start()))

    q_indices.sort(key=lambda x: x[1])
    print(f"Located {len(q_indices)} question start markers (out of 41)")

    faqs = []
    for idx in range(len(q_indices)):
        num, start_pos = q_indices[idx]
        end_pos = q_indices[idx+1][1] if idx + 1 < len(q_indices) else len(clean)
        block = clean[start_pos:end_pos].strip()

        # Separate Question text from Answer text
        # Usually Question ends at '?' or first uppercase sentence
        q_match = re.search(r'(\b' + str(num) + r'\.\s+.*?\?)', block)
        if q_match:
            q_text = q_match.group(1).strip()
            a_text = block[len(q_text):].strip()
        else:
            # Fallback if no question mark
            parts = block.split('.', 1)
            q_text = block[:100].strip()
            a_text = block[100:].strip()

        # Remove trailing question numbers if any stuck at end of answer
        a_text = re.sub(r'\s*\b\d{1,2}\.\s*$', '', a_text).strip()

        faqs.append({
            "num": num,
            "question": q_text,
            "answer": a_text,
            "source": "FAQ.pdf",
            "category": "MUDRA Official FAQ"
        })

    return faqs

if __name__ == "__main__":
    faqs = extract_exact_41_faqs()
    print(f"Successfully extracted total {len(faqs)} Q&A pairs!")
    for f in faqs[:5]:
        print(f"Q{f['num']}: {f['question'][:60]}...")
        print(f"A{f['num']}: {f['answer'][:80]}...\n")

    with open("faq_parsed.json", "w", encoding="utf-8") as f:
        json.dump(faqs, f, indent=2, ensure_ascii=False)
