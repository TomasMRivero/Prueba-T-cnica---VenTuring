import { Button, Grid, InputLabel, OutlinedInput, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getPeliculaIDs, getPeliculas } from "../../redux/actions";
import PeliculaItem from "./PeliculaItem";

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
    const dispatch=useDispatch()
        
    const[archivo, setArchivo] = useState({});
    const[archivoSeleccionado, setArchivoSeleccionado] = useState(false);

    const[existentes, setExistentes] = useState([]);

    const[cargado, setCargado] = useState(false);

    const peliculaIDs = useSelector(state => state.peliculaIDs);
    const peliculas = useSelector(state => peliculaIDs.map(id => state.peliculas[id]));
    const autenticado = useSelector(state => state.autenticado);

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
                setExistentes(response.data.existentes);
                batch(() => {
                    dispatch(getPeliculas(response.data.cargadas));
                    dispatch(getPeliculaIDs(response.data.cargadas.map(i => i.id).reverse()));
                })
            }).catch(error => {
                console.error(error);
                console.error(error.response);
            })
        }

        if(archivoSeleccionado){
            post();
        }
    }, [archivo, archivoSeleccionado]);

    useEffect(() => {
        dispatch(getPeliculas([]))
        dispatch(getPeliculaIDs([]))
        setCargado(true);
    }, [dispatch])

    return(
        <form className={classes.root} onSubmit={onSubmit} enctype="multipart/form-data" >
        {!autenticado && cargado && <Redirect to="/login"/>}
            <Grid className={classes.container} container spacing={5}>

                <Grid item xs={12}>

                    <InputLabel id="lista">Cargar archivo .csv: </InputLabel> 
                    <OutlinedInput className={classes.input} type="file" inputProps={{accept:"text/csv", encType:"multipart/form-data"}} name="lista" onChange={onChangeFile}/>
                
                </Grid>
                
                <Grid item xs={12}>
                    <Button className = {classes.button} type="submit" variant="contained">Cargar Película</Button>       
                </Grid>

                {existentes.length > 0 && <Grid item xs={12}>
                    <Typography variant='h6' style={{textAlign:"left"}}>Existentes (no cargadas):</Typography>
                    <ul>
                        {existentes.map(e => 
                            <li>
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