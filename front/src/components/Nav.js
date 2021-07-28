import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { desautenticar } from "../redux/actions/authActions";

//estilos
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    botonMenu: {
        color: '#0d2b45',
    },
    titulo: {
        flexGrow: 1,
        color: '#0d2b45',
        textAlign: 'left',
    },
    boton: {
        color: '#0d2b45',
    }
}));

export default function Nav(){
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const autenticado = useSelector(state => state.autenticado);

    //Enviar el token a la lista negra y borrar del almacenamiento
    //y cambiar el estado
    async function logout(){
        await axios.post('/api/auth/logout')
        .then(response => {
            localStorage.removeItem('token', response.data.token);
            axios.defaults.headers.common['authorization'] = null;
            dispatch(desautenticar());
        }).catch(error => {
            console.error(error.response.data);
        });
    };

    //redirige a la pantalla de inicio
    const onClickHome = useCallback((e) => {
        e.preventDefault();
        history.push("/");
    });

    //redirige a la pantalla de inicio de sesión
    const onClickLogin = useCallback((e) => {
        e.preventDefault();
        history.push("/login");
    });

    //llama a la función logout
    const onClickLogout = useCallback((e) => {
        e.preventDefault();
        logout();
    });

    return(
        <div className={classes.root}>
        
            <AppBar position="fixed" style={{background:"#ffaa5e"}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.botonMenu}
                        color="inherit"
                        aria-label="menu"
                        onClick={onClickHome}
                    >
                        <HomeIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.titulo}>
                        Películas
                    </Typography>
                    {!autenticado &&
                    <Button
                        edge="end"
                        className={classes.boton}
                        color="inherit"
                        onClick={onClickLogin}
                    >Iniciar sesión</Button>}
                    {autenticado &&
                    <Button
                        edge="end"
                        className={classes.boton}
                        color="inherit"
                        onClick={onClickLogout}
                    >Cerrar sesión</Button>}
                </Toolbar>
            </AppBar>
        
        </div>
    )
}