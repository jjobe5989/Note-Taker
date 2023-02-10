const { response } = require("express");
const fs = require("fs");
const { request } = require("http");

const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    app.get("/api/notes", (request, response) => {
        console.log("Getting notes");

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        console.log("Returning data" + JSON.stringify(data));

        response.json(data);
    });

    app.post("/api/notes", (request, response) => {
        
        const newNote = request.body;

        console.log("New Note Requested" + JSON.stringify(newNote));

        newNote.id = uuidv4();

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data));

        response.json(data);
    });

    app.delete("/api/notes/:id", (request, response) => {

        let noteId = request.params.id.toString();

        console.log(`Request to delete note for noteId: ${noteId}`);

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter( note => note.id.toString() !== noteId );

        fs.writeFileSync('./db/db.json', JSON.stringify(newData));

        console.log(`Note Deleted with id : ${noteId}`);

        response.json(newData);
    });
};
