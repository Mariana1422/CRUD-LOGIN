import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './AgregarUsuario.css';

function AgregarUsuario() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          correo: correo,
          password: password,
        }),
      });

      if (response.ok) {
        setTimeout(() => {
          navigate("/listaUsuarios");
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar usuario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='formulario-agregar'>
      <h1>Agregar Nuevo Usuario</h1>
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
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
        <Link to="/listaUsuarios">
          <button>Volver a la Lista de Usuarios</button>
        </Link>
      </div>
    </div>
  );
}

export default AgregarUsuario;
