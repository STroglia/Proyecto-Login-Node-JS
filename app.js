const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/route'); 

const app = express();

// Seteamos las variables de entorno
dotenv.config({ path: './env/.env' });

// Seteamos el motor de plantillas
app.set('view engine', 'ejs');

// Seteamos la carpeta public para archivos estáticos
app.use(express.static('public'));

// Configuración de la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Para procesar datos enviados desde forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Para poder trabajar con las cookies
app.use(cookieParser());

// Llamar al router
app.use('/', routes);

// Ruta para el dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user }); 
});

// Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal.');
});

// Inicializa el servidor
app.listen(3000, () => {
    console.log(`SERVER UP running in ${process.env.DB_HOST}:3000`); 
});
