# AgriLink frontend

This is a dependency-free static single-page application. It needs no build command.

## Run locally

Set `window.AGRILINK_API_URL` before `config.js` in `index.html` for a deployed API, or leave the default `http://localhost:5000`. Serve this folder from any static web server; do not open it directly from disk because browsers restrict module loading.

## Deploy

Deploy this folder to Netlify, Vercel, Render Static Site, GitHub Pages, or an equivalent static host. Set the API URL in `config.js` or inject `window.AGRILINK_API_URL` at deploy time.

The market-price cards intentionally state that they are fallback/demo data until a provider is configured on the API. Government scheme links go directly to official websites.
