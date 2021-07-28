import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPelicula } from "../../redux/actions";
import PeliculaItem from "./PeliculaItem";

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
        width: 'auto',
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
    const dispatch = useDispatch();
    const classes = useStyles();

    const [titulo, setTitulo] = useState('');
    const onChangeTitulo = useCallback((e) => {
        setTitulo(e.target.value);
    });
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

    async function cargarPelicula(){
        await axios.post('api/pelicula/alta', {
            titulo,
            descripcion,
            anio
        }).then(response => {
            dispatch(getPelicula(response.data))
        }).catch(error => {
            console.error(error.response.data)
        });
    }

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        cargarPelicula();
    }, [titulo, descripcion, anio]);
    console.log(pelicula);

    useEffect(() => {
        dispatch(getPelicula({}))
        setCargado(true);
    }, [dispatch])

    return(
        <form className={classes.root} label="libro" onSubmit={onSubmit}>
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
                <Typography className={classes.newAcc} variant="h6"><Link >Cargar desde archivo</Link></Typography>
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