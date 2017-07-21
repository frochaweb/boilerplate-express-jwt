import app from './src/app';

const port = 3000;

app.listen(port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`Servidor rodando na porta ${port}, ta na hora de codar`);
    }
});