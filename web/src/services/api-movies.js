// login

const getMoviesFromApi = (params) => {
  // DÍA 2 - Hemos enviado una petición al endpoint/movies y la respuesta son las peliculas (filtradas si procede). Estam,ps usando query params (interpolamos despúes de: ?)
  return fetch(`http://localhost:4000/movies?gender=${params.gender}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
