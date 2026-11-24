# Step 9. Portfolio

**Goal:** a repository that presents **your** app and shows how you built it.

Right now the README describes the starter. A recruiter opening your repo should see your product.

## 9.1 Rewrite the README

In OpenCode (**build**):

```text
Rewrite README.md so it describes MY application, not the starter. Use docs/requirements.md
and docs/architecture/ as sources. Sections:
1. App name and a one-sentence description.
2. Live demo link: [URL or "not deployed"] and a placeholder for a screenshot (docs/screenshot.png).
3. Features (what a user can do).
4. Tech stack.
5. Run locally (install, .env variables if any, dev, test).
6. How it was built: AI-first workflow with OpenCode — requirements first, plan/implement/verify loop,
   specialized agents, tests. Link docs/requirements.md, docs/architecture/ and AGENTS.md.
Keep it short and honest. Do not invent features that do not exist.
```

**Expected agent behavior:** a new README based on your real docs. Read it: remove anything invented or exaggerated.

## 9.2 Add a screenshot

Take a screenshot of the main screen, save it as `docs/screenshot.png`, and check that it shows up in the README on GitHub.

## 9.3 Remove this guide

The guide was for building. It does not belong in your finished project.

```text
Delete the docs/guide folder and remove every link to it from the repository.
Then search the repository for "docs/guide" and show me that nothing is left. Do not change anything else.
```

**Expected agent behavior:** it deletes the folder, fixes links (README, other docs) and proves with a search that no references remain.

## 9.4 Polish the repository

- Rename the repository to match your app (GitHub → **Settings → General**).
- Add a description, the live URL and topics (`react`, `express`, `typescript`, ...) on the repo page.
- Rename the app in `package.json` if you like.

## 9.5 Final checklist

**Product**
- [ ] All user stories work; loading, error and empty states look right.
- [ ] The UI works on a phone and on a laptop.

**Checks**
- [ ] `npm run verify` and `npm run test:e2e` pass.

**Docs**
- [ ] `docs/requirements.md` matches what is actually built.
- [ ] `docs/architecture/` describes the API, the data model and the key decisions.
- [ ] `docs/glossary.md` matches the words used in the app.
- [ ] No secrets in the code or the git history.

**Understanding**
- [ ] You can explain how data flows from the UI to the backend and back.
- [ ] You can explain every architecture decision and why you made it.
- [ ] You have read the code the agent wrote.

```bash
git add .
git commit -m "Prepare repository for portfolio"
git push
```

## ✅ Result

- [ ] The README describes your app, with a screenshot (and a live link, if deployed).
- [ ] `docs/guide` is gone, no broken links.
- [ ] The repository is public, named after your app, with description and topics.

Done. You have a full-stack app and a repository that shows how you work with AI. 🎉
