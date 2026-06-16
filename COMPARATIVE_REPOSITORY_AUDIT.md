# Comparative Repository Audit

This document provides a comprehensive comparative audit of Project A (Carbon-Twin), Project B (carbon-track), and Project C (carbon-footprint-assistant) across multiple dimensions.

## PHASE 1 — REPOSITORY FORENSICS

### Project A: Carbon-Twin (Current Project)
1. **Total source files:** 80 files
2. **Folder structure quality:** Good separation of standard Next.js concerns (components, lib, store, api), but lacks test co-location and domain-driven boundaries.
3. **Largest files:** 
   - `carbon-store.ts` (17.6 KB)
   - `AboutClient.tsx` (16.3 KB)
   - `ScienceClient.tsx` (15.5 KB)
4. **Largest components:** `AboutClient`, `ScienceClient`, `Hero`, `ActionCenter`. These are monolithic UI components handling too much layout and state.
5. **State management approach:** Uses `zustand`. However, it acts as a "God Object", managing quiz state, simulator state, quests, and async API logic all in one place.
6. **Testing strategy:** Vitest. Very low coverage. Only 6 test files (`api.test.ts`, `carbon-engine.test.ts`, etc.) for 80 files. Almost no UI component testing.
7. **Security implementation:** Next.js API rate-limiting and Zod schema validation in `route.ts`. Basic but functional.
8. **Build quality:** Standard Next.js with Tailwind CSS v4. No obvious build anomalies.
9. **TypeScript quality:** Generally strict, uses Zod for boundary validation.
10. **Dependency complexity:** Low (`zustand`, `recharts`, `framer-motion`, `@google/generative-ai`).
11. **Estimated maintainability score:** 65/100
12. **Estimated technical debt:** Medium-High (Monolithic store, massive UI components, low test coverage).
13. **Estimated architectural maturity:** Medium.

### Project B: carbon-track
1. **Total source files:** 110 files
2. **Folder structure quality:** Excellent. Highly modularized with test co-location.
3. **Largest files:** 
   - `tips-engine.ts` (6.8 KB)
   - `calculator.test.ts` (5.3 KB)
   - `storage.test.ts` (5.2 KB)
4. **Largest components:** Smaller, focused components. The largest is `useCalculatorForm.ts` at ~4.4 KB.
5. **State management approach:** React Hooks (`useState` / Context) and decoupled utility logic. No massive global store.
6. **Testing strategy:** Playwright (including `a11y.spec.ts`) + Vitest. Exceptional coverage with 18 test files covering UI, storage, schemas, formatting, and calculation logic.
7. **Security implementation:** Uses `firebase-admin`, implying secure Firebase Auth and rules integration.
8. **Build quality:** Clean Next.js setup.
9. **TypeScript quality:** Excellent. Small, strongly-typed files.
10. **Dependency complexity:** Medium (requires Firebase setup, which adds backend complexity).
11. **Estimated maintainability score:** 90/100
12. **Estimated technical debt:** Low.
13. **Estimated architectural maturity:** High.

### Project C: carbon-footprint-assistant
1. **Total source files:** 104 files
2. **Folder structure quality:** Very good. 
3. **Largest files:** 
   - `Select.tsx` (9.0 KB)
   - `page.tsx` (8.7 KB)
   - `AssistantChat.tsx` (8.4 KB)
4. **Largest components:** `Select.tsx` and `AssistantChat.tsx`.
5. **State management approach:** Zustand, but highly modular. `carbon-store.ts` is only 2.4 KB.
6. **Testing strategy:** Playwright + Vitest. 19 test files covering formatting, sanitization, analysis, routes, and UI components.
7. **Security implementation:** Exceptional. Explicit files for `sanitize.ts`, `rate-limit.ts`, `headers.ts`, and Zod validation.
8. **Build quality:** Standard Next.js.
9. **TypeScript quality:** Excellent.
10. **Dependency complexity:** Low (`server-only`, `zod`, `lucide-react`, `clsx`).
11. **Estimated maintainability score:** 88/100
12. **Estimated technical debt:** Low.
13. **Estimated architectural maturity:** High.

---

## PHASE 3 — DEPLOYED APPLICATION AUDIT

**Project A (Carbon-Twin)**
1. **Time-to-value:** High friction. The user must answer multiple quiz questions before seeing their "Aura" and "Twin".
2. **User onboarding friction:** High, due to the mandatory initial flow.
3. **Navigation complexity:** Low. The linear flow (landing -> quiz -> reveal -> dashboard) is easy to follow.
4. **Cognitive load:** Low. Gamified UI (Auras, Quests) masks the complex data well.
5. **Scientific credibility:** Medium. It provides breakdowns and projections, but focuses heavily on gamification.
6. **Accessibility indicators:** Poor. No automated a11y tests detected in the repository.
7. **Responsiveness:** Good.
8. **Performance indicators:** Medium (some large components may affect Time to Interactive).
9. **Error handling:** Good (API fallback logic present in the store).
10. **Feature completeness:** High (Twin generation, life replay, quests, simulator).

**Project B (carbon-track)**
1. **Time-to-value:** Fast. Users likely hit the dashboard or calculator immediately.
2. **User onboarding friction:** Low.
3. **Navigation complexity:** Low.
4. **Cognitive load:** Medium. More clinical data presentation.
5. **Scientific credibility:** High. Dedicated `emission-factors.ts` and robust calculation tests.
6. **Accessibility indicators:** Excellent (explicit `a11y.spec.ts`).
7. **Responsiveness:** Good.
8. **Performance indicators:** High. Small files and focused components.
9. **Error handling:** High.
10. **Feature completeness:** High (focused on tracking and tips).

**Project C (carbon-footprint-assistant)**
1. **Time-to-value:** Fast. AI Chat interface.
2. **User onboarding friction:** Low.
3. **Navigation complexity:** Low.
4. **Cognitive load:** High. Reading AI-generated text requires more cognitive effort than scanning visual gamified dashboards.
5. **Scientific credibility:** Medium (relies heavily on AI correctness).
6. **Accessibility indicators:** Good.
7. **Responsiveness:** Good.
8. **Performance indicators:** High.
9. **Error handling:** Excellent (robust sanitization and rate limits).
10. **Feature completeness:** Medium (chat-heavy, less interactive UI modules).
