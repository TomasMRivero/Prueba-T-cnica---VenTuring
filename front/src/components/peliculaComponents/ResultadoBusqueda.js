import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPelicula } from "../../redux/actions";
import { pelicula } from "../../redux/reducers/peliculaReducer";

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        paddingTop: 56,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64,
        },
    },
    header:{
        margin: 'auto',
        padding: 20,
    },
    titulo:{
        fontWeight: "bold",
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        },
    },
    container:{
        width: '100%',
        border: '1px solid #f0f0f0',
        borderRadius: 10
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

                <Grid item xs={12}>
                    <Typography>Resultados de la búsqueda</Typography>
                </Grid>
                {pelicula.id &&<>
                    <Grid item xs={12}>
                        <Typography>{pelicula.titulo}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{pelicula.descripcion}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{pelicula.anio}</Typography>
                    </Grid>
                </>}
                {!pelicula.id && 
                <Grid>
                    <Typography>No se encontraron resultados para {busqueda.titulo}</Typography>
                </Grid>
                }

            </Grid>

        </div>
    )
}