import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";
import { useCallback, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { autenticar } from "../../redux/actions/authActions";

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

//Componente de la pantalla de registro
export default function RegistroScreen(){
    const classes = useStyles();
    const dispatch = useDispatch();

    const [alias, setAlias] = useState('');
    const onChangeAlias = useCallback((e) => {
        setAlias(e.target.value);
    });

    const [pass, setPass] = useState('');
    const onChangePass = useCallback((e) => {
        setPass(e.target.value);
    });

    const [confirmar, setConfirmar] = useState('');
    const onChangeConfirmar = useCallback((e) => {
        setConfirmar(e.target.value);
    });

    //Inicia sesion automáticamente luego del registro
    async function login() {
        await axios.post('/api/auth/login', {
            alias,
            pass
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            dispatch(autenticar())
        }).catch(error => {
            console.error(error.response.data);
        });
    }

    //Crea un nuevo usuario
    async function registro() {
        await axios.post('/api/auth/registro', {
            alias,
            pass
        }).then((response) => {
            console.log(response);
            login()
        }).catch(error => {
            console.error(error.response.data);
        });
    }

    //Funcion que se ejecuta al enviar el formulario.
    //Verifica que las contraseñas ingresadas sean identicas
    const onRegistro = useCallback((e) => {
        e.preventDefault();
        try{
            if(pass !== confirmar){
                throw {mensaje: "Las contraseñas no coinciden"}
            }
            registro();
        }catch(error){
            console.error(error)
        }
    }, [alias, pass, confirmar])

    return(
        <form className={classes.root} onSubmit={onRegistro} label="login">
            <Grid className={classes.container} container spacing={5}>
                
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Nombre de usuario"
                        variant="outlined"
                        required
                        value={alias}
                        onChange={onChangeAlias}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        required
                        value={pass}
                        onChange={onChangePass}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Confirmar contraseña"
                        type="password"
                        variant="outlined"
                        required
                        value={confirmar}
                        onChange = {onChangeConfirmar}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Registrarse</Button>       
                </Grid>

            </Grid>  
        </form>
    )
}