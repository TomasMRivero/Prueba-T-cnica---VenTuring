import { combineReducers } from "redux";

import { autenticado } from "./authReducer";
import { pelicula , peliculas, peliculaIDs} from "./peliculaReducer";

export default combineReducers({
    autenticado,
    pelicula,
    peliculas,
    peliculaIDs
});