import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();
    const history = useHistory();
    const autenticado = useSelector(state => state.autenticado);

    const onClickHome = useCallback((e) => {
        e.preventDefault();
        history.push("/");
    });

    const onClickLogin = useCallback((e) => {
        e.preventDefault();
        history.push("/login");
    });

    const onClickLogout = useCallback((e) => {
        e.preventDefault();
    });

    return(
        <div className={classes.root}>
        
            <AppBar position="static" style={{background:"#ffaa5e"}}>
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