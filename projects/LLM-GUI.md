# A Graphical Interface for Structured Prompting with Large Language Models

**March 2026** | University of California San Diego

## Summary

We present a **graphical, tree-based interface for structured prompting with large language models (LLMs)** that replaces linear chat interactions with an exploratory prompt graph. Instead of a single conversation thread, users construct a branching structure of prompts where each node represents a reasoning step, sub-question, or refinement direction. A pilot study shows that this interface improves perceived organization, supports exploratory learning, and encourages iterative reasoning over linear prompting.

## Motivation

Standard LLM interfaces are linear and text-heavy, making it difficult for users to:
- Track multiple reasoning paths
- Revisit earlier ideas easily
- Understand the global structure of exploration
- Apply structured prompting techniques (e.g., CoT, decomposition) without explicit training

While prompt engineering techniques improve model performance, they remain largely inaccessible to non-expert users. We aim to embed these techniques directly into the interface by making prompting **visually structured and navigable**.

## Contributions

We designed and implemented a **node-based LLM interaction system** where prompts form a dynamic tree. Specifically:

- Built a **prompt graph interface** where each node represents an LLM interaction  
- Enabled **multi-branch generation (3–5 child nodes per prompt)** for exploration  
- Added **re-prompting side nodes** for refinement and clarification  
- Supported **navigation, traversal, and revisitation of prior reasoning paths**  
- Conducted a **pilot usability study (n=4)** using think-aloud protocols and semi-structured interviews  
- Performed **thematic analysis** to identify user behavior patterns and usability themes  

## Stack

- **Frontend:** React  
- **Graph UI:** React Flow (node-based interface system)  
- **Backend:** Node.js session-based web application  
- **LLM:** Gemini API  
- **Evaluation:** Think-aloud protocol, screen/audio recording, thematic analysis (Braun & Clarke)  

## Challenge & approach

**Problem:**  
LLM interactions are inherently linear, which limits exploratory reasoning, branching thought processes, and structured prompt refinement. Users also struggle to apply advanced prompting strategies without explicit instruction.

**Approach:**  
We reframed prompting as a **graph traversal problem instead of a chat stream**. Each prompt becomes a node in a tree, and the system generates structured child nodes representing alternative reasoning paths.

This enables users to:
- Explore multiple reasoning directions in parallel  
- Revisit and compare prior nodes  
- Iteratively refine prompts through side branches  
- Maintain a structured mental model of exploration  

Additionally, by limiting context to local node state, we reduce context window overload and improve modular reasoning behavior.

## Highlights

- **Chains of reasoning visualized:** Users reported improved understanding of how ideas connect compared to linear chat interfaces  
- **Exploratory learning behavior:** Branching encouraged brainstorming-style exploration of topics  
- **Mental model alignment:** Participants described the interface as matching their natural thought process  
- **Iterative prompting loop:** Users engaged in refinement cycles rather than one-shot queries  
- **Revisitation needs:** Strong demand for history tracking and node revisit functionality  
- **Tradeoff identified:** Branching improves exploration but can increase cognitive load for unfamiliar topics  

## Links

<div>
	<a href="/assets/pdfs/LLM-GUI-Paper.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</div>

[aasch2020/LLM-GUI](https://github.com/aasch2020/LLM-GUI.git)