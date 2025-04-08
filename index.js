const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');
const TaskModel = require('./src/models/task.model');

dotenv.config();
const app = express();
app.use(express.json()); // infere que todos os req's serão JSON e por isso não é necessário fazer o JSON.PARSE ou qualquer tipo de conversão

connectToDatabase();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

app.listen(8000, () => console.log('Escutando na porta 8000!'));
