const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('sfgdh!');
});

app.get('/database', (req, res) => {
    res.send('here');
});

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});