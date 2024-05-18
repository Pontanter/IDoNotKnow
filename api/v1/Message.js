/*
    I have never done this before, as you can probably tell.
*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const print = console.log;

app.use(bodyParser.json());

app.post('/api/v1/Message.js', (req, res) => {
    print(req.body);
    res.send('OK');
})

app.listen(port, () => {
    print(`Server is running on port ${port}`);
})