# Code Quality Forensics

## PHASE 2 — STATIC ANALYSIS SIMULATION

This section simulates how tools like SonarQube, CodeClimate, Codacy, DeepSource, and Qodana would score each repository.

### Project A (Carbon-Twin)

* **Code Quality:** C (Requires improvement)
* **Maintainability:** C (Tightly coupled logic)
* **Complexity:** High (Cyclomatic complexity driven by centralized state)
* **Duplication:** Medium (Likely inside `ScienceClient.tsx` and `AboutClient.tsx`)
* **Reliability:** Low (Poor test coverage)
* **Security:** B (Zod validation, Rate limiting present)
* **Testability:** Low (God objects and massive UI components defy easy unit testing)

**Identified Issues:**
* **God Objects:** `carbon-store.ts` (17.6 KB). Manages API calls, fallback logic, AI state, UI phases, and simulator math.
* **Large Components:** `AboutClient.tsx` (16.3 KB), `ScienceClient.tsx` (15.5 KB), `Hero.tsx` (13.3 KB), `ActionCenter.tsx` (13.1 KB).
* **Long Functions:** The `generateTwin` method inside `carbon-store.ts` handles API fetching, error catching, fallback default generation, and twin data mapping in a single flow.
* **Excessive Coupling:** UI components are heavily coupled to the `useCarbonStore` hook, making them impossible to render or test in isolation without a mock store.

### Project B (carbon-track)

* **Code Quality:** A
* **Maintainability:** A
* **Complexity:** Low
* **Duplication:** Low
* **Reliability:** High (18 test files)
* **Security:** A
* **Testability:** High (Logic isolated in pure functions and custom hooks)

**Identified Issues:**
* No critical architecture smells. 
* Highest logic concentration is in `tips-engine.ts` (6.8 KB), which is properly unit-tested via `tips-engine.test.ts`.

### Project C (carbon-footprint-assistant)

* **Code Quality:** A-
* **Maintainability:** A
* **Complexity:** Low-Medium
* **Duplication:** Low
* **Reliability:** High (19 test files)
* **Security:** A+ (Extensive sanitization and header controls)
* **Testability:** High

**Identified Issues:**
* **Large Components:** `Select.tsx` (9 KB) could be slightly over-engineered.
* **Architecture Smells:** Relies heavily on text-generation paths, making deterministic UI testing difficult, though mitigated by `sanitize.test.ts` and `analyze.test.ts`.
