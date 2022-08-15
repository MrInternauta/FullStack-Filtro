import anuncio from './anuncio';
import TIPOS from './tipo';

import Sequelize from 'sequelize';


// anuncio.hasOne(tipo);
// tipo.belongsTo(tipo);
anuncio.hasOne(TIPOS, {
    foreignKey: {
        name: 'id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sourceKey: 'tipoid'


});
TIPOS.belongsTo(anuncio, {
    foreignKey: {
        name: 'id',
        type: Sequelize.INTEGER
    }
});



