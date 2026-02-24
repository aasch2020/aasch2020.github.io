# Enhancing KVM Page Eviction: From FIFO to Approximate LRU

**June 2025** | University of California San Diego

## Overview

Worked on shadow page table implementation to optimize paging policy; evaluated with stress-ng and redis-benchmark.

GENERATED: KVM’s MMU used FIFO page eviction, which can evict frequently used pages and increase page faults. We integrated an Approximate LRU eviction policy into KVM’s MMU to improve memory reuse and reduce unnecessary evictions. Work targeted the shadow page table path (FIFO is used when EPT/hardware MMU is unavailable); TDP MMU was disabled in testing to evaluate our changes. Team: Aaron Ang, Alex Asch, Eric Huang, Justin Kaufman.

## Technologies

- KVM (Kernel-based Virtual Machine)
- Page eviction policies
- Linux kernel development
- Benchmarking tools (stress-ng, redis-benchmark)
GENERATED: - QEMU, nested virtualization (AWS c5n.metal, x86)
GENERATED: - Kernel tracing (tracepoints, Kprobes), flamegraphs
GENERATED: - Second-chance clock LRU with page tagging and global clock hand

## Key Accomplishments

- Implemented approximate LRU paging policy to replace FIFO
- Optimized shadow page table handling in KVM
- Conducted comprehensive performance evaluation with industry-standard benchmarks
GENERATED: - Modified `mmu.c` and `mmu_zap_oldest_pages()` to use access recency and LRU-based eviction; added lightweight tracking metadata per page.
GENERATED: - Ensured thread safety for multi-vCPU access with synchronization to avoid race conditions.
GENERATED: - stress-ng: page faults reduced from 117,375 (FIFO) to 112,016 (Approx. LRU).
GENERATED: - redis-benchmark: Approx. LRU showed lower latency across RPS range; FIFO latency increased under load; TDP more variable than LRU.
GENERATED: - Flamegraphs: fewer samples in `kvm_handle_page_fault`, `kvm_mmu_page_fault`, `paging64_page_fault`, `kvm_mmu_faultin_pfn` under Approx. LRU (e.g. 3.39B fewer in `kvm_handle_page_fault`); slight CPU overhead from recency tracking.

## Context: FIFO vs LRU

GENERATED: FIFO evicts the oldest page regardless of use; LRU keeps recently used pages (e.g. page 2, 5) in memory longer, reducing page faults (e.g. 5 vs 7). Related work: “LRU is Better Than FIFO” supports locality-aware retention; “It’s Time to Revisit LRU vs. FIFO” notes LRU metadata overhead in large caches—we considered this tradeoff.

## Design and Implementation

GENERATED: KVM MMU sits in kernel space; we inserted custom eviction logic into the page table code. Flow: guest memory ops → KVM traps → MMU page structures (resident/evict/fault) → host services faults; only eviction logic changed to Approximate LRU.
GENERATED: Dev environment: most team on Apple Silicon; KVM requires x86. Used AWS c5n.metal for KVM builds and testing; one x86 laptop for local tests (re-partitioned Windows EFI for larger kernels). TDP MMU disabled to exercise shadow paging.

## Challenges and What Worked

GENERATED: **Challenges:** Environment setup (nested virt, ARM vs x86), understanding KVM/MMU codebase, stability on larger tests limiting extra benchmarks. TDP MMU could not be optimized this way—work applies to shadow MMU only.
GENERATED: **What worked:** Second-chance clock LRU with new tagging functions and global clock hand; performant and better than FIFO in our results; some stability/deadlock concerns remain.

## Conclusion and Future Work

GENERATED: Approximate LRU reduced page faults and improved locality at the cost of slight CPU overhead; viable alternative to FIFO for workloads that benefit from better retention. Future: tune LRU parameters and fix stability issues; broader workloads and configs; compare with hybrid FIFO-LRU or ML-driven eviction.

## Sources

<div>
	<a href="/assets/pdfs/KVM.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</div>

[aaron-ang/kvm](https://github.com/aaron-ang/kvm)