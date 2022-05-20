// DÍA 1 - creamos el servidor con express y hacemos require de lo que necesitamos

const express = require('express');
const cors = require('cors');

// const moviesFromApi = require('./data/movies.json');
const usersFromApi = require('./data/users.json');
const Database = require('better-sqlite3');
const db = new Database('./src/db/database.db', { verbose: console.log });
//const dbusers = new Database('./src/db/datausers.db', { verbose: console.log });
const server = express();

// DÍA 1 -  configuramos el servidor
server.use(cors());
server.use(express.json());
// DÍA 1 -  arrancamos el servidor
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
// DÍA 3 -  Servidor estático que escucha la carpeta publis. es relativo a la raiz del proyecto
const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

// DÍA 3 -  Servidor estático para las fotos
const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));

// DÍA 2 -  Primer endpoint que escucha la peticion de películas
// DÍA 2 -  Filtro por género con query params
// DÍA 2 -  if params gender le llega vacio devuelve true.
// DÍA 2 -  else si coincide el gender de la api con el gender que le llega por params lo pone false
// DÍA 2 -  la respuesta es true con lo que se ha filtrado
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT * FROM movies`);
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
// DÍA 3 -  Peticion por post para comprobar el login de la usuaria
server.post('/login', (req, res) => {
  const query = db.prepare(
    `SELECT * FROM users WHERE email = ? AND password = ?`
  );
  const loginUsers = query.get(req.body.email, req.body.password);
  console.log(loginUsers);
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

// DIA 6 -Peticion por post para registro de la usuaria
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

// server.post('/sign', (req, res) => {
//   console.log(req.body.email);
//   const singUsers = db.find((user) => {
//     if (user.email !== req.body.email && user.password !== req.body.password) {
//       usersFromApi.push();
//     }
//   });
// });

//---------------------------creo que no sirve-------------------------------BORRAR
// // API request > POST > http://localhost:3000/new-user
// server.post('/gender', (req, res) => {
//   // console request body params
//   console.log(`holi`);
//   console.log(
//     `Creating the user in database with user name: "${req.movies.gender}"`
//   );
//   const response = {
//     result: `User created: ${req.body.userName}`,
//   };
//   res.json(response);
// });
