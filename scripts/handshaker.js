import express from 'express';
import { getClientId, getClientSecret } from '../lib/env.js';

const clientId = getClientId();
const clientSecret = getClientSecret();

const app = express();

const port = 7272;
const redirect_uri = `http://localhost:${port}/oauth`;
const scope = ['user.tournamentRegistration', 'user.identity'].join(' ');

const renderPage = (content) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta content="width=device-width, initial-scale=1" name="viewport">
            <title>gg token gen</title>
            <style>
                body {
                    display: flex;
                    height: 100vh;
                    width: 100vw;
                    justify-content: center;
                    align-items: center;
                }
                body > * {
                    border: 1px solid #aaa;
                    border-radius: 10px;
                    padding: 40px;
                    background: #fafafa;
                    transition: background 0.3s ease-in-out;
                }

                a {
                    color: #205;
                    text-decoration: none;
                }
                a:hover {
                    color: #408;
                    background: #eaeaea;
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
    </html>
`;

const respondWithPage = (res, content) => {
  res.type('html');
  res.write(renderPage(content));
  res.end();
};

const __aurl1 = `https://start.gg/oauth/authorize?response_type=code`;
const __aurl2 = `&client_id=${clientId}&scope=${encodeURIComponent(scope)}`;
const __aurl3 = `&redirect_uri=${encodeURIComponent(redirect_uri)}`
const oauthURL = __aurl1 + __aurl2 + __aurl3;
const connectLink = `
    <a target="_blank" href="${oauthURL}"> GET OAUTH TOKEN </a>
`;

const main = () => {
  app.get('/oauth', async (req, res) => {
    try {
      const result = await fetch('https://api.start.gg/oauth/access_token', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code: req.query.code,
          scope,
          redirect_uri,
        }),
      });
      const data = await result.json();
      const content = ((typeof data) === 'string') ?
        `error: ${data}` :
        `token: ${data.access_token}`;
      respondWithPage(res, `<div>${content}</div>`);
    } catch (e) {
      const content = `error ${JSON.stringify(e)}`;
      respondWithPage(res, `<div>${content}</div>`);
    }
  });
  app.get(/.*/, (req, res) => {
    respondWithPage(res, connectLink);
  });
  app.listen(port, () => console.log('app listening on port ' + port));
};

main();
