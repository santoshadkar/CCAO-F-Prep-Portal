# Practice Exam 2 – Claude Certified Associate Foundations (CCAO-F)

## Domain 1: Output Evaluation and Validation

**1. (Select ONE)** A marketing team is using Claude 3.5 Sonnet to draft blog posts. They notice that while the tone is correct, the model occasionally invents fictional statistics to support its points. What is the most effective way to evaluate and mitigate this hallucination issue in production?
A) Rely solely on human review for all generated blog posts.
B) Implement a secondary Claude model to fact-check the output against a provided database of verified statistics.
C) Increase the temperature parameter to encourage more accurate generation.
D) Switch to Claude 3 Haiku, as it is less prone to hallucinations.

**2. (Select TWO)** You are designing an automated evaluation pipeline for a customer support chatbot powered by Claude. Which TWO metrics are most critical for assessing the quality of the model's responses in this context?
A) Code compilation success rate
B) Semantic similarity to ground-truth answers
C) Flesch-Kincaid readability score
D) Response latency
E) Adherence to the company's brand voice and safety guidelines

**3. (Select ONE)** A legal firm uses Claude to summarize lengthy contracts. The summaries must include all critical clauses without adding any extraneous information. What type of evaluation metric is most appropriate for this task?
A) Precision and Recall based on expert human annotation
B) BLEU score against a reference summary
C) Perplexity of the generated summary
D) Length of the summary relative to the original text

**4. (Select ONE)** An educational platform uses Claude to grade student essays. The platform needs to ensure consistent grading across different students. Which evaluation strategy best addresses this requirement?
A) A/B testing different prompts with real students
B) Running a golden dataset of pre-graded essays through the model and measuring the agreement rate (e.g., Cohen's kappa) with human graders
C) Using another AI model to generate new essays and grade them
D) Monitoring the average grade awarded over time

**5. (Select THREE)** You are conducting a red-teaming exercise on a newly deployed Claude application designed to provide medical information. Which THREE of the following are primary goals of this exercise?
A) Identifying vulnerabilities where the model might provide harmful medical advice
B) Testing the model's response to adversarial inputs designed to bypass safety filters
C) Measuring the model's performance on standard medical licensing exams
D) Evaluating the model's ability to maintain user privacy when handling sensitive symptoms
E) Optimizing the prompt structure to reduce token usage

**6. (Select ONE)** A financial analyst uses Claude to extract key financial metrics from quarterly earnings reports. The extraction accuracy is currently at 85%, but the goal is 95%. What is the most effective approach to improve and validate this metric?
A) Fine-tune the model on a small dataset of earnings reports.
B) Implement a "chain-of-thought" prompt and evaluate the extraction accuracy on a hold-out test set.
C) Use a larger model like Claude 3 Opus without changing the prompt.
D) Decrease the max_tokens parameter to focus the model's output.

**7. (Select ONE)** When validating the output of a Claude model used for translation, you notice that idioms are often translated literally, losing their meaning. What is the best way to address this during the evaluation phase?
A) Use an automated metric like ROUGE to measure translation accuracy.
B) Incorporate human-in-the-loop evaluation specifically focused on idiomatic expressions.
C) Increase the context window to provide more background information.
D) Lower the temperature to make the translations more deterministic.

**8. (Select TWO)** A company is building a summarization tool using Claude. They want to ensure the summaries are not overly biased towards any particular viewpoint present in the source text. Which TWO evaluation methods are most suitable?
A) Word count comparison between source and summary
B) Human evaluation using a rubric designed to detect bias
C) Automated sentiment analysis comparing the source text and the summary
D) Measuring the generation speed of the model
E) Checking for exact string matches of biased keywords

**9. (Select ONE)** You are tasked with evaluating a Claude-powered coding assistant. The primary requirement is that the generated code must compile and run without errors. What is the most reliable validation method?
A) Having senior developers review all generated code.
B) Implementing an automated sandbox environment to execute the generated code and run unit tests.
C) Using a secondary AI model to analyze the code for potential bugs.
D) Measuring the cyclomatic complexity of the generated code.

**10. (Select ONE)** A news organization is using Claude to generate headlines for articles. The headlines need to be catchy but accurate. How should they evaluate the model's performance?
A) Track the click-through rate (CTR) of the generated headlines in a live A/B test.
B) Compare the length of the generated headlines to human-written headlines.
C) Use a grammar checker to ensure the headlines are syntactically correct.
D) Measure the similarity of the headlines to the first sentence of the article.

**11. (Select THREE)** Which THREE factors should be considered when establishing a baseline for evaluating a new Claude application?
A) The performance of the previous system (human or automated)
B) The specific business metrics the application is intended to improve
C) The exact hardware configuration used to run the model
D) A representative dataset of typical user inputs
E) The internal architecture of the Claude model

**12. (Select ONE)** A retail company uses Claude to categorize customer feedback. They notice the model struggles with sarcastic reviews. What is the best way to validate improvements made to handle sarcasm?
A) Test the model on a generalized dataset of customer reviews.
B) Create a specific evaluation dataset consisting entirely of sarcastic and non-sarcastic reviews to measure classification accuracy.
C) Monitor the overall sentiment score of all customer feedback.
D) Ask the model directly if it understands sarcasm.

**13. (Select ONE)** You are evaluating the consistency of Claude's responses to identical prompts over time. Which metric is most appropriate?
A) Self-BLEU score across multiple generations of the same prompt
B) The average response latency
C) The number of tokens generated per response
D) The model's confidence score

## Domain 2: Workflow Integration and Solution Design

**14. (Select ONE)** A healthcare provider wants to integrate Claude into their electronic health record (EHR) system to assist doctors in drafting patient notes. The system must operate within strict HIPAA compliance guidelines. What is the most critical design consideration?
A) Using the highest capacity model (Claude 3 Opus) for maximum accuracy.
B) Ensuring no protected health information (PHI) is sent to the model without explicit patient consent or proper anonymization/BAA agreements in place.
C) Minimizing the latency of the model's responses.
D) Implementing a complex agentic workflow for note generation.

**15. (Select TWO)** You are designing a customer support pipeline where a traditional intent classification model routes simple queries, and complex queries are sent to Claude. Which TWO benefits does this hybrid approach provide?
A) Reduces overall latency for all queries
B) Optimizes API costs by using Claude only when necessary
C) Eliminates the need for human agents
D) Leverages Claude's advanced reasoning capabilities for nuanced issues
E) Simplifies the overall system architecture

**16. (Select ONE)** A financial institution is building an automated research assistant using Claude. The assistant needs to access real-time stock prices and historical financial data to answer user queries. What is the most appropriate architectural pattern?
A) Fine-tuning the model on financial datasets.
B) Implementing a Retrieval-Augmented Generation (RAG) system connected to a financial data API.
C) Using prompt engineering to include all necessary data in the system prompt.
D) Relying on the model's pre-training knowledge.

**17. (Select ONE)** You are designing a workflow that involves Claude processing a sequence of documents. Each document's output depends on the output of the previous document. What is this design pattern called?
A) Parallel processing
B) Map-Reduce
C) Chained prompting or Sequential processing
D) Zero-shot generation

**18. (Select THREE)** An e-commerce platform wants to use Claude to generate personalized product recommendations. Which THREE components are essential for designing this solution?
A) A vector database to store product embeddings
B) A mechanism to retrieve user purchase history and preferences
C) An orchestration layer (e.g., LangChain or custom logic) to manage the interaction between the user, database, and Claude API
D) A continuous fine-tuning pipeline for the Claude model
E) A user interface to display the recommendations

**19. (Select ONE)** A software company wants to integrate Claude into their CI/CD pipeline to automatically review pull requests and suggest code improvements. What is the primary challenge in designing this integration?
A) Ensuring the model understands the specific programming languages used.
B) Handling the potentially large context size of complex pull requests and providing relevant repository context.
C) Minimizing the cost of API calls.
D) Getting developers to adopt the new tool.

**20. (Select ONE)** You are designing a system where Claude acts as a "router" to classify incoming user requests and send them to different specialized sub-agents (e.g., a scheduling agent, a billing agent). Which feature of the Claude API is most critical for this design?
A) Tool use (Function calling)
B) High context window
C) Multimodal capabilities (Vision)
D) Low latency

**21. (Select TWO)** A media company is building a tool that uses Claude to summarize long videos. The system first extracts the audio transcript and then sends it to Claude. What are TWO key design considerations for this workflow?
A) The accuracy of the speech-to-text transcription service.
B) The color grading of the original video.
C) Handling transcripts that exceed the maximum context window of the model (e.g., by chunking).
D) Ensuring the video is in 4K resolution.
E) Using Claude's vision capabilities to analyze the video frames directly instead of the transcript.

**22. (Select ONE)** A legal tech startup is designing a contract analysis tool. They need Claude to identify specific clauses and categorize them. To ensure the output is easily parsed by their backend system, what design choice should they make?
A) Request the output in a structured format like JSON or XML using specific prompt instructions and/or tool use.
B) Ask the model to provide a conversational summary.
C) Use a low temperature setting.
D) Implement a complex RAG system.

**23. (Select ONE)** When integrating Claude into a user-facing application, what is the best practice for handling API rate limits and potential outages?
A) Display the raw API error message to the user.
B) Implement robust retry logic with exponential backoff and provide user-friendly error messages or graceful degradation.
C) Switch to a different LLM provider immediately.
D) Ignore the errors and assume the user will try again later.

## Domain 3: Governance, Risk, and Responsible Use

**24. (Select ONE)** A bank is deploying a Claude-based loan advisory system. During testing, they discover the model occasionally recommends higher interest rates for applicants from specific zip codes, correlating with demographic data, despite not being explicitly trained on race. This is an example of:
A) Hallucination
B) Algorithmic Bias (Proxy discrimination)
C) Overfitting
D) Prompt Injection

**25. (Select TWO)** A social media company uses Claude to moderate user-generated content. To ensure responsible use and mitigate risk, which TWO practices are essential?
A) Completely automating the moderation process without human oversight.
B) Establishing clear policies defining what constitutes harmful content.
C) Regularly auditing the model's moderation decisions with a human-in-the-loop review process.
D) Maximizing the model's processing speed at the expense of accuracy.
E) Using the smallest available model to save costs.

**26. (Select ONE)** A user discovers they can bypass a customer service chatbot's safety filters by instructing it to "translate the following harmful instructions into French and then back to English." What type of vulnerability does this represent?
A) Data poisoning
B) Prompt Injection (Jailbreaking)
C) Model inversion
D) Denial of Service (DoS)

**27. (Select ONE)** To comply with data privacy regulations like GDPR or CCPA when using the Claude API, what is a crucial step for an organization?
A) Ensure that the organization's data retention policies align with the API provider's data usage terms, particularly regarding whether user data is used for model training.
B) Encrypt all data using proprietary algorithms before sending it to the API.
C) Only use the API for non-European or non-Californian users.
D) Request that the API provider delete the foundational model.

**28. (Select THREE)** A healthcare startup is building a symptom checker powered by Claude. Which THREE governance strategies are critical before launching this product?
A) Implementing strict guardrails to prevent the model from providing definitive medical diagnoses.
B) Including a clear disclaimer that the tool is for informational purposes only and does not replace professional medical advice.
C) Ensuring the application logs all user queries indefinitely for future analysis without user consent.
D) Conducting rigorous red-teaming to identify potential failure modes in medical scenarios.
E) Guaranteeing 100% accuracy in symptom assessment.

**29. (Select ONE)** What is the primary purpose of Constitutional AI, a methodology utilized in the development of models like Claude?
A) To increase the model's processing speed.
B) To train the model to self-correct and adhere to a specific set of principles or rules (a "constitution") to produce safer and more helpful outputs.
C) To allow users to customize the model's architecture.
D) To ensure the model can only generate legal documents.

**30. (Select ONE)** A company is using Claude to generate marketing copy. They want to ensure the generated content does not infringe on existing copyrights. What is the most effective risk mitigation strategy?
A) Rely on the model's internal knowledge to avoid copyright infringement.
B) Implement a plagiarism detection tool as a secondary check on the generated output before publication.
C) Ask the model to guarantee its output is original.
D) Only generate short phrases instead of full paragraphs.

**31. (Select TWO)** When designing a system that uses Claude to summarize sensitive internal company documents, which TWO security measures should be prioritized?
A) Storing the API keys directly in the frontend code for faster access.
B) Implementing robust Access Control Lists (ACLs) to ensure users can only summarize documents they are authorized to view.
C) Utilizing the API over secure, encrypted channels (HTTPS/TLS).
D) Publishing the summaries on a public web server.
E) Disabling all logging to ensure maximum privacy.

**32. (Select ONE)** A developer inadvertently commits an active Claude API key to a public GitHub repository. What is the immediate and most critical action to take?
A) Delete the GitHub repository.
B) Revoke (roll) the API key immediately in the Anthropic Console.
C) Change the password for the GitHub account.
D) Wait to see if any unauthorized charges appear on the billing account.

## Domain 4: Prompting and Task Execution

**33. (Select ONE)** You are prompting Claude to write a Python function. The model frequently includes unnecessary explanations before and after the code block. How can you most effectively prompt the model to output ONLY the code?
A) Add "Please" and "Thank you" to the prompt.
B) Use explicit instructions like "Output only the raw code without any markdown formatting or explanatory text."
C) Increase the temperature parameter.
D) Use a smaller model.

**34. (Select TWO)** A marketing team wants Claude to generate five distinct tagline options for a new product. Which TWO prompting techniques will yield the best results?
A) Providing a few-shot example of the desired format and style.
B) Using a very short, one-sentence prompt to give the model maximum freedom.
C) Clearly defining the target audience and the product's key value propositions within the prompt.
D) Setting the max_tokens parameter to a very low value.
E) Asking the model to evaluate its own taglines before presenting them.

**35. (Select ONE)** You have a large document (50,000 tokens) and you want Claude to answer a specific question about a detail near the end of the document. Which prompting strategy is most effective?
A) Put the question at the very beginning of the prompt, followed by the document.
B) Put the document in the prompt, and place the question at the very end of the prompt.
C) Split the document into 10 smaller chunks and send 10 separate API requests.
D) Ask the model to summarize the entire document first, then answer the question.

**36. (Select ONE)** A user is trying to get Claude to solve a complex logic puzzle. The model's initial answer is incorrect. What technique should the user employ to improve the model's reasoning?
A) Tell the model it is wrong and ask it to try again.
B) Use the "Chain of Thought" technique by adding instructions like "Think step-by-step" before providing the final answer.
C) Change the puzzle entirely.
D) Decrease the context window.

**37. (Select THREE)** When using the Tool Use (Function Calling) feature with Claude, what THREE elements must you provide in the API request?
A) The tool's name
B) A description of what the tool does
C) The actual executable code of the tool (e.g., the Python function)
D) A JSON schema defining the tool's input parameters
E) The exact latency of the tool execution

**38. (Select ONE)** You want Claude to extract information from a text and format it as a JSON object with specific keys. What is the most robust way to ensure the output matches your required schema?
A) Ask nicely in the prompt.
B) Provide an example of the desired JSON structure in the prompt or utilize the Tool Use feature to enforce the output schema.
C) Post-process the output with regular expressions.
D) Run the prompt multiple times until the output is correct.

**39. (Select ONE)** A prompt designed to categorize emails is performing poorly. The prompt is: "Categorize this email: [Email text]". How can this prompt be improved?
A) By removing the "[Email text]" placeholder.
B) By clearly defining the specific categories available (e.g., "Sales", "Support", "Spam") and providing definitions or examples for each.
C) By translating the prompt into Latin.
D) By asking the model to guess the categories.

**40. (Select TWO)** When constructing a prompt that includes user input, which TWO techniques help prevent prompt injection attacks?
A) Enclosing the user input within clear delimiters, such as XML tags (e.g., `<user_input>...</user_input>`).
B) Explicitly instructing the model to treat the text within the delimiters as data to be processed, not as instructions to be executed.
C) Trusting all user input by default.
D) Removing all punctuation from the user input.
E) Using the highest available temperature setting.

## Domain 5: Product and Model Selection

**41. (Select ONE)** A startup needs to process millions of short customer reviews to classify their sentiment (positive, negative, neutral) as quickly and cost-effectively as possible. Which Claude 3 model is the best fit?
A) Claude 3 Opus
B) Claude 3.5 Sonnet
C) Claude 3 Haiku
D) Claude 2.1

**42. (Select TWO)** An enterprise is building a highly complex, multi-step reasoning agent for advanced scientific research and data analysis. Cost and speed are secondary concerns; accuracy and capabilities are paramount. Which TWO factors suggest choosing Claude 3 Opus or Claude 3.5 Sonnet over Haiku?
A) The need for the lowest possible latency per token.
B) The requirement for near-human level intelligence on highly complex tasks.
C) The need to minimize API costs.
D) The necessity for sophisticated coding, math, and logical reasoning capabilities.
E) The application only requires basic text summarization.

**43. (Select ONE)** A company wants to build a coding assistant that provides real-time autocomplete suggestions as developers type. Which characteristic is most important when selecting the model for this specific feature?
A) Maximum context window size
B) Low latency (Time to First Token)
C) Multimodal vision capabilities
D) The ability to write creative fiction

**44. (Select ONE)** You are designing an application that allows users to upload images of charts and graphs, and the system needs to interpret the data and answer questions about it. Which capability is essential when selecting the Claude model?
A) High rate limits
B) Multimodal (Vision) capabilities
C) Extremely low cost
D) Fine-tuning support

**45. (Select THREE)** When deciding between different models in the Claude family, which THREE trade-offs are typically considered?
A) Cost per token
B) Latency/Speed
C) Model intelligence and capability on complex tasks
D) The physical location of the data center
E) The color of the API console interface

**46. (Select ONE)** A legacy application currently uses Claude 2. The development team is considering migrating to the Claude 3 family. What is a primary technical reason to make this upgrade?
A) Claude 3 models are completely free to use.
B) Claude 3 models generally offer improved performance, lower latency, and better adherence to instructions compared to previous generations.
C) Claude 2 is being immediately deprecated and shut down tomorrow.
D) Claude 3 requires less coding to integrate.

**47. (Select ONE)** A developer needs a model to quickly format unstructured text into a specific HTML structure. The task is straightforward but high volume. Which model provides the best balance of speed and cost for this specific task?
A) Claude 3 Opus
B) Claude 3 Haiku
C) Claude 3.5 Sonnet
D) A traditional regex script (no LLM needed)

## Domain 6: Configuration and Knowledge Management

**48. (Select ONE)** You are configuring a Claude API request and want the model's output to be highly deterministic and consistent across multiple runs of the same prompt. Which parameter adjustment is most critical?
A) Set `max_tokens` to a very high number.
B) Set `temperature` to 0.
C) Increase `top_p` to 1.
D) Add multiple `stop_sequences`.

**49. (Select TWO)** A company has a massive internal knowledge base of 500,000 documents. They want employees to be able to ask Claude questions about this information. Which TWO components are necessary to build a Retrieval-Augmented Generation (RAG) system for this purpose?
A) Providing all 500,000 documents in the system prompt for every request.
B) An embedding model to convert the documents and user queries into vector representations.
C) A vector database to store and search the document embeddings.
D) Fine-tuning the Claude model on all 500,000 documents.
E) Setting the temperature to 1.0.

**50. (Select ONE)** What is the purpose of the `system` parameter (System Prompt) in the Claude Messages API?
A) To define the maximum length of the response.
B) To provide overarching instructions, context, or personas that guide the model's behavior throughout the conversation.
C) To handle billing and authentication.
D) To specify which programming language the model should use.

**51. (Select ONE)** You are building a chatbot that helps users troubleshoot software issues. You want the conversation to feel natural, but you also want to prevent the model from going off on tangents. How can you effectively manage the conversation history?
A) Send the entire conversation history in every API request, regardless of length.
B) Implement a rolling window approach, sending only the most recent N turns of the conversation to stay within context limits while maintaining relevance.
C) Only send the user's very first message and their most recent message.
D) Never send any conversation history; treat each message as isolated.

**52. (Select THREE)** When configuring the `max_tokens` parameter, which THREE considerations are important?
A) Ensuring it is set high enough to allow the model to complete its intended response without abrupt truncation.
B) Using it to control potential costs by preventing runaway generations.
C) Understanding that it dictates the exact number of tokens the model *must* generate.
D) Recognizing that it limits the length of the generated output, not the input prompt.
E) Setting it to 0 to bypass all limits.

**53. (Select ONE)** A RAG system is returning irrelevant answers because the retrieval step is pulling the wrong documents. What is the most effective way to troubleshoot the knowledge management component?
A) Switch to a larger Claude model.
B) Evaluate and refine the embedding strategy, chunking size, or search algorithms (e.g., hybrid search) used in the vector database.
C) Increase the `temperature` parameter.
D) Add more general knowledge to the system prompt.

**54. (Select ONE)** You are passing a large JSON file to Claude for analysis. To ensure the model processes the data most efficiently, how should you structure the prompt?
A) Place the JSON data at the very end of the prompt, after your instructions.
B) Place the JSON data at the beginning of the prompt, followed by clear instructions or questions regarding the data.
C) Convert the JSON to XML before sending it.
D) Minify the JSON to remove all whitespace.

## Domain 7: Troubleshooting and Optimization

**55. (Select ONE)** An application utilizing the Claude API starts experiencing a high rate of `429 Too Many Requests` errors. What is the primary cause and the best immediate solution?
A) The prompt is too complex; simplify the prompt.
B) The application is exceeding its allocated rate limits; implement exponential backoff and retry logic, and consider requesting a rate limit increase.
C) The model is hallucinating; lower the temperature.
D) The API key is invalid; generate a new key.

**56. (Select TWO)** A developer notices that a specific prompt used for data extraction is taking significantly longer to process than expected, leading to timeout errors in the client application. What are TWO potential optimization strategies?
A) Switch from Claude 3 Opus to Claude 3 Haiku if the task complexity allows.
B) Increase the `max_tokens` parameter.
C) Optimize the prompt to be more concise and clear, potentially reducing the input token count.
D) Send the request multiple times concurrently to see which finishes first.
E) Use a higher temperature setting.

**57. (Select ONE)** You are using Claude to generate structured data (JSON), but the model occasionally includes conversational filler (e.g., "Here is your JSON:") before the actual JSON object, breaking your parsing logic. What is the most robust way to fix this?
A) Tell the model "Do not say 'Here is your JSON:'".
B) Utilize the Tool Use (Function Calling) feature, forcing the model to output data that conforms strictly to a predefined JSON schema.
C) Use a try-catch block in your code and ignore the error.
D) Switch to a different LLM.

**58. (Select ONE)** A RAG application is returning answers that are technically correct based on the retrieved documents, but the answers are poorly formatted and hard to read. Where should you focus your troubleshooting efforts?
A) The embedding model used for retrieval.
B) The vector database search algorithm.
C) The prompt instructions provided to Claude regarding the desired output format and style.
D) The maximum context window of the model.

**59. (Select THREE)** Your Claude application's costs have spiked unexpectedly. Which THREE areas should you investigate to optimize token usage and reduce costs?
A) Reviewing conversation history management to ensure you aren't sending unnecessarily long context windows on every turn.
B) Analyzing the choice of model (e.g., are you using Opus for tasks Haiku could handle?).
C) Checking if the `max_tokens` parameter is set excessively high and if the model is generating verbose, unnecessary output.
D) Increasing the temperature to make the model generate shorter words.
E) Upgrading to a more expensive hosting provider for your database.

**60. (Select ONE)** During testing, a user reports that the Claude-powered application provided an inappropriate response that violated company policy. What is the first step in troubleshooting this issue?
A) Immediately delete the user's account.
B) Retrieve the exact prompt and conversation history that led to the response to reproduce and analyze the failure.
C) Change the system prompt arbitrarily and hope it fixes the issue.
D) Disable the API key.

## Answer Key

1. **B** - Implementing a secondary process (like another model or traditional logic) to fact-check against a verified database is a robust way to mitigate hallucinations in production.
2. **B, E** - Semantic similarity ensures the answer is correct relative to ground truth, and adherence to brand voice/safety is critical for customer-facing applications.
3. **A** - Precision (no extraneous info) and Recall (all critical clauses included) based on expert annotation are standard for evaluating extraction/summarization tasks.
4. **B** - Comparing model output to a "golden dataset" graded by human experts ensures the model aligns with human standards.
5. **A, B, D** - Red-teaming focuses on finding vulnerabilities (harmful advice), testing adversarial inputs (jailbreaks), and ensuring privacy/security, not general performance metrics.
6. **B** - Chain-of-thought improves reasoning and extraction accuracy, and validating against a hold-out set proves the improvement is real.
7. **B** - Idioms require nuanced understanding, making human-in-the-loop evaluation the most reliable method for validation.
8. **B, C** - Human evaluation with a specific rubric and automated sentiment analysis are appropriate ways to measure and detect bias.
9. **B** - For coding tasks, the ultimate test is functional execution in a safe sandbox environment.
10. **A** - CTR is the most direct business metric for evaluating the success of catchy headlines in a live environment.
11. **A, B, D** - Baselines require understanding current performance, business goals, and testing on representative real-world data.
12. **B** - To evaluate a specific capability (sarcasm), you need a targeted dataset that isolates that variable.
13. **A** - Self-BLEU measures the similarity of generated outputs to each other, indicating consistency.
14. **B** - HIPAA compliance (handling PHI securely and legally) is the absolute most critical consideration in healthcare applications.
15. **B, D** - A hybrid approach saves money (traditional models are cheaper) while reserving Claude's powerful reasoning for complex issues.
16. **B** - RAG connected to an API allows the model to access real-time and historical data that wasn't in its training set.
17. **C** - Chained prompting or sequential processing involves passing the output of one step as the input to the next.
18. **A, B, C** - Personalization requires storing items (vector DB), retrieving user history, and orchestrating the flow to the LLM.
19. **B** - Pull requests often involve many files; managing this large context and providing relevant repository architecture is the main challenge.
20. **A** - Tool use allows the model to output structured commands (like routing decisions) that the application can execute.
21. **A, C** - The LLM is only as good as the transcript (A), and long videos will exceed context limits, requiring chunking (C).
22. **A** - Structured outputs (JSON/XML) via tool use or explicit prompting are essential for system-to-system integration.
23. **B** - Robust applications must handle rate limits gracefully with retries and backoff strategies.
24. **B** - Algorithmic bias occurs when the model infers sensitive attributes (like race) from proxy data (like zip codes).
25. **B, C** - Clear policies and human-in-the-loop auditing are standard responsible AI practices for moderation.
26. **B** - Prompt injection (jailbreaking) attempts to bypass safety filters by confusing or tricking the model.
27. **A** - Understanding data retention and ensuring user data isn't used for training without consent is key to privacy compliance.
28. **A, B, D** - Medical apps require strict guardrails, clear disclaimers, and rigorous red-teaming due to high risk.
29. **B** - Constitutional AI uses a set of rules to train the model to be helpful and harmless, self-correcting its outputs.
30. **B** - A secondary plagiarism detection tool provides a verifiable check against existing copyrighted material.
31. **B, C** - ACLs ensure data access control, and secure channels (HTTPS) protect data in transit.
32. **B** - Revoking the compromised key immediately prevents unauthorized usage and billing.
33. **B** - Explicitly instructing the model on the exact output format is the most direct way to eliminate conversational filler.
34. **A, C** - Few-shot examples and clear context/constraints yield the highest quality and most targeted creative outputs.
35. **B** - Placing the question at the end (after the context) often improves recall for information located throughout a large document.
36. **B** - "Chain of Thought" prompting significantly improves logical reasoning by forcing the model to articulate its steps.
37. **A, B, D** - Tool use requires the name, description, and input schema so the model knows how and when to use it.
38. **B** - Tool use or providing exact structural examples are the most reliable ways to enforce JSON schemas.
39. **B** - Providing clear category definitions and examples drastically improves classification accuracy.
40. **A, B** - Delimiters (like XML tags) and explicit instructions separate user data from system instructions, mitigating injection risks.
41. **C** - Haiku is the fastest and most cost-effective model, perfect for high-volume, simple tasks like sentiment analysis.
42. **B, D** - Opus and Sonnet excel at highly complex reasoning, coding, and tasks requiring near-human intelligence.
43. **B** - Autocomplete requires extremely low latency (Time to First Token) to be useful in real-time.
44. **B** - Multimodal (Vision) capabilities are required to process and interpret images of charts.
45. **A, B, C** - The primary trade-offs in model selection are cost, speed (latency), and capability (intelligence).
46. **B** - Claude 3 offers significant improvements in performance, speed, and instruction following over Claude 2.
47. **B** - For straightforward, high-volume formatting tasks, Haiku offers the best balance of speed and low cost.
48. **B** - Setting temperature to 0 makes the model's responses as deterministic and repeatable as possible.
49. **B, C** - RAG requires an embedding model to vectorize data and a vector DB to store and search those vectors.
50. **B** - The system prompt sets the overarching behavior, persona, and rules for the model's interactions.
51. **B** - A rolling window manages context size limits while preserving the most relevant recent conversational context.
52. **A, B, D** - Max_tokens prevents unexpected costs and truncation, and it only limits output length, not input length.
53. **B** - If retrieval is bad, the issue is in the vector DB, embedding strategy, or search logic, not the LLM itself.
54. **B** - Placing data first and instructions at the end often leads to better instruction adherence, especially with large contexts.
55. **B** - 429 means Too Many Requests (rate limit exceeded); implement backoff/retries and request limit increases.
56. **A, C** - Using a faster model (Haiku) or reducing input tokens via prompt optimization reduces processing time.
57. **B** - Tool use strictly enforces structured output formats, eliminating conversational filler.
58. **C** - If the information is correct but poorly formatted, the prompt instructions regarding output style need adjustment.
59. **A, B, C** - Context length, model choice, and output length (`max_tokens`) are the primary drivers of API costs.
60. **B** - You must isolate the exact input to reproduce, understand, and eventually mitigate the failure.
