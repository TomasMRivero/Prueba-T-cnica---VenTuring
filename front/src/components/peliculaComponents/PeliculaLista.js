import axios from "axios"
import QueryString from "qs";
import { useEffect, useState } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { getPeliculaIDs, getPeliculas } from "../../redux/actions";

export default function PeliculaLista({location}){
    const dispatch = useDispatch()

    const [pagina, setPagina] = useState(1);
    const [limit, setLimit] = useState(10);
    const [ultimaPagina, setUltimaPagina] = useState(false);

    const peliculaIDs = useSelector(state => state.peliculaIDs);
    const peliculas = useSelector(state => peliculaIDs.map(id => state.peliculas[id]));

    async function fetch(){
        await axios.get(`api/pelicula?limit=${limit + 1}&pagina=${pagina}`)
            .then(response => {
                const lista = response.data.slice(0, limit);
                
                batch(() => {
                    dispatch(getPeliculas(lista));
                    dispatch(getPeliculaIDs(lista.map(i => i.id).reverse()));
                })

                if (!response.data[limit]){
                    setUltimaPagina(true);
                }


            }).catch(error => {
                console.error(error);
                console.error(error.response);
            });
    }

    useEffect(() => {
        fetch()
    }, [dispatch])

    console.log(peliculas);

    return(
        <>
        </>
    )
}