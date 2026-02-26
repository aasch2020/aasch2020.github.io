# CSE 221 Project — Systems Measurement Benchmarks

**Fall 2025** | University of California San Diego

# Systems Measurement Benchmarks — Project Copy (v2)

## Summary

A **C benchmark suite** that measures CPU (timing, procedure and system calls, task creation, context switch), memory (access time, bandwidth, page faults), network (TCP RTT, bandwidth, connection overhead, loopback and remote), and file system (cache size, sequential/random read, remote NFS, contention) on Ubuntu 24.04.03 using TSC timing and lmbench-style methods.

## Motivation

We wanted concrete numbers for how this machine (and, where relevant, the network) behaves: timing overhead, cache hierarchy, bandwidth, contention. That supports performance reasoning in systems work and mirrors lmbench-style experiments with controlled, reproducible setup (bare-metal dual-boot, fixed compiler flags, Fisher-Yates randomization to limit prefetch effects).

## Contributions

 I collaboratively implemented CPU system-call overhead, context switch time, memory access time and memory bandwidth. I also implemented all network benchmarks (round-trip time, peak bandwidth, connection overhead). 

## Stack

- **Language:** C (gcc 13.3.0, -Wall -Wextra -pedantic -O0)  
- **Platform:** Ubuntu 24.04.03, bare-metal dual-boot  
- **Timing:** TSC (CPUID/RDTSC/RDTSCP), taskset -c 0  
- **APIs:** POSIX sockets (TCP), mmap, posix_fadvise, madvise, O_DIRECT, pthreads, pipes, shared memory, getrusage  
- **Method:** lmbench-style; Fisher-Yates for randomized access; 1M iterations per trial, 10 trials; mean and stddev  

## Challenge & approach

**Problem:** Getting stable, interpretable memory access times (L1/L2/L3/RAM) without prefetchers distorting results.  
**Approach:** Pointer-chase with Fisher-Yates randomized strides over arrays from 2^10 to 2^30 bytes so access order is random and prefetch helps little. That revealed hierarchy boundaries (e.g., L1→L2 ~2^15 B, L2→L3 ~2^20 B, L3→main ~2^24) and yielded access times (e.g., L1 ~2–3 ns, main 110+ ns) and bandwidth (e.g., read 21.06 GB/s, write 15.36 GB/s, 2 threads, 1 GB).

## Highlights

- **CPU** — Timing overhead ~15.4 cycles; procedure call 0–7 args; system call ~139.5 cycles; task creation kernel ~15.9k vs process ~80.5k cycles; context switch kernel ~3360 vs user ~4037 cycles (pipe flip-flop).  
- **Memory** — Pointer-chase L1/L2/L3/RAM; 2-thread bandwidth; page fault ~90.7 μs (mmap + Fisher-Yates + MADV_RANDOM/DONTNEED).  
- **Network** — Loopback vs remote TCP RTT and peak bandwidth; connection overhead; ICMP comparison.  
- **File system** — Inferred cache size (~16 GB thrashing); local sequential/random read; remote NFS; O_DIRECT contention (1–50 processes) with growth model (exponential then linear in P).

## Sources

<p>
	<a href="/assets/pdfs/systems_measure.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</p>
