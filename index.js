const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database.js');

dotenv.config();
const app = express();

connectToDatabase();

app.get('/', (req, res) => {
    res.status(200).send('Olá Mundo!');
});

app.listen(8000, () => console.log('Escutando na porta 8000!'));
