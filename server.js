// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');

const { v4: uuidv4 } = require('uuid');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

function getNotes() {
    return JSON.parse(fs.readFileSync('./db/db.json'))
}

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML routes for what the user sees/its pathway
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/assets/index.html'));
    // this joins the directory name with the new pathway
})
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/assets/notes.html'));
})

app.get('/api/notes', function (req, res) {
    var notes = getNotes()
    res.json(notes);

})

app.post('/api/notes', function (req, res) {
    var newNote = req.body;
    //addint ID property and uuidv4 gives it a unique id value
    newNote.id = uuidv4();

    const notes = getNotes().concat(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            throw err;
        }
        res.json('Success!');
    });
});

app.delete('/api/notes/:id', function (req, res) {
    const id = req.params.id;
    const notes = getNotes();

    const newNotes = notes.filter(note => note.id !== id);

    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    res.json('Success!');
});


//this uses the public file to allow the HTML to acces the js
// DEFINITION OF STATIC To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(path.join(__dirname, 'public')));



//the port the app is using
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});