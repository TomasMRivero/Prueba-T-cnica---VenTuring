import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPelicula } from "../../redux/actions";
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
        width: 'auto',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            width:'95%'
        },
        border: '1px solid #544e68',
        borderRadius: 15,
    }
}));

export default function ResultadoBusqueda({location}){
    const classes = useStyles();
    const dispatch = useDispatch();
    const busqueda = QueryString.parse(location.search, {ignoreQueryPrefix: true, parameterLimit: 1});

    const [cargado, setCargado] = useState(false);

    const pelicula = useSelector(state => state.pelicula)

    async function buscar() {
        await axios.get(`api/pelicula/buscar?titulo=${busqueda.titulo}`)
        .then(response => {
            let pelicula = {}
            if (response.data === ""){
                pelicula = {}
            }else{
                pelicula = response.data
            }
            dispatch(
                getPelicula(pelicula)
            );
            setCargado(true)
        })
        .catch(error => {
            console.error(error.response.data);
        });
    }

    useEffect(() => {
        buscar()
    }, [location, dispatch]);

    return(
        <div className={classes.root}>

            <Grid container className={classes.container}>

                <Grid item xs={12} spacing={5} style={{padding: 10}}>
                    <Typography variant="h6">Resultado de la búsqueda:</Typography>
                </Grid>
                {pelicula.id && <PeliculaItem pelicula={pelicula} />}
                {!pelicula.id && 
                <Grid item xs={12}>
                    <Typography style={{marginTop: 10}} variant="body1">No se encontraron resultados para "{busqueda.titulo}"</Typography>
                </Grid>
                }

            </Grid>

        </div>
    )
}