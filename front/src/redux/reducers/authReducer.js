import { AUTENTICAR } from "../actions/authActions";

const initialState = false;

export function autenticado( state = initialState, action) {
    switch(action.type) {
        case AUTENTICAR:
            return !state;
        default:
            return state;
    }
}