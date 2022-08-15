import nodemailer from 'nodemailer';
import ejs from "ejs";
import fs from "fs";
import path from 'path';

/**
 * 
 * @version 0.0.1
 * @function sendEmail
 * @description Obtener todos los anuncios
 * @returns {object} Retorna de listado de productos
*/
export async function sendEmail(req, res) {
    try {
        let body = req.body;
        let { nombre, email, mensaje } = body;
        //Creamos el objeto de transporte
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "842e3783975706",
              pass: "7d51276db46900"
            }
          });
        let mailOptions = {
            from: 'hectorivanalvaradoalanis@gmail.com',
            to: 'angello_dm@hotmail.com', //
            subject: 'Mensaje enviado de ' + nombre ,
            html: CreateHTML({nombre, email, mensaje})
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                const RESPONSE = { status: false, data: error, message: 'Error: No se pudo enviar la información' };
                return res.status(500).json(RESPONSE);
            } else {
                console.log('Email enviado: ' + info.response);
                const RESPONSE = { status: true, message: 'Información enviada correctamente' };
                return res.status(200).json(RESPONSE);
            }
        });
    }
    catch (error) {
        console.error(error);
        const RESPONSE = { status: false, data: error, message: 'Error: No se pudo enviar la información' };
        return res.status(500).json(RESPONSE);
    }
}

/**
 * @version 0.0.1
 * @function CreateHTML
 * @description Crea HTML
 
 */
    export function CreateHTML({ nombre, email, mensaje }) {
        try {
            //Leer archivo email
            const archivo = path.resolve(__dirname, `../../views/email/email.ejs`);
            //compilarlo
            const compilado = ejs.compile(fs.readFileSync(archivo, "utf8"));
            //crear HTML
            const html = compilado({
                nombre, email, mensaje
            });
    
            return html;
    
        } catch (error) {
            console.error(error);
        }
    }
