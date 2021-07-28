import { Button, Grid, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

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
    buscar:{
        display: 'flex',
    },
    input:{
        maxWidth: '90%',
        flexGrow:1,
        borderRadius: '10px 5px 5px 10px',
        border: '1px solid #f0f0f0',
        '&:hover':{
            borderColor: '#544e68'
        },
        padding: 10
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
    const classes = useStyles();
    const autenticado = useSelector(state => state.autenticado);
    const [cargado, setCargado] = useState(false)
    useEffect(() => {
        setCargado(true);
    });

    return(
        <div className={classes.root}>
        {!autenticado && cargado && <Redirect to="/login"/>}
            <Grid className={classes.container} container spacing={5}>
                <Grid item xs={12}>
                    <form
                        className={classes.buscar}
                    >
                        <InputBase
                            className={classes.input}
                            placeholder = "Buscar película: "
                        />
                        <Button className = {classes.button}>Buscar</Button>
                    </form>     
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className = {classes.button}
                        style={{width:"100%"}}
                    >Ver lista de películas</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className = {classes.button}
                        style={{width:"100%"}}
                    >Cargar por archivo</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className = {classes.button}
                        style={{width:"100%"}}
                    >Cargar por formulario</Button>
                </Grid>
            </Grid>
        </div>
    )
}