import TIPOS from "../model/tipo";

export async function getAll() {
    let tipos = await TIPOS.findAll();
    return tipos;
}