import { Router } from 'express'
import { login, logout, perfil } from '../controllers/login.controllers.js';


const LoginRouter = Router()

LoginRouter.post('/login', login)
LoginRouter.post('/logout', logout)
LoginRouter.get('/perfil', perfil)

export default LoginRouter