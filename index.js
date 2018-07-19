const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Comedy' },
    { id: 4, name: 'Drama' }

]

app.get('/', (req, res) => {
    res.send('Welcome to Vidly');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('Course not found');

    res.send(genre);
});

//post
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

//Update
app.put('/api/genres/:id', (req, res) => {
    //Look up the course for it exist else return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('Genre not found');

    //Validate - if invalid return 400
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //Update the course
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('Genre not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


// setting enviromental variable - $env:PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));