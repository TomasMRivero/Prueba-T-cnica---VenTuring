import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container:{
        margin: "auto", 
        width: 'auto',
        padding: 10,
        [theme.breakpoints.down('xs')]: {
            width:'95%'
        },
        border: '1px solid #f0f0f0',
        borderRadius: 15,
    }
}));

export default function PeliculaItem (props){
    
    const classes = useStyles()
    return(
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Typography style={{margin: 5}} variant="h6"> <b>{props.pelicula.titulo}</b> ({props.pelicula.anio})</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">{props.pelicula.descripcion}</Typography>
            </Grid>
        </Grid>
    )
}