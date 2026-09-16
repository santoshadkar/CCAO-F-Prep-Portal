# Practice Exam 3 – Claude Certified Associate Foundations (CCAO-F)

## Domain 1: Output Evaluation & Validation (Questions 1-13)

**1. A compliance officer uses Claude to summarize long financial reports. They notice Claude occasionally hallucinates a specific regulatory penalty amount when none is mentioned. Which evaluation technique is best suited to catch this specific type of error automatically?**
A) Human-in-the-loop (HITL) review of every output
B) Providing Claude with a rubric and using it as a judge on its own outputs
C) Using a strict regular expression filter to flag the word "penalty"
D) Implementing a self-consistency check by running the prompt 5 times at high temperature

**2. You are evaluating Claude's performance on a customer support Q&A dataset. You want to ensure the tone is empathetic but the factual information strictly adheres to your knowledge base. Which approach best balances these requirements?**
A) Use BLEU score against reference answers for the entire response.
B) Evaluate factual accuracy with a deterministic script and use an LLM-as-a-judge specifically for empathy.
C) Use ROUGE-L to measure both empathy and factuality simultaneously.
D) Rely solely on customer satisfaction (CSAT) scores after deployment.

**3. (Select TWO) When setting up an automated evaluation pipeline for a summarization task using Claude, which of the following metrics are most appropriate for assessing whether key facts were retained?**
A) Exact Match (EM)
B) Semantic Similarity (e.g., BERTScore)
C) Perplexity
D) N-gram overlap (e.g., ROUGE)
E) Token generation speed

**4. A legal tech startup is using Claude to draft standard non-disclosure agreements. They have a test suite of 50 complex scenarios. What is the most robust way to evaluate the legal soundness of the generated NDAs?**
A) Ask Claude to rate its own NDAs on a scale of 1-10.
B) Compare the length of the generated NDAs to a golden set.
C) Have domain experts (lawyers) blindly grade a sample of generated NDAs alongside human-drafted ones.
D) Use a semantic similarity metric against existing NDAs.

**5. You notice Claude's outputs for a creative writing task are becoming repetitive. You increase the temperature. How should you adjust your evaluation strategy?**
A) Switch to deterministic metrics like Exact Match.
B) Increase the frequency of automated factual consistency checks.
C) Rely more on subjective human evaluation for creativity and coherence.
D) Decrease the number of test cases in your evaluation suite.

**6. An e-commerce platform uses Claude to extract product features from unstructured reviews. The outputs must be strictly formatted JSON. Which validation step should occur first in the pipeline?**
A) Checking if the extracted features actually exist in the review text.
B) Parsing the output with a standard JSON parser to catch syntax errors.
C) Evaluating the sentiment of the extracted features.
D) Comparing the extracted features to a predefined list of valid features.

**7. (Select TWO) You are using constitutional AI principles to evaluate Claude's responses to sensitive user queries. Which of the following are valid approaches?**
A) Defining a custom constitution and asking Claude to critique its own responses based on it.
B) Hardcoding a list of sensitive words and blocking any response containing them.
C) Using a separate, smaller model to classify if Claude's response violates the constitution.
D) Training a new foundation model from scratch using the constitution.
E) Manually reviewing only the shortest responses for violations.

**8. In a data extraction task, Claude occasionally includes plausible but fabricated data points (hallucinations). Which technique is most effective for mitigating this during the validation phase?**
A) Prompting Claude to provide citations or quotes from the source text for each extracted data point.
B) Lowering the top_k parameter to 1.
C) Increasing the maximum token limit.
D) Using a system prompt that says "Be creative."

**9. You are building a system that translates natural language to SQL queries. The primary evaluation metric for this system should be:**
A) The syntactic similarity of the generated SQL to a reference query.
B) The execution success and correct result set of the generated SQL on a test database.
C) The generation speed of the SQL query.
D) The length of the SQL query.

**10. When evaluating the helpfulness of Claude's responses in a chat interface, why might relying solely on user thumbs-up/thumbs-down (implicit feedback) be insufficient?**
A) Users always provide accurate feedback.
B) Implicit feedback often suffers from low response rates and selection bias.
C) Thumbs-up/thumbs-down is too granular of a metric.
D) Claude cannot process this type of feedback.

**11. A healthcare application uses Claude to summarize patient interaction transcripts. A critical error occurs if a symptom is omitted. The evaluation metric must prioritize:**
A) High Precision
B) High Recall
C) Low Latency
D) High BLEU score

**12. You are using the 'LLM-as-a-judge' technique to evaluate Claude 3.5 Sonnet's outputs. To ensure the judge is reliable, you should:**
A) Always use the smallest, fastest model as the judge to save costs.
B) Provide the judge with a clear, detailed grading rubric and few-shot examples.
C) Ask the judge to output only a numerical score without an explanation.
D) Only use this technique for objective tasks like math problems.

**13. In a multi-turn conversation, how should you evaluate context retention?**
A) By only evaluating the very last response.
B) By asking a question in turn 5 that refers back to information provided in turn 1.
C) By counting the number of tokens in the conversation history.
D) By checking if the model uses the same vocabulary throughout the conversation.

## Domain 2: Workflow Integration & Solution Design (Questions 14-23)

**14. A financial services firm wants to use Claude to analyze highly confidential market research reports stored in their secure on-premise servers. They have strict data residency requirements. What is the most appropriate architecture?**
A) Send the reports to the Anthropic public API over the public internet.
B) Use Claude via a managed cloud provider (like AWS Bedrock or GCP Vertex AI) configured within their secure VPC.
C) Manually copy and paste the reports into the Claude web interface.
D) Compress the reports into a zip file and email them to an automated processor.

**15. You are designing an automated customer support workflow. If Claude cannot confidently answer a user's question, it needs to escalate the ticket to a human agent. How should this be implemented?**
A) Instruct Claude to say "I don't know" and wait for the user to ask for a human.
B) Use tool use (function calling) to allow Claude to call an `escalate_ticket` function when it determines the query is beyond its capability or confidence threshold.
C) Have a human review every single response before it is sent to the user.
D) Set the temperature to 0 so Claude always gives a definitive answer, right or wrong.

**16. (Select TWO) An application needs to process thousands of PDF documents daily using Claude. Which strategies are best for handling this volume efficiently and cost-effectively?**
A) Process documents synchronously in a single-threaded loop.
B) Implement a queueing system (like SQS or RabbitMQ) and process documents asynchronously with multiple workers.
C) Use the Message Batches API to send large groups of requests at a discounted rate.
D) Send each page of the PDF as a separate, isolated request without context.
E) Only process documents during peak business hours.

**17. A team is building an internal knowledge retrieval system (RAG). They notice the system is slow because it retrieves too many irrelevant chunks, maxing out the context window. What is the best solution design improvement?**
A) Switch to a model with a smaller context window.
B) Improve the retrieval step by using hybrid search (keyword + semantic) and re-ranking the results before passing them to Claude.
C) Increase the temperature so Claude can guess the missing information.
D) Stop using RAG and fine-tune the model on all internal documents.

**18. You are designing a workflow where Claude generates Python code, and the system automatically executes it. What is the most critical security consideration?**
A) Ensuring the generated code follows PEP 8 style guidelines.
B) Executing the code in a heavily sandboxed, isolated environment with restricted network and file system access.
C) Using the fastest available model to minimize execution latency.
D) Prompting Claude to "only write safe code."

**19. A marketing team wants to use Claude to generate personalized email campaigns based on user data stored in a CRM. What is the recommended integration pattern?**
A) Export the entire CRM database into a text file and include it in every prompt.
B) Create a middleware service that fetches the specific user's data from the CRM API and constructs a dynamic prompt for Claude.
C) Give Claude direct, unauthenticated access to the CRM database.
D) Hardcode user data into the system prompt.

**20. When designing an agentic workflow where Claude uses multiple tools (e.g., search, calculator, database query) to solve a complex problem, which prompting technique is essential?**
A) Few-shot prompting with static examples.
B) Chain-of-Thought (CoT) prompting, often structured as ReAct (Reasoning and Acting).
C) Zero-shot prompting.
D) Negative prompting.

**21. A news organization uses Claude to tag articles with relevant categories. They have a fixed list of 50 categories. How should the solution be designed to ensure Claude only outputs valid categories?**
A) Post-process the output with a script that maps invalid outputs to the closest valid category.
B) Provide the list of 50 categories in the prompt and use tool use (function calling) where the tool arguments are strictly typed to an enum of the 50 categories.
C) Ask Claude to apologize if it makes a mistake.
D) Rely on the model's general knowledge to know the categories.

**22. (Select TWO) You are designing a scalable application that relies heavily on the Anthropic API. To handle potential rate limits (HTTP 429 errors), your application should:**
A) Immediately retry the request as fast as possible.
B) Implement exponential backoff and retry logic.
C) Monitor API usage metrics and set up alerts for when you approach rate limits.
D) Ignore the errors and return a blank response to the user.
E) Switch to a different LLM provider automatically.

**23. A company wants to build a conversational assistant that remembers user preferences across multiple sessions over weeks. How should this state be managed?**
A) By keeping a single API connection open indefinitely.
B) By storing user preferences in an external database and injecting relevant facts into the context window for new sessions.
C) By relying on the model's internal weights to remember the user.
D) By passing the entire history of all past conversations in every new prompt.

## Domain 3: Governance, Risk, and Responsible Use (Questions 24-32)

**24. An HR department wants to use Claude to screen resumes and rank candidates for a software engineering role. What is the most significant ethical risk in this scenario?**
A) The model might generate code that is inefficient.
B) The model might inadvertently perpetuate historical biases present in the training data or the prompt, unfairly penalizing certain demographics.
C) The model might summarize the resumes too briefly.
D) The model might take too long to process the resumes.

**25. A healthcare startup is building a symptom-checker chatbot using Claude. To mitigate the risk of providing harmful medical advice, the system prompt must include:**
A) Instructions to always diagnose the user immediately.
B) A strong disclaimer that the bot is not a doctor and instructions to advise the user to seek professional medical help for serious conditions.
C) A requirement to ask for the user's credit card information.
D) Instructions to use complex medical jargon to appear authoritative.

**26. (Select THREE) A large enterprise is establishing an AI Governance board. What should be their primary responsibilities regarding the deployment of LLMs like Claude?**
A) Writing the application code for the user interface.
B) Establishing policies for data privacy and acceptable use cases.
C) Monitoring deployments for bias, toxicity, and hallucinations.
D) Approving which specific models can be used for different risk tiers of applications.
E) Manually labeling data for fine-tuning.

**27. A developer attempts to bypass Claude's safety filters by using a complex, multi-layered prompt that asks the model to act as an unconstrained villain ("jailbreaking"). Anthropic's models are trained using Constitutional AI to resist this. What is the developer attempting to exploit?**
A) Rate limits.
B) Context window size.
C) Model vulnerabilities through adversarial prompting.
D) Tool use functionality.

**28. A financial institution uses Claude to draft responses to customer complaints. To comply with strict data privacy regulations (like GDPR or CCPA), what MUST be implemented before sending data to the API?**
A) A spell-checker.
B) A PII (Personally Identifiable Information) redaction or pseudonymization step to remove sensitive data (like SSNs, account numbers) from the prompt.
C) A translation step to ensure all prompts are in English.
D) A sentiment analysis tool.

**29. You are building an application that generates marketing copy. You want to ensure the generated content does not plagiarize existing copyrighted works. What is the most practical mitigation strategy?**
A) Ask Claude to guarantee its output is not copyrighted.
B) Implement a post-generation plagiarism checking tool (e.g., Copyscape) before publishing the content.
C) Only use models with a context window under 1000 tokens.
D) Ban the use of adjectives in the prompt.

**30. (Select TWO) When deploying a user-facing chatbot powered by Claude, which transparency measures are recommended for responsible use?**
A) Disclosing to users that they are interacting with an AI system, not a human.
B) Providing a clear mechanism for users to report harmful or inaccurate outputs.
C) Claiming the AI has human emotions to build empathy.
D) Hiding the fact that AI is used to make the system seem more advanced.
E) Forcing users to read the model's entire architecture paper before using the chat.

**31. A government agency is considering using Claude to summarize public policy feedback. They are concerned about "automation bias." What does this refer to?**
A) The tendency of the AI to automate tasks too quickly.
B) The tendency of human reviewers to over-rely on the AI's output and accept it without critical evaluation, missing potential errors or biases.
C) The cost of automating the workflow.
D) The model's inability to understand complex policy.

**32. To ensure ongoing compliance and safety, an organization logs all prompts and responses generated by their internal Claude-powered application. Who should have access to these logs?**
A) All employees in the company.
B) Only the marketing team.
C) A strictly access-controlled group of auditors, security, and compliance personnel.
D) The general public.

## Domain 4: Prompting & Task Execution (Questions 33-40)

**33. You want Claude to extract entities (Names, Organizations, Locations) from a text. The output MUST be a valid JSON array of objects. Which prompting technique is most reliable?**
A) "Extract the entities from this text and make it JSON."
B) Providing a system prompt with clear instructions, the required JSON schema, and using Prefill (Assistant forcing) by ending the prompt with `{ "entities": [`
C) Using a very high temperature.
D) Asking the model nicely to format it correctly.

**34. Claude is struggling to solve a complex word problem. Which prompting strategy is most likely to improve its reasoning and accuracy?**
A) "Solve this quickly."
B) "Think step-by-step before providing the final answer." (Chain-of-Thought)
C) Translating the problem into French.
D) Reducing the `max_tokens` parameter.

**35. (Select TWO) When writing a prompt for a classification task, what elements are crucial for getting consistent and accurate results?**
A) A clear, unambiguous definition of each category.
B) Instructions to invent new categories if needed.
C) Providing a few high-quality examples (few-shot prompting) mapping inputs to the correct categories.
D) Using the most obscure vocabulary possible.
E) Asking the model to write a poem about the categories.

**36. You are using Claude to write a summary of a highly technical medical paper. The target audience is high school students. How should you structure the prompt?**
A) "Summarize this paper."
B) "Act as an expert doctor and summarize this paper using precise medical terminology."
C) "Summarize this paper. Explain the concepts simply, using analogies appropriate for a 9th-grade reading level. Avoid jargon."
D) "Provide a 10-page summary of this 5-page paper."

**37. You want Claude to act as a harsh code reviewer. It should point out every flaw and be very direct. Where is the best place to define this persona?**
A) In the `temperature` parameter.
B) In the `System Prompt`.
C) At the very end of the user prompt.
D) In a separate API call before the main request.

**38. You are parsing messy OCR text. You notice Claude occasionally fixes spelling mistakes when extracting data, but you need the exact original text, even if misspelled. What should you add to your prompt?**
A) "Fix all errors."
B) "Extract the data exactly as it appears in the source text, preserving all spelling and grammatical errors. Do not correct anything."
C) "Use proper English."
D) "Summarize the text."

**39. When using XML tags in a prompt to structure context (e.g., `<document>...</document>`), what is the primary benefit?**
A) It makes the prompt run faster.
B) It helps Claude clearly distinguish between instructions, context data, and expected output formats, improving adherence to complex instructions.
C) It automatically encrypts the prompt.
D) It reduces the token count.

**40. You ask Claude a question about a highly specific, newly released product that is not in its training data. Without RAG, what is Claude most likely to do, and how can you prompt it to avoid this?**
A) It will crash. Prompt it with "Don't crash."
B) It may hallucinate a plausible but incorrect answer. Prompt it with "If you do not know the answer based on the provided context, say 'I don't know'."
C) It will automatically search the web. No prompt change needed.
D) It will return a 404 error.

## Domain 5: Product & Model Selection (Questions 41-47)

**41. An application requires near-instantaneous responses for a simple text classification task (e.g., routing support tickets based on intent) at a massive scale. Cost is a major factor. Which Claude 3 model is the most appropriate choice?**
A) Claude 3 Opus
B) Claude 3.5 Sonnet
C) Claude 3 Haiku
D) Claude 2.1

**42. A research team needs to analyze complex financial models and write highly nuanced, strategic reports synthesizing data from 50 different 10-K filings. They need the absolute highest level of reasoning capability. Which model should they select?**
A) Claude 3 Haiku
B) Claude 3 Opus
C) Claude Instant 1.2
D) Claude 3.5 Sonnet

**43. (Select TWO) You are building a coding assistant for software engineers. The application requires a balance of high intelligence, strong coding capabilities, and fast generation speeds. Which models are the best candidates?**
A) Claude 3.5 Sonnet
B) Claude 3 Haiku (for simpler autocomplete tasks)
C) Claude 1.0
D) Claude Instant
E) A basic sentiment analysis model

**44. A user wants to upload an image of a handwritten diagram and have the model convert it into a structured Mermaid.js code block. Which capability is essential for the chosen model?**
A) Audio processing
B) Vision capabilities (multimodal)
C) Fine-tuning
D) Low latency

**45. You are designing a RAG system and need to process a 150,000-word book (approx. 200,000 tokens) in a single prompt to ask comprehensive questions about the entire plot. Which family of models supports this context window natively?**
A) Claude 1 and 2 only
B) The Claude 3 and 3.5 family (which have a 200k context window)
C) Only Claude Instant
D) No current model supports this.

**46. When comparing Claude 3.5 Sonnet to Claude 3 Opus for general knowledge tasks and coding, what is the typical relationship?**
A) Opus is always significantly faster.
B) 3.5 Sonnet operates at roughly the same or higher intelligence level as 3 Opus, but at a faster speed and lower cost.
C) Opus cannot write code.
D) 3.5 Sonnet has a smaller context window than Opus.

**47. A developer is migrating an old application using Claude 2.0 to the Claude 3 family. What major API feature must they ensure they are using to interact with the newer models?**
A) The Legacy Text Completions API
B) The Messages API
C) The Embeddings API exclusively
D) The GraphQL API

## Domain 6: Configuration & Knowledge Management (Questions 48-54)

**48. In a RAG application, you chunk a large document into smaller pieces before embedding them. If your chunks are too small (e.g., 10 tokens each), what is the most likely negative outcome?**
A) The embeddings will be too large.
B) The retrieved chunks will lack sufficient context for the model to understand the information, leading to poor answers.
C) The context window will overflow immediately.
D) The model will generate output too quickly.

**49. You are configuring the `temperature` parameter for a legal document summarization task where accuracy and consistency are paramount. What value is most appropriate?**
A) 1.0
B) 0.8
C) 0.0
D) 2.0

**50. (Select TWO) What are the primary benefits of using Prompt Caching with the Anthropic API?**
A) It permanently trains the model on your data.
B) It reduces latency for requests that reuse a large, static context (like a system prompt or a large document).
C) It reduces costs by discounting the price of cached input tokens.
D) It increases the maximum output token limit.
E) It allows the model to search the live internet.

**51. You are configuring a vector database for a RAG system. You notice that searches for "Apple" (the company) are returning results for "apples" (the fruit). What configuration change is needed in the knowledge management pipeline?**
A) Switch from semantic (vector) search to exact keyword search.
B) Ensure the embedding model used is capable of capturing semantic meaning and context, rather than just relying on lexical matching.
C) Increase the temperature of the LLM.
D) Delete all documents mentioning fruit.

**52. A system prompt contains 10,000 tokens of standard operating procedures. This prompt is sent with every single user request. To optimize costs and speed using Prompt Caching, how should the API request be structured?**
A) The SOPs must be sent in the `user` message block.
B) The SOPs should be placed in the `system` parameter, and a cache control block must be added to mark that portion of the text for caching.
C) Caching happens automatically without any configuration.
D) The SOPs must be split into 100 separate API calls.

**53. When managing knowledge for an enterprise LLM application, why is implementing a robust Document Lifecycle Management (DLM) process important?**
A) To ensure the LLM generates longer responses.
B) To ensure the RAG system retrieves accurate, up-to-date information and that obsolete or superseded documents are removed from the vector database.
C) To increase the latency of the system.
D) To make the UI look better.

**54. You set `top_p` to 0.1 and `temperature` to 1.0. What effect will this have on the generation?**
A) The output will be highly random because temperature is 1.0.
B) The output will be very deterministic and focused, as `top_p` restricts the model to only the top 10% probability mass, overriding the high temperature's tendency to pick unlikely tokens.
C) The API will return an error because the parameters conflict.
D) The model will stop generating after 10 tokens.

## Domain 7: Troubleshooting & Optimization (Questions 55-60)

**55. A user reports that Claude is providing truncated JSON outputs that cut off mid-array (e.g., `[{"name": "John"}, {"name": "Jane"`). What is the most likely cause and solution?**
A) The model forgot JSON syntax. Solution: Add more examples.
B) The generation hit the `max_tokens` limit. Solution: Increase the `max_tokens` parameter in the API request.
C) The temperature is too low. Solution: Increase temperature to 1.0.
D) The API connection timed out. Solution: Check network settings.

**56. Your application experiences intermittent `529 Overloaded` errors from the Anthropic API during a product launch. What is the standard best practice for handling this?**
A) Immediately alert the user that the system is broken forever.
B) Implement exponential backoff retries with jitter on the client side.
C) Send 10 identical requests simultaneously hoping one gets through.
D) Switch to a different API key immediately.

**57. (Select TWO) You are using tool use (function calling). Claude consistently passes a string value to a tool argument that is defined as an integer in the JSON schema. How can you troubleshoot and fix this?**
A) Ensure the tool definition schema strictly enforces `type: integer` and provides a clear description of the expected format.
B) Add a system prompt instruction explicitly telling Claude to ensure that specific argument is an integer, not a string.
C) Decrease `max_tokens`.
D) Use a smaller model.
E) Ignore it and handle the type conversion in your application code (though fixing the prompt/schema is preferred).

**58. A RAG application is providing hallucinations. Upon debugging, you find the correct information is present in the chunks retrieved from the vector database, but Claude is ignoring it and making up an answer. What is the most effective optimization?**
A) Retrieve more chunks from the database.
B) Restructure the prompt to explicitly instruct Claude: "Answer the question strictly using ONLY the provided context. If the context does not contain the answer, say 'Information not found'."
C) Switch to a smaller model.
D) Increase the temperature.

**59. Your prompt includes a large XML block of data. Claude seems to be confusing instructions placed before the data with instructions placed after the data. What is the recommended optimization for long context windows?**
A) Remove the XML tags.
B) Place the most critical instructions and the actual user question at the very END of the prompt, after the context data. (Recency bias).
C) Place all instructions at the very beginning and leave the end blank.
D) Interleave instructions randomly throughout the data.

**60. You are optimizing a latency-critical application using Claude 3 Haiku. You notice the time to first token (TTFT) is acceptable, but the total generation time is too long. What is the best optimization?**
A) Stream the response to the user so they perceive the application as faster, even if total generation time is the same.
B) Switch to Claude 3 Opus.
C) Increase the `max_tokens` limit.
D) Turn off prompt caching.

---

## ANSWER KEY

1. **B** - LLM-as-a-judge with a specific rubric checking for unmentioned penalties is scalable and targeted.
2. **B** - Factuality often needs deterministic checks (like checking against a KB), while tone/empathy is nuanced and suited for an LLM judge.
3. **B, D** - Semantic similarity (BERTScore) and N-gram overlap (ROUGE) measure how much of the reference meaning/text is in the output.
4. **C** - For highly complex, specialized domains (legal), human expert evaluation is the gold standard for ground truth.
5. **C** - Higher temperature increases variance and creativity, making deterministic metrics less useful and requiring more subjective or LLM-based evaluation.
6. **B** - If it's not valid JSON, downstream systems will break. Syntax checking is the first, cheapest validation step.
7. **A, C** - Constitutional AI involves self-critique based on principles (A) or using a separate model as a constitutional classifier (C).
8. **A** - Forcing the model to cite its sources grounds the response in the provided text, significantly reducing hallucinations.
9. **B** - SQL can be written in many syntactically different ways to achieve the exact same correct result. Execution success is the true measure.
10. **B** - Users often only rate extremely good or extremely bad responses, and may rate based on whether they got the answer they wanted, not if the AI was accurate.
11. **B** - Recall measures how many of the actual positive cases (symptoms) were found. High recall minimizes false negatives (missed symptoms).
12. **B** - LLM judges need clear instructions, rubrics, and examples to provide consistent, reliable evaluations.
13. **B** - Context retention is explicitly tested by requiring the model to synthesize or recall information from early in the context window during a later turn.
14. **B** - Managed cloud providers (AWS/GCP) allow enterprises to use Claude within their own VPCs, satisfying strict data residency and security requirements without data leaving their environment.
15. **B** - Tool use allows the model to programmatically trigger an escalation workflow based on its internal confidence or assessment of the query.
16. **B, C** - Queues handle high volume asynchronously, and Message Batches provide cost savings for non-real-time bulk processing.
17. **B** - Improving the retrieval mechanism (hybrid search, re-ranking) ensures only the most relevant context is passed to the LLM, solving context bloat.
18. **B** - Executing AI-generated code carries immense security risks. A strict sandbox is mandatory to prevent malicious or accidental system damage.
19. **B** - Middleware fetching specific data ensures Claude only sees what it needs to generate the specific email, maintaining data security and prompt efficiency.
20. **B** - ReAct/CoT prompting forces the model to reason about which tool to use, observe the result, and decide the next step.
21. **B** - Tool use with strict enums forces the API to only return valid predefined values.
22. **B, C** - Exponential backoff handles transient rate limits gracefully, while monitoring helps prevent them structurally.
23. **B** - State must be managed externally (e.g., vector DB or traditional DB) and injected via RAG to maintain long-term memory across discrete API sessions.
24. **B** - AI in hiring carries massive risk of perpetuating bias. Governance requires strict auditing for fairness.
25. **B** - Medical use cases require strong disclaimers to mitigate liability and prevent users from treating the AI as a licensed professional.
26. **B, C, D** - Governance boards handle policy, risk assessment, monitoring, and model approval, not actual coding or manual labeling.
27. **C** - Jailbreaks use adversarial prompting techniques to trick the model into bypassing its safety training.
28. **B** - PII redaction is a standard data privacy requirement to ensure sensitive customer data is not sent to external APIs unnecessarily.
29. **B** - AI cannot guarantee non-plagiarism. A deterministic, specialized post-generation check is required for safety.
30. **A, B** - Transparency means disclosing AI involvement and providing mechanisms for user feedback/reporting.
31. **B** - Automation bias is the human tendency to trust automated systems too much, failing to review their outputs critically.
32. **C** - Logs contain sensitive prompts and responses. Access must be strictly audited and limited to authorized personnel.
33. **B** - System prompts with schemas and prefilling the assistant response heavily constrain the model to output exactly the requested format.
34. **B** - Chain-of-thought forces the model to break down the problem, significantly improving accuracy on complex tasks.
35. **A, C** - Clear definitions and few-shot examples are the most reliable way to align the model's classification logic with your expectations.
36. **C** - The prompt clearly defines the task, the target audience (9th grade), and the required tone/style (analogies, no jargon).
37. **B** - The System Prompt is the intended location for defining persona, role, and overarching behavior constraints.
38. **B** - Explicit, detailed instructions addressing the specific unwanted behavior (fixing typos) are necessary when you want raw extraction.
39. **B** - XML tags provide structural boundaries, helping Claude parse the prompt logically and avoid confusing data with instructions.
40. **B** - Without RAG, it may hallucinate. You must explicitly prompt it to admit ignorance if the answer isn't in its context.
41. **C** - Haiku is the fastest and most cost-effective model in the Claude 3 family, ideal for simple classification at scale.
42. **B** - Opus is the most capable model for highly complex, strategic reasoning tasks.
43. **A, B** - Sonnet provides an excellent balance of intelligence and speed for general coding, while Haiku is great for fast, simple completions.
44. **B** - Vision capabilities are required to process image inputs.
45. **B** - The Claude 3 family natively supports a 200,000 token context window.
46. **B** - 3.5 Sonnet represents a major upgrade, offering Opus-level (or better) intelligence at a faster speed and lower cost.
47. **B** - The Claude 3 family requires the Messages API; legacy Text Completions are not supported for these models.
48. **B** - Tiny chunks lose semantic meaning. If a chunk is just "the red car," it doesn't provide enough context for the LLM to answer a question about *why* the car is red.
49. **C** - Temperature 0.0 makes the model greedy/deterministic, maximizing consistency and factual adherence for legal tasks.
50. **B, C** - Prompt caching saves money (cheaper input tokens) and time (lower latency) for large, repeated context blocks.
51. **B** - Semantic search understands the difference between the corporate entity "Apple" and the fruit based on vector embeddings, whereas keyword search just matches characters.
52. **B** - To use Prompt Caching, large static blocks should be in the system prompt with explicit cache control headers applied to them.
53. **B** - If you don't manage the document lifecycle, the RAG system will retrieve outdated policies, causing the LLM to give wrong answers.
54. **B** - `top_p` acts as a hard filter. Setting it to 0.1 restricts the token pool so drastically that the high temperature has little effect, resulting in deterministic output.
55. **B** - Truncated JSON is almost always caused by hitting the `max_tokens` output limit before the model finished writing the structure.
56. **B** - 529 errors indicate server overload. The standard engineering practice is to retry with exponential backoff and jitter.
57. **A, B** - Both fixing the schema to be explicit and reinforcing it in the prompt are valid troubleshooting steps for tool use type errors. (E is a workaround, not a fix for the model behavior).
58. **B** - Strict grounding instructions in the prompt are required to force the model to rely *only* on the RAG context and prevent it from using its internal knowledge to hallucinate.
59. **B** - Due to recency bias in LLMs, placing the most important instructions and the final question at the very end of a long prompt yields the best adherence.
60. **A** - Streaming does not reduce total generation time, but it drastically improves perceived latency (time to first token) for the end-user.
