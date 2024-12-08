const db = require('../database/db'); 


// Subir una nueva canción
exports.subirCancion = (req, res) => {
    const { nombre, artista, album } = req.body;

    // Manejo de archivo de la canción
    const archivo = req.file ? req.file.filename : null; 

    // Verifica que se haya subido el archivo de la canción
    if (!archivo) {
        return res.status(400).send('Falta el archivo de la canción.');
    }

    const sql = 'INSERT INTO canciones (nombre, artista, album, archivo) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, artista, album, archivo], (err, result) => {
        if (err) {
            console.error('Error al subir la canción:', err);
            return res.status(500).send('Error al subir la canción');
        }
        res.redirect('/listar-canciones');
    });
};


// Listar todas las canciones
exports.listarCanciones = (req, res) => {
    const sql = 'SELECT * FROM canciones';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al listar canciones:', err);
            return res.status(500).send('Error al listar canciones');
        }
        res.render('listar-canciones', { canciones: result, user: req.user });
    });
};

// Editar una canción
exports.editarCancion = (req, res) => {
    const { id, nombre, artista, album } = req.body; // ID de la canción y nuevos datos
    const archivo = req.file ? req.file.filename : null; // Manejo del archivo

    // SQL para actualizar la canción
    const sql = 'UPDATE canciones SET nombre = ?, artista = ?, album = ?, archivo = ? WHERE id = ?';
    db.query(sql, [nombre, artista, album, archivo, id], (err, result) => {
        if (err) {
            console.error('Error al editar la canción:', err);
            return res.status(500).send('Error al editar la canción');
        }
        res.redirect('/listar-canciones'); // Redirige después de editar
    });
};

// Eliminar una canción
exports.eliminarCancion = (req, res) => {
    const { id } = req.body; // ID de la canción a eliminar

    // SQL para eliminar la canción
    const sql = 'DELETE FROM canciones WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la canción:', err);
            return res.status(500).send('Error al eliminar la canción');
        }
        res.redirect('/listar-canciones'); // Redirige después de eliminar
    });
};

