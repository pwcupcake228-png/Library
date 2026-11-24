---
description: Run lint, type checks, tests, build and E2E, then review the changes against the requirements
agent: build
---

Verify the current state of the application and the recent changes. Do not change any files while verifying: only run checks, review, and report.

Current git state:

!`git status --short`

Changed files compared to the last commit:

!`git diff HEAD --stat`

Extra focus (optional): $ARGUMENTS

Run each check from the repository root, one by one, and record the real result. Continue with the next check even if one fails.

1. Lint: `npm run lint`
2. Type check: `npm run typecheck`
3. Unit tests: `npm run test`
4. Build: `npm run build`
5. End-to-end tests: `npm run test:e2e`. If it fails because the Playwright browser is not installed, report it as NOT RUN and tell me to run `npm run test:e2e:install`.

Then review the work:

6. Read `docs/requirements.md` and check the implementation against its user stories and acceptance criteria. List which criteria are met, partly met or not met.
7. If there are code changes, ask the `reviewer` subagent to review them. Give it the list of changed files and the results of steps 1–5.

Report in this format:

| Check | Command | Result | Notes |
| --- | --- | --- | --- |

Use only these results: **PASS**, **FAIL** (include the key error lines), or **NOT RUN** (explain why). Never mark a check as PASS unless you ran it now and it succeeded.

After the table, list:
- requirements coverage,
- review findings, most severe first,
- recommended fixes in priority order,
- limitations of this verification (what was not checked).
