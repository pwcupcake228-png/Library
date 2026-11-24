# Step 8. Deploy (optional)

**Goal:** your app is online with a public URL you can put in your CV.

This step is optional, but a live demo makes a portfolio project much more convincing.

## 8.1 Run the production build locally

The starter runs as one service in production: Express serves the API **and** the built frontend.

```bash
npm run build
npm start
```

Open [http://localhost:3001](http://localhost:3001). Your app should work exactly like in development. If it does not work here, it will not work on the hosting either — fix it first (ask the agent, give it the exact error).

If your app uses a cloud database, make sure the backend reads the connection string from an environment variable (for example `DATABASE_URL`) and not from the code. Fill the database of the deployed app with your seed, as decided in Step 3.

## 8.2 Deploy to Render

1. Push your latest `main` to GitHub.
2. Sign up at [render.com](https://render.com) with your GitHub account.
3. **New → Web Service**, select your repository.
4. Settings:

| Setting | Value |
| --- | --- |
| Language | Node |
| Branch | `main` |
| Build command | `npm ci --include=dev && npm run build` |
| Start command | `npm start` |
| Instance type | **Free** |

5. **Environment variables:** add your secrets here (for example `DATABASE_URL`). Never commit them.
6. Click **Deploy** and watch the logs. The first deploy takes a few minutes.

You do not need to set the port: Render passes it in `PORT`, and the server uses it.

## 8.3 Check it

- Open `https://<your-app>.onrender.com` — the app loads.
- Open `https://<your-app>.onrender.com/api/version` — you see JSON.
- Create some data, then trigger a redeploy (**Manual Deploy**). The data is still there? Then your storage works. If it disappeared, you are storing data in memory or in a file — see [Step 3](03-data-and-hosting.md).

Remember: a free service sleeps after 15 minutes without traffic. The first visit after that takes about a minute. That is normal.

## 8.4 If the deploy fails

Copy the error lines from the Render logs and ask the agent:

```text
My Render deploy fails. Build command: npm ci --include=dev && npm run build. Start command: npm start.
Here are the log lines: [paste]. Find the cause and fix it. Then run npm run build and npm start locally to prove it works.
```

**Expected agent behavior:** it explains the cause, fixes the code or tells you which Render setting to change, and runs the production build locally. Do not paste secrets from the logs.

## ✅ Result

- [ ] `npm run build && npm start` works locally.
- [ ] The app works at a public URL.
- [ ] Data survives a redeploy (if your app stores data).
- [ ] No secrets in the repository.

Next: [Step 9. Portfolio](09-portfolio.md)
