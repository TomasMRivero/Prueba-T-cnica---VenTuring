import { copy } from "superagent";
import { GET_PELICULAS, GET_PELICULA, GET_PELICULA_IDS, BORRAR_PELICULA } from "../actions";

export function pelicula(state = {}, action) {
    switch (action.type){
        case GET_PELICULA:
            return{
                ...action.payload
            };
        case BORRAR_PELICULA:
            return {state};
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
            case BORRAR_PELICULA:
                const cpy = {...state};
                delete cpy[action.payload.id];
                return cpy;
            default:
                return state;        
    }
}

export function peliculaIDs(state = [], action){
    switch (action.type) {
        case GET_PELICULA_IDS:
            return action.payload;
        case BORRAR_PELICULA:
            const borrarID = action.payload.id;
            return state.filter(id => id !== borrarID);
        default:
            return state;
    }
}