Feature: Install the approved Playwright MCP server for Gentle Shell.
Scope: Use only the explicitly authorized Gentle Shell MCP config and npm/browser cache paths; do not modify repository source or production files.

## Specs
S1: “Ants de instalemos el mcp Playwright MCP Server para su uso dentro de gentle-shell”
S2: “Hazlo por favor”
S3: “Sí, autorizo estas rutas” — `C:\Users\RÓMULO\.gentle-shell\mcp.json`, npm cache `C:\Users\RÓMULO\AppData\Local\npm-cache`, browser cache `C:\Users\RÓMULO\AppData\Local\ms-playwright`.
S4: “Sí, solo consultar” — read `C:\Users\RÓMULO\.gentle-shell\config.json` only to resolve Gentle Shell’s active home.
S5: “Sí, autorizo ese archivo” — write the active MCP config `C:\Users\RÓMULO\.gentle-shell\agent\mcp.json`.

## Tasks
T1 [done] (S1-S5) Confirm active Gentle Shell home, Node/npm versions, and existing MCP registration; route: parent; commit: n/a (read-only).
T2 [done] (S1-S5) Register the Playwright stdio server with headless/isolated options and use only the approved npm/browser caches; route: parent; commit: n/a (user-level config outside Git).
T3 [blocked] (S1-S5) Verify the registration and MCP server startup/browser availability; route: parent + gentle-ai-verify; commit: n/a (user-level config outside Git); blocked by the timed-out list check and unavailable verifier routing.

## Log
L1: “Ants de instalemos el mcp Playwright MCP Server para su uso dentro de gentle-shell”
L2: “Hazlo por favor”
L3: User selected “Sí, autorizo estas rutas” for the three paths listed in S3.
L4: User selected “Sí, solo consultar” for the read-only home-resolution check in S4.
L5: User selected “Sí, autorizo ese archivo” for the active config path in S5.
L6: `gentle-shell mcp add playwright -- npx -y @playwright/mcp@latest --headless --isolated` exited 0 and reported: `Added global MCP server "playwright" in C:\Users\RÓMULO\.gentle-shell\agent\mcp.json.`
L7: The subsequent `gentle-shell mcp list` check timed out after 20 seconds; it was not retried.
L8: Native review was unassessable because the repository has untracked files. The risk assessment requires an independent verifier, but session routing returned `session messaging is not ready`, so that verifier is unavailable.
