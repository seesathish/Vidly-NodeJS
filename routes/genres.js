const express = require('express');
const router = express.Router();
const Joi = require('joi') // Schema - Payload Body validation

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Comedy' },
    { id: 4, name: 'Drama' }

]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('Course not found');

    res.send(genre);
});

//post
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;