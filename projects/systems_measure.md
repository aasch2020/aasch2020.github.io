# CSE 221 Project — Systems Measurement Benchmarks

**Fall 2025** | University of California San Diego

## Overview

Created a benchmark suite to characterize and measure CPU operations, memory operations, networking, and file operations on Ubuntu 24.04.03 (bare-metal dual-boot for accuracy). Implemented in C with gcc 13.3.0 (-Wall -Wextra -pedantic -O0); measurements use TSC (RDTSC/RDTSCP) with CPUID guards per Paoloni; ~75 hours total. Team: Alex Asch, Aaron Wu, Sneha De.

## Technologies

- C, gcc 13.3.0, Ubuntu 24.04.03
GENERATED: - TSC timing (CPUID/RDTSC/RDTSCP), taskset -c 0 (CPU id 0), cycle time 0.5315 ns (1881.6 MHz)
GENERATED: - lmbench-style methodologies; Fisher-Yates shuffle for randomized access; getrusage for page faults
GENERATED: - POSIX sockets (TCP client/server), mmap, posix_fadvise, madvise, O_DIRECT, pthreads, pipes, shared memory

## Key Accomplishments

- Implemented and reported CPU, memory, network, and file-system benchmarks on a single machine and (where applicable) remote/loopback.
GENERATED: - **CPU:** Timing overhead ~15.4 cycles (8.19 ns); loop overhead ~0.93 cycles; procedure call overhead 0–7 args (objdump-validated); system call (write to /dev/null) ~139.5 cycles (74.2 ns); task creation kernel thread ~15.9k cycles (8.5 μs), user process ~80.5k cycles (42.8 μs); context switch (pipe flip-flop) kernel ~3360 cycles (1786 ns), user ~4037 cycles (2146 ns), pipe overhead ~1090 cycles.
GENERATED: - **Memory:** RAM access time via pointer-chase (randomized strides): L1 ~2–3 ns, L2 ~2.5–5 ns, L3 ~40+ ns, main memory 110+ ns; bandwidth (2 threads, 1 GB): read 21.06 GB/s, write 15.36 GB/s (theoretical 68 GB/s); page fault service time ~170.7k cycles (~90.7 μs) with mmap + Fisher-Yates + MADV_RANDOM/DONTNEED.
GENERATED: - **Network:** Round-trip loopback TCP ~22.96k cycles (12.2 μs), remote TCP ~46M cycles (~2.13 ms); ICMP loopback ~0.03 ms, remote ~3.25 ms; peak bandwidth loopback read ~60.7 Gb/s, write ~53.7 Gb/s, remote read ~734.7 Mb/s, write ~655.8 Mb/s; connection overhead loopback connect/close ~115 μs / 3.2 μs, remote highly variable (medians ~271 μs connect, ~21 μs close).
GENERATED: - **File system:** File cache size inferred ~16 GB (16 GB file thrashing); file read time local sequential ~3296 ns/blk, random ~88k ns/blk; remote (ieng6 NFS) sequential ~12.8 μs/blk, random ~430 μs/blk; contention (O_DIRECT, 1–50 processes) exponential growth 1–5 processes then linear (e.g. 1577.59×P + 81785 ns for P 6–50).

## Machine and Methodology

GENERATED: **Machine:** 12th Gen Intel Core i7-1250U, 10 cores; L1d 352 KiB, L1i 576 KiB, L2 6.5 MiB, L3 12 MiB; DDR4 16 GiB, 4267 MHz, 64B cache line; NVMe Samsung 1 TB; Intel WiFi 1.13 Gb/s. Remote peer: Windows 10, AMD Ryzen 5 5600X, Intel Wi-Fi 6 AX200 1 Gb/s.
GENERATED: **Methodology:** Common boilerplate: 1M iterations per trial, 10 trials; mean and stddev; timestamp around measured block; network/disk trials reduced iterations as needed. Pointer-chase uses randomized indices to avoid prefetch; bandwidth uses posix_memalign, 1 GB, 2 threads.

## CPU and Scheduling

GENERATED: **Timing overhead:** Empty block between CPUID/RDTSC and RDTSCP/CPUID; ~15 instructions × CPI 1.28 ≈ 19 cycles predicted; measured ~15.4 cycles. **Procedure call:** 0–7 arguments, objdump instruction count × CPI; measured ~0.96–2.7 cycles per call, ~0.6 ns per added arg. **System call:** write(fd, "", 0) to /dev/null; ~207 cycles predicted (2×100 cycle mode switch + procedure); measured 139.5 cycles. **Task creation:** pthread_create/join for kernel thread; fork/wait for process; kernel ~15.9k, process ~80.5k cycles. **Context switch:** lmbench-style pipe flip-flop (produce-first vs consume-first to avoid deadlock); kernel thread ~586 ns after pipe overhead, user process ~761 ns after pipe overhead.

## Memory

GENERATED: **Access time:** Pointer-chase with Fisher-Yates randomized strides, array sizes 2^10–2^30 bytes; L1→L2 at ~2^15 B, L2→L3 at ~2^20 B, L3→main after ~2^24. **Bandwidth:** Read: 1 GB, 8-byte unroll, 2 threads; Write: store from dummy vars; measured ~21 GB/s read, ~15 GB/s write. **Page fault:** 512 MB file, mmap, posix_fadvise DONTNEED, MADV_RANDOM, Fisher-Yates access order; getrusage ru_majflt; ~90.7 μs per fault (131072 faults); within NVMe 10–100 μs range.

## Network

GENERATED: **Skeleton:** Ubuntu TCP client (connect, send/recv loops); Windows Winsock server (listener, accept loop); loopback Linux server port; timing in inner loop. **RTT:** ICMP via ping; TCP send-then-receive / receive-then-send (1000 sends × 10 runs). Loopback TCP ~12.2 μs; remote TCP ~2.13 ms; ICMP remote ~3.25 ms (high variance). **Peak bandwidth:** 16 MB chunks, 1-byte ack between chunks; socket buffers 16 MB both sides; loopback ~60.7 Mb/s read, ~53.7 Mb/s write (≈7 GB/s); remote ~734.7 Mb/s read, ~655.8 Mb/s write (~70% of 1 Gb/s). **Connection overhead:** Time connect() over 1000 attempts; time close(); loopback connect median ~8.3 μs, close ~3.2 μs; remote connect median ~271 μs, close ~21 μs; high variance from kernel socket allocation/congestion.

## File System

GENERATED: **File cache size:** mmap file 1 MB–16 GB; posix_fadvise/madvise RANDOM; Fisher-Yates page order; first trial = hard faults (high latency), later trials = cached; 16 GB thrashing (run &gt;3 h). Hard fault ~97.8 ns/page, cached ~16.3 ns/page. **File read time:** read() 4 KB blocks; sequential: lseek to start, no DONTNEED; random: pread() with Fisher-Yates block order. Local sequential ~3296 ns/blk, random ~88k ns/blk. **Remote file read:** ieng6 NFS, same code; sequential ~12.8 μs/blk, random ~430 μs/blk (~8–10× local). **Contention:** N processes, N files (1000×4 KB blocks each); O_DIRECT; pipe sync; shared memory for per-process cycles; 1–50 processes; exponential then linear growth; fits 17488.75×P + 2289 (1≤P≤5), 1577.59×P + 81785 (6≤P≤50) ns/blk.

## Summary Table (from report)

GENERATED: Measurement overhead = timing + loop. CPU: procedure ~0.6 ns per added arg; system call 74.2 ns; task creation kernel 8.5 μs / process 42.8 μs; context switch kernel 1786 ns / user 2146 ns. Memory: main 110+ ns; bandwidth 21/15 GB/s; page fault 90.7 μs. Network: loopback TCP 12.2 μs, remote 2.13 ms; loopback BW ~60 Gb/s, remote ~735/656 Mb/s. File: cache ~16 GB; local seq/rand 3.3 μs / 88 μs per block; remote 12.8 μs / 430 μs; contention linear in P (6–50).

## Sources

<p>
	<a href="/assets/pdfs/systems_measure.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</p>
