import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import querystring from 'querystring';
import cors from 'cors';

const app = express();
app.use(cors());

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const scope = 'user-read-private user-read-email';

console.log('SPOTIFY_CLIENT_ID:', client_id);
console.log('SPOTIFY_REDIRECT_URI:', redirect_uri);

app.get('/login', (req, res) => {
  if (!client_id || !redirect_uri) {
    return res.status(500).send('Missing client_id or redirect_uri');
  }

  const params = querystring.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

app.get('/auth/callback', (req, res) => {
  const code = req.query.code || null;
  const error = req.query.error || null;

  if (error) {
    return res.status(400).send(`Callback error: ${error}`);
  }

  if (!code) {
    return res.status(400).send('No code found in callback');
  }


  res.send(`Authorization code received: ${code}`);
});

app.get('/', (req, res) => {
  res.send('Welcome! Go to /login to start Spotify authentication.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});