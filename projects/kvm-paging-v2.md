# KVM Page Eviction (FIFO → Approximate LRU) — Project Copy (v2)

## Summary

We replaced KVM’s FIFO shadow-page eviction with an **Approximate LRU** policy. That cut page faults and improved locality when the shadow MMU is used; we evaluated with stress-ng and redis-benchmark.

## Motivation

KVM’s MMU used FIFO eviction on the shadow path (e.g., when EPT/TDP MMU is off), which can evict hot pages and increase faults. We added a locality-aware policy (Approximate LRU) to the shadow path to improve reuse and measure the impact with benchmarks and flamegraphs.

## Contributions

I collaboratively modified KVM MMU code (`mmu.c`, `mmu_zap_oldest_pages()`) to use access recency and a second-chance clock LRU, added lightweight per-page metadata, and made it thread-safe for multi-vCPU. I also helped with benchmark setup (stress-ng, redis-benchmark), flamegraph analysis, and interpreting results.

## Stack

- **Kernel:** Linux KVM (shadow MMU), C  
- **Eviction:** Second-chance clock LRU, page tagging, global clock hand  
- **Environment:** QEMU, nested virt (AWS c5n.metal, x86)  
- **Evaluation:** stress-ng, redis-benchmark; tracepoints, Kprobes, flamegraphs  

## Challenge & approach

**Problem:** Most of the team was on Apple Silicon; KVM and the MMU code are x86-only. We needed a stable x86 environment to build, test, and iterate.  
**Approach:** Use AWS c5n.metal for KVM builds and long runs; re-partition one x86 laptop (Windows EFI) for larger kernels and local testing. We disabled TDP MMU in experiments so the shadow path (and our FIFO→LRU change) was exercised. That let us run stress-ng, redis-benchmark, and collect flamegraphs without depending on local ARM.

## Highlights

- **Approximate LRU in shadow MMU** — Second-chance clock LRU with access recency and lightweight per-page metadata instead of FIFO.  
- **Thread-safe multi-vCPU** — Synchronization so multiple vCPUs can use the eviction structures without races.  
- **Measured gains** — stress-ng: fewer page faults, redis-benchmark: lower latency under load with Approx. LRU; flamegraphs showed fewer samples in key page-fault paths.  
- **Scope** — Changes are in the shadow MMU path only; TDP MMU unchanged.

---

*V2 project copy. Original: [kvm-paging.md](kvm-paging.md). [View PDF](/assets/pdfs/KVM.pdf) · [aaron-ang/kvm](https://github.com/aaron-ang/kvm)*
