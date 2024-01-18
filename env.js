// If an environmental variable with the same name as any of the keys in
// this object has a value, that value will be used instead of the one
// here. This is preferred way for security purposes but if its more
// convenient to put something here for testing, feel free.
export default {
  // A `Personal Access Token` generated from:
  //         https://start.gg/admin/profile/developer
  GG_REG_GG_AUTH: null,
  // everything below this point is only necessary if you
  // wish to run `yarn run handshaker`
  // The values can be found at
  //         https://start.gg/admin/profile/developer
  //         under `OAuth Applications`
  GG_REG_HANDSHAKER_CLIENT_ID: null,
  GG_REG_HANDSHAKER_CLIENT_SECRET: null,
}
