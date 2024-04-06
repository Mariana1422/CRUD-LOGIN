import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registro from "./Pages/Registro/Registro";
import Login from "./Pages/Login/Login";
import ListaUsuaros from "./Pages/ListaUsuarios/ListaUsuaros";
import AgregarUsuarios from "./Pages/AgregarUsuarios/AgregarUsuarios";
import EditarUsuarios from "./Pages/EditarUsuarios/EditarUsuarios";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Registro/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/listaUsuarios" element={<ListaUsuaros/>}/>
      <Route path="/agregarUsuarios" element={<AgregarUsuarios/>}/>
      <Route path="/editarUsuarios/:id" element={<EditarUsuarios />} />
      </Routes>
    </Router>
  );
}

export default App;