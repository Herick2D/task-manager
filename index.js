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

app.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        if (!taskId) {
            res.status(404).send('Task não encontrada');
        }

        const task = await TaskModel.findById(taskId);

        return res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const data = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);
        if (!taskId) {
            res.status(404).send('Task não encontrada');
        }

        const allowedUpdates = ['estaCompleto']; // define as chaves que podem ser editadas pelo método
        const requestedUpadates = Object.keys(data);

        for (update of requestedUpadates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = data[update];
            } else {
                return res
                    .status(400)
                    .send('Um ou mais campos inseridos não são editáveis'); // caso nenhuma chave seja validada
            }
        }

        const result = await taskToUpdate.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
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
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            res.status(404).send('Task não encontrada');
        }

        const deletedtask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedtask);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => console.log('Escutando na porta 8000!'));
