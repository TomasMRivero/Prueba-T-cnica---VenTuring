import { Button, Grid, InputLabel, OutlinedInput } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { classes } from "istanbul-lib-coverage"

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
}));

export default function CargarPeliculaFile() {
    const classes=useStyles();
    return(
        <form className={classes.root}>
            <Grid className={classes.container} container spacing={5}>

                <Grid item xs={12}>

                    <InputLabel id="lista">Imagen principal: </InputLabel> 
                    <OutlinedInput className={classes.input} type="file" inputProps={{accept:"text/csv", encType:"multipart/form-data"}} name="lista"/>
                
                </Grid>
                
                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Cargar Película</Button>       
                </Grid>

            </Grid>
        </form>
    )
}