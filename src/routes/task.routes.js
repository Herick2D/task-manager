const express = require('express');
const router = express.Router();

const TaskModel = require('../models/task.model');
const TaskController = require('../controllers/task.controller');

router.get('/', async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get('/:id', async (req, res) => {
    return new TaskController(req, res).getById();
});

router.patch('/:id', async (req, res) => {
    return new TaskController(req, res).update();
});

router.post('/', async (req, res) => {
    return new TaskController(req, res).create();
});

router.delete('/:id', async (req, res) => {
    return new TaskController(req, res).delete();
});

module.exports = router;
