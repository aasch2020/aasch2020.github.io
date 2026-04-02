# Type-Based Static Analysis for Access Control in TypeScript

**March 2026** | University of California San Diego

## Summary

We present **TypeSAST**, a hybrid static analysis system for enforcing **access control policies in TypeScript** using a combination of JSDoc-encoded type transformations and symbolic execution. The system embeds role-based access constraints directly into the TypeScript type system via AST-level transformations, enabling fast compile-time detection of privilege violations. To reduce false positives introduced by static analysis limitations, we augment the pipeline with a secondary symbolic execution phase using ExpoSE for targeted validation of ambiguous call paths.

## Motivation

Static Application Security Testing (SAST) tools are widely used in CI/CD pipelines, but suffer from persistent usability issues:

- High false positive rates reduce developer trust
- Global rule enforcement makes fine-grained tuning difficult
- AST-heavy or CFG-based tools are slow and hard to interpret
- Error messages are often unclear or disconnected from developer intent

We aim to address these issues by:
- Moving security rules **into the code itself via JSDoc annotations**
- Encoding access rules directly in the **TypeScript type system**
- Reducing analysis overhead via a **fast static pass + targeted symbolic execution fallback**

## Contributions

- Designed **TypeSAST**, a role-based access control SAST prototype for TypeScript  
- Introduced a **JSDoc-based annotation system** for encoding access constraints at function/block level  
- Built a **multi-pass AST transformation pipeline using ts-morph**  
- Implemented **role hierarchy compilation via a DSL (Despot)**  
- Developed a **symbolic execution fallback using ExpoSE** for resolving false positives  
- Created a **driver generation system with callsite backtracking for targeted symex execution**  
- Evaluated system behavior on aliasing, callbacks, and control-flow-sensitive access patterns  

## Stack

- **Language:** TypeScript / JavaScript  
- **AST Transformation:** ts-morph  
- **DSL:** Chevrotain (Despot role configuration language)  
- **Symbolic Execution Engine:** ExpoSE  
- **Runtime Instrumentation:** Custom JS state tracking layer  
- **Tooling:** Node.js, TypeScript Compiler API  

## Challenge & Approach

### Challenge

Static analysis for access control suffers from two core issues:

1. **Over-approximation (false positives)** due to limited control-flow sensitivity  
2. **Under-approximation (false negatives)** when functions are passed as first-class values (callbacks, aliases, higher-order functions)

Additionally, global rule systems make it difficult to express **localized developer intent**.

### Approach

We introduce a two-layer system:

**1. Static Type-Based Enforcement (V0/V1)**
- JSDoc annotations (`@requiresRole`, `@becomesRole`, `@raised`)
- Transpilation into TypeScript type-level constraints
- Role propagation via AST transformation
- Compile-time detection using TypeScript type checker

**2. Symbolic Execution Fallback**
- Converts flagged code into ExpoSE-compatible JS
- Generates execution drivers via callsite backtracking
- Uses symbolic inputs to validate real execution feasibility
- Filters false positives by exploring only reachable violation paths

This hybrid design keeps most analysis **fast and type-driven**, while using symbolic execution only where necessary.

## Highlights

- **Localized security rules:** Developers define access constraints directly at function level via annotations  
- **Fast static pass:** Most violations detected at compile time without runtime analysis  
- **Reduced analysis scope:** Symbolic execution only triggered on flagged paths  
- **Callback limitation identified:** First-class function flows remain a major challenge  
- **High–low–high control flow edge case exposed:** Demonstrates limits of purely static approaches  
- **Role DSL (Despot):** Enables structured hierarchy definition and validation  
- **Tradeoff observed:** Improved precision vs increased system complexity in symex layer  

## Links

<div>
	<a href="/assets/pdfs/typesast.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</div>

[github.com/aasch2020/TypeSAST](https://github.com/aasch2020/TypeSAST)