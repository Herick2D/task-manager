const notFoundError = (res) => {
    return res
        .status(404)
        .send('Esse dado não foi encontrando no banco de dados.');
};

module.exports = {
    notFoundError,
};
