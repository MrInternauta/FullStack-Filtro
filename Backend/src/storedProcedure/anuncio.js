import ANUNCIO from "../model/anuncio";
import TIPOS from "../model/tipo";
import { Op }  from "sequelize";

export async function getAll({ titulo, tipo, minimo, maximo }) {
    let whereStatment = {};
    if (tipo) {
        whereStatment['tipoid'] = tipo;
    }
    if (titulo || minimo || maximo) {
        if (titulo) {
            whereStatment['titulo'] = {
                [Op.iLike]: `%${titulo}%`
            };
        }
        if (minimo && !maximo) {
            whereStatment['precio'] = {
                [Op.gte]: minimo
            };
        }
        if (maximo && !minimo) {
            whereStatment['precio'] = {
                [Op.lte]: maximo
            };
        }
        if (maximo && minimo) {
            whereStatment['precio'] = {
                [Op.between]: [minimo, maximo]
            };
        }
    }
    console.log(whereStatment);
    let anuncio = await ANUNCIO.findAll
        (
            {
                attributes: ['id', 'precio', 'titulo', 'imagen'],
                include: TIPOS,
                where: whereStatment
            }
        );
    return anuncio;
}