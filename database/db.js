const mysql = require('mysql');

// Crear la conexión
const conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "login_node",
});

// Conectar a la base de datos
conection.connect((error) => {
    if (error) {
        console.log('El error de conexión es: ' + error);
        return;
    }
    console.log('¡Conectado a la base de datos MySQL!');
});

// Imprimir las variables de entorno (después de la carga)
console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_DATABASE);

// Exportar la conexión
module.exports = conection;

