import { GET_PELICULA } from "../actions";

const initialState = {};

export function pelicula(state = initialState, action) {
    switch (action.type){
        case GET_PELICULA:
            return{
                ...action.payload
            };
        default:
            return state
    }
}