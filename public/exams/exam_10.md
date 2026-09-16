# Practice Exam 10 – FINAL MOCK EXAM – Claude Certified Associate Foundations (CCAO-F)

## Questions

### Domain 1: Output Evaluation & Validation (Q1-Q13)

**Q1 (Output Evaluation & Validation):** A financial analyst is using Claude to summarize quarterly earnings reports. Claude consistently hallucinates specific revenue figures not present in the text. Which evaluation method is MOST appropriate to identify and quantify this specific issue?
A. ROUGE scores
B. Precision and Recall metrics specifically for numerical entities
C. Human-in-the-loop Likert scale ratings for overall coherence
D. Automated grammar checking

**Q2 (Output Evaluation & Validation):** You are developing a customer service bot. You need to evaluate if Claude's responses align with the company's empathetic tone guidelines. Which approach is BEST?
A. Use an embedding distance metric against the guidelines.
B. Implement a secondary LLM as a judge, provided with a rubic of the tone guidelines.
C. Calculate the F1 score against a set of reference answers.
D. Measure the response latency to gauge emotional processing.

**Q3 (Output Evaluation & Validation):** (Select 2) When validating Claude's code generation capabilities for a Python web framework, which two methods should be prioritized to ensure functional correctness?
A. Abstract Syntax Tree (AST) comparison against a gold standard
B. Executing the generated code in an isolated sandbox with a test suite
C. Measuring the BLEU score of the generated code
D. Static analysis for syntax errors and vulnerabilities
E. Counting the number of comments in the code

**Q4 (Output Evaluation & Validation):** Claude is tasked with extracting JSON entities from medical records. Sometimes the JSON is malformed (missing commas). What is the primary metric to track this specific failure mode?
A. Semantic similarity
B. JSON parse error rate
C. Token count utilization
D. Cross-entropy loss

**Q5 (Output Evaluation & Validation):** You notice Claude is providing factually correct but overly verbose answers to simple factual queries. How do you evaluate and penalize this?
A. Maximize the BLEU score.
B. Introduce a penalty for response length exceeding a threshold in your evaluation rubric.
C. Use a stricter temperature setting.
D. Evaluate using exact match (EM) on a single word.

**Q6 (Output Evaluation & Validation):** A legal tech startup uses Claude to draft contracts. The generated contracts must contain zero hallucinated clauses. Which validation strategy ensures the highest safety before presenting to a lawyer?
A. Automated cross-referencing of generated clauses against a verified database of standard clauses using semantic similarity, flagging low-confidence matches.
B. Only using Claude 3 Haiku for faster drafting.
C. Relying entirely on Claude's self-correction capabilities in a single prompt.
D. Using ROUGE-L to ensure longest common subsequences are preserved.

**Q7 (Output Evaluation & Validation):** (Select 2) Which of the following are valid reasons to use a "Golden Dataset" (a set of high-quality, human-annotated examples) in evaluation?
A. To train the base model from scratch.
B. To serve as ground truth for calculating metrics like accuracy and F1 score.
C. To provide few-shot examples in the prompt to improve performance.
D. To replace the need for any human evaluation.
E. To establish a baseline performance before deploying a new prompt version.

**Q8 (Output Evaluation & Validation):** In a translation task from English to a low-resource language, human evaluators report that Claude's output, while literal, lacks cultural nuance. Which automated metric would be LEAST helpful in diagnosing this?
A. BERTScore (using multilingual embeddings)
B. Exact Match (EM) against literal translations
C. LLM-as-a-judge with cultural context guidelines
D. METEOR score

**Q9 (Output Evaluation & Validation):** You are evaluating a RAG pipeline where Claude answers questions based on retrieved documents. Sometimes Claude answers correctly using its internal knowledge, ignoring the retrieved documents. How should you adjust your evaluation?
A. Only use questions where the answer changes daily.
B. Introduce "negative test cases" where the retrieved documents contain contradictory (but fictional) information to ensure Claude relies solely on the context provided.
C. Increase the `top_p` parameter during testing.
D. Measure the latency of the retrieval step.

**Q10 (Output Evaluation & Validation):** (Select 3) What are the main challenges of using LLMs as judges for evaluating other LLMs?
A. Positional bias (favoring the first or last answer presented)
B. Inability to parse JSON formats
C. Verbosity bias (favoring longer answers)
D. High deterministic accuracy guaranteed
E. Self-enhancement bias (favoring its own style of output)

**Q11 (Output Evaluation & Validation):** A retail company uses Claude to categorize support tickets. The categories are highly imbalanced (90% "password reset", 10% "complex bug"). Which evaluation metric is most critical to ensure the "complex bug" category isn't ignored?
A. Overall Accuracy
B. Macro-averaged F1 Score
C. Micro-averaged Precision
D. Response Time

**Q12 (Output Evaluation & Validation):** When setting up A/B testing for two different Claude system prompts in a live environment, which operational metric is MOST crucial alongside qualitative output metrics?
A. Training loss
B. Token utilization and associated costs
C. Number of layers in the model
D. Training data cutoff date

**Q13 (Output Evaluation & Validation):** You are designing an evaluation pipeline. You want to measure if Claude's outputs are becoming more biased over time. Which approach is valid?
A. Run periodic evaluations on a static, curated dataset of sensitive prompts designed to elicit biased responses and track the failure rate using an LLM judge.
B. Only evaluate prompts that ask for mathematical calculations.
C. Decrease the temperature to 0.
D. Assume that newer models are always less biased.

### Domain 2: Workflow Integration & Solution Design (Q14-Q23)

**Q14 (Workflow Integration & Solution Design):** You are designing a system that processes uploaded PDFs, extracts tables, and asks Claude to analyze the trends. The PDFs are often 500 pages long. What is the optimal architecture?
A. Pass the entire PDF raw text in a single prompt to Claude 3.5 Sonnet.
B. Use a specialized OCR tool to extract tables, chunk the data, store in a vector database, and use RAG to query specific tables.
C. Ask Claude to write a Python script to summarize the PDF without reading it.
D. Split the PDF by sentence and send each sentence in a separate API call.

**Q15 (Workflow Integration & Solution Design):** A banking application requires highly deterministic, structured JSON output from Claude for its backend API. How should you design the system?
A. Prompt Claude to "be creative" and format as JSON.
B. Use Claude's Tool Use (Function Calling) feature to define the exact JSON schema required, forcing the output to conform to the schema.
C. Ask for plain text and use Regex to parse it.
D. Use a high temperature setting (0.9) to explore different JSON structures.

**Q16 (Workflow Integration & Solution Design):** (Select 2) You are building a coding assistant IDE plugin. What are the key architectural considerations for minimizing latency?
A. Streaming the API response back to the IDE.
B. Using Claude 3 Opus for simple autocomplete tasks.
C. Implementing caching for identical user prompts.
D. Sending the entire project repository in every prompt context.
E. Routing all requests through a central database before hitting the API.

**Q17 (Workflow Integration & Solution Design):** An e-commerce platform wants to integrate Claude to handle customer returns. The workflow requires checking inventory via a database, generating a shipping label via an external API, and sending an email. Which design pattern is essential here?
A. A simple conversational loop with memory.
B. An agentic workflow utilizing Tool Use to interact with external APIs iteratively based on intermediate results.
C. Batch processing of all returns at midnight.
D. A single prompt with all possible customer scenarios hardcoded.

**Q18 (Workflow Integration & Solution Design):** You are designing a multi-agent system. Agent A (Claude Haiku) categorizes emails. Agent B (Claude Sonnet) drafts replies to "urgent" emails. How should they communicate?
A. Agent A writes a file, Agent B polls the file system.
B. Agent A's output is parsed programmatically and placed into a queue consumed by Agent B, passing only the necessary context.
C. They should share the exact same system prompt.
D. Agent B should evaluate Agent A's performance.

**Q19 (Workflow Integration & Solution Design):** A healthcare provider wants to use Claude to summarize patient histories. Patient data cannot leave the geographic region due to compliance. What solution design addresses this?
A. Use the standard Anthropic API and mask names.
B. Deploy Claude within an enterprise cloud environment (like AWS Bedrock or Google Cloud Vertex AI) that guarantees regional data residency.
C. Run an open-source model locally instead of Claude.
D. Encrypt the data before sending it to the global Anthropic API; Claude will decrypt it.

**Q20 (Workflow Integration & Solution Design):** When designing a high-throughput summarization pipeline for news articles, what is the best strategy to manage API rate limits?
A. Implement exponential backoff and retry logic, and consider asynchronous batch processing if real-time responses aren't required.
B. Send requests as fast as possible until blocked, then wait an hour.
C. Only summarize the titles of the articles.
D. Create multiple API keys and rotate them randomly.

**Q21 (Workflow Integration & Solution Design):** (Select 3) In a Retrieval-Augmented Generation (RAG) setup using Claude, which components are typically required?
A. An Embedding Model
B. A Vector Database
C. A Fine-tuned base model
D. A semantic search mechanism
E. A dedicated GPU cluster on-premises

**Q22 (Workflow Integration & Solution Design):** You are designing a chatbot that requires long-term memory of a user's preferences over months. How do you implement this?
A. Pass the entire conversation history from day 1 in every single prompt.
B. Store extracted facts and preferences in a persistent database, and dynamically inject relevant facts into the system prompt based on the current context.
C. Ask the user to remind Claude of their preferences at the start of each session.
D. Fine-tune Claude on the user's conversation history every week.

**Q23 (Workflow Integration & Solution Design):** A company wants to use Claude to translate complex legal documents. They have an existing Glossary of Terms. How should the solution integrate this glossary?
A. Train a new embedding model on the glossary.
B. Include the glossary in the system prompt for the translation task, instructing Claude to strictly adhere to the terms.
C. Translate without the glossary, then do a find-and-replace string operation.
D. Ask Claude to guess the glossary terms.

### Domain 3: Governance, Risk, and Responsible Use (Q24-Q32)

**Q24 (Governance, Risk, and Responsible Use):** A hospital wants to use Claude to analyze patient symptoms. What is the most critical risk regarding Protected Health Information (PHI)?
A. Claude might diagnose the patient incorrectly.
B. Sending unredacted PHI to external APIs may violate HIPAA or similar regulations if appropriate BAAs (Business Associate Agreements) and enterprise environments are not utilized.
C. The model might generate a response that is too long.
D. The embeddings might not capture medical terminology perfectly.

**Q25 (Governance, Risk, and Responsible Use):** You discover users are trying to "jailbreak" your Claude-powered customer service bot to make it use profanity. What is the primary defense mechanism?
A. Using a robust System Prompt outlining strict behavioral boundaries and constraints against harmful or offensive language.
B. Increasing the context window.
C. Using the most expensive model available.
D. Decreasing the temperature parameter.

**Q26 (Governance, Risk, and Responsible Use):** (Select 2) Which practices demonstrate Responsible AI use when deploying Claude in a hiring tool for resume screening?
A. Blindly trusting Claude's ranking of candidates without human review.
B. Regularly auditing the system for demographic biases in its selection rates.
C. Providing transparency to candidates that AI is used in the screening process.
D. Using Claude to infer candidates' political affiliations from their hobbies.
E. Exclusively using Claude to make the final hiring decision.

**Q27 (Governance, Risk, and Responsible Use):** A financial institution uses Claude to explain loan rejections. The AI must not offer financial advice. How do you ensure compliance?
A. Rely on Claude's default safety training.
B. Implement a rule-based post-processor that scans Claude's output for keywords like "invest," "buy," "sell" and flags them.
C. Include a strict directive in the system prompt: "You are an explainer, NOT a financial advisor. Never provide actionable financial advice."
D. Both B and C are recommended in a defense-in-depth approach.

**Q28 (Governance, Risk, and Responsible Use):** What is "Model Inversion" or "Data Extraction" risk in the context of LLMs like Claude?
A. The risk that the model flips the sentiment of the input.
B. The risk that adversaries can extract sensitive training data or proprietary system prompts through clever prompting techniques.
C. The risk that the model architecture is stolen.
D. The risk of the model forgetting old information when new data is added.

**Q29 (Governance, Risk, and Responsible Use):** An educational app uses Claude to grade student essays. What is a key governance requirement?
A. Ensuring the model never gives a perfect score.
B. Maintaining a "human-in-the-loop" mechanism where teachers can review, override, and appeal the AI's grading decisions.
C. Only using Claude 3 Haiku to save money.
D. Deleting student essays immediately after grading.

**Q30 (Governance, Risk, and Responsible Use):** (Select 3) When assessing the risk of deploying a generative AI solution, which factors must be considered?
A. The sensitivity of the data being processed.
B. The autonomy of the AI system (does it take action or just recommend).
C. The specific programming language used for the frontend UI.
D. The potential for reputational damage if the AI generates inappropriate content.
E. The exact number of parameters in the model.

**Q31 (Governance, Risk, and Responsible Use):** Your company policy states that no code generated by AI can be deployed without security scanning. How do you integrate Claude into the developer workflow compliantly?
A. Allow Claude to push directly to production if the confidence score is high.
B. Treat Claude's output exactly like code written by a human developer, requiring standard code review and automated SAST/DAST security scans before merging.
C. Disable Claude's code generation capabilities entirely.
D. Only allow Claude to write test scripts, not production code.

**Q32 (Governance, Risk, and Responsible Use):** A user inputs proprietary company secrets into a public facing, non-enterprise tier Claude chatbot. What is the primary concern?
A. Claude will run out of memory.
B. The data may be used by the provider for future model training, potentially exposing the secrets (depending on the specific terms of service of the tier used).
C. The output will be formatted poorly.
D. The API rate limits will be exceeded.

### Domain 4: Prompting & Task Execution (Q33-Q40)

**Q33 (Prompting & Task Execution):** You need Claude to classify a document. The current prompt is: "Classify this: [doc]. It is either Sports, Politics, or Tech." Claude sometimes outputs conversational filler like "I think this document belongs in the Sports category." How do you fix this?
A. Add: "Respond ONLY with the category name, without any conversational preamble or explanation."
B. Change the temperature to 1.0.
C. Give Claude 100 examples.
D. Ask Claude to think step-by-step.

**Q34 (Prompting & Task Execution):** You want Claude to solve a complex logic puzzle. Which prompting technique will most significantly improve accuracy?
A. Zero-shot prompting.
B. Few-shot prompting.
C. Chain-of-Thought (CoT) prompting (e.g., instructing it to <thinking> space before answering).
D. Role-playing prompting.

**Q35 (Prompting & Task Execution):** (Select 2) When using XML tags in prompts (e.g., `<context>...</context>`), what are the primary benefits for Claude?
A. It fundamentally changes the model's neural architecture.
B. It clearly demarcates different sections of the prompt, helping Claude distinguish between instructions, context data, and formatting rules.
C. It reduces the token count of the prompt.
D. It improves Claude's ability to parse complex, structured inputs and follow targeted instructions related to specific sections.
E. It forces the model to output XML.

**Q36 (Prompting & Task Execution):** You are writing a prompt for data extraction. You provide 3 examples of inputs and desired outputs. This is an example of:
A. Zero-shot prompting
B. Fine-tuning
C. Few-shot prompting
D. RAG

**Q37 (Prompting & Task Execution):** A prompt instructs Claude: "Write a summary of the article. Then, list the key entities. Finally, output the sentiment." Claude often forgets the sentiment analysis. How can you improve instruction following for multi-step tasks?
A. Break the instructions into a numbered list and explicitly ask Claude to output the response matching the numbered steps.
B. Make the prompt shorter by removing the article.
C. Use a smaller model.
D. Add the word "PLEASE" in all caps.

**Q38 (Prompting & Task Execution):** What is the purpose of providing "negative constraints" in a prompt (e.g., "Do not use technical jargon")?
A. To make the model generate longer responses.
B. To explicitly define boundaries and prevent undesired behaviors or formats in the output.
C. To confuse the model and test its robustness.
D. To increase the temperature dynamically.

**Q39 (Prompting & Task Execution):** You want Claude to adopt a specific persona: a 19th-century pirate. Where is the BEST place to put this instruction for maximum effect?
A. At the very end of the user prompt.
B. In the System Prompt.
C. As an XML tag around the user's query.
D. In the API headers.

**Q40 (Prompting & Task Execution):** (Select 2) Which of the following are effective ways to mitigate hallucinations via prompting?
A. Instruct the model to say "I don't know" or "The context does not provide this information" if the answer isn't in the source text.
B. Ask the model to generate its own facts if the context is sparse.
C. Tell the model to extract verbatim quotes from the context to support its answer.
D. Increase the `top_k` parameter.
E. Use a highly creative persona.

### Domain 5: Product & Model Selection (Q41-Q47)

**Q41 (Product & Model Selection):** You are building a real-time chat moderation tool that processes thousands of short messages per second to flag toxicity. Which Claude 3 model is the MOST appropriate choice considering speed, cost, and task complexity?
A. Claude 3 Opus
B. Claude 3.5 Sonnet
C. Claude 3 Haiku
D. Claude 2.1

**Q42 (Product & Model Selection):** A pharmaceutical company needs an AI to analyze highly complex, multi-page biochemical research papers and synthesize novel hypotheses. Which model should they select?
A. Claude 3 Haiku
B. Claude 3 Opus
C. A standard open-source 7B parameter model
D. A keyword matching algorithm

**Q43 (Product & Model Selection):** (Select 2) When would you choose Claude 3.5 Sonnet over Claude 3 Opus?
A. When you need the absolute highest level of complex reasoning and nuance, regardless of cost.
B. When you require a strong balance of high intelligence, faster speed, and lower cost for tasks like coding or advanced RAG.
C. When deploying a large-scale, cost-sensitive application that still requires near-Opus level capabilities.
D. When you only need basic text classification.
E. When you need to run the model entirely offline on a mobile phone.

**Q44 (Product & Model Selection):** You need to process a 150,000-token document. What is a primary consideration regarding model selection within the Claude family?
A. None of the Claude models can handle this context window; you must use chunking.
B. All Claude 3 models (Haiku, Sonnet, Opus) support a 200,000 token context window, so you can select based on the required intelligence and cost.
C. Only Claude 3 Opus supports context windows over 100k.
D. You must use Claude 2.1 for large context windows.

**Q45 (Product & Model Selection):** A startup is building a visual QA system where users upload photos of electronic circuits, and the AI identifies faulty components. Which capability is essential when selecting the Claude model?
A. Audio processing capabilities.
B. The Vision capabilities integrated into the Claude 3 model family (Haiku, Sonnet, Opus).
C. The ability to fine-tune the model locally.
D. Support for direct SQL queries.

**Q46 (Product & Model Selection):** If your application primarily involves writing complex Python algorithms and integrating with GitHub repositories, which Anthropic model is currently recognized as the premier choice for coding tasks?
A. Claude 3 Haiku
B. Claude 3.5 Sonnet
C. Claude Instant 1.2
D. Claude 2.0

**Q47 (Product & Model Selection):** You are migrating an application from Claude 2 to Claude 3. What is a key architectural shift you might need to make regarding structured outputs?
A. Claude 3 no longer supports JSON.
B. You can replace brittle regex-based prompt engineering with Claude 3's native Tool Use (Function Calling) for more reliable structured data extraction.
C. Claude 3 requires XML for all inputs.
D. You must use a lower temperature setting in Claude 3 for the same results.

### Domain 6: Configuration & Knowledge Management (Q48-Q54)

**Q48 (Configuration & Knowledge Management):** You want Claude's outputs to be highly deterministic and reproducible for an automated testing pipeline. Which parameter should you adjust and how?
A. Set `temperature` to 1.0.
B. Set `temperature` to 0.0.
C. Increase `max_tokens`.
D. Decrease `top_p` to 0.1, leaving temperature at 1.0.

**Q49 (Configuration & Knowledge Management):** A user complains that Claude's response gets cut off mid-sentence. Which configuration parameter needs to be increased?
A. `temperature`
B. `top_k`
C. `max_tokens`
D. `system_prompt`

**Q50 (Configuration & Knowledge Management):** (Select 2) In a RAG application, the retrieval step returns 10 documents, but Claude only seems to reference the first 2 and the last 1. What phenomena is occurring, and how can knowledge management be improved?
A. "Lost in the middle" phenomenon.
B. The `max_tokens` limit was hit.
C. Improve knowledge management by re-ranking retrieved documents to ensure the most relevant ones are placed at the very beginning or end of the context.
D. Increase the temperature to make the model read more.
E. Switch to a smaller context window model.

**Q51 (Configuration & Knowledge Management):** You are building a company intranet search. Documents frequently update. Why is RAG preferred over fine-tuning the LLM on the company documents?
A. RAG allows for real-time knowledge updates by simply updating the vector database, whereas fine-tuning requires expensive and time-consuming model retraining for every document change.
B. Fine-tuning guarantees higher accuracy than RAG.
C. RAG is cheaper because it doesn't use tokens.
D. Fine-tuning allows the model to output images.

**Q52 (Configuration & Knowledge Management):** What role does the `system` parameter play in the Anthropic API Messages architecture?
A. It specifies the hardware to run on.
B. It provides a persistent set of instructions, context, and persona definitions that govern the model's behavior throughout the conversation.
C. It contains the user's immediate question.
D. It stores the API key.

**Q53 (Configuration & Knowledge Management):** When setting up a vector database for semantic search with Claude, what must be true about the embedding model used?
A. It must be created by Anthropic.
B. The embedding model must be the same one used for both indexing the documents and embedding the user's query at runtime.
C. It must output 3D vectors.
D. It must be a generative model.

**Q54 (Configuration & Knowledge Management):** (Select 3) Effective chunking strategies for processing large documents into a vector database for RAG include:
A. Splitting strictly by an arbitrary character count (e.g., every 1000 characters) regardless of word or sentence boundaries.
B. Semantic chunking based on paragraphs or sections.
C. Adding overlap between chunks to preserve context across boundaries.
D. Chunking by individual words.
E. Using metadata (e.g., page number, chapter title) attached to chunks to improve retrieval context.

### Domain 7: Troubleshooting & Optimization (Q55-Q60)

**Q55 (Troubleshooting & Optimization):** Your Claude-powered app is experiencing high latency. You are passing a 150,000-token document in the context for every single user query in a multi-turn chat. What is the BEST optimization?
A. Switch to Claude 3 Opus.
B. Implement Prompt Caching for the large document so that subsequent turns in the conversation don't require re-processing the entire document.
C. Decrease the max_tokens to 10.
D. Ask the user to type faster.

**Q56 (Troubleshooting & Optimization):** Claude is using a Tool (function call) correctly, but the external API returns an error message. Claude then apologizes to the user and stops. How do you troubleshoot this workflow?
A. Ensure your application parses the API error, feeds that error back to Claude in a "tool_result" message, and prompts Claude to retry or handle the error gracefully.
B. Change the system prompt to ignore errors.
C. Switch to a model that doesn't support tools.
D. Hardcode a success response in your application regardless of the API output.

**Q57 (Troubleshooting & Optimization):** (Select 2) You notice a sudden spike in API costs. What are the most likely areas to investigate for optimization?
A. Unintentionally sending massive conversation histories in every API call without truncation or summarization.
B. A bug causing infinite loops of automated agent interactions.
C. Using `temperature` 0.0 instead of 0.5.
D. Using System Prompts.
E. Formatting prompts with XML tags.

**Q58 (Troubleshooting & Optimization):** The model occasionally outputs internal thinking or formatting instructions meant for its own process (e.g., exposing its scratchpad). How do you prevent this leakage to the user?
A. Instruct the model to use a specific XML tag for its thinking process (e.g., `<scratchpad>`), and strip out anything inside those tags in your application backend before showing the response to the user.
B. Tell the model to stop thinking.
C. Use a smaller model that cannot reason.
D. Increase the top_p parameter.

**Q59 (Troubleshooting & Optimization):** You are using Claude to parse unstructured resumes into JSON. The output frequently fails validation because it includes explanatory text outside the JSON block. Which prompting optimization is most effective?
A. "Parse the resume."
B. "Please give me JSON."
C. "Output ONLY valid JSON. Start your response with '{' and end with '}'. Do not include any other text, markdown formatting, or explanations."
D. "Parse the resume and explain your fields."

**Q60 (Troubleshooting & Optimization):** A RAG application often answers queries with "I don't know," even when the answer is in the database. What is the most likely failure point to troubleshoot first?
A. The LLM's generative capability.
B. The temperature is too low.
C. The Retrieval Step (the semantic search is not retrieving the relevant chunks to pass to the LLM).
D. The system prompt is too long.

---

## ANSWER KEY & EXPLANATIONS

**Q1: B.** ROUGE is for n-gram overlap (like summaries). To catch hallucinated *numbers*, you need targeted Precision/Recall metrics for numerical entity extraction against ground truth.
**Q2: B.** LLM-as-a-judge (using a strong model like Opus) with a specific rubric is the industry standard for evaluating qualitative aspects like tone, which traditional metrics (BLEU, embedding distance) handle poorly.
**Q3: B, D.** For code, functional execution (B) and static analysis (D) are paramount. AST comparison (A) is too rigid for different valid coding styles. BLEU (C) is terrible for code.
**Q4: B.** The specific failure is malformed JSON. Tracking the JSON parse error rate directly measures this. Semantic similarity (A) is irrelevant for syntax errors.
**Q5: B.** If verbosity is the issue, the evaluation rubric (whether manual or LLM-judged) must penalize length. BLEU (A) doesn't help here. Temperature (C) affects creativity, not necessarily verbosity natively without prompt constraints.
**Q6: A.** For zero-hallucination requirements in legal, relying purely on the LLM (C) is unsafe. Automated cross-referencing against verified databases (A) provides a deterministic safety net.
**Q7: B, E.** Golden datasets are human-verified benchmarks used to calculate accurate metrics (B) and establish baselines (E) before making changes.
**Q8: B.** Exact Match (EM) requires the output to identically match the reference. For translation, especially capturing cultural nuance, there are many valid ways to translate, making EM uselessly strict.
**Q9: B.** Negative test cases (inserting fake context) test if the model is truly grounded in the provided context (RAG) rather than relying on its pre-trained weights.
**Q10: A, C, E.** LLM judges suffer from biases: positional (ordering of options), verbosity (preferring longer answers), and self-enhancement (preferring answers similar to their own style).
**Q11: B.** Macro-averaged F1 treats all classes equally, regardless of support size, preventing the 90% majority class from dominating the score and hiding poor performance on the 10% class.
**Q12: B.** In production A/B testing, alongside quality, you must track operational metrics like token utilization to ensure the new prompt doesn't drastically increase latency or cost.
**Q13: A.** Bias testing requires a curated dataset of edge-case/sensitive prompts monitored over time using a judge or human review to track failure rates.

**Q14: B.** 500 pages exceeds context windows efficiently. OCR -> Chunking -> Vector DB -> RAG (B) is the standard architecture for querying massive document corpora.
**Q15: B.** Tool Use (Function Calling) is explicitly designed to force the model to output structured data matching a JSON schema. It is far more reliable than prompt engineering alone.
**Q16: A, C.** Streaming (A) reduces perceived latency. Caching (C) reduces API calls. Sending the whole repo (D) increases latency massively.
**Q17: B.** Multi-step processes requiring external systems (DB, shipping API, email) define an agentic workflow using Tool Use to act iteratively.
**Q18: B.** Programmatic parsing and passing only necessary context in a queue is robust and scalable for multi-agent systems. Sharing a file (A) is brittle.
**Q19: B.** Enterprise environments (AWS Bedrock, GCP Vertex) offer strict data residency and compliance guarantees (HIPAA, SOC2) that public APIs may not.
**Q20: A.** Rate limits are best handled programmatically with exponential backoff. Asynchronous batching helps manage high throughput without hitting limits.
**Q21: A, B, D.** RAG requires an embedding model (A) to convert text to vectors, a vector DB (B) to store them, and a semantic search mechanism (D) to retrieve them.
**Q22: B.** Long-term memory is achieved by extracting entities/preferences, storing them in a DB, and injecting relevant ones into the system prompt during runtime.
**Q23: B.** Providing the glossary in the system prompt gives the LLM the context needed to apply the correct terminology during translation natively.

**Q24: B.** Sending PHI to public, non-compliant APIs is a massive regulatory and privacy violation. Enterprise agreements (BAAs) are required.
**Q25: A.** A strong System Prompt establishes the core rules of engagement and is the primary defense against prompt injection/jailbreaking.
**Q26: B, C.** Responsible AI requires auditing for bias (B) and transparency (C). Blind trust (A) or exclusive AI decision-making (E) in high-stakes areas is dangerous.
**Q27: D.** Defense in depth involves both strong system prompting (C) and deterministic post-processing filters (B) for compliance.
**Q28: B.** Model inversion/data extraction is the security risk where attackers prompt the model to reveal its training data or hidden system instructions.
**Q29: B.** High-stakes AI decisions (like grading) require human-in-the-loop oversight for accountability and correction.
**Q30: A, B, D.** Risk assessment focuses on data sensitivity, system autonomy, and potential impact (reputational, financial, safety).
**Q31: B.** AI-generated code should be treated exactly like human code, subject to all standard security, SAST/DAST, and review processes.
**Q32: B.** Public tier chatbots often have terms of service allowing data use for training, creating a risk of corporate data leakage.

**Q33: A.** Explicitly instructing the model to remove preambles and output ONLY the desired format is the standard fix for conversational filler.
**Q34: C.** Chain-of-Thought (instructing the model to think step-by-step) significantly improves performance on logic and reasoning tasks.
**Q35: B, D.** XML tags help Claude structure the prompt, separate instructions from data, and follow complex, multi-part instructions more accurately.
**Q36: C.** Providing a few examples in the prompt is the definition of few-shot prompting.
**Q37: A.** Breaking complex tasks into numbered steps and requesting output mapped to those steps heavily improves instruction following.
**Q38: B.** Negative constraints explicitly tell the model what *not* to do, bounding the output space and preventing unwanted behaviors.
**Q39: B.** The System Prompt is the designated place for setting personas, tone, and global behavioral rules.
**Q40: A, C.** Instructing the model to admit ignorance (A) and grounding it by asking for verbatim quotes (C) are primary anti-hallucination techniques.

**Q41: C.** Haiku is specifically designed for high-speed, low-cost, high-volume tasks like real-time chat moderation.
**Q42: B.** Opus is Anthropic's most capable model, designed for highly complex, deep reasoning tasks like scientific synthesis.
**Q43: B, C.** Sonnet 3.5 offers a near-ideal balance: intelligence rivaling Opus, but at higher speeds and lower costs, making it the workhorse for enterprise apps.
**Q44: B.** The entire Claude 3 family (Haiku, Sonnet, Opus) supports a 200k token context window natively.
**Q45: B.** The Claude 3 family has native vision capabilities essential for processing images alongside text.
**Q46: B.** Claude 3.5 Sonnet is currently widely recognized as the premier model in the Anthropic lineup for coding and software engineering tasks.
**Q47: B.** While Claude 3 can do regex, migrating to its native Tool Use (Function Calling) is the architectural best practice for reliable structured data.

**Q48: B.** `temperature = 0.0` makes the model's output as deterministic and reproducible as possible by always selecting the most probable token.
**Q49: C.** `max_tokens` dictates the maximum length of the generated response. If it cuts off mid-sentence, this limit was hit.
**Q50: A, C.** The "lost in the middle" phenomenon (A) occurs when models ignore data in the middle of long contexts. Re-ranking (C) puts the most vital info at the edges.
**Q51: A.** RAG allows dynamic, real-time updates to knowledge without retraining. Fine-tuning for knowledge retrieval is inefficient and static.
**Q52: B.** The system parameter provides the persistent rules, persona, and context that govern the entire API interaction.
**Q53: B.** Semantic search requires comparing vectors in the same dimensional space. Therefore, the exact same embedding model must be used for indexing and querying.
**Q54: B, C, E.** Semantic chunking (B), overlap (C), and metadata injection (E) are best practices to maintain context. Arbitrary splitting (A) breaks semantic meaning.

**Q55: B.** Prompt Caching allows you to cache the large 150k document on Anthropic's servers, drastically reducing latency and cost for subsequent turns in the same chat.
**Q56: A.** When a tool fails, the application must catch the error and send a "tool_result" back to Claude with the error details so Claude can reason about it and retry.
**Q57: A, B.** Runaway costs are usually due to sending massive, un-truncated chat histories repeatedly (A) or infinite agent loops (B).
**Q58: A.** Instructing the model to use `<scratchpad>` tags for thinking allows the backend to easily parse and remove that text before presenting the final answer.
**Q59: C.** Explicit, aggressive instructions regarding output format, including exact starting/ending characters, are required to enforce strict JSON output without Tool Use.
**Q60: C.** In RAG, if the answer is in the DB but the model says "I don't know," the retrieval step usually failed to find and pass the relevant chunks to the LLM.

## SCORE INTERPRETATION
- **50-60 (Ready):** You have a strong, robust understanding of deep technical concepts, governance, and architecture. You are ready for the exam.
- **40-49 (Borderline):** Good foundation, but review nuanced edge cases and specific architectural decisions.
- **Below 40 (Needs Study):** Focus heavily on the official documentation, especially around Workflow Integration, Evaluation Metrics, and Responsible Use.
