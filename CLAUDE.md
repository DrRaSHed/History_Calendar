\# Token Conservation \& Execution Guidelines



\### 1. Minimal Testing \& Verification

\- \*\*Never run full test suites.\*\* Run only the single test file or specific test case directly affected by your edit (e.g., `pytest tests/test\_feature.py -k test\_target` or `npm test -- -t "specific test"`).

\- \*\*Do not write speculative tests.\*\* Write only the minimal assertions requested. Do not add broad edge-case coverage or scaffolding tests unless explicitly told to do so.

\- If no tests exist for a feature, verify via a targeted script or dry-run rather than generating an entire testing harness.



\### 2. Use Cached Data \& Mocks

\- \*\*Do not fetch live external APIs or run heavy data pipelines.\*\* Use existing local cache files, fixtures, or stubbed mock responses.

\- If creating test fixtures, keep mock data payloads under 10–20 rows/records. Never generate or log large datasets into context.



\### 3. Shell \& Output Throttling

\- \*\*Filter command output.\*\* Never dump raw command outputs, giant logs, or directory dumps into the terminal. Pipe through `grep`, `head -n 20`, or `tail -n 20`.

\- Do not run blind file searches (`find .` or raw `grep -r`). Scope searches to specific subdirectories and ignore `node\_modules`, `dist`, `.git`, or cache folders.



\### 4. Surgical File Operations

\- \*\*Read selectively:\*\* When checking files over 150 lines, read specific line ranges rather than ingesting the whole file.

\- \*\*Minimal diffs:\*\* Edit only the lines necessary to implement the change. Do not reformat untouched code, reorganize imports, or perform unprompted refactoring.



\### 5. Communication Style

\- Skip pleasantries, verbose planning rundowns, and theoretical explanations.

\- Output only: the required command/patch, a 1–2 bullet summary of what changed, and the verification result.

