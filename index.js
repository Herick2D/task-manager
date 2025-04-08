const express = require('express');
const dotenv = require('dotenv');
const TaskRouter = require('./src/routes/task.routes');

const connectToDatabase = require('./src/database/mongoose.database');

dotenv.config();

const app = express();
app.use(express.json()); // infere que todos os req's serão JSON e por isso não é necessário fazer o JSON.PARSE ou qualquer tipo de conversão

connectToDatabase();

app.use('/tasks', TaskRouter);

app.listen(8000, () => console.log('Escutando na porta 8000!'));
