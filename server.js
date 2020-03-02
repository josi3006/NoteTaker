const fs = require('fs');
const util = require("util");
const express = require('express');
const path = require('path');
const noteData = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 3000;

// const writeFileAsync = util.promisify(fs.writeFile);
// const readFileAsync = util.promisify(fs.readFile);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




// This code starts the server listening

app.listen(PORT, function () {
    console.log('Server is listening on Port: ' + PORT);
});



// This code sends user to "notes" page when start button is clicked

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// This code defaults to the "index" page

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});




// This code gets notes from the db

app.get('/api/notes', function (req, res) {

    console.log('Notes done been gotten');

    return res.json(noteData);

});




// This code writes notes to the db

app.post('/api/notes', function (req, res) {

    let newNote = req.body;
    newNote['id'] = noteData.length;
    noteData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(noteData), function (err) {
        if (err) throw (err);

        console.log('Note done been writed');

        res.end();

    })

});




// This code deletes notes

app.delete('/api/notes/:id', function (req, res) {
    let delNote = req.params.id;

    noteData.splice(delNote, 1);

    fs.writeFile('./db/db.json', JSON.stringify(noteData), function (err) {
        if (err) throw err;
        console.log('Note ' + delNote + ' is ded.');

        res.end();

    })
});







