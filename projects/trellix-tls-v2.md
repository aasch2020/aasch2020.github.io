# Trellix Software TLS Analysis — Project Copy (v2)

## Summary

**Trellix TLS Analysis** traces what Trellix HX monitoring agents send off-host. We used bpftrace to capture traffic despite TLS and custom crypto, mapped endpoints and payloads, and compared Trellix’s terms to Norton 360.

## Motivation

Enterprises run agents (Trellix xAgent, Qualys Cloud Agent) that send data over TLS with custom/FIPS libssl, so standard proxies (e.g., mitmproxy) can’t decrypt it. We wanted to see what data is exfiltrated, to which endpoints, and how that lines up with stated data rights and compliance (Trellix vs Norton 360).

## Contributions

 I designed and used bpftrace probes to trace custom libssl/libcrypto and liblzma in xAgent and Qualys, recovered unencrypted payloads, and mapped endpoints (xAgent /poll, /content/v1/config; Qualys CAPI, fragment/finalize, Manifest). I analyzed the Qualys SQLite manifest (UnixCommandOS, MultiPassFunctionsOS) to list collected commands and data.

## Stack

- **Tracing:** bpftrace (eBPF), ltrace/strace  
- **Traffic:** Wireshark, mitmproxy (blocked by pinning; used where possible)  
- **Environment:** Ubuntu/Debian VMs; tracing of custom libssl/libcrypto and liblzma  
- **Analysis:** Python for payload recovery (some race-condition limits)

## Challenge & approach

**Problem:** TLS pinning and custom/FIPS libssl blocked mitmproxy; we couldn’t decrypt at the proxy.  
**Approach:** Instrument the agents’ own libssl/libcrypto and liblzma inside the process with bpftrace, capturing plaintext before encrypt and after decrypt. A Python script turned traced data into payloads (with some race-condition noise), so we could map endpoints and payloads without breaking TLS.

## Highlights

- **Endpoint & payload mapping** — Documented xAgent and Qualys endpoints, poll intervals, and data sent (CAPI host/BIOS/MAC/config; LZMA scan output; SQLite manifest with command definitions).  
- **Manifest analysis** — Recovered and interpreted the Qualys SQLite manifest to list collected commands (ps, ls, netstat, /etc/shadow, AWS env, docker ps, etc.).  
- **Privacy impact** — Clarified scope of exfiltrated data (processes, files, network, mounts, kernel params, services) for endpoint privacy.

---

*V2 project copy. Original: [trellix-tls.md](trellix-tls.md). [View PDF](/assets/pdfs/Trellix.pdf)*
