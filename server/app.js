import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import {getPlayers, addPlayer, updatePlayer, deletePlayer} from './db.js';

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json("HOLA")
})

app.get('/game', async (req, res) => {
  const response = await fetch('https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=multiple');
  const data = await response.json();
  res.json(data);
})

app.get('/results', async (req, res) => {
  const data = await getPlayers();
  res.json(data);
})

app.post('/results', async (req, res) => {
  const newPlayer = req.body;
  await addPlayer(newPlayer);
  res.status(201).end()
})

app.delete('/results/:id', (req, res) => {
  const playerId = req.params.id;
  deletePlayer(playerId);
  res.status(204).end();
})


app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
})
