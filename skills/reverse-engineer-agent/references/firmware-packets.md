---
description: "Firmware region inventory and packet/capture notes. Read for firmware images or saved network captures."
connections: [native-binaries, evidence]
---

# Firmware and Packet Captures

## Firmware images

1. Confirm the absolute path and record SHA-256.
2. Inventory regions with a caller-supplied extractor (binwalk, unblob, or equivalent). Do not assume one is present.
3. List extracted members, their offsets, and types.
4. Hand native regions (ELF, PE, raw code) to the native binary workflow in `references/native-binaries.md`.
5. Preserve extractor output paths and limitations (incomplete extraction, encrypted regions).

Static inventory does not execute firmware code.

## Saved network captures

For HAR, SAZ, or pcap-style files:

1. Confirm the capture path and digest.
2. Inventory requests/responses or packets without fetching any recorded URL.
3. Note endpoints, methods, status codes, and payload locations.
4. Flag TLS SNI, DNS, or protocol distribution when a local tshark/capinfos is available.
5. Do not treat historical captures as live traffic.

## Evidence

Cite the source file digest, extractor or parser used, and any truncated or unparsed regions. See `references/evidence.md`.
