// api calls routes
const note = require('express').Router();
const { json } = require('express');
const { readAndAppend, readFromFile } = require('../help/fsUtils');
const uuid = require('../help/uuid');
//help and express routes import

note.get('/', (req, res) => readFromFile('./db/note.json').then((data) => 
res.json(json.parse(data))));
//saved notes on sidebar

note.get('/:id', (req, res) => {
    const savedNote = req.params.id;
    readFromFile('./db/note.json').then((data) =>
    json.parse(data))
    .then((json) => {
        const result = json.filter((thisNote) => thisNote.id === savedNote);
        return result.length > 0 ? res.json(result) : res.json('This note does not exist');
    });
});