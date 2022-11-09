import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json("HOLA")
})

app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
})
