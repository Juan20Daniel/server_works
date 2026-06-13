require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connecDB = require('./src/config/database');
const errorHandler = require('./src/middlewares/errorHandler');
// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/v1', require('./src/v1Routes'));
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

// Puerto de escucha
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || 'localhost';

const startServer = async () => {
    await connecDB();

    app.listen(PORT, HOST, () => {
        console.log(`Servidor en ejecución`);
    });
}

startServer();