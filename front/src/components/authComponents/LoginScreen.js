import { makeStyles } from "@material-ui/core/styles";
import { Button, ClickAwayListener, Grid, Link, Snackbar, TextField, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import axios from "axios";
import { autenticar } from "../../redux/actions/authActions";
import { useHistory } from "react-router";
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

//Componente de la pantalla de login
export default function LoginScreen(){
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState("");

    const [alias, setAlias] = useState('');
    const onChangeAlias = useCallback((e) => {
        setAlias(e.target.value);
    });

    const [pass, setPass] = useState('');
    const onChangePass = useCallback((e) => {
        setPass(e.target.value);
    })

    //Hace el post en la base de datos y guarda el token en el localStorage.
    //Cambia el estado de autenticado a true
    async function post() {
        await axios.post('/api/auth/login', {
            alias,
            pass
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            dispatch(autenticar())
        }).catch(error => {
            if(error.response){
                setError(error.response.data);
            }
            setAlerta(true);
        });
    }

    //Funcion que se ejecuta al enviar el formulario
    const onLogin = useCallback((e) => {
        e.preventDefault();
        post()
    }, [alias, pass])

    const onClickRegistro = useCallback((e) => {
        e.preventDefault();
        history.push('/registro');
    })

    const cerrarAlerta = () => {
        setAlerta(false);
    }

    return(
        <form className={classes.root} onSubmit={onLogin} label="login">
            
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

            <Grid className={classes.container} container spacing={5}>
            
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Nombre de usuario"
                        variant="outlined"
                        required
                        value = {alias}
                        onChange = {onChangeAlias}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        required
                        value = {pass}
                        onChange = {onChangePass}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Iniciar Sesión</Button>       
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.newAcc} variant="h6"><Link onClick={onClickRegistro}>Crear una nueva cuenta</Link></Typography>
                </Grid>

            </Grid>  
        </form>
    );
}