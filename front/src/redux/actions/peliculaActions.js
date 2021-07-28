export const GET_PELICULAS = 'GET_PELICULAS'
export const GET_PELICULA_IDS = 'GET_PELICULAS_IDS'
export const GET_PELICULA = 'GET_LISTA'


export const getPelicula = pelicula => {
    return {
        type: GET_PELICULA,
        payload: pelicula
    }
};

export const getPeliculas = peliculas => {
    return {
        type: GET_PELICULAS,
        payload: peliculas
    }
}

export const getPeliculaIDs = peliculaIDs => {
    return {
        type: GET_PELICULA_IDS,
        payload: peliculaIDs
    }
}