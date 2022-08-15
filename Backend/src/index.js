
import app from './endPoints';
/**
 * 
 * @version 0.0.1
 * @function main
 * @description Inicia el servidor
*/
async function main() {
    if(app.http) {
        await app.http.listen(process.env.PORT);
        console.log('Servidor HTTP escuchando...');
    }
}

main();