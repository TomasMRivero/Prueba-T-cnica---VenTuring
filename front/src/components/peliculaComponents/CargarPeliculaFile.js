import { Button, Grid, InputLabel, OutlinedInput } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios";
import { classes } from "istanbul-lib-coverage"
import { useCallback, useState } from "react";

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

    const[archivo, setArchivo] = useState({});
    const[archivoSeleccionado, setArchivoSeleccionado] = useState(false);

    const onChangeFile = useCallback((e) => {
        setArchivo(e.target.files[0]);
        setArchivoSeleccionado(true);
    })

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        console.log(archivo);

        const formData = new FormData();

        formData.append("lista", archivo);

        async function post(){
            await axios.post('api/pelicula/alta/csv', formData, {headers: { "Content-Type": "multipart/form-data" }})
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
                console.error(error.response);
            })
        }

        if(archivoSeleccionado){
            post();
        }
    }, [archivo, archivoSeleccionado])

    return(
        <form className={classes.root} onSubmit={onSubmit} enctype="multipart/form-data" >
            <Grid className={classes.container} container spacing={5}>

                <Grid item xs={12}>

                    <InputLabel id="lista">Cargar archivo .csv: </InputLabel> 
                    <OutlinedInput className={classes.input} type="file" inputProps={{accept:"text/*", enctype:"multipart/form-data"}} name="lista" onChange={onChangeFile}/>
                
                </Grid>
                
                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Cargar Película</Button>       
                </Grid>

            </Grid>
        </form>
    )
}