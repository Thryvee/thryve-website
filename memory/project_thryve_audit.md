---
name: Thryve Website Code Audit Results
description: Summary of bugs found and fixed during full codebase audit — March 2026
type: project
---

Full audit completed March 2026. Fixes applied:

**Bugs fixed:**
- Email typo: `info@thhryve.com` → `info@thryve.com` in Footer.tsx and layout.tsx OG metadata URL
- FAQ copy: "run a a pilot month" → "run a pilot month" (double article)
- Removed incomplete comment `// MOBILE-PATCHED-FO` from Footer.tsx
- Theme now persists across page loads — Nav.tsx saves to localStorage on toggle, reads it on mount
- Fixed `<ProofBar />` indentation in home page.tsx
- Consolidated 3 duplicate `@media (max-width: 768px)` blocks in globals.css into one clean block
- Removed two fragile "Mobile Fixes" CSS blocks that used inline-style attribute selectors and unused class names

**Why:** Clean-up pass for aesthetics, mobile/desktop optimisation, and correctness.

**How to apply:** Future changes should not re-introduce duplicate media query blocks. Theme toggle must always call `localStorage.setItem("thryve-theme", ...)`.
