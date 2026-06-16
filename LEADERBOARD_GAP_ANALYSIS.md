# Leaderboard Gap Analysis

## PHASE 4 — HACKATHON EVALUATOR SIMULATION

Assuming an AI evaluator scores the repositories:

**Project A (Carbon-Twin)**
* Code Quality: 65/100 (Deductions for God objects, low modularity)
* Security: 80/100 (Zod and rate limiting present)
* Efficiency: 70/100 (Monolithic store triggers excessive re-renders)
* Testing: 30/100 (Only 6 test files for 80 components)
* Accessibility: 60/100 (No explicit a11y testing)
* Problem Alignment: 95/100 (Highly engaging, strong gamification)
* **Estimated Overall Score: 66/100**

**Project B (carbon-track)**
* Code Quality: 90/100 (Excellent modularity)
* Security: 85/100 (Firebase Auth/Admin structure)
* Efficiency: 90/100 (Small bundles, clean hooks)
* Testing: 90/100 (18 test files, high coverage)
* Accessibility: 95/100 (Automated Playwright a11y specs)
* Problem Alignment: 90/100 (Highly functional, scientific)
* **Estimated Overall Score: 90/100**

**Project C (carbon-footprint-assistant)**
* Code Quality: 85/100 (Clean architecture)
* Security: 95/100 (Sanitization, rate limits, strict headers)
* Efficiency: 85/100 (Clean logic)
* Testing: 90/100 (19 test files)
* Accessibility: 85/100 
* Problem Alignment: 85/100 (Chatbots can be fatiguing)
* **Estimated Overall Score: 87/100**

---

## PHASE 5 — LEADERBOARD ANALYSIS

**1. Why might Project B rank above Project A?**
Project B has vastly superior software engineering fundamentals. It contains zero God Objects, has isolated pure functions, excellent test coverage, and automated accessibility checks. Project A relies too heavily on large monolithic files and lacks test coverage.

**2. Why might Project C rank above Project A?**
Project C has much better security configurations (`sanitize.ts`, `headers.ts`) and testing. Its state management is clean and focused (2.4 KB store vs Project A's 17.6 KB store).

**3. Which repository would likely receive the highest automated code-quality score?**
**Project B.** Small, isolated functions and zero massive monolithic components make it an ideal candidate for static analysis tools.

**4. Which repository would likely receive the highest maintainability score?**
**Project B.** The separation of concerns between UI, hooks, and calculations ensures changes can be made without breaking unrelated systems.

**5. Which repository would likely receive the highest human engineering review score?**
**Project B.** A human engineer would immediately appreciate the co-located tests and clean separation of logic.

**6. Which repository would likely receive the highest UX score?**
**Project A.** Despite its technical flaws, the "Aura", "Life Replay", and "Quests" gamification model provides a highly sticky, premium user experience compared to clinical trackers.

**7. Which repository would likely receive the highest scientific credibility score?**
**Project B.** The explicit `emission-factors.ts` and associated unit tests make the mathematics transparent and verifiable. Project A obfuscates its math behind a gamified engine.
