# Kajaanin bussit

Kartta, jossa Kajaanin bussit liikkuvat reaaliajassa. Data: Digitransit.

- `public/index.html` – itse kartta
- `functions/api/graphql.js` – välityspalvelin, joka lisää Digitransitin API-avaimen kyselyihin

## Julkaisu Cloudflare Pagesiin

1. Yhdistä tämä GitHub-repo Cloudflare Pagesiin (Workers & Pages → Create → Pages → Connect to Git).
2. Build-asetukset: Framework preset `None`, Build command tyhjä, Build output directory `public`.
3. Lisää projektin asetuksiin (Settings → Variables and Secrets) salaisuus `DIGITRANSIT_KEY`, jonka arvo on API-avaimesi.
4. Julkaise uudelleen (Deployments → Retry deployment), jotta avain tulee käyttöön.
