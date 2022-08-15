import Sequelize from 'sequelize';
import { } from './config';

/** 
 * @version 0.0.1
 * @function ConnectDB
 * @description Conecta Sequelize a la base de datos.
 * @returns {Sequelize} Instancia de la conexión a la base de datos.
 */
function connectDB() {
    let conexion = new Sequelize(
        "ca_9",
        "ca_9",
        "4i5r25u8ca9",
        {
            host: "saea98.com",
            port: 5433,
            dialect: 'postgres',
            // pool: {
            //     max: 5,
            //     min: 0,
            //     require: 30000,
            //     idle: 10000
            // },
            logging: true
        }
    );
    return conexion;
}

let sequelize = connectDB();
sequelize.authenticate()
    .then((data) => {
        console.log(data);
    })
    .catch(err => {
        console.log('No se conecto', err);
    })
export const SEQUELIZE_CONFIG = connectDB();
