const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        // API Routes

        // Get route
        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        // Post Route for saving a note
        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });

        // Get Route to retrieve notes
        app.get("/api/notes/:id", (req, res) => {
            res.json(notes[req.params.id]);
        });

        // Delete Route to delete note
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
            res.json(notes)

        });

        // HTML Views

        // Displays notes.html page
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // Displays index.html
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //Function to update JSON file when note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}