const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
    console.log(req);
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});