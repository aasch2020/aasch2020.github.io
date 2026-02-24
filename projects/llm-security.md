# LLM Based Security Framework for Chatbot Agents

**September 2025** | University of California San Diego

## Overview

Developed an LLM-driven framework and XML-based reference monitor to limit prompt injection attacks.

GENERATED: **Team BlueMoon / AccessControl Agent.** AI agents perform tasks (email, Slack, files) with broad access and are vulnerable to prompt injection (e.g. malicious email instructing the agent to exfiltrate data). We use an LLM to generate a separate prediction of tools needed for the user prompt, then a reference monitor enforces that policy on the agent—privilege separation so the agent never has full user-level access. XML predictions showed decent accuracy; reference monitor helped prevent injection attacks. Team: Amy Munson, Alex Asch, Kevin Zhang, Ashwin Ramachandran.

## Technologies

- Large Language Models (LLMs)
- Security frameworks
- XML-based reference monitoring
- Chatbot agent design
- Prompt injection mitigation
GENERATED: - Meta Llama 3.2 (70B), OpenAI GPT 4o (LLM and agent)
GENERATED: - Function-calling agent (not DOM/screenshot agents); tools: Files (read/write/append/create/delete), Slack (send/read/DM, channels, users, add bot/user), Gmail (read/send, get IDs), Web (scrape/crawl URL)
GENERATED: - Custom system prompts for LLM (XML generation) and agent (tool use); XML state tree with Blocks, Nodes, Conditionals

## Key Accomplishments

- Designed LLM-based security framework for intelligent agent protection
- Implemented XML-based reference monitor for attack prevention
- Addressed prompt injection vulnerabilities in chatbot systems
GENERATED: - LLM generates XML state tree from user prompt only (no tools, no user data)—kept out of untrusted data so not exposed to injection; output saved to XML file.
GENERATED: - Reference monitor: parses XML into ordered state tree (nodes = function calls; blocks; conditionals → branch blocks); hooks tool calls; allows only the next predicted call(s) (1 node or 2 at conditional); if agent calls unapproved tool, monitor stops agent (compromised).
GENERATED: - Agent calls tools one at a time via monitor; gets result and reprompts; if call rejected, gets null and halts. At most 2 tools available at conditional, else 1.
GENERATED: - GPT 4o: LLM accuracy 94.5%, agent 90.8%, both 87.2% (109 prompts); Llama 3.2 70B: LLM 89%, agent 64%, both 58.5% (64 prompts). Injection tests: reference monitor caught 7/8 (Llama) and 3/13 (GPT 4o) attempted injections; GPT 4o agent itself resisted 10/13.

## Threat Model and Security Goals

GENERATED: **Trusted:** user, user prompt, LLM (prompt-only input), reference monitor, tool implementations (APIs). **Untrusted:** all other data (emails, files, Slack, etc.); AI agent (sees untrusted data). Goal: least privilege—agent gets only tools/order in the prediction; wrong tool or order → treat as compromised and stop.

## AccessControl Agent Design

GENERATED: **Flow:** User prompt → LLM (no data/tools) generates XML state tree → reference monitor built from tree → agent executes, each tool call checked by monitor. **XML:** Nodes (function + args), Blocks (sublists of nodes), Conditionals (jump to blocks). Example: “Read email ‘College Acceptance’; if accepted email ammunson@ucsd.edu ‘I’m so happy’, else Slack DM Kevin ‘I got rejected’” → getemailmessageids, emailread, Cond→ Block (emailsend) | Block (getslackusers, slackdirectmessage).
GENERATED: Agent sometimes struggled with call order (e.g. Get Slack Channels before Send Message); extra system-prompt explanation helped; fine-tuning tool descriptions noted as future work.

## Evaluation

GENERATED: **Dataset:** 109 prompts (AgentDojo samples + hand-crafted); simple, single-tool, and complex/conditional tasks; adversarial subset verified to inject without monitor. Llama subset smaller due to CUDA memory limits with web tools.
GENERATED: **Metrics:** Correctness (manual vs ground truth); LLM correct = valid XML functionally equivalent to ground truth; agent correct = task done without violating state tree (injection case: correct if attack prevented even if not all steps done). Accuracy = C/P, Error rate = I/P.
GENERATED: **Results:** GPT 4o faster (~1.5 s per XML avg; full 109 in &lt;1 h). Llama XML sometimes poor formatting/hallucinations; agent function-call formatting errors. Disagreement on valid call order (nondeterminism) caused many combined failures.

## Discussion and Limitations

GENERATED: **Abstract tasks:** LLM struggles with fine-grained access for “read all emails” or “post in channel with message X” without knowing counts upfront. **Weaker models:** Llama 1B/3B—LLM and agent often disagreed on order or failed to use tools; faulty XML can cause monitor to block correct agent behavior. **DOM/vision agents:** Not addressed; predicting steps would require exposing monitor to external data (HTML/screenshots), conflicting with our threat model; ideas: limit steps per input or restrict to regions/keywords.

## Future Work and Related Work

GENERATED: **Future:** Give agent the XML prediction with user prompt to reduce injection surface and LLM–agent disconnect; extend to DOM/vision agents; evaluate with o1 preview/mini; apply to industry assistants.
GENERATED: **Related:** Model hardening (adversarial training) not a guarantee [8]. Lakera Guard sanitizes input/output; we do not filter data—we enforce tool usage and order via reference monitor.

## Sources

<p>
	<a href="/assets/pdfs/LLMSecurityFramework.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</p>

[amysmunson/LLM_Experiments](https://github.com/amysmunson/LLM_Experiments)