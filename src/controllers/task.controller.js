const TaskModel = require('../models/task.model');
const {
    notFoundError,
    objectIdCastError,
} = require('../errors/mongodb.errors');
const { notAllowedFieldsToUpdateError } = require('../errors/general.errors');
const { Error } = require('mongoose');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById(id) {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById(taskId);
            if (!task) {
                return notFoundError(this.res);
            }

            return this.res.status(200).send(task);
        } catch (error) {
            const taskId = this.req.params.id;
            if (error instanceof Error.CastError) {
                return objectIdCastError(this.res, taskId); // aqui eu fui gênio
            }
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
            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ['estaCompleto']; // define as chaves que podem ser editadas pelo método
            const requestedUpadates = Object.keys(data);

            for (const update of requestedUpadates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = data[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res); // caso nenhuma chave seja validada
                }
            }

            const result = await taskToUpdate.save();
            this.res.status(200).send(result);
        } catch (error) {
            const taskId = this.req.params.id;
            if (error instanceof Error.CastError) {
                return objectIdCastError(this.res, taskId);
            }

            return this.res.status(500).send(error.message);
        }
    }

    async delete(req, res) {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);
            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedtask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedtask);
        } catch (error) {
            const taskId = this.req.params.id;
            if (error instanceof Error.CastError) {
                return objectIdCastError(this.res, taskId);
            }
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
