import { AUTENTICAR, DESAUTENTICAR } from "../actions/authActions";

const initialState = false;

export function autenticado( state = initialState, action) {
    switch(action.type) {
        case AUTENTICAR:
            return !state;
        case DESAUTENTICAR:
            return !state;
        default:
            return state;
    }
}