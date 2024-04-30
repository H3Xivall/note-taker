// Import the express module for the server
const express = require('express');
const fs = require('fs');

// Sets up the express app and port the server will run on
const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// Add a new route to handle the "/api/notes" endpoint
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading the notes.');
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

// Add a new route to handle the "/api/notes" endpoint with a POST request
app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading the notes.');
        } else {
            const notes = JSON.parse(data);
            const newNote = {
                id: notes.length + 1,
                title: req.body.title,
                text: req.body.text
            };
            notes.push(newNote);
            fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error writing the notes.');
                } else {
                    res.json({
                        success: true,
                        message: 'Note added successfully.'
                    });
                }
            });
        }
    });
});

// Add a new route to handle the "/api/notes/:id" endpoint with a DELETE request
app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading the notes.');
        } else {
            let notes = JSON.parse(data);
            notes = notes.filter(note => note.id !== noteId);
            fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error writing the notes.');
                } else {
                    res.json({
                        success: true,
                        message: 'Note deleted successfully.'
                    });
                }
            });
        }
    });
});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('App listening at http://localhost:' + PORT + '/');
});