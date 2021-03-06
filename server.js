const express = require("express");
const path = require("path");
const fs = require("fs");
const jsondb = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');
const { json } = require("express");

// Ser up of express app
const app = express();
let PORT = process.env.PORT || 3000;

// express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes 
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req,res){
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// post new note
app.post("/api/notes", function(req,res){
    const newNote = req.body;
    let noteID = uuidv4()
    newNote.id = noteID;
    jsondb.push(newNote)
    
    fs.writeFile("./db/db.json", JSON.stringify(jsondb), function(err){
        if (err) throw err;
        res.json("Response")
    })
    
});

// delete notes function
app.delete("/api/notes/:id", function(req, res) {
    let collectID = req.params.id

    for (i=0; i < jsondb.length; i++){
        if(jsondb[i].id === collectID){
            jsondb.splice(i,1);
        }
    }

    fs.writeFile("./db/db.json", JSON.stringify(jsondb), function(err){
        if (err) throw err;
        res.json("Response")
    })
});

// server listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));