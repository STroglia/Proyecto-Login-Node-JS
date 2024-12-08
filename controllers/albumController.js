const db = require('../database/db'); // Conexión a la base de datos


// Subir un nuevo álbum
exports.subirAlbum = (req, res) => {
    const { nombre, artista, fecha_lanzamiento } = req.body;

    // Manejo de archivos
    const archivo_foto = req.files['archivo_foto'] ? req.files['archivo_foto'][0].filename : null; 
    const archivo_album = req.files['archivo_album'] ? req.files['archivo_album'][0].filename : null;

    const sql = 'INSERT INTO albumes (nombre, artista, archivo_foto, archivo_album, fecha_lanzamiento) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, artista, archivo_foto, archivo_album, fecha_lanzamiento], (err, result) => {
        if (err) {
            console.error('Error al subir el álbum:', err);
            return res.status(500).send('Error al subir el álbum');
        }
        res.redirect('/listar-albumes');
    });
};

// Listar todos los álbumes
exports.listarAlbumes = (req, res) => {
    const sql = 'SELECT * FROM albumes';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al listar álbumes:', err);
            return res.status(500).send('Error al listar álbumes');
        }
        res.render('listar-albumes', { albumes: result, user: req.user });
    });
};

// Editar un album
exports.editarAlbum = (req, res) => {
    const { id, nombre, artista, fecha_lanzamiento } = req.body; 

    // Manejo de archivos (similar a subirAlbum)
    const archivo_foto = req.files && req.files['archivo_foto'] ? req.files['archivo_foto'][0].filename : null;
    const archivo_album = req.files && req.files['archivo_album'] ? req.files['archivo_album'][0].filename : null;

    // Construir la consulta SQL de actualización
    const sql = 'UPDATE albumes SET nombre = ?, artista = ?, archivo_album = COALESCE(?, archivo_album), archivo_foto = COALESCE(?, archivo_foto), fecha_lanzamiento = ? WHERE id = ?';
    
    // Ejecutar la consulta SQL
    db.query(sql, [nombre, artista, archivo_album, archivo_foto, fecha_lanzamiento, id], (err, result) => {
        if (err) {
            console.error('Error al editar el álbum:', err);
            return res.status(500).send('Error al editar el álbum');
        }
        res.redirect('/listar-albumes'); // Redirige después de editar
    });
};

// Eliminar un album
exports.eliminarAlbum = (req, res) => {
    const { id } = req.body; // ID del album a eliminar

    // SQL para eliminar el album
    const sql = 'DELETE FROM albumes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el album:', err);
            return res.status(500).send('Error al eliminar el album');
        }
        res.redirect('/listar-albumes'); // Redirige después de eliminar
    });
};

