# AccessControl Agent (LLM Security) — Project Copy (v2)

## Summary

**AccessControl Agent (BlueMoon)** reduces prompt-injection risk for tool-using agents. A separate LLM predicts which tools the user’s prompt needs and outputs an XML policy; a reference monitor enforces it so the agent may only call approved tools in that order.

## Motivation

Agents that do email, Slack, and file tasks with broad access are vulnerable to prompt injection (e.g., a malicious email telling the agent to exfiltrate data). We wanted least privilege: the agent should only use tools in an order predicted from the *user’s prompt only*, not from untrusted content. So we split “what the user asked” (LLM → XML) from “what the agent may do” (reference monitor), and treat wrong tool or order as compromise and stop the agent.

## Contributions

I created the reference monitor and integrated it with the AI agent; I wrote the code that converts the LLM’s XML file into the state tree used by the reference monitor. I also assisted in prompt engineering the LLM and defining the XML format, filmed the user demo, presented the final results, assisted with deliverables, and did a large portion of the debugging.

## Stack

- **LLMs:** Meta Llama 3.2 (70B), OpenAI GPT 4o (XML generator and agent)  
- **Agent:** Function-calling agent; tools: Files, Slack, Gmail, Web  
- **Policy:** Custom system prompts; XML state tree (Blocks, Nodes, Conditionals)  
- **Enforcement:** Reference monitor parses XML, hooks calls, allows only next predicted call(s)

## Challenge & approach

**Problem:** The agent sometimes chose a different call order than the LLM’s XML (e.g., get channels before send message), so correct behavior was sometimes blocked by the monitor.  
**Approach:** Refined the agent’s system prompt for ordering and tool semantics; noted fine-tuning tool descriptions as future work. We evaluated on simple, single-tool, and complex/conditional prompts, and measured both “LLM correct” and “agent correct,” documenting where nondeterminism or formatting caused combined failures.

## Highlights

- **Privilege separation** — LLM sees only the user prompt (no tools, no user data) and produces XML; agent sees untrusted data but is restricted by the monitor.  
- **XML state tree** — Nodes (function + args), Blocks, Conditionals; monitor allows at most one next node (or two at conditionals) per step.  
- **Injection mitigation** — Monitor caught many injections (e.g., 7/8 Llama, 3/13 GPT 4o); GPT 4o’s agent also resisted 10/13 on its own.  

---

*V2 project copy. Original: [llm-security.md](llm-security.md). [View PDF](/assets/pdfs/LLMSecurityFramework.pdf) · [amysmunson/LLM_Experiments](https://github.com/amysmunson/LLM_Experiments)*
