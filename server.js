// Import the express module for the server
const express = require('express');
const bodyParser = require('body-parser');

// Sets up the express app and port the server will run on
const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log('App listening at http://localhost:' + PORT + '/');
});