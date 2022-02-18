const express = require('express');
const {v4 : uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    console.info('recieved request in api/notes');
    let notes = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    console.info('recieved POST request in api/notes');
    let note = req.body;
    note.id = uuidv4();
    res.json(note);
})

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})