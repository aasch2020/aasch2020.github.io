# Trellix Software TLS Analysis

**June 2025** | University of California San Diego

## Overview

Utilized bpftrace to capture unencrypted TLS traffic for Trellix security monitoring platform; analyzed captured traffic.

GENERATED: The work addressed privacy and scope of real-time monitoring agents (Trellix HX) and compared terms of service with Norton 360. We traced network data from Trellix components (xAgent and Qualys Cloud Agent) to determine what client data is collected and sent to Trellix and Qualys servers.

## Technologies

- bpftrace
- TLS/SSL traffic analysis
- Linux kernel probing
GENERATED: - Custom libssl/libcrypto tracing (FIPS-compliant bundles)
GENERATED: - liblzma tracing for decompressed payloads
GENERATED: - Wireshark, mitmproxy (TLS pinning encountered), ltrace/strace
GENERATED: - Ubuntu/Debian VMs for long-term runs

## Key Accomplishments

- Implemented eBPF-based traffic capture for encrypted connection analysis
- Analyzed network traffic patterns for security monitoring purposes
GENERATED: - Compared Trellix EULA vs Norton 360 on data rights, compliance fees, and termination (Trellix: perpetual/irrevocable “Threat Data” license; Norton: term-limited “Submissions”).
GENERATED: - Bypassed TLS by tracing custom libssl/libcrypto in xAgent and Qualys; recovered unencrypted payloads via bpftrace and a Python script (with some race-condition corruption).
GENERATED: - Mapped xAgent endpoints (e.g. hex01.helix.apps.fireeye.com): /poll (≈10 min), /content/v1/config, /pki/crl, /content/v1/intel (IOC/exclusions), POST /msg/v1/lo (health).
GENERATED: - Mapped Qualys Cloud Agent endpoints (qagpublic.qg1.apps.qualys.com): status, eppagentevent, CAPI (hostname, BIOS serial, MAC, config), fragment/finalize (LZMA scan data), Manifest (SQLite).
GENERATED: - Recovered and analyzed Qualys SQLite manifest (UnixCommandOS, UnixCommand, MultiPassFunctionsOS): commands for ps, ls, netstat, /etc/shadow, AWS env keys, docker ps, etc.
GENERATED: - Documented scope of exfiltrated data: running processes, file listings, network info, mount points, kernel parameters, services; concluded significant privacy impact for UCSD endpoints.

## TOS Comparison (Trellix vs Norton 360)

GENERATED: - **Data rights:** Trellix claims a non-exclusive, irrevocable, worldwide, perpetual right to use and disclose “Threat Data”; Norton grants a license to “Submissions” for the term of IP protection.
GENERATED: - **Compliance:** Trellix reserves audit and out-of-compliance fees; Norton’s consumer agreement has no comparable clause.
GENERATED: - **Termination:** Trellix may terminate features at End-of-Life; Norton may terminate access at any time with or without cause.

## TLS and Traffic Analysis

GENERATED: - **Setup:** TLS pinning blocked mitmproxy; xAgent and Qualys use custom libssl/libcrypto (likely FIPS). bpftrace used to trace calls into those libraries and into liblzma for decompressed content.
GENERATED: - **xAgent:** Polls sfServer /poll ~10 min with version, status, date/time; server returns cluster id, CRL/nonce, task struct. Fetches config (~30 min), CRLs, IOC and exclusion lists; POSTs health to /msg/v1/lo. Task scripts observed (binary/octet-stream); client PUTs task data to `/task/<task_id>/data/<data_id>`.
GENERATED: - **Qualys:** Hourly status POST; CAPI POST sends hostname, BIOS serial, motherboard ID, BIOS UUID, MAC, agent status, config IDs; response has scan intervals (Inventory, Vulnerability, etc.). fragment/1/finalize sends LZMA-compressed scan output (ps, ls, systemctl, ifconfig, netstat, df, meminfo, etc.). Manifest endpoint returns SQLite DB defining UnixCommandOS/UnixCommand and MultiPassFunctionsOS (base64 commands/scripts).
GENERATED: - **Cipher suites:** Qualys (185.125.190.32) TLS 1.2 TLS_AES_256_GCM_SHA384; xAgent (52.6.220.203) TLS 1.2 TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384.

## Further Work

GENERATED: - No actionable vulnerabilities found. Potential future work: remote adversary modifying the SQLite manifest to push commands for remote control; compromise of Trellix/Qualys servers could allow hijacking of deployed clients.

## Sources

<p>
	<a href="/assets/pdfs/Trellix.pdf" class="btn" target="_blank" rel="noopener">View PDF</a>
</p>
