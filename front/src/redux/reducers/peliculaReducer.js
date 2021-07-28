import { GET_PELICULAS, GET_PELICULA, GET_PELICULA_IDS } from "../actions";

export function pelicula(state = {}, action) {
    switch (action.type){
        case GET_PELICULA:
            return{
                ...action.payload
            };
        default:
            return state
    }
}

export function peliculas(state = {}, action){
    switch( action.type) {
        case GET_PELICULAS:
            const extend = {};

            for(const pelicula of action.payload) {
                extend[pelicula.id] = pelicula;
            }

            return {
                ...state,
                ...extend
            };
            default:
                return state;        
    }
}

export function peliculaIDs(state = [], action){
    switch (action.type) {
        case GET_PELICULA_IDS:
            return action.payload;
        default:
            return state;
    }
}