import { Button, ClickAwayListener, Grid, MenuItem, Select, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router";
import { getPeliculaIDs, getPeliculas } from "../../redux/actions";
import BuscarPelicula from "./BuscarPelicula";
import PeliculaItem from "./PeliculaItem";

const useStyles = makeStyles((theme) => ({
    root:{
        margin: 'auto',
        marginTop: 64,
        width:' 100%',
        maxeight: '100vh',
        border: 0,
        borderRadius: 3,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        display: 'flex',
        alignItems: 'center',
    },
    container:{
        margin: "auto",
        width: '90%',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            width:'100%'
        }
    }
}));

export default function PeliculaLista(){
    const classes = useStyles();
    const dispatch = useDispatch()

    const [pagina, setPagina] = useState(1);
    const [limit, setLimit] = useState(10);
    const [cargado, setCargado] = useState(false);
    const [ultimaPagina, setUltimaPagina] = useState(false);

    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState("");

    const peliculaIDs = useSelector(state => state.peliculaIDs);
    const peliculas = useSelector(state => peliculaIDs.map(id => state.peliculas[id]));
    const autenticado = useSelector(state => state.autenticado);

    //obtiene una lista de películas.
    //verifica que la página siguiente no esté vacía para control de paginación
    async function fetch(){
        async function getLista(){
            return await axios.get(`api/pelicula?limit=${limit}&pagina=${pagina}`)
        }
        async function getSiguientePagina(){
            return await axios.get(`api/pelicula?limit=${limit}&pagina=${pagina+1}`)
        }
        Promise.all([getLista(), getSiguientePagina()])
            .then(response => {
                const lista = response[0].data.slice(0, limit);
                
                batch(() => {
                    dispatch(getPeliculas(lista));
                    dispatch(getPeliculaIDs(lista.map(i => i.id)));
                })

                if (response[1].data.length === 0){
                    setUltimaPagina(true);
                }else{
                    setUltimaPagina(false);
                }
                setCargado(true)

            }).catch(error => {
                if(error.response){
                    setError(error.response.data);
                }
                setAlerta(true);
            });
    }

    useEffect(() => {
        fetch()
    }, [dispatch, limit, pagina])

    //cambiar la cantidad de resultados por página
    const onChangeLimit = useCallback((e) => {
        e.preventDefault()
        setLimit(e.target.value)
    })

    //siguiente pagina
    const nextPage = useCallback((e) => {
        e.preventDefault();
        setPagina(pagina + 1);
    });
    
    //anterior pagina
    const prevPage = useCallback((e) => {
        e.preventDefault();
        setPagina(pagina - 1);
    });
    
    const cerrarAlerta = () => {
        setAlerta(false);
    }
    
    //espera a que carguen los estados para evitar redirigir antes de verificar la autenticación
    useEffect(() => {
        setCargado(true);
    });

    return(
        <div className={classes.root}>
            
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
            <Grid container className={classes.container} spacing={5}>
                <Grid item xs={12}>
                    <BuscarPelicula/>
                </Grid>
                <Grid item xs={12}>
                        {cargado && peliculas.map(p =>
                            <PeliculaItem key={p.id} pelicula={p} />
                        )}
                </Grid>
                <Grid item xs={6}>
                    Mostrar resultados:
                    <Select
                        value={limit}
                        onChange = {onChangeLimit}
                        className= {classes.Select}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6} style={{display: "flex", justifyContent:"center" ,alignItems:"center"}}>
                    {pagina!=1 && <Button onClick={prevPage}>{"< " + (pagina - 1)}</Button>}
                    <Typography style={{margin: 5}}>{"- " + pagina + " -"}</Typography>
                    {!ultimaPagina && <Button onClick={nextPage}>{(pagina + 1) + " >"}</Button>}
                </Grid>
            </Grid>
        </div>
    )
}