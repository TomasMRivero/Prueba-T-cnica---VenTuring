import { combineReducers } from "redux";

import { autenticado } from "./authReducer";
import { pelicula } from "./peliculaReducer";

export default combineReducers({
    autenticado,
    pelicula
});