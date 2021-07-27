import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";


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

export default function RegistroScreen(){
    const classes = useStyles();
    return(
        <form className={classes.root} label="login">
            <Grid className={classes.container} container spacing={5}>
            
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Nombre de usuario"
                        variant="outlined"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Confirmar contraseña"
                        type="password"
                        variant="outlined"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Registrarse</Button>       
                </Grid>

            </Grid>  
        </form>
    )
}