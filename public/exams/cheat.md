# ⚡ Master Cheat Sheet — Claude Certified Associate Foundations (CCAO-F)

> [!IMPORTANT]
> Use this cheat sheet for rapid revision before taking practice exams and in the final 24 hours before your actual exam.

---

## 1. Domain Weights & Question Allocations

| Domain | Weight | Approx. Questions | Core Focus Area |
|:---|:---:|:---:|:---|
| **D1: Output Evaluation & Validation** | **21%** | 13 Questions | Hallucination mitigation, bias, HITL verification tiers, BLEU/ROUGE |
| **D2: Workflow Integration & Solution Design** | **16%** | 10 Questions | Process mapping, sequential vs parallel, Claude vs RPA, ROI metrics |
| **D3: Governance, Risk & Responsible Use** | **15%** | 9 Questions | Constitutional AI, HIPAA/GDPR, human accountability, risk matrix |
| **D4: Prompting & Task Execution** | **14%** | 8 Questions | XML tags, Chain-of-Thought (CoT), system prompts, zero/few-shot |
| **D5: Product & Model Selection** | **12%** | 7 Questions | Haiku vs Sonnet vs Opus, Free/Pro/Team/Enterprise tiers, multimodal |
| **D6: Configuration & Knowledge Management**| **12%** | 7 Questions | Projects, temperature/max_tokens, RAG architecture, versioning |
| **D7: Troubleshooting & Optimization** | **10%** | 6 Questions | Debugging vague output, truncation, over-refusal, 429/5xx error handling |

---

## 2. Model Selection Decision Matrix (MEMORISE THIS!)

| Task Requirements | Recommended Model | Rationale |
|:---|:---|:---|
| High volume, lowest latency, real-time chat, simple extraction, low cost | **Claude 3 Haiku / 3.5 Haiku** | Fast, economical, optimized for lightweight structured tasks |
| Balanced complexity, standard enterprise drafting, coding, general analysis | **Claude 3.5 Sonnet** | Best cost-to-performance balance; default enterprise choice |
| Deep multi-step reasoning, complex legal/financial analysis, massive context | **Claude 3 Opus** | Highest intelligence & reasoning capability for complex, non-deterministic tasks |

---

## 3. Product Tier & Governance Matrix

| Tier | PII / Business Data Allowed? | PHI / Medical Allowed? | Shared Team Projects? | Governance Features |
|:---|:---:|:---:|:---:|:---|
| **Free** | ❌ No | ❌ No | ❌ No | No data guarantees; training data collection active |
| **Pro** | ⚠️ Caution | ❌ No | ❌ No | Single-user power tier; higher rate limits |
| **Team** | ✅ Yes (Internal) | ❌ No | ✅ Yes | Centralized billing, shared Project knowledge bases |
| **Enterprise** | ✅ Yes | ✅ Yes (with signed BAA) | ✅ Yes | Zero Data Retention (ZDR), SAML SSO, SCIM, Audit Logs, HIPAA BAA |

> [!WARNING]
> **Exam Trap:** Never select Free or Pro tiers for regulated data (HIPAA/GDPR/PHI). Only **Enterprise Tier** with a signed Business Associate Agreement (BAA) complies with HIPAA.

---

## 4. Human-in-the-Loop (HITL) Verification Tiers

| Tier | Risk Level | Target Domains | Verification Strategy |
|:---|:---|:---|:---|
| **Tier 1: Low Risk** | Internal drafts, brainstorming, social copy | Marketing, Ideation | Spot-checking (10-20% sample review) |
| **Tier 2: Medium Risk** | Customer emails, internal SOPs, code patches | Ops, Support, Dev | Full rubric review against standard operating checklist |
| **Tier 3: High Risk** | Legal contracts, medical advice, financial filings | Legal, Healthcare, Finance | **Mandatory 100% Subject Matter Expert (SME) sign-off** |

> [!NOTE]
> **Golden Rule of Accountable AI:** Claude supports decision-making; **humans bear full legal and ethical responsibility** for final outcomes.

---

## 5. API Parameter Quick Reference

- **`temperature` (0.0 to 1.0):** Controls output randomness.
  - `0.0`: Deterministic, repeatable, optimal for extraction, classification, & coding.
  - `0.7 - 1.0`: Creative, varied, optimal for writing & brainstorming.
- **`max_tokens`:** Hard stop limit for output tokens generated.
  - *Symptom of setting too low:* Output gets cut off mid-sentence.
- **`stop_sequences`:** Custom string list that halts generation when matched.
  - *Note:* Used for formatting control (e.g. `["\n\nUser:"]`), **NOT** for safety enforcement.
- **`system`:** System prompt parameter. Takes precedence over user messages and defines persistent persona, behavioral rules, and formatting constraints.

---

## 6. Prompt Engineering Top Rules

1. **Anatomy of an Effective Prompt:** Role + Context + Task + Constraints + Examples + Output Format.
2. **Chain-of-Thought (CoT):** Adding `"Think step-by-step in <thinking> tags before answering"` dramatically improves reasoning accuracy for math, logic, and multi-clause legal analysis.
3. **XML Tags:** Wrap data inputs in `<document>`, `<rules>`, or `<examples>` tags to structure complex context and prevent prompt injection attacks.
4. **Few-Shot Prompting:** Provide 2–5 input/output examples to strictly lock in output style and structural formatting.

---

## 7. Troubleshooting Cheat Sheet

| Failure Mode | Root Cause | Corrective Action |
|:---|:---|:---|
| **Truncated / Cut-off response** | `max_tokens` exceeded | Increase `max_tokens` parameter value |
| **Inconsistent output structure** | Temperature > 0 or missing format rules | Set `temperature: 0` & provide XML tags / JSON schema |
| **Hallucinated quotes or data** | Lack of context grounding | Provide exact source text in `<context>` & instruct: *"Rely ONLY on provided text"* |
| **Over-refusal on benign prompt** | Triggered safety classifier falsely | Rephrase prompt to explicitly state legitimate business/educational intent |
| **HTTP 429 Error** | Rate limit exceeded | Implement exponential backoff retry logic |
| **HTTP 5xx Error** | Server-side overload / transient error | Retry request with jittered exponential backoff |
