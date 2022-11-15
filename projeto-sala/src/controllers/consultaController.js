const ConsultaSchema = require('../models/ConsultaSchema');
const moment = require('moment')

const agendarConsulta = async(req, res) => {
    try {

        const { data_consulta } = req.body

        const agendar = new ConsultaSchema({
            paciente: req.body.paciente,
            data_consulta: tratarDataConsulta(req.body.data_consulta)
        })

        res.status(201).json({
            mensagem: `Consulta agendada para o dia ${data_consulta}`
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
}

const tratarDataConsulta = (data) => {
    return moment.utc(data)
}

module.exports = {
    agendarConsulta
}