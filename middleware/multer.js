const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/albums'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

module.exports = upload.fields([
    { name: 'archivo_album', maxCount: 1 }, // Para el archivo del álbum en alta de álbum
    { name: 'archivo_foto', maxCount: 1 },  // Para la foto del álbum en alta de álbum
    { name: 'archivo', maxCount: 1 },       // Para el archivo de la canción en alta de canción
]);
