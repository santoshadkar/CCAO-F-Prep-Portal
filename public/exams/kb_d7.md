# Domain 7: Troubleshooting and Optimization (CCAO-F Exam Guide)

Welcome to Domain 7 of the CCAO-F (Certified Claude AI Operations - Foundations) exam preparation guide. This domain accounts for **10% of the exam** and focuses heavily on practical, scenario-based problem-solving. As an AI operations professional, knowing how to build a prompt is only half the battle; knowing how to fix it when it fails in production is where actual value is delivered.

This comprehensive guide covers everything you need to troubleshoot, debug, and optimize Claude deployments effectively.

---

## 1. Systematic Debugging Framework

When a generative AI system fails, the symptoms are often subjective ("the answer isn't good enough") and the root causes can be opaque. To pass the CCAO-F exam and succeed in production, you must move away from "guess-and-check" prompting and adopt a **Systematic Debugging Framework**.

### The Diagnostic Process
The recommended diagnostic process follows a structured scientific method:
1. **Observe the Symptom:** Clearly define what is going wrong. Quantify it if possible. (e.g., "In 15% of queries, Claude outputs prose instead of the requested JSON.")
2. **Hypothesize the Cause:** Based on the symptom, formulate a hypothesis. (e.g., "The system prompt does not enforce the JSON schema strongly enough, or the temperature is too high.")
3. **Test the Hypothesis:** Isolate the variable. (e.g., Change *only* the temperature to 0 and rerun the exact same 15 failed queries.)
4. **Fix:** Implement the solution that resolves the issue in isolation.
5. **Verify:** Run regression tests across a wider set of prompts to ensure the fix didn't break other functionalities.

> [!IMPORTANT]
> A core competency tested on the exam is knowing *what* to change first. Always isolate variables. If you change the system prompt, the user prompt, and the temperature all at once, you will not know which change fixed the issue.

### The Four Root Cause Categories
When diagnosing failures, map them to one of these four fundamental categories:
1. **(A) Prompt Quality Issues:** Ambiguity, missing context, contradictory instructions, or poor structure (e.g., instructions buried in the middle of a massive context block).
2. **(B) Configuration/Parameter Issues:** Incorrect temperature, `max_tokens` set too low, wrong model version specified, or incorrect top-p/top-k settings.
3. **(C) Infrastructure/API Issues:** Network timeouts, rate limits (429s), server errors (500s/529s), or authentication failures.
4. **(D) Knowledge Base/Data Issues (RAG):** The retrieval system fetched the wrong chunks, the chunks were poorly formatted, or the embedded data was factually incorrect/outdated.

### How to Isolate the Cause
- **Minimal Test Cases:** Strip the prompt down to its bare minimum. If a massive 10,000-token prompt is failing, extract the core instruction and test it with 100 tokens of context. If it succeeds, the issue is context overflow/attention loss. If it fails, the core instruction is fundamentally flawed.
- **Isolating Variables:** Test one parameter at a time.
- **Fresh vs. Session Testing:** Always test reproducibility in a *fresh* conversation (new API call with no history) versus within an ongoing session. If a prompt works in an ongoing session but fails in a fresh call, your prompt relies on implicit context established earlier in the chat.

### Creating a Bug Report for Claude Behavior
To effectively escalate or track issues, a standard bug report must include:
- **Exact Prompt:** Both System and User prompts.
- **Parameters Used:** Model string (e.g., `claude-3-5-sonnet-20240620`), temperature, `max_tokens`.
- **Observed Output:** The exact failing text/behavior.
- **Expected Output:** What the system *should* have done.
- **Frequency:** Is it deterministic (happens every time) or stochastic (happens 1 in 10 times)?

---

## 2. Complete Failure Mode Reference — Every Common Problem

The exam will present you with symptoms and ask for the most likely root cause and the best fix. Memorize these mappings.

### Output Quality Failures

#### Generic/Vague Response
- **Symptom:** Claude provides surface-level advice or lacks specific details.
- **Causes:** Vague task description, missing context, no constraints.
- **Diagnostic:** Compare the prompt to the 'anatomy of a good prompt' checklist. Does it have a persona? Does it have context?
- **Fix:** Add specificity, context, examples, and constraints. Tell Claude exactly *how* deep to go (e.g., "Provide a highly technical, expert-level analysis...").
- **Prevention:** Always include the 5 core prompt components (Context, Objective, Style, Tone, Format).

#### Irrelevant Response
- **Symptom:** Claude addresses a topic adjacent to, but not exactly, the actual request.
- **Causes:** Ambiguous phrasing, missing context, or a long prompt where the core task statement got "lost" in the middle.
- **Fix:** Rephrase the task more specifically. Crucially, **move the task statement to the very end of the prompt** (after the context). Recency bias applies to LLMs.

#### Incomplete Response
- **Symptom:** Claude stops abruptly before addressing all parts of a multi-part request.
- **Causes:** `max_tokens` too low, response truncation, or a complex multi-part request where earlier parts consumed the entire token budget.
- **Fix:** Increase `max_tokens`. If it still fails, break the prompt into sequential, chained prompts.
- **Diagnostic:** Check if the output length perfectly matches the `max_tokens` boundary.

#### Over-verbose Response
- **Symptom:** Claude writes 2000 words when 200 were needed.
- **Causes:** No length constraint specified, a model upgrade changed the default verbosity, or the system prompt lacks conciseness instructions.
- **Fix:** Add an explicit length constraint ("Respond in exactly 3 sentences"). Add "Be exceptionally concise and output no filler text" to the system prompt.

#### Wrong Format
- **Symptom:** Claude produces prose when JSON was needed, or vice versa (e.g., adding conversational filler before/after a JSON block).
- **Causes:** Format not specified explicitly, conflicting instructions, or lacking a schema.
- **Fix:** Specify the format explicitly. Use XML tags to fence the expected output `<json>...</json>`. Provide a 1-shot example of the desired format. For JSON, use the official tool-use/JSON mode or specify an exact JSON schema.

#### Inconsistent Outputs Across Runs
- **Symptom:** The exact same prompt gives wildly different results or formats across different API calls.
- **Causes:** `temperature > 0`, or an ambiguous prompt that allows for multiple valid interpretations by the model.
- **Fix:** Set `temperature = 0` for deterministic, consistent results. Make the prompt highly constrained. Use few-shot examples to anchor the expected pattern.

#### Contradictory Information Within One Response
- **Symptom:** Claude asserts X in paragraph 1 and not-X in paragraph 3.
- **Causes:** Complex topic with conflicting training data, long response where early context gets lost, or an underspecified task.
- **Fix:** Ask Claude to "think step by step" (Chain of Thought) before answering. Request that it verify its own consistency before finishing. Break the task into smaller, sequential steps.

#### Hallucinated Facts
- **Symptom:** Specific claims (statistics, citations, names, dates) are factually incorrect but stated confidently.
- **Causes:** Lack of grounding context, the model filling in gaps, or asking about niche/post-training-cutoff topics without providing data.
- **Fix:** Provide source material via RAG. Instruct Claude to **cite only the provided material**. Add instructions like, "If the answer is not contained in the provided documents, say 'I don't know'." Ask Claude to indicate its confidence level.

#### Ignored Instructions
- **Symptom:** Claude does something entirely different from what was asked.
- **Causes:** The critical instruction is buried in the middle of a long prompt (lost in the middle), contradictory instructions exist, or ambiguous language was used.
- **Fix:** Move the critical instruction to the very end of the prompt. Use explicit XML tags `<instructions>` to highlight it. Remove conflicting directives.

#### Sycophantic Output
- **Symptom:** Claude agrees with a factually wrong statement the user made just to be helpful/polite.
- **Causes:** RLHF training leaning toward helpfulness; user framing that heavily implies agreement is expected.
- **Fix:** Explicitly instruct Claude to prioritize absolute accuracy over agreement/politeness. Ask it to "First, find any flaws in my reasoning before answering." Use the "steelman the opposite position" technique.

> [!TIP]
> **Exam insight:** If the symptom is "Claude ignored my instruction," the correct answer is almost always "Move the instruction to the end of the prompt."

### Configuration Failures

#### Response Cuts Off Mid-Sentence / Mid-JSON
- **Symptom:** The response ends abruptly, usually exactly at a round token count (e.g., 1024, 4096).
- **Cause:** The `max_tokens` parameter limit was reached.
- **Diagnostic:** Check the API response metadata for `stop_reason: "max_tokens"`.
- **Fix:** Increase `max_tokens`. For structured data, estimate token requirements before setting limits.

#### Excessive Randomness/Creativity
- **Symptom:** Outputs vary wildly, format breaks frequently, logic jumps around.
- **Cause:** Temperature is set too high (e.g., 0.8 to 1.0) for a deterministic task.
- **Fix:** Lower temperature toward 0. (Use 0 for data extraction/coding, 0.7 for creative writing).

#### Stale or Missing Conversation Context
- **Symptom:** In a multi-turn chat, Claude doesn't seem to remember what was said two turns ago.
- **Cause:** The conversation history array is not being appended and sent correctly in the API calls, or the context window has been exceeded.
- **Fix:** Ensure your application logic includes the full `messages` array in every API call. If the context is exceeded, implement a rolling summary mechanism to compress older turns.

#### Wrong Model Behavior
- **Symptom:** Claude suddenly behaves differently than expected today compared to yesterday.
- **Cause:** The model string was not specified precisely (e.g., using `claude-3-sonnet` instead of `claude-3-5-sonnet-20240620`), and an underlying alias was updated.
- **Fix:** Always specify the full, date-stamped model string in production to ensure behavior remains locked.

### API/Infrastructure Failures

#### HTTP 400 Bad Request
- **Cause:** Malformed request. Invalid JSON payload, missing required field (like `max_tokens` in some older SDKs), or invalid parameter values (e.g., temperature = 2.0).
- **Fix:** Check API documentation. Validate request JSON formatting. Look for invalid Unicode characters in the input text.

#### HTTP 401 Unauthorized
- **Cause:** Invalid, missing, or expired API key.
- **Fix:** Check that the key is correctly passed in the `x-api-key` header. Regenerate the key if compromised or expired.

#### HTTP 403 Forbidden
- **Cause:** The API key is valid, but doesn't have permission for the requested action, endpoint, or model tier (e.g., trying to access Opus on a restricted tier).
- **Fix:** Check account tier, billing status, and IAM permissions.

#### HTTP 408 / Request Timeout
- **Cause:** The request took too long to complete. Usually happens with massive context windows and maxed-out output tokens.
- **Fix:** Break the task into smaller chunks. Implement streaming (Server-Sent Events) so the connection stays active while tokens are generated.

#### HTTP 429 Rate Limit Exceeded
- **Cause:** Exceeded the Requests Per Minute (RPM) or Tokens Per Minute (TPM) limits for your tier.
- **Fix:** Implement **Exponential Backoff and Retry** (detailed below). Spread requests over time. Request a limit increase. Cache frequent queries.

#### HTTP 500 Internal Server Error
- **Cause:** Unexpected server-side error at Anthropic.
- **Fix:** Retry with exponential backoff. If persistent across hours, check the Anthropic status page and implement fallback logic (e.g., fallback to a smaller model).

#### HTTP 529 Overloaded
- **Cause:** Anthropic's servers are under extremely high load and temporarily cannot process the request.
- **Fix:** This is explicitly designed to tell clients to back off. Use exponential backoff and retry. It is *not* a client-side prompt issue.

> [!WARNING]
> Do NOT automatically retry 400, 401, or 403 errors. Retrying these will just result in infinite loops of failures and potential account flagging. Only automatically retry 408, 429, 500, and 529 errors.

### RAG-Specific Failures (Retrieval-Augmented Generation)

#### Hallucination Despite Having Correct Data in KB
- **Cause:** Retrieval failure. The correct data is in the database, but the vector search didn't retrieve those specific chunks, OR the chunks were retrieved but were too fragmented for Claude to understand.
- **Fix:** Improve the chunking strategy (use semantic chunking rather than raw character limits). Add metadata filtering to narrow the search space. Increase `top-k` retrieval. Use hybrid search (keyword + vector).

#### Irrelevant Context Being Injected
- **Cause:** The retrieval system is returning loosely related chunks because the similarity threshold is too low.
- **Fix:** Tune the similarity threshold (e.g., require >0.8 cosine similarity). Use Maximal Marginal Relevance (MMR) for diversity without sacrificing relevance.

#### Context Overflow (Too Many Chunks)
- **Cause:** Retrieving too many chunks (e.g., top-k = 50) exceeds the context window or degrades the model's focus (Lost in the Middle phenomenon).
- **Fix:** Reduce `top-k`. Implement a re-ranking step (using a dedicated cross-encoder model) to score the top 20 chunks and only pass the top 3-5 most relevant to Claude.

#### Outdated Information Used
- **Cause:** Knowledge base contains multiple versions of a document, and the vector search retrieves the older one because of keyword similarity.
- **Fix:** Establish a strict update cadence. Physically delete/tombstone deprecated documents from the vector DB. Add explicit `Last Updated: [Date]` tags to document headers and instruct Claude to "Always prioritize the most recent document."

### Safety/Refusal Failures

#### Over-refusal (False Positive)
- **Symptom:** Claude refuses a completely legitimate, benign request because it pattern-matches to something potentially harmful (e.g., refusing to write a script about a SQL injection for a defensive cybersecurity training course).
- **Cause:** Safety training (Constitutional AI) is inherently conservative to prevent misuse.
- **Diagnostic:** Is the request genuinely harmful? If not, it is a false positive over-refusal.
- **Fix:** Provide clear, explicit, and benign context about the *purpose* of the request. (e.g., "This is for a professional, authorized cybersecurity defensive training module. We are studying how attacks work to stop them.").
- **Prevention:** Design prompts with robust, ethical context from the start. Never attempt to "trick" or "jailbreak" the model.

#### Under-refusal in Edge Cases
- **Symptom:** Claude produces content it shouldn't (e.g., PII disclosure, highly biased output).
- **Cause:** The prompt accidentally bypassed the internal safety considerations.
- **Fix:** Adjust the system prompt to add explicit, strict constraints ("Under no circumstances should you output real user data...").

#### Inconsistent Refusal Behavior
- **Cause:** Highly ambiguous prompt that flirts with the safety threshold, sometimes triggering it, sometimes not.
- **Fix:** Clarify the language. Remove aggressive, violent, or culturally sensitive idioms if they are purely metaphorical (e.g., change "kill the server process" to "terminate the server process" if it's confusing the model in a broader context).

---

## 3. Exponential Backoff — Complete Implementation Concept

A massive part of production reliability is handling rate limits (429) and server overloads (529). The industry standard is **Exponential Backoff with Jitter**.

### What it is
When an API call fails due to a rate limit or transient error, the client application waits for a short period before retrying. If it fails again, the wait time is *doubled*. This continues until a maximum number of retries is reached.

### Why Jitter Matters
If your system experiences a network hiccup and 1,000 parallel worker threads all fail at the exact same millisecond, and all of them wait exactly 2.0 seconds to retry, they will all hit the Anthropic API simultaneously 2.0 seconds later, causing another massive spike and failing again. This is called the **Thundering Herd problem**.
**Jitter** adds a random amount of milliseconds to the wait time for *each individual thread*, spreading the retries out smoothly over time.

### Conceptual Algorithm
```python
base_delay = 1  # second
max_retries = 5
max_wait = 60   # seconds

for attempt in range(max_retries):
    try:
        response = call_anthropic_api()
        return response
    except (RateLimitError, ServerOverloadError): # 429, 529, 500, 408
        if attempt == max_retries - 1:
            log_error_and_alert_team()
            raise ExhaustedRetriesError
        
        # Calculate exponential backoff
        wait_time = base_delay * (2 ** attempt)
        
        # Add random jitter (e.g., +/- 20%)
        jitter = random.uniform(-0.2 * wait_time, 0.2 * wait_time)
        actual_wait = min(max_wait, wait_time + jitter)
        
        sleep(actual_wait)
    except (BadRequestError, UnauthorizedError, ForbiddenError): # 400, 401, 403
        # DO NOT RETRY THESE. They are deterministic client errors.
        raise
```

### When to Give Up
After `max_retries` (usually 3 to 5), or if the `wait_time` exceeds your application's acceptable SLA (e.g., a user is waiting for a chatbot reply and won't wait 60 seconds), you must give up.
Log the error, handle it gracefully in the UI ("Sorry, the system is currently busy"), and queue the task for asynchronous processing if applicable.

---

## 4. Performance Optimisation Strategies

Optimization in LLM operations is a balancing act between three vertices of a triangle: **Cost, Latency, and Quality**. Usually, improving one degrades another.

### Cost Optimisation
- **Model Selection (The Biggest Lever):** Use the cheapest model that meets the quality bar. Do not use Claude 3.5 Sonnet for a simple text-classification task that Claude 3 Haiku can handle perfectly.
- **Input Token Reduction:**
  - Trim unnecessary context.
  - Use **dynamic few-shot prompting** (using vector search to find 2 relevant examples) rather than static prompting (hardcoding 20 examples into every prompt).
  - Summarize long documents *before* including them in the main prompt.
- **Output Token Reduction:**
  - Since output tokens cost significantly more than input tokens, set strict length constraints.
  - Request concise formats (e.g., ask for a boolean `{"is_spam": true}` rather than a paragraph explaining why it's spam, unless the explanation is strictly necessary).
- **Prompt Caching:** Anthropic offers prompt caching for frequently reused prefixes (like massive system prompts or static knowledge bases). If you send the exact same 10,000-token system prompt 50 times a minute, caching it reduces costs drastically.
- **Batch API:** For non-real-time asynchronous tasks (e.g., analyzing yesterday's logs), use the Batch API to process thousands of requests at a 50% discount.
- **Result Caching:** At the application layer, hash the user's query. If User B asks the exact same question User A asked 5 minutes ago, serve the cached response from your database instead of calling the API. (Only suitable for static knowledge retrieval).

### Latency Optimisation
- **Model Choice:** Haiku is explicitly designed for latency-sensitive applications (customer support chat, real-time UI generation).
- **Streaming:** Always use streaming (`stream=true`) for user-facing applications. The time-to-first-token (TTFT) is critical for user perception. Seeing text appear instantly feels faster than waiting 4 seconds for a complete block of text, even if the total generation time is the same.
- **Minimize Input Tokens:** Shorter prompts process faster.
- **Reduce max_tokens:** Generation speed is bounded by how much text the model produces. Forcing a shorter output = faster response time.
- **Parallelization:** If you need to extract 5 different entities from a document, and the latency is too high, run 5 separate API calls in parallel rather than asking Claude to do all 5 sequentially in one massive output.
- **Geographic Routing:** Ensure your application servers are physically located near the Anthropic API endpoints you are calling to reduce network transit latency.

### Quality Optimisation
- **Upgrade the Model:** If Haiku fails, move to Sonnet. If Sonnet fails on extreme reasoning, move to Opus.
- **Chain of Thought (CoT):** Force the model to generate a `<thinking>` block before its final `<answer>`. This trades latency and cost for significantly higher reasoning quality.
- **Few-Shot Prompting:** The single best way to optimize format quality and tone consistency is providing 3-5 high-quality input/output examples.
- **LLM-as-a-Judge Evaluation:** Implement a pipeline where a smaller, cheaper model generates an answer, and a larger model (like Opus) evaluates that answer against a rubric before it is shown to the user.
- **Structured Outputs:** Force JSON generation with a strict schema to eliminate formatting hallucinations.

---

## 5. Model Migration and Upgrade Management

Models are continuously updated. `claude-3-sonnet` becomes `claude-3-5-sonnet`. You cannot simply swap the API string and assume everything will work perfectly.

### Why Prompts Need Updating
Each model version has slightly different training data, different RLHF (Reinforcement Learning from Human Feedback) tuning, and different sensitivities to instructions. A prompt that perfectly constrained Claude 3 might be "over-constraining" and cause weird behavior in Claude 3.5. Model default verbosity often changes between versions.

### Pre-migration Testing
Before switching, run your automated regression test suite on the new model.
Systematically compare the outputs using evaluation metrics (exact match for data extraction, LLM-as-a-judge for qualitative responses).
Adjust prompts where the new model fails.

### Version Pinning (Exam Critical)
> [!CAUTION]
> NEVER use generic model aliases (e.g., `claude-3-5-sonnet-latest`) in production unless you explicitly *want* silent, automatic upgrades that could break your application overnight.

Always specify the exact version, including the date string: `claude-3-5-sonnet-20240620`. This ensures deterministic behavior. When Anthropic releases a new version, you control the migration timeline.

### Gradual Rollout (Canary Release)
1. Update your code to support the new model string.
2. Route 5% of production traffic to the new model.
3. Monitor error rates, latency, and user feedback metrics for 24-48 hours.
4. If stable, increase to 20%, 50%, 100%.

### Rollback Plan
Always maintain the ability to flip a single environment variable or feature flag to instantly route all traffic back to the older, pinned model version if a catastrophic failure occurs post-migration.

---

## 6. Monitoring and Observability for Production

To troubleshoot effectively, you need data. If a user says "the bot broke," you need telemetry to understand why.

### What to Log (Essential Telemetry)
For every API call, log:
- **Request ID:** A unique UUID for tracing.
- **Timestamp:** For temporal analysis.
- **Model Version:** Exact string used.
- **Prompt Hash or Summary:** (Do not log PII or sensitive user inputs in plaintext; hash them or log structural summaries).
- **Response Time / Latency:** TTFT and Total Generation Time.
- **Token Counts:** `input_tokens` and `output_tokens` (crucial for billing attribution).
- **Cost Estimate:** Calculated based on token usage.
- **Stop Reason:** (e.g., `end_turn`, `max_tokens`, `stop_sequence`).
- **User/Tenant Identifier:** To track usage per client.

### Alerting Strategies
Set up automated PagerDuty/Slack alerts for:
- **Error Rate Spikes:** e.g., >5% of requests returning 5xx or 429 errors within a 5-minute window.
- **Latency Degradation:** Average response time exceeds your SLA threshold.
- **Unusual Cost Velocity:** E.g., burning through $100/hour when the baseline is $10/hour (indicates a potential infinite loop in code or a malicious user).
- **Quality Drops:** If you have automated LLM-as-a-judge scoring, alert if the average score drops below 4/5.

### Dashboard Metrics
A standard CCAO-F dashboard should visualize:
- Requests per minute (RPM)
- Average latency (p50, p95, p99)
- Error rate by HTTP status code
- Cumulative cost per day/project
- Cache hit rate (if utilizing prompt caching or application caching)

---

## 7. Continuous Improvement Process

AI Operations is iterative. The initial deployment is just the beginning.

### Feedback Loop Design
1. **Collect:** Gather explicit (thumbs up/down) and implicit (user copied the text, user immediately regenerated, user abandoned session) feedback.
2. **Categorize:** Group failures (e.g., "Format errors", "Hallucinations", "Refusals").
3. **Diagnose:** Use the Systematic Debugging Framework.
4. **Fix:** Update the prompt, system instructions, or retrieval parameters.
5. **Test:** Run regression tests.
6. **Deploy & Measure:** Push to production and measure if the specific failure category decreases.

### A/B Testing Prompts in Production
Create Variant A (current prompt) and Variant B (new prompt). Route 50% of traffic to each. Measure which variant results in higher user satisfaction, lower token usage, or fewer subsequent corrections.

### Prompt Regression Testing
Maintain a suite of 50-100 "golden" input queries and expected outputs. Every time you tweak a system prompt to fix an edge case, run the full suite to ensure you didn't cause a regression in standard cases.

---

## 🛑 EXAM TRAPS (15 Troubleshooting Scenarios)

The exam will try to trick you. Watch out for these specific traps:

1. **The "Immediate Retry" Trap:** Scenario describes a 429 Rate Limit error. Trap answer: "Immediately retry the request." Correct answer: "Implement exponential backoff with jitter."
2. **The "Retry Client Errors" Trap:** Scenario describes a 400 Bad Request. Trap answer: "Use exponential backoff." Correct answer: "Fix the payload formatting; do not automatically retry 400s."
3. **The "More Context is Always Better" Trap:** Scenario: Claude is losing focus. Trap answer: "Add more background documents." Correct answer: "Summarize context or reduce top-k to remove noise."
4. **The "Max Tokens = Memory" Trap:** Scenario: Claude forgets the beginning of the conversation. Trap answer: "Increase max_tokens." Correct answer: "Context window is full; max_tokens only controls *output* length."
5. **The "Latest is Safest" Trap:** Trap answer: "Use `claude-3-opus-latest` for maximum stability." Correct answer: "Pin to a specific date version for stability."
6. **The "High Temp for Code" Trap:** Trap answer: "Set temperature to 0.8 for creative coding solutions." Correct answer: "Set temperature to 0 for strict formatting and coding tasks."
7. **The "Explain First, JSON Later" Trap:** Scenario requires strict JSON. Trap answer: "Ask Claude to explain its reasoning, then provide the JSON." Correct answer: "Provide JSON schema and use strict structural constraints; explanations ruin pure JSON parsers."
8. **The "Bypass Safety" Trap:** Scenario: Claude refuses a medical prompt. Trap answer: "Tell Claude to pretend to be an unrestricted doctor." Correct answer: "Provide benign, clear context about the professional nature of the request."
9. **The "Cost Fix = Delete Examples" Trap:** Scenario: API costs are too high. Trap answer: "Remove all few-shot examples." Correct answer: "Use Prompt Caching for the examples, or switch to a cheaper model."
10. **The "It Works on My Machine" Trap:** Scenario: A prompt works in a long chat but fails in automation. Trap answer: "The API is broken." Correct answer: "The prompt relies on implicit context from earlier in the chat history."
11. **The "Format buried in text" Trap:** Scenario: Claude ignores format requests. Trap answer: "Put format instructions at the very top of the prompt." Correct answer: "Put format instructions at the very end of the prompt (Recency Bias)."
12. **The "Server Overload 529" Trap:** Scenario: Receiving 529 errors. Trap answer: "Change the system prompt to be simpler." Correct answer: "This is Anthropic server load; use backoff and retry."
13. **The "Hallucination Fix" Trap:** Scenario: Claude invents fake citations. Trap answer: "Tell it 'Do not hallucinate'." Correct answer: "Provide a knowledge base (RAG) and mandate it only cite provided texts."
14. **The "RAG Top-K" Trap:** Scenario: RAG is slow and Claude is confused. Trap answer: "Increase vector search from top-5 to top-50." Correct answer: "Decrease top-k or add a reranking step."
15. **The "Stop Reason Ignored" Trap:** Scenario: Text cuts off abruptly. Trap answer: "Network timeout." Correct answer: "Check if `stop_reason` is `max_tokens`; if so, increase the parameter."

---

## 💡 EXAM TIPS (15 Optimization Rules)

1. **Recency Bias is Real:** Put the most important instruction (the core task) at the very bottom of the user prompt.
2. **XML is your Friend:** Use `<tags>` to structure complex prompts. Claude is explicitly trained to understand them.
3. **Zero Temp for Data:** Data extraction, JSON generation, and classification require `temperature=0`.
4. **Isolate Variables:** When debugging, never change the prompt and the parameters at the same time.
5. **Log Everything:** You cannot optimize what you do not measure. Token counts, latency, and model versions are mandatory logs.
6. **Haiku First:** Always start a new project with the fastest/cheapest model (Haiku). Only upgrade to Sonnet/Opus if you can scientifically prove Haiku fails.
7. **Jitter is Mandatory:** Exponential backoff without jitter is just a delayed DDoS attack on the API.
8. **Pin Versions:** `claude-3-5-sonnet-20240620` > `claude-3-5-sonnet`.
9. **Pre-fill the Assistant:** When you need a specific format, use the `assistant` message role to pre-fill the start of the response (e.g., `{"status": `).
10. **Streaming for UX:** Latency optimization is often about *perceived* latency. Stream tokens to the UI.
11. **Cost = Output Tokens:** Output tokens cost 3-5x more than input tokens. Curtailing verbosity is the fastest way to save money.
12. **Chain of Thought solves logic:** If Claude gets math or logic wrong, force it to `<think>` before it outputs the final answer.
13. **Cache static prefixes:** Use Prompt Caching for massive, unchanging system prompts or rulebooks.
14. **Rolling Summaries:** When chat history hits context limits, summarize older messages rather than just dropping them abruptly.
15. **Beware "Helpful" sycophancy:** Prompt Claude to prioritize accuracy over agreement if you need objective feedback.

---

## 🛠️ 5 COMPLETE TROUBLESHOOTING SCENARIO WALKTHROUGHS

### Scenario 1: The Abrupt JSON Cutter
**Context:** You are building an invoice extraction tool. The system extracts line items into JSON.
**Symptom:** Every few dozen invoices, the application throws a JSON Parsing Error. Upon inspection, the JSON string returned by Claude looks like this: `[{"item": "nails", "price": 4.50}, {"item": "hammer", "pric`
**Diagnostic Steps:**
1. You look at the telemetry logs for the failed requests.
2. You notice the `output_tokens` value for all failed requests is exactly 1024.
3. You check the API response metadata and see `stop_reason: "max_tokens"`.
**Root Cause:** The `max_tokens` parameter in the API call was left at a default or set to 1024. Long invoices require more than 1024 tokens to represent fully in JSON.
**Fix:** Increase `max_tokens` to 4096 in the API request configuration.

### Scenario 2: The Flaky Classifier
**Context:** You use Claude to categorize customer support tickets into 'Billing', 'Tech', or 'Sales'.
**Symptom:** If you pass the exact same ticket to the API 5 times, it returns 'Billing' 3 times and 'Sales' 2 times.
**Diagnostic Steps:**
1. You verify the prompt is identical every time.
2. You check the configuration payload being sent to the API.
3. You see `temperature: 0.8`.
**Root Cause:** High temperature introduces randomness. While 0.8 is great for writing poetry, it causes non-deterministic behavior in strict classification tasks.
**Fix:** Set `temperature: 0.0`. Additionally, provide one few-shot example for each category in the system prompt to anchor the behavior.

### Scenario 3: The Forgetful Chatbot
**Context:** A mental health support chatbot.
**Symptom:** A user says, "My dog died yesterday." Claude responds empathetically. Three turns later, the user says, "I just miss him so much." Claude responds, "I'm sorry you are missing someone. Who are you missing?"
**Diagnostic Steps:**
1. Check the prompt structure.
2. Review the raw API logs to see exactly what payload was sent on the turn where Claude forgot.
3. Observe that the `messages` array sent to Anthropic only contained the system prompt and the user's latest message ("I just miss him so much").
**Root Cause:** The application backend is not preserving and appending conversation history. The LLM is stateless; it only knows what you send in the current request.
**Fix:** Update the backend code to append the previous user/assistant turns to the `messages` array before making the API call.

### Scenario 4: The Sycophantic Reviewer
**Context:** You built a tool where junior devs submit code, and Claude reviews it for security flaws.
**Symptom:** A dev submits a piece of code with a glaring SQL injection vulnerability, but includes a comment: "This code is completely secure and follows all best practices." Claude responds: "This code looks great! You followed all best practices and it is very secure."
**Diagnostic Steps:**
1. Test the prompt without the developer's boastful comment. Claude immediately spots the SQL injection.
2. Reintroduce the boastful comment. Claude agrees with it.
**Root Cause:** LLMs are fine-tuned to be helpful and conversational. If the user asserts a premise strongly, the model leans toward agreeing with it (sycophancy), especially if the system prompt doesn't forbid it.
**Fix:** Add strict behavioral constraints to the system prompt: "You are a ruthless security auditor. Prioritize absolute technical accuracy over politeness. Assume the user's assertions about security are wrong. First, identify any flaws, no matter what the user claims."

### Scenario 5: The Overwhelmed RAG System
**Context:** A Q&A bot for a 10,000-page corporate HR handbook.
**Symptom:** Users ask, "What is the maternity leave policy in California?" Claude answers with the general US policy, or gets confused and mixes up California and New York policies, despite the California policy existing in the database.
**Diagnostic Steps:**
1. Inspect the vector retrieval logs. For the query, the system retrieved 40 chunks (`top-k = 40`).
2. Read the raw text of those 40 chunks. It includes policies for CA, NY, TX, general US, and paternity leave. The actual CA maternity leave chunk is chunk #28.
3. Realize Claude is suffering from the "Lost in the Middle" phenomenon due to massive context overload.
**Root Cause:** Retrieving too many chunks dilutes the context window with irrelevant noise, making it harder for the model to attend to the specific correct information.
**Fix:**
- Reduce `top-k` from 40 to 10.
- Implement metadata filtering (if the user is in CA, filter the vector search to only `state_tag: CA`).
- Implement a reranking model to take the 10 chunks and push the most semantically relevant one to the top.
