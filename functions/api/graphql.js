// Välityspalvelin Digitransitin reititysrajapintaan.
// Sivu lähettää kyselyn osoitteeseen /api/graphql, ja tämä funktio lisää siihen
// API-avaimen palvelimella. Näin avain ei näy sivun katsojille.
//
// Avain asetetaan Cloudflaren asetuksissa salaisuutena nimellä DIGITRANSIT_KEY.

const DIGITRANSIT_URL = 'https://api.digitransit.fi/routing/v2/finland/gtfs/v1';

export async function onRequestPost({ request, env }) {
  const body = await request.text();

  // Yksinkertainen suojaus: hyväksytään vain lyhyitä Kajaania koskevia kyselyitä,
  // ettei kukaan voi käyttää avaintasi muihin tarkoituksiin.
  if (body.length > 3000 || !body.includes('Kajaani')) {
    return new Response('Kysely ei ole sallittu', { status: 400 });
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
