const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const jokesRouter = require('./routes/jokes');
app.use('/api/jokes', jokesRouter);

// Sync database and start server
db.sequelize.sync({ force: true }).then(() => {
  // Insert initial jokes
  const initialJokes = [
    "Two booleans enter a bar...",
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why do Java developers wear glasses? Because they don't C#.",
    "A programmer walks into a bar and orders 1.000000119 root beers. The bartender says, 'I'll have to charge you extra; that's a root beer float.'",
    "Real programmers count from 0.",
    "Why do programmers hate nature? It has too many bugs.",
    "What's a programmer's favorite place to hang out? Foo Bar.",
    "Why did the programmer quit his job? Because he didn't get arrays.",
    "How do you comfort a JavaScript bug? You console it."
  ];

  initialJokes.forEach(async (joke) => {
    await db.jokes.create({ content: joke });
  });

  app.listen(5001, () => {
    console.log('Server is running on port 5001');
  });
});
