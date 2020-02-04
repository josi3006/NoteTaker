const fs = require('fs');
const util = require("util");
const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

let id = 1;

let noteBody = [];

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

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// This code adds the db to the path

// app.get('/api/notes', function (req, res) {
//     return res.sendFile(path.join(__dirname, "/db/db.json"));
// });




// This code gets notes from the db

app.get('/api/notes', function (req, res) {
    readFileAsync('./db/db.json', 'utf8')
        .then(function (data) {
            data = JSON.parse(data);
            return res.json(data);
        });

    console.log('This is not working:--------------------');
    console.log(noteBody);
});







// This code writes notes to the db

app.post('/api/notes', function (req, res) {

    let allNotes = req.body;

    readFileAsync('./db/db.json', 'utf8')
        .then(function (data) {

            data = JSON.parse(data);
            data.push(allNotes);

            req.body.id = allNotes.length + 1;

            writeFileAsync('./db/db.json', JSON.stringify(data));

        });
    res.send('Done!');
});







// fs.writeFile('./db/db.json', noteBody, 'utf8', function (err) {      // Writes new note to db
//     if (err) throw err;
// });

// noteBody = JSON.parse(noteBody);
// res.json(noteBody);

// console.log('This one is working:--------------------');
// console.log(noteBody);

// } catch (err) {
//     throw err;
// }
// });




// This code deletes notes

app.delete('/api/notes/:id', function (req, res) {
    let delNote = req.params.id;

        readFileAsync('./db/db.json', 'utf8')
        .then(function(data) {
            data = JSON.parse(data);

            data.splce(delNote, 1);

            for (var i = 0; i < data.length; i++) {
                data[i].id = i;
            }

            writeFileAsync('./db/db.json', JSON.stringify(data));

        });
        res.send('Note was deleted!');

    });

//         noteBody = JSON.parse(noteBody);
//         noteBody = noteBody.filter(function (note) {
//             return note.id != req.params.id;
//         });
//         noteBody = JSON.stringify(noteBody);
//         fs.writeFile('./db/db.json', noteBody, 'utf8', function (err) {
//             if (err) throw err;
//         });

//         res.send(JSON.parse(noteBody));

//     } catch (err) {
//         throw err;
//     }
// });






