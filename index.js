const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home');

app.use(express.json());

app.use('/api/genres', genres);
app.use('/', home);


// setting enviromental variable - $env:PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));