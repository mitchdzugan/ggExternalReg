import gql from '../lib/gql.js';

const API_URL = `https://api.start.gg/gql/alpha`;
if (process.argv.length < 3) {
  console.error('MUST SUPPLY TOURNAMENT SLUG');
  process.exit(1);
}
const slug = `tournament/${process.argv[2]}`

const main = async () => {
  const data = await gql('tournamentData', { slug });
  const tournament = data && data.tournament;
  if (!tournament) { console.error('TOURNAMENT NOT FOUND'); process.exit(1); }
  console.log();
  console.log(`Tournament[ id: ${tournament.id} ]: ${tournament.name}`);
  for (const event of tournament.events || []) {
    console.log(`    Event[ id: ${event.id} ]: ${event.name}`);
  }
  console.log();
};

main();
