import { ClickAwayListener, Grid, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getPelicula } from "../../redux/actions";
import PeliculaItem from "./PeliculaItem";

//estilos
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
    
    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState("");

    const [cargado, setCargado] = useState(false);

    const pelicula = useSelector(state => state.pelicula);
    const autenticado = useSelector(state => state.autenticado);

    //toma como parametro el query de la url y lo manda en el body del request.
    //devuelve un elemento. si no tiene un valor "id", reconoce que la búsqueda no tuvo resultados
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
            if(error.response){
                setError(error.response.data);
            }
            setAlerta(true);
        });
    }

    //ejecuta la funcón buscar si cambia la url
    useEffect(() => {
        buscar()
    }, [location, dispatch]);
    
    const cerrarAlerta = () => {
        setAlerta(false);
    }

    return(
        <div className={classes.root}>
        {!autenticado && cargado && <Redirect to="/login"/>}
            
            <ClickAwayListener onClickAway={cerrarAlerta}>
                <Snackbar
                    anchorOrigin={{vertical:"top", horizontal:"center"}}
                    open = {alerta}
                    autoHideDuration={3000}
                    onClose={cerrarAlerta}
                >
                    <Alert onClose={cerrarAlerta} severity="error" elevation={6}>{error}</Alert>
                </Snackbar>
            </ClickAwayListener>

            <Grid container className={classes.container} spacing={5}>

                <Grid item xs={12} style={{padding: 10}}>
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