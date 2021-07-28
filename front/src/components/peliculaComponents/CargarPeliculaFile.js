import { Button, ClickAwayListener, Grid, InputLabel, Link, OutlinedInput, Snackbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { getPeliculaIDs, getPeliculas } from "../../redux/actions";
import PeliculaItem from "./PeliculaItem";

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
        width: '90%',
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
    const history=useHistory();
    const classes=useStyles();
    const dispatch=useDispatch()

    const[archivo, setArchivo] = useState({});
    const[archivoSeleccionado, setArchivoSeleccionado] = useState(false);
    
    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState("");

    const[existentes, setExistentes] = useState([]);

    const[cargado, setCargado] = useState(false);

    const peliculaIDs = useSelector(state => state.peliculaIDs);
    const peliculas = useSelector(state => peliculaIDs.map(id => state.peliculas[id]));
    const autenticado = useSelector(state => state.autenticado);

    //guarda el archivo en un estado
    const onChangeFile = useCallback((e) => {
        setArchivo(e.target.files[0]);
        setArchivoSeleccionado(true);
    })

    //verifica que haya un archivo cargado y envia el formulario
    //pasa el archivo en el body. Guarda la lista de peliculas ya existentes en un estado
    //y la lista de peliculas cargadas en el store
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("lista", archivo);

        async function post(){
            await axios.post('api/pelicula/alta/csv', formData, {headers: { "Content-Type": "multipart/form-data" }})
            .then(response => {
                setExistentes(response.data.existentes);
                batch(() => {
                    dispatch(getPeliculas(response.data.cargadas));
                    dispatch(getPeliculaIDs(response.data.cargadas.map(i => i.id).reverse()));
                })
            }).catch(error => {
                if(error.response){
                    setError(error.response.data);
                }
                setAlerta(true);
            })
        }

        if(archivoSeleccionado){
            post();
        }else{
            setError("Tenés que subir un archivo .csv");
            setAlerta(true);
        }
    }, [archivo, archivoSeleccionado]);


    //vacía los estados de peliculas guardados en el store
    useEffect(() => {
        dispatch(getPeliculas([]))
        dispatch(getPeliculaIDs([]))
        setCargado(true);
    }, [dispatch])    
    
    //redirige a la pantalla de carga por formulario
    const onClickForm = useCallback((e) => {
        e.preventDefault();
        history.push('/pelicula/form');
    })

    const cerrarAlerta = () => {
        setAlerta(false);
    }

    return(
        <form className={classes.root} onSubmit={onSubmit} enctype="multipart/form-data" >

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

        {!autenticado && cargado && <Redirect to="/login"/>}
            <Grid className={classes.container} container spacing={5}>

                <Grid item xs={12}>

                    <InputLabel id="lista">Cargar archivo .csv: </InputLabel> 
                    <OutlinedInput className={classes.input} type="file" inputProps={{accept:"text/csv", encType:"multipart/form-data"}} name="lista" onChange={onChangeFile}/>
                
                </Grid>
                
                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Cargar Película</Button>       
                </Grid>

            <Grid item xs={12}>
                <Typography className={classes.newAcc} variant="h6"><Link onClick={onClickForm}>Cargar desde formulario</Link></Typography>
            </Grid>

                {existentes.length > 0 && <Grid item xs={12}>
                    <Typography variant='h6' style={{textAlign:"left"}}>Existentes (no cargadas):</Typography>
                    <ul>
                        {existentes.map(e => 
                            <li key={e.index}>
                                <Typography variant='body1' style={{textAlign:"left"}}>{e}</Typography>
                            </li>    
                        )}
                    </ul>
                </Grid>}
                {peliculas.length>0 && <Grid item xs={12}>
                    <Typography variant='h6' style={{textAlign:"left"}}>Cargadas:</Typography>
                    {peliculas.map(p =>
                        <PeliculaItem key={p.id} pelicula={p} />
                    )}
                </Grid>}

            </Grid>
        </form>
    )
}