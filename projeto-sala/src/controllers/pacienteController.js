
const PacienteSchema = require("../models/PacienteSchema");

const criarPaciente = async (req, res) => {

//    const { nome, telefone, endereco, plano_saude, plano_saude_numero } = req.body

    try {

        const { nome, telefone, endereco, plano_saude, plano_saude_numero } = req.body

        if(!nome) {
            res.status(401).json({
                mensagem: "Verificar se todos os campos foram preenchidos"
            })
        }

        const buscarNumeroPlano = await PacienteSchema.find({ plano_saude_numero })
            if(buscarNumeroPlano.length !== 0) {
                return res.status(401).json({ mensagem: "Verificar informações que foram preenchidas [plano de saúde]"})
            }
        const paciente = new PacienteSchema({
            nome: req.body.nome,
            telefone: req.body.telefone, 
            endereco: req.body.endereco, 
            plano_saude: req.body.plano_saude, 
            plano_saude_numero: req.body.plano_saude_numero
        })

        const salvarPaciente = await paciente.save();
        res.status(201).json({
            paciente: salvarPaciente
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })

    }
}


const buscarPaciente = async (req, res) => {
    const { nome } = req.query;

    
    let query = { };

    if (nome) query.nome = new RegExp(nome, 'i');

    try{
        const pacientes = await PacienteSchema.find(query);
        res.status(200).json(pacientes)

    }catch(error){
        res.status(500).json({
            mensagem: error.message
        })
    }
}


const buscarPacientePorId = async (req, res) => {
    try {
        const paciente = await PacienteSchema.findById(req.params.id)
        res.status(200).json(paciente);

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}


const deletarPaciente = async(req, res) =>{
    try{
        const paciente = await PacienteSchema.findById(req.params.id)

        await paciente.delete();

        res.status(200).json({
            mensagem: `Paciente removida do sistema.`
        })
    }catch(error){
        res.status(400).json({
            mensagem: error.message
        })
    }
}

const atualizarPacientePorId = async(req, res) => {
    try {
        const { nome, telefone, endereco, plano_saude, plano_saude_numero } = req.body;

        const procurarPaciente = await PacienteSchema.findById(req.params.id);

        procurarPaciente.nome = nome || procurarPaciente.nome;
        procurarPaciente.telefone = telefone || procurarPaciente.telefone;
        procurarPaciente.endereco = endereco || procurarPaciente.endereco;
        procurarPaciente.plano_saude = plano_saude || procurarPaciente.plano_saude;
        procurarPaciente.plano_saude_numero = plano_saude_numero || procurarPaciente.plano_saude_numero;

        const pacienteAtualizado = procurarPaciente.save();

        res.status(200).json(pacienteAtualizado)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    criarPaciente,
    buscarPaciente,
    buscarPacientePorId, 
    deletarPaciente,
    atualizarPacientePorId
}