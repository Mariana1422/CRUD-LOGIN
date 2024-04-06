import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

function Login ()  {
    const navigate = useNavigate();
    
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="correo"
          value={correo}
          onChange={(e) => setCorreo (e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/listaUsuarios" >
        <button type="submit">Iniciar sesión</button>
        {error && <p className="error-message">{error}</p>}
        </Link>
      </form>
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </div>
  );
}

export default Login;
