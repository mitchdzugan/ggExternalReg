import gql from '../lib/gql.js';
import * as cache from '../lib/cache.js';

const API_URL = `https://api.start.gg/gql/alpha`;
if (process.argv.length < 3) {
  console.error('MUST SUPPLY USER TOKEN');
  process.exit(1);
}
const token = process.argv[2]

const tryRegister = async (vars) => {
  const data = await gql.for(token)('registerForTournament', vars);
  if (!data.registerForTournament) {
    throw 'registerForTournament did not complete';
  }
  console.log('REGISTRATION COMPLETE')
  console.log('printing `startgg` particpantId corresponding to registration')
  console.log(data.registerForTournament)
};

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  const registration = await cache.get(token);
  if (!registration) {
    console.error(`COULD NOT FIND REGISTRATION DATA CACHED FOR TOKEN ${token}`)
    console.error('This generally means `gen_reg_token` was never completed')
    process.exit(1);
  }
  const vars = { registration, registrationToken: token };
  let lastError;
  for (let i=0; i<5; i++) {
    try {
      await tryRegister(vars);
      return;
    } catch (e) {
      lastError = e;
      console.error('registration did not complete, trying again in 5s');
      await timeout(5000);
    }
  }
  if (lastError) { throw lastError; }
}

main();
