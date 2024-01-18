import gql from '../lib/gql.js';

const API_URL = `https://api.start.gg/gql/alpha`;
if (process.argv.length < 3) {
  console.error('MUST SUPPLY USER OAUTH TOKEN');
  process.exit(1);
}
const token = process.argv[2];

const main = async () => {
  const data = await gql.for(token)('userData');
  const user = data && data.currentUser;
  if (!user) { console.error('USER NOT FOUND'); process.exit(1); }
  console.log();
  console.log(`User[ id: ${user.id} ]`);
  console.log();
};

main();
