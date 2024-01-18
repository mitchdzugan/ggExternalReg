This repository expands on the documentation provided here: https://gist.github.com/mitchdzugan/e0bd0267ce75c1cab54c7f1107ab9da9

It includes various tools and sample code for make the process of using the external registration api as simple as possible.

# FLOW

You can use the supplied tools to complete a command line implementation of the flow described in the doc as follows:

* look at `./env.js` and acquire at least the `GG_REG_GG_AUTH` value. The file includes comments explaining where to find the values and options for setting them to use with the other scripts
* grab a scoped AUTH token for the user you wish to register by having that user visit https://gg-token-gen-2c14ac5cc6cc.herokuapp.com/
* Use that AUTH token to find the user's id (USERID) by running:
```
yarn run userid AUTH
```
* Get the event data for the Tournament you are interested in by running:
```
// SLUG can be found from url
// ie for
//   https://www.start.gg/tournament/evo-2023/details
//   SLUG: 'evo-2023'
yarn run tourney_info SLUG
```
* Generate REG_TOKEN for the USERID found earlier to register for the given EVENT_IDS by running:
```
yarn run gen_reg_token USERID EVENTID_1 EVENTID_2 ...etc
```
* Complete registration on behalf of the user by running:
```
yarn run reg_for_tourney AUTH
```

# HANDSHAKE
In order to obtain the AUTH token on behalf of startgg users in your application, you will need to complete the OAUTH handshake. A complete application implementing this handshake is available by running:
```
yarn run handshaker
```
This will run the same application running at https://gg-token-gen-2c14ac5cc6cc.herokuapp.com/ on http://localhost:7272
