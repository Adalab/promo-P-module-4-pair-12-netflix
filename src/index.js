// DÍA 1 - creamos el servidor con express y hacemos require de lo que necesitamos

const express = require('express');
const cors = require('cors');
const server = express();

const Database = require('better-sqlite3');

// DÍA 5 - Hemos hecho base de datos y nos la traemos a node para usarla
const db = new Database('./src/db/database.db', { verbose: console.log });

// DÍA 1 -  configuramos el servidor.
server.use(cors());
server.use(express.json());

// DÍA 1 -  arrancamos el servidor
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// DÍA 3 -  Servidor estático que escucha la carpeta public. es relativo a la raiz del proyecto
const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

// DÍA 3 -  Servidor estático para las fotos
const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));

// DÍA 2 -  Primer endpoint que escucha la peticion de películas (fetch en services/api-movies.js)
// DÍA 2 -  Filtro por género con query params
// DÍA 2 -  if params gender le llega vacio devuelve true.
// DÍA 2 -  else si coincide el gender de la api con el gender que le llega por params lo pone false
// DÍA 2 -  la respuesta es true con lo que se ha filtrado
// DÍA 5 - Ya no estamos usando usersfromapi si no la base de datos. Hacemos el SELECT para obtener las películas
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM movies ORDER BY title`);
  const movieList = query.all();

  const filterMovies = movieList.filter((movie) => {
    if (req.query.gender == '') {
      return true;
    } else {
      return movie.gender === req.query.gender ? true : false;
    }
  });
  res.json({
    success: true,
    movies: filterMovies,
  });
});
// DÍA 3 -  Peticion por post para comprobar el login de la usuaria. Creamos el nuevo end point /login. Hacemos fetch en services/api-user/ funcion snedlogintoapi. en req nos llegan los datos introducidos por la usuaria. Hacemos res según si existen o no
server.post('/login', (req, res) => {
  const query = db.prepare(
    `SELECT * FROM users WHERE email = ? AND password = ?`
  );
  const loginUsers = query.get(req.body.email, req.body.password);
  if (loginUsers !== undefined) {
    return res.json({
      success: true,
      userId: loginUsers.id,
    });
  } else {
    return res.json({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  }
});

// DIA 6 -Peticion por post para registro de la usuaria a través de INSERT en la base de datos. Hemos modificado en services/api-user/sendsignuptoapi el fetch para que envíe bien la req y reciba bien la res
server.post('/sign', (req, res) => {
  const query = db.prepare(
    `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`
  );
  const result = query.run(req.body.email, req.body.password, req.body.name);
  res.json({
    success: true,
    userId: result.lastInsertRowid,
  });
});
