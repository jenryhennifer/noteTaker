// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');
var notesData = require('./db/db.json');

const{ v4: uuidv4 } = require('uuid');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML routes for what the user sees/its pathway
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './public/assets/index.html'))
    // this joins the directory name with the new pathway
})
app.get('/notes',function(req, res){
    res.sendFile(path.join(__dirname, './public/assets/notes.html'))
})

app.get('/api/notes', function(req,res){
    res.json(notesData);
})

app.post('/api/notes', function(req,res){
    var newNote = req.body;
    //addint ID property and uuidv4 gives it a unique id value
    newNote.id = uuidv4();

    notesData.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
        if(err){
        throw err;
    }
        res.json('Success!');
    });
});

app.delete('/api/notes/:id', function(req,res){
    const id = rparseInt(eq.params.id);
    const jsonNotes = JSON.parse(fs.readFileSync("./db/db.json"))

    for (i=0; i< notesData.length; i++){
        if(notesData[i].id === id){
            notesData.splice(i,1);
        }
    }
    fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
        if(err){
        throw err;
    }
        res.json('Success!');
    });
});

//this uses the public file to allow the HTML to acces the js
// DEFINITION OF STATIC To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(path.join(__dirname, 'public')));



//the port the app is using
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });