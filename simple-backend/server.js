const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const responseData = { message: 'Hello from the server!' };
    res.json(responseData);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

