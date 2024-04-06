import app from "./app.js"
import { config } from "dotenv"
import './conexions.js'
config()

const { PORT } = process.env
const port = PORT || 8000

//puerto que estan ubicados
app.listen(port, () => console.log(`App run on port ${port}`))