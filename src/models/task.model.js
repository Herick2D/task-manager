const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const TaskSchema = new Schema({
    descricao: {
        type: String,
        required: true,
    },
    estaCompleto: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = mongoose.model('Tasks', TaskSchema);

module.exports = TaskModel;
