export const GET_PELICULA = 'GET_PELICULA'

export const getPelicula = pelicula => {
    return {
        type: GET_PELICULA,
        payload: pelicula
    }
}