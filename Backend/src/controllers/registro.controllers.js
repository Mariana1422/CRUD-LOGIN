import { config } from "dotenv";
import Registro from './../models/registro.js';

config();

export const crearUsuario = async (req, res) => {
    try {
        const consulta = await Registro.findByPk(req.body.id);

        if (consulta) {
            return res.status(400).json({
                message: "El id del usuario ya existe",
            });
        }

        let data = req.body;

        const crearUser = await Registro.create(data);

        const guardar = await crearUser.save();
        res.status(201).json(guardar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllUsuario = async (req, res) => {
    try {
        const consultarUsuarios = await Registro.findAll();

        res.status(200).json(consultarUsuarios);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getUsuario = async (req, res) => {
    try {
        const consultarUsuarios = await Registro.findByPk(req.params.id);

        if (!consultarUsuarios) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json(consultarUsuarios);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const putUsuario = async (req, res) => {
    try {
        const consultarUsuarios = await Registro.findByPk(req.params.id);

        if (!consultarUsuarios) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }


        let data = req.body;

        await consultarUsuarios.update(data);

        res.status(200).json({
            message: "Usuario actualizado",
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};
export const deleteUsuario = async (req, res) =>{
    try {
        const consultarUsuarios = await Registro.findByPk(req.params.id);

        if (!consultarUsuarios) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        await consultarUsuarios.destroy();

        res.status(200).json({
            message: `${consultarUsuarios.nombre} Ha sido eliminado`,
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}