import { GraphQLClient, gql } from 'graphql-request';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getGGAuth } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = `https://api.start.gg/gql/alpha`;
const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    authorization: `Bearer ${getGGAuth()}`,
  },
})

// getGGAuth()

const mkClient = (token) => (
  new GraphQLClient(API_URL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
);

const runGqlQuery = (token) => async (qname, vars) => {
  const qpath = join(__dirname, '..', 'gql', qname + '.gql');
  const rawq = await fs.readFile(qpath, 'utf8');
  const q = gql(rawq.split("\n"));
  const res = await graphQLClient.request({
    url: `${API_URL}/v1/graphql`,
    document: q,
    ...(vars ? { variables: vars } : {}),
  });
  return res;
};

const runGqlQueryGGAuth = runGqlQuery(getGGAuth());
runGqlQueryGGAuth.for = (token) => runGqlQuery(token);

export default runGqlQueryGGAuth;
