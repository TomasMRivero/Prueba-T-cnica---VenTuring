import { Button, ClickAwayListener, Grid, Link, Snackbar, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPelicula } from "../../redux/actions";
import PeliculaItem from "./PeliculaItem";
import { Alert } from "@material-ui/lab";

//estilos
const useStyles = makeStyles((theme) => ({
    root : {
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
        width: '90%',
        [theme.breakpoints.down('xs')]: {
            width:'95%'
        },
        border: '1px solid #544e68',
        borderRadius: 15,
    },
    input:{
        width: '100%',
        borderColor: '#544e68'
    },
    button:{
        width: 'auto',
        padding: 15,
        transition: "1s ease",
        fontWeight: 'bold',
        color: '#0d2b45',
        background: '#ffaa5e',
        '&:hover':{
            background: '#ffd4a3',
        },
    },
}))

export default function CargarPeliculaForm(){
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [titulo, setTitulo] = useState('');
    const onChangeTitulo = useCallback((e) => {
        setTitulo(e.target.value);
    });
    
    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState("");

    const [descripcion, setDescripcion] = useState('');
    const onChangeDescripcion = useCallback((e) => {
        setDescripcion(e.target.value);
    });
    const [anio, setAnio] = useState('');
    const onChangeAnio = useCallback((e) => {
        setAnio(e.target.value)
    })

    const [cargado, setCargado] = useState(false)

    const pelicula = useSelector(state => state.pelicula);
    const autenticado = useSelector(state => state.autenticado);

    //toma los estados de titulos, descripcion y año y los manda en el request
    //devuelve una película y la guarda en el store
    async function cargarPelicula(){
        await axios.post('api/pelicula/alta', {
            titulo,
            descripcion,
            anio
        }).then(response => {
            dispatch(getPelicula(response.data))
        }).catch(error => {
            if(error.response){
                setError(error.response.data);
            }
            setAlerta(true);
        });
    }

    //función que llama a cargar película al enviar el formulario
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        cargarPelicula();
    }, [titulo, descripcion, anio]);

    //limpia el store de película antes del render
    useEffect(() => {
        dispatch(getPelicula({}))
        setCargado(true);
    }, [dispatch])

    const cerrarAlerta = () => {
        setAlerta(false);
    }

    //redirige a carga por archivo
    const onClickFile = useCallback((e) => {
        e.preventDefault();
        history.push('/pelicula/file');
    })

    return(
        <form className={classes.root} label="libro" onSubmit={onSubmit}>

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

            {!autenticado && cargado && <Redirect to="/login"/>}

            <Grid className={classes.container} container spacing={5}>
            
            <Grid item xs={12}>
                <TextField
                    className={classes.input}
                    label="Título"
                    variant="outlined"
                    required
                    value = {titulo}
                    onChange = {onChangeTitulo}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    className={classes.input}
                    label="Año"
                    variant="outlined"
                    required
                    value = {anio}
                    onChange = {onChangeAnio}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    className={classes.input}
                    label="Descripción"
                    variant="outlined"
                    required
                    multiline
                    value = {descripcion}
                    onChange = {onChangeDescripcion}
                />
            </Grid>

            <Grid item xs={12}>
                <Button className = {classes.button} type="submit" variant="contained">Cargar Película</Button>       
            </Grid>

            <Grid item xs={12}>
                <Typography className={classes.newAcc} variant="h6"><Link onClick={onClickFile}>Cargar desde archivo</Link></Typography>
            </Grid>
            
            {pelicula.id &&
            <Grid item container xs={12} spacing={0}>
                <Grid item xs={12}>
                    <Typography variant='h6'>Cargado:</Typography>
                </Grid>
                <Grid item xs={12}>
                    <PeliculaItem pelicula={pelicula}/>
                </Grid>
            </Grid>
            }

        </Grid> 
        </form>
    )
}