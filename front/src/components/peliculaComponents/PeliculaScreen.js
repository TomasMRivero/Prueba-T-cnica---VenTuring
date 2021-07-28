import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
 
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
    button:{
        padding: 15,
        transition: "1s ease",
        fontWeight: 'bold',
        color: '#0d2b45',
        background: '#ffaa5e',
        '&:hover':{
            background: '#ffd4a3',
        },
    },
}));

export default function PeliculaScreen(){
    const history = useHistory();
    const classes = useStyles();
    const autenticado = useSelector(state => state.autenticado);
    const [cargado, setCargado] = useState(false);

    //espera a que carguen los estados para evitar redirigir antes de verificar la autenticación
    useEffect(() => {
        setCargado(true);
    });

    //redirige a la lista
    const onClickLista = useCallback((e) => {
        e.preventDefault();
        history.push("/pelicula")
    });

    //redirige a la carga por archivo
    const onClickFile = useCallback((e) => {
        e.preventDefault();
        history.push("/pelicula/file")
    });

    //redirige a la carga por formulario
    const onClickForm = useCallback((e) => {
        e.preventDefault();
        history.push("/pelicula/form")
    });

    return(
        <div className={classes.root}>
        {!autenticado && cargado && <Redirect to="/login"/>}
            <Grid className={classes.container} container spacing={5}>
                <Grid item xs={12}>
                    <Button
                        className = {classes.button}
                        style={{width:"100%"}}
                        onClick={onClickLista}
                    >Ver lista de películas</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className = {classes.button}
                        style={{width:"100%"}}
                        onClick = {onClickFile}
                    >Cargar desde archivo</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className = {classes.button}
                        style={{width:"100%"}}
                        onClick = {onClickForm}
                    >Cargar desde formulario</Button>
                </Grid>
            </Grid>
        </div>
    )
}