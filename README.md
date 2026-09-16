# 🎓 Claude Certified Associate – Foundations (CCAO-F) Prep Portal

[![License: MIT](https://img.shields.dash.org/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Vite](https://img.shields.dash.org/badge/Framework-Vite-646CFF.svg)](https://vitejs.dev/)
[![Questions: 600](https://img.shields.dash.org/badge/Questions-600%20Scenario--Based-success.svg)](#)
[![Domains: 7](https://img.shields.dash.org/badge/Domains-7%20Exam%20Domains-purple.svg)](#)

An interactive, production-ready study and exam simulation portal for the **Claude Certified Associate – Foundations (CCAO-F)** certification. 

Features 10 full-length practice exams (600 scenario questions), dynamic option length equalization, randomized 25/25/25/25 answer key balancing across A/B/C/D, instant scoring analytics, and a 35,000-word deep-dive Knowledge Base.

---

## ✨ Features

- **📚 Deep-Dive Knowledge Base**: 7 full domain chapters (~35,000 words total) covering prompt engineering, Anthropic Constitutional AI, HIPAA BAA/GDPR compliance, RAG pipelines, API parameters (`temperature`, `top_p`, `max_tokens`), and HITL verification rubrics.
- **⚡ Master Cheat Sheet**: Rapid revision guide with model selection matrices (Haiku vs Sonnet vs Opus), compliance rules, parameter quick reference, and troubleshooting tables.
- **📝 10 Full Simulated Practice Exams**: 600 scenario-based questions matching official Anthropic domain weight percentages.
- **🎯 Smart Option Balancing**: Eliminates longest-option clues by equalizing distractor length and randomly balancing answer keys evenly across A, B, C, and D (25% each).
- **⏱ Timed Exam Player**: 120-minute timer with question navigation grid, flag for review, instant scoring, and detailed explanation review mode.
- **📊 Domain Mastery Analytics**: Tracks historical scores and calculates domain-by-domain proficiency.

---

## 📊 Exam Domain Weights

| Domain | Weight | Approx. Qs | Core Focus Area |
|:---|:---:|:---:|:---|
| **D1: Output Evaluation & Validation** | **21%** | 13 | Hallucinations, bias, HITL verification tiers, BLEU/ROUGE |
| **D2: Workflow Integration & Solution Design** | **16%** | 10 | Sequential vs parallel workflows, Claude vs RPA, ROI metrics |
| **D3: Governance, Risk & Responsible Use** | **15%** | 9 | Constitutional AI, HIPAA BAA, GDPR, human accountability |
| **D4: Prompting & Task Execution** | **14%** | 8 | XML tags, Chain-of-Thought, system prompts, few-shot templates |
| **D5: Product & Model Selection** | **12%** | 7 | Haiku vs Sonnet vs Opus, Free/Pro/Team/Enterprise tiers, multimodal |
| **D6: Configuration & Knowledge Management** | **12%** | 7 | Projects, temperature/max_tokens, RAG architecture, vector search |
| **D7: Troubleshooting & Optimization** | **10%** | 6 | Debugging vague outputs, truncation, over-refusal, 429/5xx retries |

---

## 🚀 Quick Start (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/santoshadkar/CCAO-F-Prep-Portal.git
   cd CCAO-F-Prep-Portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Production

This project is configured out-of-the-box for zero-config deployment on popular static hosts:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --build
```

---

## 📄 License

MIT License © 2026. Built for candidate preparation for the Claude Certified Associate – Foundations exam.
