const mongoose = require('mongoose'); 

const consultaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    data_consulta: {
        type: Date
    }
}, { timestamps: true}) 

module.exports = mongoose.model('Consulta', consultaSchema);