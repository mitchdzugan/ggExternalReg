import gql from '../lib/gql.js';
import * as cache from '../lib/cache.js';

if (process.argv.length < 4) {
  console.error('MUST SUPPLY USER_ID AND AT LEAST ONE EVENT ID');
  process.exit(1);
}
const userId = process.argv[2]
const registration = { eventIds: process.argv.slice(3) };

const main = async () => {
  const data = await gql('generateRegistrationToken', { userId, registration });
  const token = data.generateRegistrationToken;
  if (!token) {
    console.error('COULD NOT GENERATE TOKEN');
    console.error(data);
    process.exit(1);
  }

  await cache.assoc(token, registration);
  console.log()
  console.log(`RegToken[ val: ${token} ]`)
  console.log()
}

main();
