const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).json(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById(id) {
        try {
            const taskId = this.req.params.id;
            if (!taskId) {
                this.res.status(404).send('Task não encontrada');
            }

            const task = await TaskModel.findById(taskId);

            return this.res.status(200).json(task);
        } catch (error) {
            console.log(error.message);
            this.res.status(500).send(error.message);
        }
    }

    async create(req, res) {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            console.log(error.message);
            this.res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        try {
            const taskId = this.req.params.id;
            const data = this.req.body;

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
                    return this.res
                        .status(400)
                        .send('Um ou mais campos inseridos não são editáveis'); // caso nenhuma chave seja validada
                }
            }

            const result = await taskToUpdate.save();
            this.res.status(200).send(result);
        } catch (error) {
            console.log(error);
            this.res.status(500).send(error.message);
        }
    }

    async delete(req, res) {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                this.res.status(404).send('Task não encontrada');
            }

            const deletedtask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedtask);
        } catch (error) {
            console.log(error.message);
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
