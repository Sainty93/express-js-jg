// api calls routes
const note = require('express').Router();
const { json } = require('express');
const { readAndAppend, readFromFile } = require('../help/fsUtils');
const uuid = require('../help/uuid');
//help and express routes import

note.get('/', (req, res) => readFromFile('./db/db.json').then((data) => 
res.json(json.parse(data))));
//saved notes on sidebar

note.get('/:id', (req, res) => {
    const savedNote = req.params.id;
    readFromFile('./db/db.json').then((data) =>
    json.parse(data))
    .then((json) => {
        const result = json.filter((thisNote) => thisNote.id === savedNote);
        return result.length > 0 ? res.json(result) : res.json('This note does not exist');
    });
});
note.post('/', (req, res) => {
    const { title, text, id } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    readAndAppend(newNote, '.db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
} else {
    res.json('Error! Note not saved!');
}
});

//new note storage

note.delete('/:id', (req, res) => {
    const savedNote =req.params.id;
    readFromFile('./db/db.json')
    .then((data) => json.parse(data))
    .then((json) => {
        const result = json.filter((thisNote) => thisNote.id !== savedNote);
        writeToFile('./db/db.json', result);
        res.json(`The note with ID#${savedNote} has been deleted`);
    });
});
//deleted notes
