
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Root route
app.get('/', (_req, res) => {
  res.send(" Welcome to the Spotify API");
});

// Songs route (test only)
app.get('/songs', (_req, res) => {
  res.json([{ id: 1, title: 'Test Song', artist: 'Test Artist' }]);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
