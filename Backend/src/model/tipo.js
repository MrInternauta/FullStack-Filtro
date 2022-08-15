import Sequelize from 'Sequelize';
import { SEQUELIZE_CONFIG }  from '../config/database';

const TIPOS = SEQUELIZE_CONFIG.define(
    'tipos',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false
    }
);
export default TIPOS;