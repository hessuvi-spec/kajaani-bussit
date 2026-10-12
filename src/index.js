// Cloudflare Worker: näyttää kartan (public-kansio) ja välittää kyselyt Digitransitiin.
// Sivu lähettää kyselyn osoitteeseen /api/graphql, ja tämä koodi lisää siihen
// API-avaimen palvelimella. Näin avain ei näy sivun katsojille.
//
// Avain asetetaan Cloudflaren asetuksissa salaisuutena (Secret) nimellä DIGITRANSIT_KEY.

const DIGITRANSIT_URL = 'https://api.digitransit.fi/routing/v2/finland/gtfs/v1';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/graphql' && request.method === 'POST') {
      return forwardToDigitransit(request, env);
    }
    // Muut osoitteet: public-kansion tiedostot hoidetaan automaattisesti ennen tätä koodia
    return new Response('Sivua ei löytynyt', { status: 404 });
  }
};

async function forwardToDigitransit(request, env) {
  const body = await request.text();

  // Yksinkertainen suojaus: hyväksytään vain lyhyitä Kajaania koskevia kyselyitä,
  // ettei kukaan voi käyttää avaintasi muihin tarkoituksiin.
  if (body.length > 3000 || !body.includes('Kajaani')) {
    return new Response('Kysely ei ole sallittu', { status: 400 });
  }
  if (!env.DIGITRANSIT_KEY) {
    return new Response('API-avain puuttuu palvelimen asetuksista', { status: 401 });
  }

  const res = await fetch(DIGITRANSIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'digitransit-subscription-key': env.DIGITRANSIT_KEY
    },
    body
  });

  return new Response(res.body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
