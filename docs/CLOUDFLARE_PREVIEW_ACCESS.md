# Cloudflare Preview & Beta Access Runbook

## Confirmed facts

- `maidenready.com` is served through Cloudflare.
- `https://maidenready.pages.dev/` is the production Pages hostname.
- `https://overhaul-main.maidenready.pages.dev/` exists and returns HTTP 200.
- The preview currently serves an **older build**: 327 catalog parts, no Beta
  feedback button, assets `index-CbI3A6k9.js` / `index-PgPbJUtg.css`.
- The current local build is newer (333 records, Beta feedback, 3.3 accounting).
- The preview is **not protected**: an unauthenticated request returns 200.
- No Cloudflare credentials or `wrangler` session are available in this
  environment.

## 1. Verify Cloudflare Pages settings

Open Cloudflare Dashboard → Workers & Pages → the MaidenReady Pages project →
Settings.

Confirm:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION=22`
- Preview deployments: enabled
- Branch control: `overhaul/main` allowed to create preview deployments

Do not change the production branch.

## 2. Publish the current branch to preview

The current work is committed locally. After approval to push:

```bash
git add -A
git commit -m "Complete MaidenReady 3.3 limited beta candidate"
git push origin overhaul/main
```

A Git-integrated Pages project should create a new preview deployment for
`overhaul-main`.

If the project uses Direct Upload instead, authenticate `wrangler` and use:

```bash
npx wrangler pages deploy dist --project-name <project-name> --branch overhaul-main
```

This creates a preview deployment, not a production deployment.

Verify the deployed preview URL and confirm:

- 333 catalog records
- 324 real products / 9 virtual components
- Beta feedback button in the footer
- Tiny Whoop preset total `$143.40`
- 2.5" preset total `$263.39`
- no product JPGs under `/parts/...`

## 3. Protect the preview with Cloudflare Access

An unlisted URL is not private. To protect the preview:

1. Cloudflare Dashboard → Zero Trust → Access → Applications.
2. Add an application → Self-hosted.
3. Application domain: `overhaul-main.maidenready.pages.dev`.
4. Add a policy:
   - Action: Allow
   - Include: Emails → list the invited testers
5. Set a short session duration (for example 24 hours).
6. Save and test in a private browser window.
7. Confirm an unauthenticated request now reaches a Cloudflare Access login page,
   not the MaidenReady app.

Do not put beta credentials or secrets in client-side JavaScript. Cloudflare
Access handles authentication at the edge.

## 4. Tester feedback

Use the in-app **Beta feedback** footer form. It produces a structured report and
either copies it or opens the tester's email app. No account or backend is
created.

Tester guide: `docs/BETA_TESTING_GUIDE.md`.
