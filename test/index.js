const express = require('express');
const requestActivity = require('../index');

const app = express();
const port = process.env.PORT || 3000;

app.use(requestActivity({
    lightPin: 11,
    lightOnTimeInMs: 1000
}));

app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end();
});

app.listen(port, () => console.log(`Server started on port ${port}`));