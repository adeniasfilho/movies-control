//Função para auxiliar o uso de async/await e para tratamento de erros com try/catch
const exec = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
    .catch((error) => {
        next(error);
    });
};
module.exports = exec;