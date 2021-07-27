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
        border: '1px solid #f0f0f0',
        borderRadius: 15,
    },
    input:{
        width: '100%'
    },
    button:{
        width: 'auto',
        padding: 15,
        transition: "1s ease",
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.74)',
        background: '#6fa1ff',
        '&:hover':{
            background: '#a5c5ff',
        },
    },
}))

export default function LoginScreen(){
    const classes = useStyles();
    
    return(
        <form className={classes.root}>
            <Grid className={classes.container} container spacing={5}>
            
                <Grid item xs={12}>
                    <TextField className={classes.input} label="Nombre de usuario" variant="outlined" required />
                </Grid>

                <Grid item xs={12}>
                    <TextField className={classes.input} label="Contraseña" type="password" variant="outlined" required />
                </Grid>

                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Iniciar Sesión</Button>       
                </Grid>

            </Grid>  
        </form>
    );
}