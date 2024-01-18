import INPUT_ENV_DATA from '../env.js';

const ENV = {};
[
  'GG_REG_GG_AUTH',
  'GG_REG_HANDSHAKER_CLIENT_ID',
  'GG_REG_HANDSHAKER_CLIENT_SECRET'
].forEach((varname) => {
  ENV[varname] = process.env[varname] || INPUT_ENV_DATA[varname];
});

const getByVarname = (varname) => () => {
  const value = ENV[varname];
  if (!value) { throw `No value supplied for [${varname}] check './env.js'`; }
  return value;
}

export const getGGAuth = getByVarname('GG_REG_GG_AUTH');
export const getClientId = getByVarname('GG_REG_HANDSHAKER_CLIENT_ID');
export const getClientSecret = getByVarname('GG_REG_HANDSHAKER_CLIENT_SECRET');
