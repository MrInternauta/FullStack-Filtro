import {getAll} from '../../storedProcedure/anuncio';

/**
 * 
 * @version 0.0.1
 * @function GetAllAnuncio
 * @description Obtener todos los anuncios
 * @param {object} productzaos listado de productos
 * @returns {object} Retorna de listado de productos
*/
export async function GetAllAnuncio(req, res) {
    try {
        let body = req.body;
        let { titulo, tipo, minimo, maximo } = body;
        let anuncio = await getAll({ titulo, tipo, minimo, maximo });
        const RESPONSE = { status: true, data: anuncio };
        return res.status(200).json(RESPONSE);
    } catch (error) {
        console.error(error);
        const RESPONSE = { status: false, data: error, message: 'Error: No se pudo obtener la información' };
        return res.status(500).json(RESPONSE);
    }
}
