import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    botonMenu: {
        marginRight: theme.spacing(2),
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

    return(
        <div className={classes.root}>
        
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.botonMenu} color="inherit" aria-label="menu">
                        <HomeIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.titulo}>
                        Películas
                    </Typography>
                    <Button edge="end" className={classes.boton} color="inherit">Iniciar sesión</Button>
                    <Button edge="end" className={classes.boton} color="inherit">Cerrar sesión</Button>
                </Toolbar>
            </AppBar>
        
        </div>
    )
}