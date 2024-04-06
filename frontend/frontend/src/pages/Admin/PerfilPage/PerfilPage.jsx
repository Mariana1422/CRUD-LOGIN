import React, { useState, useEffect } from "react";
import "./PerfilPage.css";
import MenuLateral from "../../../components/Admin/MenuLateral/MenuLateral";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Users from "../../../services/UsuariosService";

function PerfilPage() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: null,
    nombre: "",
    correo: "",
    celular: "",
    RolId: null,
  });

  useEffect(() => {
    fetch("http://localhost:7000/usuarios")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          const user = data[i];
          if (user.correo === localStorage.getItem("correo")) {
            setUsuarioLogeado(user);
            localStorage.setItem("rolUser", user.RolId);
            break;
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
      });
  }, []);

  if (!usuarioLogeado) {
    return <div>Error: No se encontraron datos del usuario.</div>;
  }

  const getRolName = (RolId) => {
    if (RolId === 1) {
      return "Admin";
    } else if (RolId === 2) {
      return "User";
    }
    return "";
  };

  const { nombre, correo, celular } = usuarioLogeado;

  const handleEditUser = () => {
    setEditMode(true);
    setEditedUser({
      id: usuarioLogeado.id,
      nombre: usuarioLogeado.nombre,
      correo: usuarioLogeado.correo,
      celular: usuarioLogeado.celular,
      RolId: usuarioLogeado.RolId,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedUser({
      id: null,
      nombre: "",
      apellido: "",
      direccion: "",
      celular: "",
      correo: "",
      createdAt: "",
      RolId: null,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await Users.updateUser(editedUser.id, editedUser);
      setEditMode(false);
      const updatedUser = await Users.getUsuarioLogeado();
      updatedUser.sort((a, b) => a.id - b.id);
      setUsuarioLogeado(updatedUser);
      toast.success("Cambios guardados correctamente");
    } catch { }
  };

  return (
    <>
      <MenuLateral />
      <ToastContainer />


      <div className="edit-user">
        <div className="edit-card">
          <div className="left-user">
            <div className="icone-wrapper">
              <Link onClick={handleEditUser}>
                <FaRegEdit className="edit-icon" />
              </Link>
            </div>
            <div className="icond-wrapper">
              <Link>
                <MdOutlineDeleteForever className="delete-icon" />
              </Link>
            </div>
          </div>

          <form className="perfil-form">
            <h1 className="titulo-perfil">{nombre}</h1>
            <div className="grupo-perfil">
              <div className="campo-perfil">
                <label htmlFor="username">Username</label>
                {editMode ? (
                  <input
                    type="text"
                    id="username"
                    className="chiquito"
                    value={editedUser.nombre}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, nombre: e.target.value })
                    }
                  />
                ) : (
                  <p id="username" className="chiquito">
                    {nombre}
                  </p>
                )}
              </div>
              <div className="campo-perfil">
                <label className="chiquito-2" htmlFor="correo">
                  Correo
                </label>
                {editMode ? (
                  <input
                    type="text"
                    id="correo"
                    className="chiquito-2"
                    placeholder="Deberás logearte de nuevo"
                    value={editedUser.correo}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, correo: e.target.value })
                    }
                  />
                ) : (
                  <p id="correo" className="chiquito-2">
                    {correo}
                  </p>
                )}
              </div>
            </div>
            <div className="grupo-perfil">
              <div className="campo-perfil">
                <label htmlFor="telefono">Celular</label>
                {editMode ? (
                  <input
                    type="text"
                    id="telefono"
                    className="chiquito"
                    value={editedUser.celular}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, celular: e.target.value })
                    }
                  />
                ) : (
                  <p id="telefono" className="chiquito">
                    {celular}
                  </p>
                )}
              </div>
              <div className="campo-perfil">
                <label className="chiquito-2" htmlFor="estado">
                  Estado
                </label>
                <p id="estado" className="chiquito-2">
                  Activo
                </p>
              </div>
            </div>
            <div className="campo-perfil">
              <label htmlFor="rol">Rol</label>
              <p id="rol" className="rol">
                {getRolName(usuarioLogeado.RolId)}
              </p>
            </div>
            {editMode && (
              <>
                <button
                  type="button"
                  className="button-guardar-edit"
                  onClick={handleSaveEdit}
                >
                  Guardar
                </button>

                <button
                  type="button"
                  className="button-volver-edit"
                  onClick={handleCancelEdit}
                >
                  Volver
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default PerfilPage;
