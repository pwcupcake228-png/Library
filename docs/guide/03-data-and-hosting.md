# Step 3. Data, key decisions and hosting

**Goal:** decide where your data lives, which key technical decisions the MVP **and** the next feature need, and (optionally) where your app will run — *before* writing code.

> **From this step on, work in OpenCode**, started from the repository root. The agent reads `docs/requirements.md` and `docs/features/`, so its advice fits *your* app — and it can explain any option you do not understand yet.

The starter has no database on purpose. You choose what your app needs.

## 3.1 Why decide now

A typical trap: everything works locally with a file or a local database, and then it turns out the free hosting cannot keep it. Choose storage and hosting **together**.

## 3.2 Storage options

| Option | Good for | Watch out |
| --- | --- | --- |
| **In memory** (a variable on the server) | The very first version, prototypes | Data disappears on every restart |
| **JSON file** on the server | Local-only apps | Free hosting has a temporary disk: the file is lost on restart or redeploy |
| **Managed PostgreSQL** — [Neon](https://neon.com) | Relational data (tables, relations). Free plan, no credit card | Small storage and compute limits |
| **Managed PostgreSQL** — [Supabase](https://supabase.com) | Same, plus a web dashboard | Free projects are paused after a week without activity |
| **MongoDB** — [Atlas](https://www.mongodb.com/atlas) free cluster | Document data (JSON-like) | 512 MB storage |
| **Firestore** — [Firebase](https://firebase.google.com) | Document data | Use it **from the backend only**, otherwise your Express API becomes pointless |

**If you are not sure:** start with **in memory** for the first stories, then move to **Neon** (or **MongoDB Atlas** if you prefer documents) as soon as your data must survive a restart. A cloud database works the same from your laptop and from hosting, so you install nothing locally.

## 3.3 Hosting options (optional)

Deploying is optional, but a live link makes a portfolio project much stronger.

The starter runs as **one service** in production: `npm run build && npm start` serves the API and the built frontend on one port. So you need just one Node.js web service.

| Option | Notes |
| --- | --- |
| [Render](https://render.com) free web service | Recommended. Deploys from GitHub. Sleeps after 15 minutes without traffic, the first request then takes about a minute. Temporary disk. |
| Any other Node.js host | Fine if it has a free tier that runs a Node.js server. Check its current limits. |

Avoid Render's free PostgreSQL for this project: it expires after 30 days.

### Render in short (reference)

- **Free web service:** enough for a portfolio app. It sleeps after 15 minutes without traffic and has a temporary disk — keep data in a database, not in files.
- **What Render needs from your repo:** build command `npm ci --include=dev && npm run build`, start command `npm start`. Render passes the port in `PORT`; the server already uses it.
- **Secrets** (`DATABASE_URL`, ...) are set in the Render dashboard, never in the repo.
- **Optional:** describe the service in a `render.yaml` file in the repository root (a Render *Blueprint*), so the setup is versioned with your code:

  ```yaml
  services:
    - type: web
      name: my-app
      runtime: node
      plan: free
      branch: main
      buildCommand: npm ci --include=dev && npm run build
      startCommand: npm start
      healthCheckPath: /api/version
      envVars:
        - key: DATABASE_URL
          sync: false   # Render asks for the value when you create the service
  ```

The deploy itself is [Step 8](08-deploy.md). Here you only decide.

*Free tiers were checked in November 2026. They change — check the provider's pricing page.*

## 3.4 Secrets

A cloud database gives you a **connection string** with a password inside. Treat it as a secret:

- Store it in a `.env` file in the repository root. `.env` is already in `.gitignore`, so it is never committed.
- On the hosting, set it as an **environment variable** in the dashboard.
- **Never paste it into the AI chat.** OpenCode asks for permission before reading `.env` — say no unless you have a reason.
- Commit a `.env.example` with the variable names and fake values, so others know what to set.

## 3.5 Connect a Neon database

Skip this if you chose in-memory storage. For MongoDB Atlas the idea is the same: create a free cluster, copy the connection string, put it into `.env`.

1. Sign up at [neon.com](https://neon.com) (GitHub login works). No credit card needed.
2. **Create project:** any name, the region closest to you.
3. Click **Connect** and copy the connection string. It looks like `postgresql://user:password@host/dbname?sslmode=require`.
4. In the repository root create a file `.env`:

   ```bash
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

5. Create `.env.example` with the same name and a fake value:

   ```bash
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

6. Check that git ignores `.env`: `git status` must show `.env.example`, but **not** `.env`.

Tip: Neon can create **branches** of a database. Use one branch for local development and the main one for the deployed app, so experiments never touch real data.

## 3.6 Seed data

Decide how `data/seed.json` gets into the app:

- **In memory:** load the file when the server starts.
- **Database:** a command such as `npm run db:seed` that fills the database. It must be safe to run twice (no duplicates).
- Accounts (if your app has login) do not belong in `seed.json`: take the first account's email and password from environment variables.
- Decide when the seed runs on the deployed app: once by hand, or on every start.

## 3.7 Decide with the agent

In OpenCode, switch to the **plan** agent (`Shift+Tab`) and ask. Not sure what an option means? Ask the agent to explain it in simple words before you decide.

```text
Read docs/requirements.md and the planned feature in docs/features/.
I need to choose data storage and hosting for this app.
Options I consider: [e.g. in memory first, then Neon Postgres; Render for hosting].
Compare them for MY requirements: what fits, what are the risks, what changes in the code.
Also list other decisions the MVP must make now so that the planned feature does not force
a rewrite later (for example the shape of users and roles), and which decisions can wait.
Recommend one option and explain why. Do not change any files.
```

**Expected agent behavior:** it reads the requirements and the feature file, compares the options against your entities and stories, recommends one, lists consequences (new dependency, `.env`, migrations or schema), and names the decisions the feature depends on — without suggesting to build the feature now. It does not edit files — the plan agent cannot.

Then switch to **analyst** (it can edit only documentation) and record the decisions:

```text
Add decision log entries to docs/architecture.md: storage = [your choice], hosting = [your choice or "not decided"],
plus seeding = [how data/seed.json is loaded], plus [other decisions you agreed on, e.g. "users have a set of roles"].
Use the template in that file: context, decision, alternatives, consequences. Do not write code.
```

**Expected agent behavior:** new entries under "Decision log", nothing else changed. Check with `git diff`.

```bash
git add docs/architecture.md .env.example
git commit -m "Record architecture decisions"
```

## ✅ Result

- [ ] `docs/architecture.md` has decision log entries for storage, seeding, decisions the next feature depends on, and hosting (if you plan to deploy).
- [ ] If you chose a cloud database: `.env` with `DATABASE_URL` exists locally, `.env.example` is committed, `.env` is **not** in git and **not** in the chat.

Next: [Step 4. Requirements](04-requirements.md)
