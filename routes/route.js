const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const musicController = require('../controllers/musicController'); // Controlador para la música
const albumController = require('../controllers/albumController'); // Controlador para los álbumes
const multer = require('multer'); 


// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }); // Configuración de Multer para subir archivos

// Router para las vistas
router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
    res.render('login', { alert: false });
});

router.get('/register', (req, res) => {
    res.render('register');
});

// Rutas CRUD para las canciones
router.get('/alta-cancion', authController.isAuthenticated, (req, res) => {
    res.render('alta-cancion', { user: req.user });
});

router.post('/alta-cancion', authController.isAuthenticated, upload.single('archivo'), musicController.subirCancion);
router.get('/listar-canciones', authController.isAuthenticated, musicController.listarCanciones);

// Rutas para editar y eliminar canciones
router.post('/editar-cancion', authController.isAuthenticated, upload.single('archivo'), musicController.editarCancion);
router.post('/eliminar-cancion', authController.isAuthenticated, musicController.eliminarCancion);


// Rutas CRUD para los álbumes
router.get('/alta-album', authController.isAuthenticated, (req, res) => {
    res.render('alta-album', { user: req.user });
});

router.post('/alta-album', authController.isAuthenticated, upload.fields([
    { name: 'archivo_album', maxCount: 1 }, // Archivo del álbum
    { name: 'archivo_foto', maxCount: 1 } // Foto de la tapa del álbum
]), albumController.subirAlbum);

router.get('/listar-albumes', authController.isAuthenticated, albumController.listarAlbumes);

// Rutas para editar y eliminar albumes
router.post('/editar-album', authController.isAuthenticated, upload.single('archivo'), albumController.editarAlbum);
router.post('/eliminar-album', authController.isAuthenticated, albumController.eliminarAlbum);



// Router para los métodos del controller de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
