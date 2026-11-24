# Step 5. Architecture

**Goal:** agree on how the code will be organized **before** the first line of it — so every `/implement` follows the same plan instead of inventing a new one.

## 5.1 Why now

In Step 3 you made the big decisions: storage, login, hosting. That is not enough. Without agreed code-level rules, a free model invents them again in every session: a different folder layout, a second way to call the database, a new validation style, one more UI library. After three stories you have three styles — the architecture starts to drift before the MVP is even built.

Decide once, write it down, and let every agent read it:

- how the data model looks (tables, relations, keys);
- how the backend is organized (layers, folders, ORM usage, validation, error format);
- how the frontend is organized (routing, folders, data fetching, state, forms, UI library, what gets reused);
- which libraries are used — and which are **not**.

You will do it with a new agent, the **architect**, and a new place for the docs: a `docs/architecture/` folder instead of one file.

## 5.2 Create the architect agent

An agent is not a different model — it is a role: its own instructions, its own permissions, its own context. The analyst writes *what* to build and must not invent technical decisions; the architect decides *how*. Mixing both in one prompt confuses a weak model.

In OpenCode (**build** agent):

```text
Create a new primary agent .opencode/agents/architect.md, modeled on .opencode/agents/analyst.md.
Role: software architect. It reads docs/requirements.md, docs/glossary.md, docs/features/,
the decisions already made and the code, and writes ONLY files in docs/architecture/.
For every open technical choice it proposes 2–3 options with trade-offs and waits for my choice.
It records every decision in the decision log. It never writes code.
Permissions: edit denied everywhere except docs/architecture/; shell denied except read-only git;
subagents denied except explore. Show me the file, do not change anything else.
```

**Expected agent behavior:** one new file with a frontmatter like the analyst's and a short role prompt. Check the permissions block yourself. Restart OpenCode if `architect` does not appear in `/agents`.

## 5.3 Turn the architecture file into a folder

Still in **build**:

```text
Replace docs/architecture.md with a folder docs/architecture/:
- README.md     overview: parts of the system, how they talk, cross-cutting rules (errors, validation, config, env)
- data-model.md tables, relations, keys
- backend.md    backend structure and rules
- frontend.md   frontend structure and rules
- decisions.md  the decision log (move the existing entries here unchanged)
Move the existing content into the right files and delete docs/architecture.md.
Then update every reference to docs/architecture.md: AGENTS.md, opencode.jsonc (load only
docs/architecture/README.md and docs/architecture/decisions.md into every session),
.opencode/agents and .opencode/commands (the backend agent reads backend.md and data-model.md,
the frontend agent reads frontend.md). Do not write code. Show me the list of changed files.
```

**Expected agent behavior:** five files, the decision log moved without changes, no references to the old file left. Check with a search for `docs/architecture.md` — it should find nothing outside `docs/guide/`.

Why not load all five files into every session? Free models have small limits, and every extra file in the context costs requests and attention. Each agent reads the part it needs.

## 5.4 Design it with the architect

Switch to **architect** (`Shift+Tab` or `/agents`):

```text
Read the requirements, the glossary, the planned feature and the decisions.
Propose the architecture of the MVP and fill docs/architecture/:
data model, backend layers and folders, frontend structure, libraries
(ORM usage, validation, forms, UI library or none), API conventions and error format,
and rules for reuse. Keep the planned feature in mind, but do not design it in detail.
For every open choice give me 2–3 options with trade-offs and wait for my answer.
No code.
```

**Expected agent behavior:** it asks or offers options first — it does not write a finished architecture in one go. After your answers it fills the files and adds entries to `decisions.md`. If it starts writing code, it is the wrong agent: check `/agents`.

## 5.5 Review it

Start a fresh session (`/new`), switch to **plan**:

```text
Review docs/architecture/ as a strict senior developer.
Does it cover every user story in docs/requirements.md? Does it contradict the requirements,
the glossary or the decision log? Is anything over-engineered for an MVP?
Are there choices left open that /implement would have to guess? Only list problems.
```

Then back to **architect**: "Fix findings N and M; leave K as is."

## 5.6 Commit

```bash
git add docs AGENTS.md opencode.jsonc .opencode
git commit -m "Architecture: architect agent and docs/architecture/"
```

## ✅ Result

- [ ] `.opencode/agents/architect.md` exists; it can edit only `docs/architecture/`.
- [ ] `docs/architecture/` has `README.md`, `data-model.md`, `backend.md`, `frontend.md`, `decisions.md`; `docs/architecture.md` is gone and nothing refers to it.
- [ ] The data model covers every entity from the requirements and the seed.
- [ ] Libraries are decided (ORM usage, validation, UI library or none) and recorded in `decisions.md`.
- [ ] The review found no open problems you have not decided on.
- [ ] Committed.

Next: [Step 6. Build the MVP](06-build-the-mvp.md)
