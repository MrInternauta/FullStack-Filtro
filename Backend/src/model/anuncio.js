import Sequelize from 'Sequelize';
import { SEQUELIZE_CONFIG }  from '../config/database';

const ANUNCIO = SEQUELIZE_CONFIG.define(
    'anuncios',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.TEXT
        },
        imagen: {
            type: Sequelize.TEXT,
        },
        precio: {
            type: Sequelize.NUMBER,
        },
        tipoid: {
            type: Sequelize.INTEGER,
        }
    },
    {
        timestamps: false
    }
);
export default ANUNCIO;