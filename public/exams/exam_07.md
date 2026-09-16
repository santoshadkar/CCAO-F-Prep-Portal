# Practice Exam 7 – Claude Certified Associate Foundations (CCAO-F)

## Questions

### Domain 1: Output Evaluation & Validation
**1. You are using Claude 3.5 Sonnet to extract compliance obligations from a 400-page regulatory PDF. The model occasionally misses obscure clauses buried in footnotes. What is the most effective evaluation strategy to catch these omissions?**
A) Run the extraction prompt 10 times and aggregate the outputs.
B) Compare the output against a golden dataset of known obscure clauses using a recall-focused automated evaluator.
C) Use a smaller model like Haiku to cross-verify Sonnet's output.
D) Increase the temperature to 0.7 to encourage the model to find hidden text.

**2. A financial firm uses Claude to generate daily market summaries. Over time, analysts notice the summaries are becoming more generic and less insightful. You implement an LLM-as-a-judge to evaluate "insightfulness." What is the biggest risk of this approach?**
A) The judge LLM might suffer from position bias.
B) The judge LLM will likely align with its own stylistic preferences (self-enhancement bias) rather than actual human analyst preferences.
C) The judge LLM cannot process daily market data.
D) The judge LLM will hallucinate facts.

**3. When testing a complex classification prompt, you notice that Claude performs perfectly on the first 20 examples in your test set but hallucinates categories on the last 5. Which of the following is the most likely cause? (Select TWO)**
A) The context window limit is being exceeded.
B) The prompt lacks few-shot examples for the specific edge cases in the last 5 examples.
C) The model has catastrophic forgetting.
D) The test set examples are ordered by complexity, exposing prompt limitations on edge cases.
E) The temperature is set to 0.

**4. You are evaluating Claude's ability to translate complex medical jargon into layman's terms. Which metric is least useful for evaluating the quality of these outputs?**
A) Flesch-Kincaid Readability Score
B) BLEU score against a reference translation
C) Expert human review for factual accuracy
D) LLM-as-a-judge evaluating for simplification and tone

**5. A customer service bot powered by Claude occasionally hallucinates company policies. You decide to implement a self-reflection step where Claude evaluates its own output before showing it to the user. What is a key limitation of this method?**
A) Self-reflection increases API latency and cost significantly.
B) Claude is unable to read its own generated text.
C) Self-reflection completely eliminates hallucinations, making evaluation redundant.
D) It requires setting temperature to 1.0.

**6. You want to automate the evaluation of a RAG system's answer relevance. Which approach is considered best practice when building an automated evaluator?**
A) Use Rouge-L to compare the answer against the retrieved documents.
B) Prompt an LLM to score the answer's relevance to the user query on a scale of 1-5, providing clear grading rubrics.
C) Check if the generated answer is longer than 50 words.
D) Ask the model to output a confidence score along with the answer.

**7. While running a batch evaluation of 1,000 prompts, you notice Claude occasionally outputs "I cannot fulfill this request" for benign tasks. How should you adjust your evaluation pipeline to troubleshoot this?**
A) Ignore these outputs as acceptable errors.
B) Implement a specific regex or semantic check to flag refusal rates and analyze the correlated prompts for false-positive safety triggers.
C) Switch to a non-Anthropic model for evaluation.
D) Lower the context window size.

**8. You are validating the structured JSON output of Claude. The model occasionally misses a required key or hallucinates an extra one. What is the most robust validation method?**
A) Prompt Claude to double-check its JSON.
B) Use a JSON schema validator in your application logic to enforce strict adherence before processing.
C) Use string matching to check for the presence of the key.
D) Set the output format to Markdown instead of JSON.

**9. When assessing Claude's performance on a coding task, you use unit tests. Some generated code passes the tests but is highly inefficient (O(n^2) instead of O(n)). How should you improve your evaluation?**
A) Only test for syntax errors.
B) Incorporate time and space complexity constraints into the prompt and use performance benchmarking in the evaluation suite.
C) Ask Claude to explain the code.
D) Use a smaller model.

**10. You notice a discrepancy between Claude's performance on your local dev environment and production. What is the most likely cause?**
A) Claude behaves differently on different operating systems.
B) Differences in the system prompt, retrieval pipeline (RAG), or temperature settings between dev and prod environments.
C) The API rate limits are altering the model's intelligence.
D) Claude learns from local interactions.

**11. Which technique is most effective for evaluating the robustness of a prompt against adversarial inputs (jailbreaks)?**
A) Red teaming with a diverse set of adversarial prompts.
B) Measuring the exact match score on standard datasets.
C) Evaluating the prompt with temperature 0.
D) Checking the latency of the response.

**12. In a multi-turn conversation, you need to evaluate if Claude maintains persona consistency. What is the best evaluation strategy?**
A) Evaluate only the final turn of the conversation.
B) Use an LLM-as-a-judge to evaluate transcripts of multi-turn interactions against a defined persona rubric.
C) Check the total token count of the conversation.
D) Ask the user to rate the persona.

**13. A legal team uses Claude to summarize contracts. They find that Claude occasionally invents penalty clauses. What is the best mitigation strategy?**
A) Add a strict instruction: "Only use information explicitly stated in the text. Do not hallucinate." and evaluate using human-in-the-loop for high-risk contracts.
B) Increase the temperature to encourage creativity.
C) Use a smaller context window.
D) Switch to a code generation model.

### Domain 2: Workflow Integration & Solution Design
**14. You are designing an architecture for a real-time voice assistant that uses Claude for reasoning. What is the primary architectural consideration?**
A) Maximizing the context window.
B) Minimizing latency by streaming Claude's output and optimizing the speech-to-text and text-to-speech pipelines.
C) Using the largest model available.
D) Storing all conversation history in a relational database.

**15. A client wants to integrate Claude into their existing CRM to automatically draft email replies. What is the recommended integration pattern?**
A) Direct API calls from the CRM frontend to Claude.
B) An asynchronous backend queue that receives CRM events, calls the Claude API, and pushes drafts back to the CRM.
C) A synchronous block on the CRM interface until Claude responds.
D) Polling the Claude API every minute for new emails.

**16. You are building a complex data analysis agent that needs to run SQL queries, analyze results with Python, and write a report using Claude. Which pattern is best?**
A) A single massive prompt asking Claude to do everything.
B) A Tool Use (Function Calling) architecture where Claude can invoke SQL and Python execution environments as needed.
C) A RAG pipeline.
D) A chain of 10 different LLM calls without tool access.

**17. When designing a scalable RAG solution with Claude, which component is critical for handling millions of documents efficiently?**
A) A vector database optimized for approximate nearest neighbor (ANN) search.
B) Increasing Claude's context window to 2 million tokens.
C) Storing documents in CSV files.
D) Using regex to search documents.

**18. You are designing a system where Claude summarizes daily news. The news articles often exceed the context window. What is the best architectural approach? (Select TWO)**
A) Map-Reduce: Summarize each article individually, then summarize the summaries.
B) Truncate the articles to fit the context window.
C) Implement a sliding window approach with overlap to process continuous text.
D) Increase the temperature.
E) Discard articles that are too long.

**19. A healthcare provider wants to use Claude to analyze patient records. What is the most critical design consideration for integration?**
A) Ensuring the API calls are public.
B) Implementing a robust data anonymization/de-identification pipeline before sending data to the API to comply with HIPAA.
C) Using the Haiku model for speed.
D) Storing prompts in plain text.

**20. You are designing an automated coding assistant. To provide the best context to Claude, what should your system do before making the API call?**
A) Send the entire codebase in every prompt.
B) Use static analysis and embedding-based search to retrieve only the relevant functions and file structures related to the user's query.
C) Send only the file currently being edited.
D) Send the last 10 error messages.

**21. When integrating Claude into a high-throughput microservices architecture, how should you handle Anthropic API rate limits (429 errors)?**
A) Crash the service and alert the team.
B) Implement exponential backoff and retry logic in the API client layer.
C) Send the request to a different LLM provider immediately.
D) Ignore the errors and drop the requests.

**22. You want to design a workflow that uses Claude to grade student essays and provide detailed feedback. How should you structure the system to ensure fairness and consistency?**
A) Use a single API call with a brief prompt.
B) Design a multi-step pipeline: Step 1 grades grammar, Step 2 grades argument, Step 3 synthesizes the final grade, using a standard rubric provided in the system prompt.
C) Randomize the prompt for each essay.
D) Use a high temperature setting.

**23. A company wants an internal chatbot that can answer questions based on their private Confluence wiki. What is the standard design pattern for this?**
A) Fine-tuning Claude on the Confluence data.
B) Retrieval-Augmented Generation (RAG) using a vector store populated with Confluence pages.
C) Prompt engineering with a few examples.
D) Hardcoding the wiki URLs in the prompt.

### Domain 3: Governance, Risk, & Responsible Use
**24. You discover that your Claude-powered HR assistant sometimes exhibits bias against certain demographics when screening resumes. What is the most immediate governance action?**
A) Delete the application.
B) Pause the system, conduct a comprehensive fairness audit using diverse test datasets, and refine the prompt/system instructions to explicitly mandate objective criteria.
C) Increase the context window.
D) Blame the users.

**25. A user attempts to jailbreak your customer service bot to make it output profanity. What is the primary defense mechanism?**
A) The model's inherent safety training (Constitutional AI).
B) Adding a single sentence to the prompt: "Do not swear."
C) Blocking IP addresses.
D) Using a smaller model.

**26. Your organization is deploying Claude for financial advice. What is a key compliance requirement?**
A) Making the model open source.
B) Ensuring clear disclaimers that the output is AI-generated and not professional financial advice, alongside human oversight.
C) Using a temperature of 0.
D) Using the Opus model.

**27. To prevent data leakage, a company policy mandates that no PII should be sent to external APIs. How do you implement this for a Claude integration?**
A) Ask Claude to forget the PII after processing.
B) Implement a Data Loss Prevention (DLP) filtering layer that redacts PII before the prompt hits the Anthropic API.
C) Rely on Anthropic's data retention policies.
D) Use a private VPN.

**28. What is the concept of "Constitutional AI" in the context of Claude?**
A) An AI that writes legal documents.
B) Anthropic's method of training Claude using a set of principles (a "constitution") to guide it towards helpful, harmless, and honest behavior.
C) A specific prompt template.
D) An evaluation metric.

**29. You are building an agent that can execute bash commands. What is the most critical security control?**
A) Run the agent as root to avoid permission errors.
B) Execute all commands in a tightly restricted, isolated sandbox environment (like a container) with no access to production systems.
C) Ask Claude to only run safe commands.
D) Use a low temperature.

**30. A user flags that Claude generated factually incorrect information about a historical event. How should you address this risk systemically?**
A) Ban the user.
B) Fine-tune the model on history books.
C) Implement RAG to ground the model's answers in verified external knowledge bases, reducing reliance on parametric memory.
D) Ignore it, as LLMs always hallucinate.

**31. Which of the following best describes "Prompt Injection"?**
A) Injecting more data into the context window.
B) A technique where malicious users embed instructions within the user input to override the system prompt and manipulate the AI's behavior.
C) A method to speed up API calls.
D) A feature of Constitutional AI.

**32. How can you mitigate the risk of Prompt Injection in a Claude application? (Select TWO)**
A) Clearly separate the system instructions from the user input using distinct roles (System vs. User).
B) Enclose user input in specific delimiters (e.g., `<user_input>`) and instruct the model to treat anything inside as data, not instructions.
C) Use the largest model.
D) Filter out all special characters from the input.
E) Set temperature to 1.0.

### Domain 4: Prompting & Task Execution
**33. You want Claude to extract names and dates from a text and format them strictly as a JSON array. Which prompting technique is most effective?**
A) "Extract names and dates."
B) Provide a clear instruction, define the JSON schema, and include 2-3 few-shot examples demonstrating the exact desired output format.
C) Tell Claude to act like a programmer.
D) Use a negative prompt ("Do not output XML").

**34. Claude is struggling with a complex logic puzzle. How can you improve its reasoning?**
A) Tell it to "think harder."
B) Use Chain-of-Thought (CoT) prompting by instructing it to "Think step-by-step before answering."
C) Reduce the context window.
D) Increase the temperature.

**35. You are passing a long document and a short question to Claude. Where is the best place to put the question in the prompt?**
A) At the very beginning of the prompt.
B) In the middle of the document.
C) At the very end of the prompt, after the document.
D) It doesn't matter.

**36. You need Claude to write a creative story, but it often ends too abruptly. How should you modify the prompt?**
A) "Write a longer story."
B) Provide specific constraints: "Write a 5-paragraph story. Ensure the final paragraph provides a detailed resolution to the main conflict."
C) Decrease the temperature.
D) Use a smaller model.

**37. When using XML tags in prompts (e.g., `<context>...</context>`), what is the primary benefit for Claude?**
A) It makes the prompt look like HTML.
B) It helps Claude parse and structure the input data, clearly separating different parts of the prompt (instructions, context, examples).
C) It increases the API speed.
D) It bypasses safety filters.

**38. You want Claude to analyze a dataset, but only if it contains financial data. If not, it should output "N/A". How do you prompt this effectively?**
A) "Analyze this data."
B) Use conditional logic: "First, determine if the data is financial. If yes, analyze it. If no, output exactly 'N/A'."
C) Provide only examples of financial data.
D) Run two separate prompts.

**39. You are building a translation tool. The prompt is: "Translate the following text to French: {text}". It works well, but occasionally outputs conversational filler like "Here is the translation:". How do you stop this?**
A) Add "Do not include conversational filler."
B) Pre-fill the assistant's response with the start of the desired output (e.g., providing `{"role": "assistant", "content": "```french\n"}` if using API).
C) Change the model to Haiku.
D) Use a lower temperature.

**40. You need to perform complex entity extraction on 50 different documents. Which prompting strategy maximizes consistency and accuracy across all documents?**
A) Zero-shot prompting.
B) Providing a highly detailed system prompt with clear definitions of the entities, edge cases, and 5 diverse few-shot examples.
C) Asking Claude to define the entities itself.
D) Using a high temperature.

### Domain 5: Product & Model Selection
**41. Your application requires near-instantaneous responses for real-time chat autocomplete, and the tasks are relatively simple. Which Claude 3 model is the best fit?**
A) Claude 3 Opus
B) Claude 3.5 Sonnet
C) Claude 3 Haiku
D) Claude 2.1

**42. You are building an autonomous agent that needs to navigate complex web pages, write complex Python scripts, and reason through multi-step workflows. Which model should you choose?**
A) Claude 3 Haiku
B) Claude 3.5 Sonnet (or Opus, depending on exact complex reasoning needs, but 3.5 Sonnet is optimized for advanced coding and agentic tasks)
C) Claude Instant
D) Claude 2.0

**43. A client has a fixed, low budget for an application that summarizes thousands of short customer reviews daily. Which model optimizes for cost while maintaining basic summarization quality?**
A) Claude 3 Opus
B) Claude 3.5 Sonnet
C) Claude 3 Haiku
D) Claude 1.3

**44. You need to process a massive 150k-token legal document in a single prompt. Which feature is critical when selecting the model?**
A) High temperature support.
B) A context window of at least 200k tokens (supported by the Claude 3 family).
C) Image processing capabilities.
D) Fine-tuning availability.

**45. Your application needs to analyze charts and graphs from a PDF report. Which capability must the selected model possess?**
A) Text-to-speech.
B) Multimodal (Vision) capabilities, present in the Claude 3 family.
C) Audio processing.
D) Web browsing.

**46. You are migrating an application from Claude 2 to Claude 3. What is a key architectural change you might need to make regarding prompts?**
A) Claude 3 requires XML formatting for everything.
B) Claude 3 models utilize a System Prompt API parameter, whereas Claude 2 relied entirely on `\n\nHuman:` and `\n\nAssistant:` formatting.
C) Claude 3 has a smaller context window.
D) Claude 3 does not support English.

**47. When deciding between Sonnet and Opus for a highly complex logical reasoning task, what is the primary trade-off? (Select TWO)**
A) Sonnet is faster.
B) Opus is generally more capable at the absolute most complex edge-case reasoning tasks.
C) Opus is cheaper.
D) Sonnet has a larger context window than Opus.
E) Opus supports vision, but Sonnet does not.

### Domain 6: Configuration & Knowledge Management
**48. You are configuring a RAG pipeline. Which embedding strategy is best for retrieving precise technical definitions?**
A) Chunking documents into large 2000-token blocks.
B) Chunking documents into smaller, semantically meaningful blocks (e.g., 200-500 tokens) with overlap.
C) Embedding entire books as single vectors.
D) Using random chunking.

**49. What role does the `temperature` parameter play in model configuration?**
A) It controls the length of the output.
B) It controls the randomness of the output; higher values produce more diverse responses, lower values produce more deterministic responses.
C) It controls the context window size.
D) It controls the API latency.

**50. You want Claude to strictly output only valid JSON and nothing else. Which configuration parameter is most helpful in the Anthropic API?**
A) `top_p`
B) `max_tokens`
C) System prompts combined with pre-filling the Assistant message with `{`.
D) `temperature = 1`

**51. In a knowledge management system, how often should you update the vector database for your RAG application?**
A) Never, once populated it is static.
B) Whenever the underlying source documents (the knowledge base) change, to ensure Claude retrieves the most current information.
C) Every time a user asks a question.
D) Annually.

**52. What is the purpose of the `top_k` parameter?**
A) It limits the model to only sample from the top K most probable next tokens.
B) It increases the length of the response.
C) It selects the top K documents in a RAG search.
D) It sets the maximum number of API calls per minute.

**53. You are configuring a system prompt for a specialized medical assistant. What information should be included in the system prompt? (Select TWO)**
A) The user's specific medical question.
B) The persona and role of the assistant (e.g., "You are a helpful medical assistant...").
C) Strict guidelines on what the assistant can and cannot say (e.g., "Do not diagnose...").
D) The entire medical textbook.
E) The user's password.

**54. How do you handle conversational history in the Anthropic Messages API?**
A) The API remembers everything automatically.
B) You must append previous user and assistant turns to the `messages` array in every new API request.
C) You store it in a SQL database and never send it to the API.
D) You put it all in the system prompt.

### Domain 7: Troubleshooting & Optimization
**55. Your Claude application is experiencing high latency (over 10 seconds per response). You are using Claude 3 Opus. What is the most effective optimization to reduce perceived latency for the user?**
A) Switch to a larger model.
B) Implement HTTP streaming so the user sees text generating in real-time, rather than waiting for the entire response.
C) Increase the `max_tokens` limit.
D) Add more few-shot examples.

**56. Claude consistently fails to follow a specific instruction buried in the middle of a 3-page prompt. How should you troubleshoot this?**
A) Increase the temperature.
B) Move the critical instruction to the very end of the prompt (recency bias) or put it in the System Prompt.
C) Delete the instruction.
D) Use a smaller model.

**57. Your automated tool use (function calling) agent gets stuck in a loop, repeatedly calling the same function with the same arguments. What is the best programmatic fix?**
A) Yell at the model in the prompt.
B) Implement a loop-detection mechanism in your application logic that forcefully terminates or alters the prompt after N identical tool calls.
C) Increase the `top_p` setting.
D) Switch to a non-tool-use model.

**58. You are optimizing a prompt to reduce token costs. Which of the following is a viable strategy? (Select TWO)**
A) Remove unnecessary conversational filler and polite phrases from the prompt.
B) Replace clear instructions with vague hints.
C) Use XML tags effectively to structure data compactly.
D) Increase the temperature.
E) Provide 100 few-shot examples.

**59. A RAG system returns irrelevant answers. You check the prompt and it is fine. Where is the bottleneck likely located, and how do you troubleshoot it?**
A) The LLM is hallucinating; switch models.
B) The retrieval pipeline is failing; inspect the top-K retrieved documents for a given query to see if they actually contain the answer.
C) The temperature is too low.
D) The API key is invalid.

**60. Users report that Claude occasionally cuts off mid-sentence. What configuration parameter should you check first?**
A) `temperature`
B) `top_k`
C) `max_tokens` (ensure it is set high enough to accommodate the expected response length).
D) `stop_sequences`

---

## Answer Key and Explanations

1. **B** - Comparing against a golden dataset with an automated evaluator allows for systematic, reproducible testing of recall on obscure clauses.
2. **B** - LLM-as-a-judge is prone to self-enhancement bias, where it prefers answers written in its own style over those that might be objectively better or preferred by human experts.
3. **B, D** - If it works for early examples but fails on later ones, the later ones might be more complex edge cases (D) that lack representation in the few-shot examples (B).
4. **B** - BLEU score is purely based on word overlap and struggles to capture the semantic nuance and readability required when translating medical jargon into plain English. (Replaced Flesch-Kincaid explanation). Wait, readability is actually useful. BLEU is the least useful.
5. **A** - Self-reflection requires additional API calls (generating the text, then generating a critique/correction), which increases latency and cost.
6. **B** - Prompting an LLM with clear rubrics to score relevance is a standard and effective way to automate RAG evaluation (often called LLM-as-a-judge).
7. **B** - A regex or semantic check can flag refusal outputs. Analyzing these helps identify if your prompts are triggering false-positive safety interventions.
8. **B** - While prompts can help, strict application-side schema validation (like Pydantic or JSON Schema) is the only way to guarantee the application doesn't break from malformed output.
9. **B** - Unit tests only check correctness. To evaluate efficiency, you must include performance constraints in the prompt and benchmark the execution time/memory of the generated code.
10. **B** - The model itself doesn't change based on environment. Discrepancies are almost always due to differences in prompt construction, RAG retrieval data, or API parameters across environments.
11. **A** - Red teaming involves actively trying to break the model using a diverse set of adversarial inputs to test its robustness.
12. **B** - Persona consistency requires evaluating the entire transcript context, and an LLM-as-a-judge with a rubric is scalable for this task.
13. **A** - Strict instructions against hallucination combined with human-in-the-loop review for high-risk applications is the standard governance approach.
14. **B** - Real-time voice requires extreme low latency. Streaming outputs and optimizing the audio pipelines are the primary architectural concerns.
15. **B** - An asynchronous queue ensures the CRM frontend isn't blocked while waiting for the LLM API, providing a better user experience and handling retries gracefully.
16. **B** - Tool Use (Function Calling) allows the LLM to delegate tasks it cannot do (like running code or querying DBs) to external systems reliably.
17. **A** - Searching millions of documents requires a vector database optimized for ANN search to quickly retrieve relevant context.
18. **A, C** - Map-Reduce (summarize chunks, then summarize summaries) and sliding windows are standard architectural patterns for handling text that exceeds context windows.
19. **B** - For healthcare (HIPAA), data privacy is paramount. De-identification pipelines must sit between the data source and the external API.
20. **B** - Context window limits and cost mean you shouldn't send the whole codebase. Retrieval (RAG/search) ensures only relevant code is sent.
21. **B** - 429 errors mean you hit a rate limit. Exponential backoff and retries are the standard architectural pattern for handling this gracefully.
22. **B** - A multi-step pipeline separates concerns, allowing the model to focus on one grading aspect at a time, leading to more reliable and consistent overall evaluation.
23. **B** - RAG is the standard pattern for QA over private knowledge bases, combining retrieval from a vector store with generation.
24. **B** - If bias is detected, pause and audit. Refining instructions to mandate objective criteria is a key mitigation step.
25. **A** - Constitutional AI is Anthropic's foundational safety training that makes Claude inherently resistant to jailbreaks and harmful outputs.
26. **B** - Financial advice requires strict disclaimers and human oversight to mitigate liability and regulatory risk.
27. **B** - A DLP layer physically redacts PII before the data ever leaves your network, guaranteeing it isn't sent to the API.
28. **B** - Constitutional AI uses a set of principles to train the model to be helpful, harmless, and honest without relying solely on human feedback.
29. **B** - Never give an LLM agent unconstrained access. Sandboxing (containers/VMs) is critical to prevent malicious or accidental system damage.
30. **C** - RAG forces the model to rely on verified external documents rather than its potentially flawed internal parametric memory, reducing hallucinations.
31. **B** - Prompt injection is when user input is crafted to override the developer's system instructions.
32. **A, B** - Using distinct System/User roles and delimiters (like XML tags) helps the model distinguish between developer instructions and untrusted user data.
33. **B** - Defining schemas and providing exact few-shot examples is the most reliable way to enforce strict formatting.
34. **B** - Chain-of-Thought (CoT) prompting forces the model to break down the problem, significantly improving logical reasoning.
35. **C** - Due to recency bias, placing the question at the very end of a long document ensures the model pays maximum attention to it.
36. **B** - Providing specific constraints and structural requirements guides the model's output more effectively than vague instructions.
37. **B** - XML tags provide clear structural boundaries in the text, making it easier for Claude to parse complex prompts.
38. **B** - Conditional logic in the prompt allows the model to handle diverse inputs gracefully based on predefined rules.
39. **B** - Pre-filling the assistant's response forces the model to continue from that point, eliminating introductory filler text.
40. **B** - Detailed definitions and diverse few-shot examples provide the necessary guidance for consistent entity extraction across many documents.
41. **C** - Haiku is optimized for speed and cost, making it ideal for simple, real-time tasks.
42. **B** - Claude 3.5 Sonnet is highly capable at agentic workflows, coding, and complex tool use.
43. **C** - Haiku is the most cost-effective model in the Claude 3 family, perfect for high-volume, simpler tasks like summarization.
44. **B** - The Claude 3 family supports a 200k context window, which is necessary for a 150k-token document.
45. **B** - Analyzing charts requires Multimodal (Vision) capabilities.
46. **B** - Claude 3 uses the Messages API with a dedicated `system` parameter, unlike Claude 2's reliance on prompt formatting.
47. **A, B** - Sonnet is generally faster (A), while Opus excels at the absolute most complex reasoning tasks (B). Both have 200k context windows and vision.
48. **B** - Smaller, semantically meaningful chunks provide precise context for retrieval, whereas huge chunks dilute the relevance.
49. **B** - Temperature controls randomness. Low temperature = deterministic, High temperature = creative/random.
50. **C** - Pre-filling the assistant message with `{` forces the model to start generating JSON immediately, preventing conversational filler.
51. **B** - The vector database must be kept in sync with the underlying knowledge base to remain accurate.
52. **A** - `top_k` restricts the model's token selection to the K most probable next tokens, affecting output diversity.
53. **B, C** - System prompts should contain the persona/role (B) and strict behavioral guidelines (C). User queries go in the user message.
54. **B** - The API is stateless. You must maintain and pass the conversational history in the `messages` array with each request.
55. **B** - Streaming reduces *perceived* latency because the user can start reading immediately, even if the total generation time is the same.
56. **B** - Moving critical instructions to the end leverages recency bias, or placing them in the System Prompt ensures they are heavily weighted.
57. **B** - Programmatic loop detection is necessary to catch and break infinite loops in autonomous agents.
58. **A, C** - Removing filler (A) and using compact structures like XML (C) reduces input tokens, lowering costs.
59. **B** - If the prompt is fine, the RAG retrieval step is likely returning the wrong documents. You must inspect the retrieved chunks.
60. **C** - If the response cuts off mid-sentence, the model likely hit the `max_tokens` limit before finishing.
