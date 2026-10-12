# Kajaanin bussit

Kartta, jossa Kajaanin bussit liikkuvat reaaliajassa. Data: Digitransit.

- `public/index.html` – itse kartta
- `src/index.js` – Cloudflare Worker, joka lisää Digitransitin API-avaimen kyselyihin
- `wrangler.jsonc` – Workerin asetukset

API-avain asetetaan Cloudflaressa: Worker → Settings → Variables and Secrets →
tyyppi Secret, nimi `DIGITRANSIT_KEY`.
