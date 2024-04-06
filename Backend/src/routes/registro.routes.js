import { Router } from "express";
import { crearUsuario, getAllUsuario,getUsuario, putUsuario, deleteUsuario } from "../controllers/registro.controllers.js";

const registroRouter = Router()

registroRouter.get('/registro', getAllUsuario)
registroRouter.get('/registro/:id', getUsuario)
registroRouter.post('/registro', crearUsuario)
registroRouter.put('/registro/:id', putUsuario)
registroRouter.delete('/registro/:id', deleteUsuario)

export default registroRouter