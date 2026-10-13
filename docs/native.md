# Native binary workflow

1. Confirm the file path and record its digest.
2. Locate the headless analyzer (see the ghidra skill for path discovery and environment variables).
3. Request an inventory (functions, strings, symbols) before full decompilation.
4. Follow one function or call chain at a time.
5. Cite addresses, evidence identifiers, and any coverage gaps.
6. Close the temporary project when finished.

Processor selection and timeout controls belong in the analyzer skill or bridge.
