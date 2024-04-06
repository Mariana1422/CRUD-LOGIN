import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Registro.css';

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setContrasena] = useState('');
  const [error, setError] = useState('');

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

      const responseData = await response.json();
      
      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error(responseData.message || "Error en el registro");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="formulario">
      <h2>Registro</h2>
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
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Registrarse</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
    </div>
  );
}

export default Registro;
