import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.json('Hello');
});

app.listen(3333);
