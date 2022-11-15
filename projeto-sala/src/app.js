require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const database = require('./database/mongoConfig');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/paciente", pacienteRoutes);
app.use("/consulta", consultaRoutes);

database.connect();

module.exports = app;