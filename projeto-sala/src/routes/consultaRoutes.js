const express = require('express');
const router = express.Router();

const controller = require('../controllers/consultaController');

router.post('/criar', controller.agendarConsulta);

module.exports = router;