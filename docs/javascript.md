# JavaScript and Electron static analysis

For a directory or ASAR:

1. Confirm the path and note key file digests.
2. Locate package.json entry points (main, preload).
3. Inventory require/import and Electron IPC usage.
4. Flag source maps and native addons.
5. Return a summary graph; page into specific modules on follow-up.

Full procedure: skill reference `references/javascript-apps.md`.

Static results do not prove runtime behavior. Cross-check with browser or process observation only when explicitly requested and permitted.
