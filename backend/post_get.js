const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.options('/usuarios/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const password = req.body.password;

    let db = new sqlite3.Database('registros.db');

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            surname TEXT,
            email TEXT UNIQUE,
            password TEXT
        )`);

        db.run(`INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)`, [nombre, apellido, email, password], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Se ha insertado un nuevo usuario con el ID ${this.lastID}`);
            res.redirect('http://localhost:5173/');
        });

        db.close();
    });
});

app.post('/register', (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    let db = new sqlite3.Database('registros.db');

    let sql = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)';
    const params = [nombre, apellido, email, password];

    db.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error al insertar usuario en la base de datos');
            return;
        }

        res.send({ id: this.lastID });

        // Cerrar la conexión a la base de datos después de que se haya completado la inserción
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Conexión a la base de datos cerrada');
        });
    });
});


app.get('/usuarios', (req, res) => {
    const { id, nombre, apellido, password } = req.query;

    let db = new sqlite3.Database('registros.db');

    let sql = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    if (id) {
        sql += ' AND id = ?';
        params.push(id);
    }

    if (nombre) {
        sql += ' AND name LIKE ?';
        params.push('%' + nombre + '%');
    }

    if (apellido) {
        sql += ' AND surname LIKE ?';
        params.push('%' + apellido + '%');
    }
    
    if (password) {
        sql += ' AND password = ?';
        params.push(password);
    }

    db.serialize(() => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error al recuperar usuarios de la base de datos');
                return;
            }
            res.send(rows);
        });
        db.close();
    });
});

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    let db = new sqlite3.Database('registros.db');

    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE id = ?`, id, (err, row) => {
            if (err) {
                console.error(err.message);
                res.status(500).send(`Error al recuperar usuario con ID ${id}`);
                return;
            }
            res.send(row);
        });
        db.close();
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    let db = new sqlite3.Database('registros.db');

    db.serialize(() => {
        db.run(`DELETE FROM users WHERE id = ?`, id, function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error al borrar usuario de la base de datos');
                return;
            }
            console.log(`Usuario con ID ${id} eliminado`);
            res.send(`Usuario con ID ${id} eliminado correctamente`);
        });
        db.close();
    });
});

app.put('/usuarios/:id/update', (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;

    let db = new sqlite3.Database('registros.db');

    db.serialize(() => {
        db.run(`UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?`, [nombre, apellido, email, id], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send(`Error al actualizar usuario con ID ${id}`);
                return;
            }
            console.log(`Usuario con ID ${id} actualizado`);
            res.send(`Usuario con ID ${id} actualizado correctamente`);
        });
        db.close();
    });
});

/*
Api Login Manu
*/

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    let db = new sqlite3.Database('registros.db');

    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error al recuperar usuario de la base de datos');
                return;
            }
            if (row) {
                res.send(row);
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        });
        db.close();
    });
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
