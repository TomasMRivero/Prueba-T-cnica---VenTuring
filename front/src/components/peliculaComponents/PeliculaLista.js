import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"
import QueryString from "qs";
import { useEffect, useState } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { getPeliculaIDs, getPeliculas } from "../../redux/actions";
import BuscarPelicula from "./BuscarPelicula";
import PeliculaItem from "./PeliculaItem";

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        width:' 100%',
        height: '100vh',
        border: 0,
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        display: 'flex',
        alignItems: 'center',
    },
    container:{
        margin: "auto",
        width: 'auto',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            width:'100%'
        }
    }
}));

export default function PeliculaLista({location}){
    const classes = useStyles();
    const dispatch = useDispatch()

    const [pagina, setPagina] = useState(1);
    const [limit, setLimit] = useState(10);
    const [cargado, setCargado] = useState(false);
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
                setCargado(true)

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
        <div className={classes.root}>
            <Grid container className={classes.container} spacing={5}>
                <Grid item xs={12}>
                    <BuscarPelicula/>
                </Grid>
                <Grid item xs={12}>
                        {cargado && peliculas.map(p =>
                            <PeliculaItem pelicula={p} />
                        )}
                </Grid>
            </Grid>
        </div>
    )
}