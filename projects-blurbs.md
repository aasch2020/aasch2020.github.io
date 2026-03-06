# Project blurbs (local reference only)

Short **Description + Role + Key findings** per project. Not linked in site navigation.

---

## Trellix Software TLS Analysis

**Description:** Traced what Trellix HX monitoring agents (xAgent, Qualys Cloud Agent) send over the network by bypassing TLS with bpftrace on their custom libssl/libcrypto and liblzma; mapped endpoints and payloads and compared Trellix terms to Norton 360.

**Role:** Designed and used bpftrace probes to trace custom libssl/libcrypto and liblzma, recover unencrypted payloads, and map endpoints (xAgent /poll, config, CRL, IOC; Qualys CAPI, fragment/finalize, Manifest). Analyzed the Qualys SQLite manifest to list collected commands and data.

**Key findings:** Documented xAgent and Qualys endpoints, poll intervals, and data sent (hostname, BIOS, MAC, config; LZMA scan output; SQLite with ps, ls, netstat, /etc/shadow, AWS env, docker, etc.). Scope of exfiltrated data: processes, files, network, mounts, kernel params, services. Trellix EULA grants perpetual/irrevocable “Threat Data” rights vs Norton’s term-limited “Submissions.”

---

## Bloombase

**Description:** Web app integrating iNaturalist API for biodiversity data, Py4Web backend, and Google Maps front-end for geospatial visualization.

**Role:** Full-stack development: backend (Py4Web, data processing/storage), frontend (Google Maps), and integration of the iNaturalist API and database design.

**Key findings:** Demonstrated end-to-end integration of third-party biodiversity API with a custom backend and map-based UI; reusable pattern for geospatial + API-driven web apps.

---

## Enhancing KVM Page Eviction (FIFO → Approximate LRU)

**Description:** Replaced KVM’s FIFO shadow-page eviction with an Approximate LRU policy; evaluated with stress-ng and redis-benchmark on the shadow MMU path (TDP disabled).

**Role:** Collaboratively modified KVM MMU (`mmu.c`, `mmu_zap_oldest_pages()`): access recency, second-chance clock LRU, per-page metadata, thread safety for multi-vCPU. Helped with benchmark setup, flamegraph analysis, and interpreting results.

**Key findings:** stress-ng page faults reduced (e.g. 117k → 112k); redis-benchmark showed lower latency with Approx. LRU; flamegraphs showed fewer samples in page-fault paths. Kernel thread creation ~8.5 μs vs process ~42.8 μs; context switch kernel ~1.8 μs vs user ~2.1 μs. Shadow-MMU-only change; TDP MMU unchanged.

---

## OptiBrake (Computer Vision Bicycle Braking)

**Description:** Low-cost bicycle collision avoidance: front camera + Lucas-Kanade optical flow for obstacle detection; closed-loop brake control (motor until wheel RPM = 0, then unspool); wheel odometry for distance.

**Role:** Wheel odometry, closed-loop brake control, and hardware integration; helped design and analyze indoor trials and debug optical flow and its integration with the control loop.

**Key findings:** Closed-loop braking (wheel speed as PV, motor as actuator) with interrupt-based, debounced wheel speed (weighted 9-sample RPM). Single-camera, Pi-based automatic braking validated indoors; false positives and low-speed jitter limited outdoor use—robustness would need more compute or extra sensors (e.g. LIDAR). ABS not feasible with DC motor + cable.

---

## CSE 221 Systems Measurement Benchmarks

**Description:** C benchmark suite for Ubuntu 24.04.03: CPU (timing, procedure/system calls, task creation, context switch), memory (access time, bandwidth, page faults), network (TCP RTT, bandwidth, connection overhead), file system (cache size, local/remote read, contention). TSC timing, lmbench-style methods, Fisher-Yates for randomized access.

**Role:** Implemented system-call overhead, context-switch time, memory access time and bandwidth, and all network benchmarks (RTT, peak bandwidth, connection overhead).

**Key findings:** Timing overhead ~15.4 cycles; system call ~139.5 cycles; task creation kernel ~8.5 μs / process ~42.8 μs; context switch kernel ~1.8 μs / user ~2.1 μs. Memory: L1 ~2–3 ns → main 110+ ns; bandwidth 21 / 15 GB/s (read/write); page fault ~90.7 μs. Network: loopback TCP ~12.2 μs, remote ~2.13 ms; loopback BW ~60 Gb/s, remote ~735/656 Mb/s. File cache ~16 GB; local seq/rand read ~3.3 μs / 88 μs per block; contention linear in P (6–50 processes).

---

## LLM AccessControl Agent (Prompt Injection Mitigation)

**Description:** AccessControl Agent: a separate LLM predicts tools needed from the user prompt and outputs an XML policy; a reference monitor enforces it so the agent may only call approved tools in that order, limiting prompt-injection impact.

**Role:** Built the reference monitor and integrated it with the AI agent; wrote the code that converts the LLM’s XML into the state tree. Assisted with prompt engineering, XML format, demo, presentation, deliverables, and debugging.

**Key findings:** Privilege separation (LLM sees only prompt; agent restricted by monitor). XML state tree with Nodes, Blocks, Conditionals; at most one (or two at conditionals) next call per step. Reference monitor caught many injections (e.g. 7/8 Llama, 3/13 GPT 4o); GPT 4o agent also resisted 10/13. Nondeterminism and LLM–agent call-order disagreement caused combined failures; fine-tuning tool descriptions noted as future work.
