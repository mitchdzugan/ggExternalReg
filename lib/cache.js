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


const dbPath = join(__dirname, '.db.json');

let db;

const loadDb = async () => {
  if (db) { return db; }
  try {
    const s = await fs.readFile(dbPath, 'utf8');
    db = JSON.parse(s);
  } catch (e) {
    db = {};
  }
  return db;
}

const writeDb = async () => {
  await fs.writeFile(dbPath, JSON.stringify(db));
};

export const assoc = async (k, v) => {
  const db = await loadDb();
  db[k] = v;
  await writeDb();
};

export const get = async (k) => {
  const db = await loadDb();
  return db[k];
};
