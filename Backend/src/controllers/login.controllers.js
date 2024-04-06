import Registro from "../models/registro.js";

//En consultarUsuario estamos buscando el usuario por medio del correo
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const consultarUsuario = await Registro.findOne({
      where: { correo: correo, password: password },
    });

    if (!consultarUsuario) {
      return res.status(404).json({
        message: "Credenciales inválidas",
      });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({
      message: "Cierre de sesión exitoso",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const perfil = async (req, res) => {
  try {
    const consultarUsuario = await Registro.findOne({
      where: {
        correo: data.usuario.correo,
      },
    });

    if (!consultarUsuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const userInfo = {
      ...consultarUsuario.dataValues,
      id: consultarUsuario.id,
      username: consultarUsuario.username,
    };

    res.status(200).json({
      perfil: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
