import express from "express";
import morgan from "morgan";
import cors from "cors"
import registroRouter from "./routes/registro.routes.js";
import LoginRouter from "./routes/login.routes.js";

const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Cada vez que se llame por get muestre que funciona
app.get("/", (req, res) => {
    res.send("Funciona");
});
app.use(cors());

app.use(
    registroRouter,
    LoginRouter
)

//RUTAS EN APP
export default app;

