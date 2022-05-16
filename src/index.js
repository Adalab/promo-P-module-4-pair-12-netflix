const express = require('express');
const cors = require('cors');
const moviesFromApi = require('../web/src/data/movies.json');
// create server
const server = express();
// set express middleware
//   we must always put these lines, until we know what they do
//   more info: https://expressjs.com/es/guide/using-middleware.html
server.use(cors());
server.use(express.json());
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
// STATIC SERVER: listen files in public folder
const staticServerPath = './src/public-react'; // relative to the root of the project
server.use(express.static(staticServerPath));
// API: listen fetch requests
// API request > GET > http://localhost:4000/movies
server.get('/movies', (req, res) => {
  const filterMovies = moviesFromApi.filter(
    (movie) => movie.gender === req.query.gender
  );
  const response = {
    success: true,
    movies: filterMovies,
  };
  res.json(response);
});

// API request > POST > http://localhost:3000/new-user
server.post('/gender', (req, res) => {
  // console request body params
  console.log(`holi`);
  console.log(
    `Creating the user in database with user name: "${req.movies.gender}"`
  );
  const response = {
    result: `User created: ${req.body.userName}`,
  };
  res.json(response);
});
