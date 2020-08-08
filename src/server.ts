import express from 'express';
import env from './apis/env';
import model from './apis/model';

const PORT = env.PORT;
const start = async () => {
  try {
    const app = express();
    app.get('/answers', async (req, res) => {
      try {
        const { phrase } = req.query;
        if (phrase === undefined || phrase.trim() === '') {
          res.status(400).send();
          return;
        }
        const results = await model(phrase);
        res.send(results);
      } catch (error) {
        console.log(error);
        res.status(500).send();
      }
    });
    app.get('/', async (req, res) => {
      return res.sendFile('nike-soccer.html', { root: __dirname });
    })
    app.get('/bundle.js', async (req, res) => {
      return res.sendFile('/bundle.js', { root: __dirname });
    })
    app.listen(PORT, () => console.log(`Nike chat bot listening on port ${PORT}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
