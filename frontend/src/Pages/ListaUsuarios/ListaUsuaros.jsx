import { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './ListaUsuarios.css';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8000/registro');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          throw new Error('Error al obtener la lista de usuarios');
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/registro/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Eliminar el usuario de la lista después de eliminarlo en la API
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="boton-agregar">
        <Link to="/agregarUsuarios">
          <FaPlus />
        </Link>
      </button>

      <h1>Lista de Usuarios</h1>
      <div className="tabla">
        <table>
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>
                  <div className="botones-usuarios">
                    <Link to={`/editarUsuarios/${usuario.id}`}>
                      <button className='boton-editar'>
                        <FiEdit />
                      </button>
                    </Link>
                    <button
                      className='boton-eliminar'
                      onClick={() => handleEliminarUsuario(usuario.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaUsuarios;
