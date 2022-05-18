const express = require('express');
const cors = require('cors');
const moviesFromApi = require('./data/movies.json');
const usersFromApi = require('./data/users.json');
// creamos el servidor con express
const server = express();

// configuramos el servidor
server.use(cors());
server.use(express.json());
// arrancamos el servidor
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
// Servidor estático que escucha la carpeta publis. es relativo a la raiz del proyecto
const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

// Servidor estático para las fotos
const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));

//----------------------------------------------esto era lo de antes--------------BORRAR
// server.get('/movies', (req, res) => {
//   const filterMovies = moviesFromApi.filter(
//     (movie) => movie.gender === req.query.gender
//   );

//   const response = {
//     success: true,
//     movies: filterMovies,
//   };
//   res.json(response);
// });

// Primer endpoint que escucha la peticion de películas
// Filtro por género con query params
// if params gender le llega vacio devuelve true.
// else si coincide el gender de la api con el gender que le llega por params lo pone false
// la respuesta es true con lo que se ha filtrado
server.get('/movies', (req, res) => {
  const filterMovies = moviesFromApi.filter((movie) => {
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
// Peticion por post para comprobar el login de la usuaria
server.post('/login', (req, res) => {
  console.log(req.body);
  const loginUsers = usersFromApi.find((user) => {
    if (user.email === req.body.email && user.password === req.body.password) {
      console.log(user.id);
      return res.json({
        success: true,
        userId: user.id,
      });
    } else {
      return res.json({
        success: false,
        errorMessage: 'Usuaria/o no encontrada/o',
      });
    }
  });
});

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
