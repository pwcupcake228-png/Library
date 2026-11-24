# Step 4. Requirements

**Goal:** turn your brief into requirements that are specific enough to build and test.

> Keep working in OpenCode, started from the repository root.

Every agent reads `docs/requirements.md` before every task. Vague requirements = vague code. This is the most valuable 30 minutes of the project.

## 4.1 Complete the requirements with the agent

In OpenCode, switch to the **analyst** agent (`Shift+Tab` or `/agents`). It can edit only `docs/` and `data/`, so it physically cannot start writing code:

```text
Help me complete docs/requirements.md. Sections 1–4 already contain my brief.
First ask me 5–7 clarifying questions about the behavior and the data, and wait for my answers.
Then fill in section 5 (acceptance criteria in Given/When/Then form for every user story),
section 6 (entities and fields with types and validation rules, based on data/seed.json)
and section 7 (open questions).
Use the terms from docs/glossary.md; if a new term appears, add it there too.
Remove the guidance comments from the sections you fill in. Do not write any code.
```

**Expected agent behavior:**

1. It reads the file and asks questions — it does **not** start writing immediately. If it skips the questions, stop it and repeat "ask first".
2. After your answers it edits only `docs/requirements.md` (and `docs/glossary.md` if new terms appear).
3. Every user story gets 2–4 acceptance criteria, including at least one error or empty case ("Given the title is empty, when I save, then I see an error").

## 4.2 Review the requirements critically

Start a fresh session (`/new`), switch to **plan** and ask:

```text
Review docs/requirements.md as a strict QA engineer.
Which acceptance criteria are vague or impossible to test? What is missing for the MVP?
What is too big for an MVP and should move to "Out of scope"? Only list problems, do not change files.
```

**Expected agent behavior:** a list of concrete problems. Fix the ones you agree with — yourself or with the analyst. You decide, not the agent.

## 4.3 Check it yourself

Read the file once more and ask yourself:

- Could someone else build the app from this file without asking me?
- Can every acceptance criterion become a test?
- Is "Out of scope" honest?

Change the status line at the top to `Status: MVP requirements ready` and commit:

```bash
git add docs/requirements.md
git commit -m "Complete MVP requirements"
```

## ✅ Result

- [ ] Every user story has testable acceptance criteria, including error/empty cases.
- [ ] Entities and fields are listed with validation rules.
- [ ] Out of scope is filled in.
- [ ] Committed.

Next: [Step 5. Architecture](05-architecture.md)
