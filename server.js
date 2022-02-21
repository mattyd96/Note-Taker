const express = require('express'); //express
const {v4 : uuidv4} = require('uuid'); //uuid for unique id's
const path = require('path');
const fs = require('fs');

// app setup
const app = express()
const port = process.env.PORT || 3001

// middleware
app.use(express.json())
app.use(express.static('public'))

// home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// get notes
app.get('/api/notes', (req, res) => {
    // read notes from db and send back
    let notes = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(notes);
})

// add note
app.post('/api/notes', (req, res) => {
    //get the new note and add an id
    let note = req.body;
    note.id = uuidv4();

    //get current list of notes from db
    let notes = JSON.parse(fs.readFileSync('db/db.json'));

    //add new note to existing
    notes = [...notes, note];

    //write new list to the db file
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 4));

    //send note back to user end
    res.json(note);
})

// delete note
app.delete('/api/notes/:id', (req, res) => {
    // read
    let notes = JSON.parse(fs.readFileSync('db/db.json'));

    //filter out selected note for deletion and rewrite to db
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 4));

    //respond with new notes list
    res.json(notes);
})

// wildcard
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// listen
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})