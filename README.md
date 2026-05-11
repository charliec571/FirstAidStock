# First aid kit checklist

Small React (Vite) web app: multi-select kit items and optional notes (84 characters max).

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo includes [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). After you push to GitHub:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. The workflow runs on every push to `main`. Your site will be at  
   `https://<username>.github.io/<repository-name>/`

The build uses `--base=/<repository-name>/` so asset URLs match GitHub Pages project sites.

### First-time setup on GitHub

Create a **new empty repository** (no README) on your GitHub instance, then:

```bash
cd first-aid-box-app
git remote add origin https://github.com/<YOUR_USER>/<YOUR_REPO>.git
git push -u origin main
```

Replace the URL with your GitHub Enterprise host if applicable.
