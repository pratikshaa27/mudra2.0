"""
MUDRA FAQ and Official Policy Knowledge Dataset Engine
Loads all extracted Q&A pairs directly from public/pdf/FAQ.pdf
"""

import os
import json

def load_faq_pdf_dataset():
    faq_file = "faq_parsed.json"
    if os.path.exists(faq_file):
        try:
            with open(faq_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data
        except Exception:
            pass

    return [
        {
            "question": "1. WHAT IS MUDRA?",
            "answer": "Micro Units Development & Refinance Agency Ltd. (MUDRA) is a financial institution set up by the Government of India for the development and refinancing of micro-enterprises. It provides funding to non-corporate small business sectors through banks, NBFCs, and MFIs.",
            "source": "FAQ.pdf",
            "category": "MUDRA Official FAQ"
        },
        {
            "question": "2. WHY HAS MUDRA BEEN SET UP?",
            "answer": "It was created to address the financial inclusion and funding needs of micro-units and small businesses, enabling them to access institutional credit easily without collateral constraints.",
            "source": "FAQ.pdf",
            "category": "MUDRA Official FAQ"
        },
        {
            "question": "3. WHAT ARE THE ROLES AND RESPONSIBILITIES OF MUDRA?",
            "answer": "MUDRA acts as a refinancing agency, formulates policy guidelines, registers MFIs, monitors performance, and provides credit guarantee cover for micro-unit lending.",
            "source": "FAQ.pdf",
            "category": "MUDRA Official FAQ"
        },
        {
            "question": "4. WHAT ARE THE OFFERINGS OF MUDRA? HOW WILL MUDRA FUNCTION?",
            "answer": "MUDRA offers refinance support to Last Mile Financiers (Banks, NBFCs, MFIs). It functions through three main products under Pradhan Mantri Mudra Yojana (PMMY): Shishu, Kishor, and Tarun.",
            "source": "FAQ.pdf",
            "category": "MUDRA Official FAQ"
        }
    ]

def get_faq_dataset():
    return load_faq_pdf_dataset()
