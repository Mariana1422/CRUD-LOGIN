import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EdistarUsuarios.css'

function EditarUsuarios() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8000/registro/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNombre(data.nombre);
          setCorreo(data.correo);
        } else {
          throw new Error('Error al obtener el usuario');
        }
      } catch (error) {
        console.error(error);
        setError('Error al obtener el usuario');
      }
    };

    obtenerUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/registro/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          correo: correo,
         
        }),
      });

      if (response.ok) {
        navigate("/listaUsuarios");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className='formulario-editar'>
      <h1>Editar Usuario</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
         
          <button type="submit">Actualizar</button>
          <Link to="/listaUsuarios">
            <button>Cancelar</button>
          </Link>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default EditarUsuarios;
