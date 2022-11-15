const express = require('express');
const router = express.Router();

const controller = require('../controllers/pacienteController');

router.post('/criar', controller.criarPaciente);
router.get('/buscar', controller.buscarPaciente);
router.get('/:id', controller.buscarPaciente);
router.delete('/:id', controller.deletarPaciente);
router.patch('/:id', controller.atualizarPacientePorId);

module.exports = router;


