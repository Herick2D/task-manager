const mongoose = require('mongoose');

const connectToDatabase = () => {
    return mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.c6hr0l3.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster`
        )
        .then(() => console.log('Conectado ao MongoDB'))
        .catch((error) => console.error('Erro na conexão:', error.message));
};

module.exports = connectToDatabase;
