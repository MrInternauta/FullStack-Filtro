
// ============================
//  Entorno
// ============================
let enviroment =
    process.argv.find(
        (arg) => arg === "dev" || arg === "dev" || arg === "prod" || arg === "PROD"
    ) || "dev";
process.env.NODE_ENV = process.env.NODE_ENV || enviroment;
let configProject;
if (process.env.NODE_ENV === 'dev') {
    configProject = {
        enviroment,
        PORT: 5000,
        APIVERSION: ['v1.0'],
    };
}

// ============================
//  Puerto
// ============================

process.env.PORT = process.env.PORT || configProject.PORT;

// ============================
//  Version de la API
// ============================
process.env.APIVERSION = process.env.APIVERSION || configProject.APIVERSION;
