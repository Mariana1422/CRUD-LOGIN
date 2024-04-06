import { DataTypes } from "sequelize";
import { config } from "dotenv";
import { conexion } from '../conexions.js';

config()

const Registro = conexion.define("Registro",{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Registro',
    timestamps: true
})



export default Registro