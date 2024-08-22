// Create web server 

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing comments.json');
                return;
            }
            res.send('Comment added');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});