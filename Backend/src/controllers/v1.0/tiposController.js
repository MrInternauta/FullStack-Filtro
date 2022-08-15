import {getAll} from '../../storedProcedure/tipos';

/**
 * 
 * @version 0.0.1
 * @function GetAllAnuncio
 * @description Obtener todos los anuncios
 * @returns {object} Retorna de listado de tipos
*/
export async function GetAllTipos(req, res) {
    try {
        
        let tipos = await getAll();
        const RESPONSE = { status: true, data: tipos };
        return res.status(200).json(RESPONSE);
    } catch (error) {
        console.error(error);
        const RESPONSE = { status: false, data: error, message: 'Error: No se pudo obtener la información' };
        return res.status(500).json(RESPONSE);
    }
}
