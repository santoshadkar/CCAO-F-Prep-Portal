# Practice Exam 1 – Claude Certified Associate Foundations (CCAO-F)
**Time Limit: 120 minutes | 60 Questions | Passing Score: 720/1000**

*(Domain: Output Evaluation & Validation)*
1. A marketing team is using Claude to generate ad copy. They notice that Claude occasionally invents statistics about product performance. What is the BEST immediate action to validate the output? (Select ONE)
A) Increase the temperature parameter.
B) Provide a strict system prompt instructing Claude to cite only the provided source documents.
C) Switch to a smaller, faster model.
D) Use a regex filter on the output.

*(Domain: Output Evaluation & Validation)*
2. A legal analyst uses Claude to summarize contracts. They need to verify that Claude isn't omitting liability clauses. Which evaluation technique is most appropriate? (Select TWO)
A) Automated BLEU score comparison.
B) Human-in-the-loop random sampling of summaries against original texts.
C) Prompting Claude to extract liability clauses separately and comparing with the summary.
D) Checking the latency of the model's response.
E) Asking Claude if it missed anything.

*(Domain: Output Evaluation & Validation)*
3. A financial services company uses Claude to parse earnings reports. The output format occasionally deviates from the requested JSON schema. How should they validate the schema programmatically? (Select ONE)
A) Use a JSON schema validator in the application pipeline before accepting the output.
B) Have a human review every JSON output.
C) Prompt Claude to validate its own JSON.
D) Change the temperature to 1.0.

*(Domain: Output Evaluation & Validation)*
4. You are assessing a customer support bot powered by Claude. Customers complain the bot is sometimes overly apologetic. Which metric best captures this issue? (Select ONE)
A) Factuality score.
B) Tone and style adherence.
C) BLEU score.
D) Token count.

*(Domain: Output Evaluation & Validation)*
5. A medical researcher uses Claude to extract patient symptoms from notes. They must ensure zero hallucinations. Which prompt engineering technique helps validation? (Select TWO)
A) Asking Claude to output a chain of thought before the final answer.
B) Setting the top_p parameter to 0.99.
C) Instructing Claude to include exact quotes from the text for every symptom.
D) Decreasing the max tokens parameter.
E) Using a conversational format.

*(Domain: Output Evaluation & Validation)*
6. You notice Claude's summarization of an internal wiki page is outdated. What is the most likely cause? (Select ONE)
A) The model's training data cutoff date precedes the wiki updates, and the prompt didn't include the new text.
B) The temperature is too low.
C) The context window is too small.
D) Claude cannot summarize wiki pages.

*(Domain: Output Evaluation & Validation)*
7. When evaluating Claude's performance on a translation task, the team wants to use a metric that correlates well with human judgment. Which of the following is an automated metric often used for this? (Select ONE)
A) ROUGE
B) BLEU
C) Exact Match
D) F1 Score

*(Domain: Output Evaluation & Validation)*
8. A developer is building a code-generation assistant. They want to evaluate the correctness of the generated Python functions. What is the most robust validation method? (Select TWO)
A) Prompting Claude to rate its own code.
B) Executing the code against a suite of unit tests.
C) Performing static code analysis (linting) on the output.
D) Counting the lines of code.
E) Checking if the code contains comments.

*(Domain: Output Evaluation & Validation)*
9. You are tasked with validating Claude's ability to classify support tickets. You have a labeled dataset of 1,000 tickets. What is the standard approach to measure accuracy? (Select ONE)
A) Run Claude on all 1,000 tickets and compare its output to the labels to calculate Precision, Recall, and F1.
B) Read 10 random outputs and if they look good, deploy it.
C) Ask Claude how confident it is in its classifications.
D) Measure the time it takes to classify all tickets.

*(Domain: Output Evaluation & Validation)*
10. A user reports that Claude's response contains biased language against a specific demographic. What is the primary step in evaluating this claim? (Select ONE)
A) Immediately delete the application.
B) Review the prompt and context provided to Claude to see if the bias was induced.
C) Switch to a different LLM provider.
D) Increase the token limit.

*(Domain: Output Evaluation & Validation)*
11. An HR team uses Claude to draft job descriptions. They want to ensure the tone aligns with company culture. Which validation method is best? (Select TWO)
A) Human review against a brand guideline checklist.
B) Automated spelling checks.
C) Using a secondary prompt to Claude asking it to evaluate the tone against the guidelines.
D) Measuring API latency.
E) Checking the character count.

*(Domain: Output Evaluation & Validation)*
12. Claude is used to extract data into a CSV format. Sometimes it includes conversational filler like "Here is your CSV:" before the data. How can you reliably extract just the CSV data? (Select ONE)
A) Parse the output using regex to find the CSV block.
B) Tell Claude "DO NOT say 'Here is your CSV'."
C) Use XML tags in the prompt to ask Claude to put the CSV inside specific tags, then parse for those tags.
D) Set temperature to 0.

*(Domain: Output Evaluation & Validation)*
13. You are building an evaluation pipeline for a Q&A bot. What is the benefit of using an "LLM-as-a-judge" approach? (Select ONE)
A) It is cheaper than traditional string matching.
B) It can evaluate nuanced qualities like helpfulness and relevance that are hard to capture with strict string matching.
C) It guarantees 100% accuracy in evaluation.
D) It is faster than calculating a BLEU score.

*(Domain: Workflow Integration & Solution Design)*
14. An enterprise wants to use Claude to answer questions based on a massive internal knowledge base (50GB of PDFs). What is the recommended architectural pattern? (Select ONE)
A) Fine-tune Claude on the 50GB of PDFs.
B) Put all 50GB into Claude's context window.
C) Implement Retrieval-Augmented Generation (RAG) by chunking the PDFs, storing embeddings in a vector database, and retrieving relevant chunks at runtime.
D) Write a prompt that summarizes the 50GB of text.

*(Domain: Workflow Integration & Solution Design)*
15. A customer service application needs to route incoming emails to different departments using Claude. Which integration approach provides the most predictable output for the routing system? (Select TWO)
A) Asking Claude to output free-text reasons for the routing.
B) Providing Claude with a predefined list of valid department names and instructing it to output ONLY the department name.
C) Using function calling (tool use) to force Claude to output structured JSON matching the routing function's schema.
D) Setting max_tokens to 1000.
E) Using a temperature of 1.5.

*(Domain: Workflow Integration & Solution Design)*
16. A company wants to build a multi-step agent that can research a topic, write a draft, and then critique its own draft. How should this be orchestrated? (Select ONE)
A) As a single prompt asking Claude to do all three steps at once.
B) As a sequential chain of prompts where the output of one step is passed as input to the next step.
C) By using three different LLM providers.
D) By increasing the context window.

*(Domain: Workflow Integration & Solution Design)*
17. You are designing a system that uses Claude to summarize real-time meeting transcripts. Transcripts arrive in chunks every 10 seconds. How should you design the summarization workflow? (Select ONE)
A) Send each 10-second chunk to Claude independently for a summary.
B) Wait until the meeting ends, then send the full transcript for a single summary.
C) Maintain a rolling summary by passing the previous summary and the new chunk to Claude in each API call.
D) Fine-tune the model every 10 seconds.

*(Domain: Workflow Integration & Solution Design)*
18. An application needs Claude to look up the current weather. How should you design this? (Select TWO)
A) Prompt Claude to guess the weather.
B) Give Claude a tool (function) definition for `get_weather(location)` and execute the tool on your backend when Claude requests it.
C) Connect Claude directly to the internet.
D) Fetch the weather on your backend before calling Claude, and inject it into the prompt if the user asks about weather.
E) Tell the user Claude cannot do this.

*(Domain: Workflow Integration & Solution Design)*
19. A data pipeline uses Claude to extract entities from millions of tweets per day. Cost and speed are critical. Which model choice is most appropriate for this specific extraction step? (Select ONE)
A) Claude 3 Opus
B) Claude 3 Haiku
C) Claude 2.1
D) Claude 3.5 Sonnet

*(Domain: Workflow Integration & Solution Design)*
20. You are designing a document processing pipeline. Some documents contain sensitive PII. How should you handle the PII before sending it to Claude via API? (Select ONE)
A) Rely on Claude to redact the PII in its output.
B) Pre-process the documents locally to redact or mask PII before sending the text to the API.
C) Put a warning in the prompt not to read the PII.
D) Encrypt the PII with a key Claude doesn't have.

*(Domain: Workflow Integration & Solution Design)*
21. A system uses Claude to generate SQL queries from natural language. What is a crucial security design consideration? (Select TWO)
A) Execute the generated SQL query with root privileges.
B) Execute the generated SQL query in a read-only database environment.
C) Validate the SQL query string for destructive commands (e.g., DROP, DELETE) before execution.
D) Display the SQL query directly to the end user without formatting.
E) Ask Claude if the query is safe.

*(Domain: Workflow Integration & Solution Design)*
22. When designing a conversational interface with Claude, how should you manage chat history? (Select ONE)
A) Send only the latest user message to save tokens.
B) Send the entire conversation history in every API call, appending the new user message.
C) Claude remembers the history automatically across stateless API calls.
D) Store the history in a vector database and retrieve it using RAG.

*(Domain: Workflow Integration & Solution Design)*
23. Your app needs to handle cases where Claude's API returns a rate limit error (429). What is the best practice? (Select ONE)
A) Crash the application and alert the user.
B) Switch immediately to a competitor's API.
C) Implement exponential backoff and retry logic in your application.
D) Send an email to Anthropic support.

*(Domain: Governance Risk & Responsible Use)*
24. A healthcare startup wants to use Claude to diagnose rare diseases based on patient symptoms. What is the most significant responsible AI risk in this scenario? (Select ONE)
A) Claude might use too many tokens.
B) Claude might hallucinate a diagnosis, leading to patient harm.
C) The API might have high latency.
D) The model might refuse to answer in French.

*(Domain: Governance Risk & Responsible Use)*
25. To mitigate the risk of harmful outputs in an employee-facing HR chatbot, which governance strategies should be implemented? (Select TWO)
A) A strict "System Prompt" guiding the bot's behavior and constraints.
B) Disabling the API during weekends.
C) Logging all interactions for periodic audit and review.
D) Making the chatbot anonymous.
E) Using the oldest available model.

*(Domain: Governance Risk & Responsible Use)*
26. You discover that users are attempting prompt injection attacks to make your Claude-powered customer service bot use profanity. What is a recommended defense? (Select ONE)
A) Wrap the user's input in XML tags and instruct Claude to treat the content within the tags purely as data, not instructions.
B) Ban all users who use exclamation marks.
C) Ask Claude nicely not to curse.
D) Use a model with a smaller context window.

*(Domain: Governance Risk & Responsible Use)*
27. A financial institution uses Claude to evaluate loan applications. What is a primary regulatory compliance concern? (Select ONE)
A) The model might be too slow for real-time processing.
B) The model's decision-making process is a "black box" and may exhibit unexplainable bias, violating fair lending laws.
C) The context window might not fit the whole application.
D) JSON formatting might be incorrect.

*(Domain: Governance Risk & Responsible Use)*
28. When building an application that handles user-generated content, how should you handle potential copyright infringement in Claude's outputs? (Select TWO)
A) Use prompt engineering to instruct Claude to synthesize information rather than quote verbatim from external sources.
B) Ignore it, as AI output cannot be copyrighted.
C) Implement a post-generation filter that checks output against a database of known copyrighted material.
D) Sue the users.
E) Only use Claude 2.0.

*(Domain: Governance Risk & Responsible Use)*
29. Anthropic's Constitutional AI approach involves: (Select ONE)
A) Hardcoding ethical rules in Python.
B) Training the model to evaluate and revise its own outputs based on a set of principles (a "constitution").
C) Having human lawyers review every output.
D) Encrypting the model weights.

*(Domain: Governance Risk & Responsible Use)*
30. A company wants to use Claude to review employee emails for signs of dissatisfaction. What ethical principle does this most directly challenge? (Select ONE)
A) Transparency
B) Privacy
C) Robustness
D) Environmental Sustainability

*(Domain: Governance Risk & Responsible Use)*
31. What is a "jailbreak" in the context of LLMs? (Select ONE)
A) Deploying the model on premise.
B) A prompt engineering technique used to bypass the model's safety guardrails and generate prohibited content.
C) Exceeding the context window limit.
D) Getting free API credits.

*(Domain: Governance Risk & Responsible Use)*
32. Which of the following is a best practice for maintaining transparency with end users interacting with a Claude-powered system? (Select TWO)
A) Clearly disclosing that the user is interacting with an AI system.
B) Pretending the AI is a human named "Steve".
C) Providing a way for users to report inappropriate outputs or errors.
D) Hiding the AI's limitations to build trust.
E) Using highly technical jargon to explain how the AI works.

*(Domain: Prompting & Task Execution)*
33. You want Claude to extract names and email addresses from a messy text and output them as a list of JSON objects. Which prompting technique will yield the most reliable format? (Select ONE)
A) Give Claude a zero-shot prompt asking for JSON.
B) Provide a few-shot prompt containing 2-3 examples of the exact input text and the desired JSON output format.
C) Ask Claude to explain what JSON is before extracting.
D) Use a high temperature.

*(Domain: Prompting & Task Execution)*
34. A user complains that Claude's summary of a long article is too generic. How can you improve the prompt to get a more specific summary? (Select TWO)
A) Change "Summarize this article" to "Summarize this article, focusing specifically on the financial impact and the timeline of events."
B) Add "Think step-by-step" to the prompt.
C) Ask Claude to pretend to be a financial analyst when summarizing.
D) Reduce the max_tokens to 50.
E) Put the article text before the instructions.

*(Domain: Prompting & Task Execution)*
35. When structuring a prompt with a large amount of context (e.g., a 10-page document), where should the actual instruction (the task) be placed for optimal instruction following? (Select ONE)
A) At the very beginning, before the document text.
B) In the middle of the document text.
C) At the very end, after the document text.
D) It doesn't matter.

*(Domain: Prompting & Task Execution)*
36. You ask Claude a complex logic puzzle and it gets the answer wrong. What prompt engineering technique is most likely to help it arrive at the correct answer? (Select ONE)
A) "Answer immediately."
B) "Let's think step by step before giving the final answer."
C) "You are an expert puzzle solver."
D) "Output in XML."

*(Domain: Prompting & Task Execution)*
37. You want Claude to write a poem, but it must strictly NOT use the letter 'e'. Claude struggles with this constraint. How can you prompt it to improve performance? (Select TWO)
A) Add a system prompt: "You are an AI that never uses the letter 'e'."
B) Ask Claude to first generate a draft, then review its own draft to find and replace any words with 'e'.
C) Tell Claude to output the poem as a base64 encoded string.
D) Provide examples of poems without the letter 'e'.
E) Increase the context window.

*(Domain: Prompting & Task Execution)*
38. What is the purpose of using XML tags (like `<context>`, `<instructions>`, `<output>`) in a prompt for Claude? (Select ONE)
A) Claude parses them as HTML to render a web page.
B) They help structure the prompt, clearly delineating different parts of the input, which Claude has been trained to understand.
C) They encrypt the prompt.
D) They reduce the token count.

*(Domain: Prompting & Task Execution)*
39. You need Claude to classify a review as Positive, Negative, or Neutral. You want to ensure it ONLY outputs the category name and absolutely nothing else. Which instruction is most effective? (Select ONE)
A) "Please only output the category."
B) "Classify this review. The options are Positive, Negative, Neutral. Output only the exact word of the category and no other text or punctuation."
C) "What is the sentiment? Positive, Negative, or Neutral?"
D) "Give me the category in JSON."

*(Domain: Prompting & Task Execution)*
40. What is "few-shot prompting"? (Select ONE)
A) Giving the model only a few seconds to respond.
B) Providing a small number of examples (input-output pairs) in the prompt to demonstrate the desired behavior.
C) Using a very short prompt.
D) Prompting the model multiple times until it gets the answer right.

*(Domain: Product & Model Selection)*
41. A developer is building a code-completion tool that needs to operate with sub-second latency to feel responsive to the user. Which Claude model is the best fit? (Select ONE)
A) Claude 3 Opus
B) Claude 3.5 Sonnet
C) Claude 3 Haiku
D) Claude 2.0

*(Domain: Product & Model Selection)*
42. A law firm needs an AI to analyze highly complex, multi-layered legal contracts and formulate novel legal strategies. Cost and latency are secondary to reasoning capability. Which model should they choose? (Select ONE)
A) Claude 3 Haiku
B) Claude 3.5 Sonnet
C) Claude 3 Opus
D) Claude Instant 1.2

*(Domain: Product & Model Selection)*
43. You are designing a RAG system. The context retrieved from the vector database is often around 150,000 tokens long. Which model family supports this context size? (Select TWO)
A) Claude 2.1
B) Claude 3 family (Haiku, Sonnet, Opus)
C) Claude 1.3
D) Claude Instant 1.1
E) None of the above.

*(Domain: Product & Model Selection)*
44. A startup wants a highly capable model for general text generation and coding tasks, striking a balance between high intelligence and manageable cost/speed. Which model is generally positioned as the balanced workhorse? (Select ONE)
A) Claude 3 Haiku
B) Claude 3.5 Sonnet
C) Claude 3 Opus
D) Claude 2.0

*(Domain: Product & Model Selection)*
45. Your application requires analyzing images of charts and graphs alongside textual data. Which Anthropic models possess vision capabilities? (Select TWO)
A) Claude 2.1
B) Claude 3 Haiku
C) Claude 3.5 Sonnet
D) Claude Instant 1.2
E) Claude 1.3

*(Domain: Product & Model Selection)*
46. A user needs to process 10,000 short product descriptions per hour to tag them with categories. Which factor most strongly points towards using Claude 3 Haiku over Opus? (Select ONE)
A) Haiku's superior complex reasoning.
B) Haiku's lower cost per token and higher speed.
C) Haiku's larger context window.
D) Haiku's ability to browse the internet.

*(Domain: Product & Model Selection)*
47. Which of the following best describes the Claude API pricing model? (Select ONE)
A) Flat monthly subscription regardless of usage.
B) Pay-per-API call, regardless of prompt length.
C) Pay based on the number of input tokens and output tokens processed.
D) Pay based on the compute time (in seconds) the model takes to generate the response.

*(Domain: Configuration & Knowledge Management)*
48. In the Messages API, what role should be used to provide overarching instructions or personas that persist across the conversation? (Select ONE)
A) user
B) assistant
C) system
D) admin

*(Domain: Configuration & Knowledge Management)*
49. You are implementing RAG. Which of the following is an essential component for translating text into a mathematical representation that can be stored in a vector database? (Select ONE)
A) A summarization model.
B) An embedding model.
C) A translation model.
D) A spell-checker.

*(Domain: Configuration & Knowledge Management)*
50. When configuring the API request, which parameter controls the maximum length of the generated response? (Select TWO)
A) max_tokens
B) max_tokens_to_sample
C) temperature
D) top_p
E) context_window

*(Domain: Configuration & Knowledge Management)*
51. What is the effect of setting the `temperature` parameter to 0.0? (Select ONE)
A) The model becomes highly creative and random.
B) The model outputs the most likely next token, making responses highly deterministic and focused.
C) The model responds faster.
D) The model refuses to answer.

*(Domain: Configuration & Knowledge Management)*
52. A developer wants Claude to stop generating text as soon as it outputs a specific HTML tag (e.g., `</html>`). Which API parameter should they configure? (Select ONE)
A) stream
B) stop_sequences
C) top_k
D) system

*(Domain: Configuration & Knowledge Management)*
53. In a conversational application, how do you represent the AI's previous responses in the API request array? (Select ONE)
A) With the role "system".
B) With the role "user".
C) With the role "assistant".
D) With the role "claude".

*(Domain: Configuration & Knowledge Management)*
54. You are building a knowledge base for a RAG system using 500-page manuals. Why is "chunking" the documents necessary before creating embeddings? (Select TWO)
A) Because embedding models have token limits per request.
B) Because retrieving a whole 500-page manual would overflow the LLM's context window or dilute the specific information needed.
C) Because chunking makes the LLM more creative.
D) Because vector databases can only store 100 bytes per record.
E) Because it bypasses copyright laws.

*(Domain: Troubleshooting & Optimization)*
55. A RAG application is frequently providing incorrect answers ("hallucinating"), even though the correct information is in the knowledge base. Upon debugging, you find the retrieved chunks are irrelevant to the user's query. What is the most likely area to troubleshoot? (Select ONE)
A) The LLM's temperature setting.
B) The chunking strategy and embedding search pipeline.
C) The system prompt.
D) The max_tokens setting.

*(Domain: Troubleshooting & Optimization)*
56. Claude is occasionally refusing to answer benign questions about historical battles, citing safety concerns. What is this phenomenon called, and how can it be addressed? (Select TWO)
A) Over-refusal.
B) Jailbreaking.
C) Address by adjusting the prompt to clearly state the educational/historical context.
D) Address by increasing the temperature to 1.0.
E) Address by switching to an embedding model.

*(Domain: Troubleshooting & Optimization)*
57. Your API calls to Claude are sporadically failing with a 500 Internal Server Error. How should your application handle this? (Select ONE)
A) Prompt the user to retype their message.
B) Implement exponential backoff and retry the request.
C) Assume the prompt was unsafe and block the user.
D) Switch to a different role.

*(Domain: Troubleshooting & Optimization)*
58. A prompt that worked perfectly on Claude 2.1 is performing poorly on Claude 3.5 Sonnet. What is the recommended troubleshooting step? (Select ONE)
A) Downgrade back to Claude 2.1 immediately and forever.
B) Review and update the prompt; models respond differently, and Claude 3 often requires less verbose prompting and handles instructions differently than older models.
C) Increase the temperature.
D) Add more examples of failures to the prompt.

*(Domain: Troubleshooting & Optimization)*
59. You notice that providing 20 examples in a few-shot prompt is causing high latency and high costs. What is a valid optimization strategy? (Select TWO)
A) Reduce the number of examples to the 3-5 most diverse and representative ones.
B) Move the examples to a vector database and dynamically retrieve only the top 2 most relevant examples for each query (Dynamic Few-Shot).
C) Set temperature to 0.
D) Ask Claude to generate its own examples.
E) Use XML tags.

*(Domain: Troubleshooting & Optimization)*
60. A user's query results in an incomplete JSON response from Claude, cutting off mid-string. What is the most likely cause? (Select ONE)
A) The model forgot JSON syntax.
B) The `max_tokens` limit was reached before the generation completed.
C) The prompt was not in English.
D) The model experienced a hallucination.

---

## ANSWER KEY

**1. B**
Explanation: Providing a strict system prompt instructing Claude to cite sources bounds the model to the provided context, directly mitigating hallucinations. Changing temperature or model size doesn't address the root cause of inventing facts as effectively as strict grounding instructions.

**2. B, C**
Explanation: Human-in-the-loop (B) is essential for validating complex legal nuances like omissions. Prompting Claude to extract specific clauses (C) allows you to compare the extraction against the summary to spot inconsistencies. Automated metrics like BLEU do not understand legal semantic meaning.

**3. A**
Explanation: Programmatic validation requires a deterministic tool like a JSON schema validator (A) in the pipeline. Human review is not programmatic. Asking the LLM to validate itself is circular and unreliable.

**4. B**
Explanation: Being "overly apologetic" is a stylistic and tonal issue, not a factuality (A) or accuracy issue. Metrics evaluating tone and style adherence (B) are best suited here.

**5. A, C**
Explanation: Chain of thought (A) allows the model to reason through the notes before extracting, reducing errors. Instructing exact quotes (C) grounds the extraction in the text, preventing invented symptoms.

**6. A**
Explanation: LLMs have a knowledge cutoff date. If the wiki was updated after the model's training data cutoff and the new text wasn't provided in the prompt (RAG), the model will rely on outdated internal knowledge.

**7. B**
Explanation: BLEU (Bilingual Evaluation Understudy) is the industry-standard automated metric traditionally used for evaluating machine translation by comparing n-gram overlaps with human reference translations.

**8. B, C**
Explanation: For code generation, functional testing (executing against unit tests - B) and static analysis (linting - C) are the most robust, deterministic ways to evaluate correctness. Asking the LLM to rate itself is unreliable.

**9. A**
Explanation: Standard classification evaluation involves running the model on the full labeled dataset and calculating precision, recall, and F1 scores by comparing predictions to the ground truth labels.

**10. B**
Explanation: Before assuming the model is inherently biased, you must inspect the prompt and context (B). Often, biased phrasing or skewed context provided in the prompt can induce biased outputs.

**11. A, C**
Explanation: Human review against guidelines (A) is the gold standard for subjective qualities like tone. Using an LLM-as-a-judge (C) by prompting Claude to evaluate the tone against the guidelines is a scalable automated approach.

**12. C**
Explanation: Using XML tags (C) to frame the output gives you a reliable anchor to parse out the structured data, ignoring conversational filler. Telling it "not to" (B) can sometimes backfire (negative constraints are harder for LLMs).

**13. B**
Explanation: "LLM-as-a-judge" excels at evaluating subjective, semantic qualities (like helpfulness or relevance) that strict string matching or traditional metrics (BLEU/ROUGE) fail to capture.

**14. C**
Explanation: RAG (Retrieval-Augmented Generation) is the standard architectural pattern for answering questions over a large corpus that exceeds the context window, without the high cost and complexity of fine-tuning.

**15. B, C**
Explanation: Providing a strict list (B) helps bound the output. Function calling/tool use (C) is designed specifically to force the model into outputting structured, predictable data (like JSON) suitable for system routing.

**16. B**
Explanation: A sequential chain (B) allows the model to focus on one discrete task at a time (research -> draft -> critique), generally yielding higher quality results than asking it to do complex, multi-stage reasoning in a single prompt.

**17. C**
Explanation: Passing the previous summary along with the new chunk (C) maintains a continuous context and produces a rolling summary for streaming data.

**18. B, D**
Explanation: Tool use/Function calling (B) allows Claude to request the weather, which your backend fetches. Alternatively, you can pre-fetch (D) the weather and inject it into the prompt. Claude cannot directly browse the internet autonomously (C).

**19. B**
Explanation: Claude 3 Haiku is designed to be the fastest and most cost-effective model, making it ideal for high-volume, simple data extraction tasks where speed and cost are critical.

**20. B**
Explanation: For sensitive PII, the safest architecture is to pre-process and mask/redact the data locally (B) before it ever leaves your network to hit an external API.

**21. B, C**
Explanation: Executing AI-generated SQL requires strict security. It should be run in a read-only environment (B) and strictly validated for destructive commands (C) to prevent SQL injection or accidental data loss.

**22. B**
Explanation: The Claude API is stateless. To maintain a conversation, you must send the entire conversation history (alternating user/assistant messages) in every new API call.

**23. C**
Explanation: A 429 means you are sending requests too quickly. The standard engineering practice is to implement exponential backoff and retry logic (C) to pace your requests appropriately.

**24. B**
Explanation: In healthcare, hallucinated medical advice (B) is a critical safety risk that can lead to severe real-world harm.

**25. A, C**
Explanation: A strict System Prompt (A) sets the guardrails and persona. Logging interactions (C) allows for auditing to ensure the bot isn't generating harmful content and to improve the system.

**26. A**
Explanation: Wrapping user input in XML tags (A) and defining it as data helps separate instructions from untrusted user input, mitigating prompt injection.

**27. B**
Explanation: Financial regulations often require decisions (like loan denials) to be explainable. An LLM's "black box" nature makes it hard to prove a decision wasn't based on protected characteristics, causing compliance issues.

**28. A, C**
Explanation: Instructing the model to synthesize rather than quote (A) reduces direct copying. Implementing post-generation filters against known databases (C) acts as a safety net.

**29. B**
Explanation: Constitutional AI involves training models to adhere to a set of principles (a constitution) and using AI feedback to critique and revise its own behavior during training, reducing the reliance on human labeling.

**30. B**
Explanation: Analyzing employee emails for sentiment without clear consent heavily implicates privacy (B) and surveillance concerns in the workplace.

**31. B**
Explanation: A jailbreak is a prompt engineering attack designed to circumvent the model's safety guardrails, causing it to output forbidden or harmful content.

**32. A, C**
Explanation: Transparency requires disclosing that users are interacting with AI (A) and providing mechanisms for feedback or reporting errors (C) to maintain accountability.

**33. B**
Explanation: Few-shot prompting (B) with exact examples of the input and desired JSON output is highly effective at teaching the model the exact formatting and extraction pattern required.

**34. A, C**
Explanation: Providing specific focus areas (A) gives the model clear direction. Assigning a persona like a financial analyst (C) shifts the model's tone and focus to a specific domain.

**35. C**
Explanation: Placing instructions at the end (C) after the long context prevents "lost in the middle" or recency bias issues; the model reads the text, then immediately sees what it needs to do with it.

**36. B**
Explanation: "Let's think step by step" (B) triggers Chain of Thought reasoning, forcing the model to break down the logic puzzle into steps, drastically improving accuracy on complex tasks.

**37. B, D**
Explanation: Negative constraints are hard. Asking it to draft and then self-correct (B) allows it to fix errors. Providing examples (D) demonstrates the constraint in action (few-shot).

**38. B**
Explanation: Claude is heavily trained to recognize and respect XML tags (B) as structural markers in a prompt, helping it distinguish between context, instructions, and examples.

**39. B**
Explanation: Option B is the most explicit constraint, providing the exact options and strictly forbidding any other text or punctuation.

**40. B**
Explanation: Few-shot prompting involves providing 1 or more examples (shots) of the input and the desired output within the prompt to guide the model's behavior.

**41. C**
Explanation: Claude 3 Haiku is optimized for near-instant responsiveness and sub-second latency, making it the best choice for fast UI tools like code completion.

**42. C**
Explanation: Claude 3 Opus is Anthropic's most capable model, designed for highly complex, multi-step reasoning tasks where quality is paramount over cost or speed.

**43. A, B**
Explanation: Claude 2.1 and the Claude 3 family (Haiku, Sonnet, Opus) all support massive context windows (up to 200k tokens), easily handling 150,000 tokens of RAG context.

**44. B**
Explanation: Claude 3.5 Sonnet is positioned as the ideal balance of high intelligence (often outperforming Opus on many benchmarks) while maintaining excellent speed and cost-effectiveness.

**45. B, C**
Explanation: The Claude 3 family (including Haiku and Sonnet) possess multimodal (vision) capabilities, allowing them to analyze images and text simultaneously. Claude 2.x does not.

**46. B**
Explanation: For high-volume, simple tasks like categorization, Claude 3 Haiku's speed and exceptionally low cost per token make it the vastly superior choice over the heavier, more expensive Opus.

**47. C**
Explanation: The API is priced per token. You pay a specific rate for input tokens (the prompt you send) and a different rate for output tokens (the text the model generates).

**48. C**
Explanation: The `system` parameter is used to provide a system prompt, which defines the overarching persona, rules, and context that govern the assistant's behavior throughout the interaction.

**49. B**
Explanation: An embedding model (B) is required to convert text chunks into dense vector representations (math) so they can be stored and searched in a vector database.

**50. A, B**
Explanation: Depending on the specific Anthropic API version used, either `max_tokens` or `max_tokens_to_sample` dictates the absolute maximum length of the generated output.

**51. B**
Explanation: A temperature of 0.0 makes the model greedy, always choosing the highest probability next token. This results in highly deterministic, focused, and consistent outputs.

**52. B**
Explanation: The `stop_sequences` parameter allows you to provide a list of strings (like `</html>`). When the model generates one of these strings, it immediately stops generating further text.

**53. C**
Explanation: In the Messages array, the user's inputs use the role "user", and the AI's previous responses use the role "assistant".

**54. A, B**
Explanation: Embedding models have token limits (A), requiring text to be split up. Furthermore, retrieving whole manuals (B) dilutes semantic relevance and would overflow the LLM context window during generation.

**55. B**
Explanation: If the retrieved chunks are irrelevant, the LLM cannot answer correctly. The fault lies in the retrieval pipeline—specifically how documents are chunked and embedded/searched (B)—not the LLM itself.

**56. A, C**
Explanation: This is "over-refusal" (A), where safety filters are too sensitive. It can often be resolved by adjusting the prompt (C) to provide clear, benign context (e.g., "This is for a historical essay").

**57. B**
Explanation: A 500 error is a server-side issue. The standard robust application design is to implement exponential backoff and retry (B) because the error is often transient.

**58. B**
Explanation: Prompts are not perfectly transferable between model generations. Claude 3 is generally smarter and requires less "prompt hacking" than 2.1. The best step is to review and update the prompt for the new model's behavior.

**59. A, B**
Explanation: Reducing examples to the most diverse few (A) saves tokens. Dynamic few-shot (B) uses RAG to pull only the most relevant examples per query, saving tokens while maintaining high performance.

**60. B**
Explanation: If a response cuts off abruptly mid-string or mid-JSON, it almost always means the generation hit the `max_tokens` (or `max_tokens_to_sample`) limit before the model naturally completed its output.
