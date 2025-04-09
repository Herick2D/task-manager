const notFoundError = (res) => {
    return res
        .status(404)
        .send('Esse dado não foi encontrando no banco de dados.');
};

const objectIdCastError = (res, invalidValue) => {
    return res
        .status(400)
        .send(`O valor ${invalidValue} não é um objectId válido.`);
};

module.exports = {
    notFoundError,
    objectIdCastError,
};
