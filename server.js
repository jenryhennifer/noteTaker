// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');
var notesData = require('./db/db.json')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML routes for what the user sees/its pathway
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './public/index.html')) // this joins the directory name with the new pathway
})
app.get('/notes',function(req, res){
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', function(req,res){
    res.json(notesData);
})

app.post('/api/notes', function(req,res){
    var newNote = req.body;
    notesData.push(newNote);
})

app.use(express.static('public'))



//the port the app is using
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });