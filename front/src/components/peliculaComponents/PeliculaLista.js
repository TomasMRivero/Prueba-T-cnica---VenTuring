import { Button, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"
import QueryString from "qs";
import { useCallback, useEffect, useState } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { getPeliculaIDs, getPeliculas } from "../../redux/actions";
import BuscarPelicula from "./BuscarPelicula";
import PeliculaItem from "./PeliculaItem";

const useStyles = makeStyles((theme) => ({
    root:{
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
        margin: "auto",
        width: 'auto',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            width:'100%'
        }
    }
}));

export default function PeliculaLista({location}){
    const classes = useStyles();
    const dispatch = useDispatch()

    const [pagina, setPagina] = useState(1);
    const [limit, setLimit] = useState(10);
    const [cargado, setCargado] = useState(false);
    const [ultimaPagina, setUltimaPagina] = useState(false);

    const peliculaIDs = useSelector(state => state.peliculaIDs);
    const peliculas = useSelector(state => peliculaIDs.map(id => state.peliculas[id]));

    async function fetch(){
        async function getLista(){
            return await axios.get(`api/pelicula?limit=${limit}&pagina=${pagina}`)
        }
        async function getSiguientePagina(){
            return await axios.get(`api/pelicula?limit=${limit}&pagina=${pagina+1}`)
        }
        Promise.all([getLista(), getSiguientePagina()])
            .then(response => {
                console.log(response)
                const lista = response[0].data.slice(0, limit);
                
                batch(() => {
                    dispatch(getPeliculas(lista));
                    dispatch(getPeliculaIDs(lista.map(i => i.id).reverse()));
                })

                if (response[1].data.length === 0){
                    setUltimaPagina(true);
                }else{
                    setUltimaPagina(false);
                }
                setCargado(true)

            }).catch(error => {
                console.error(error);
                console.error(error.response);
            });
    }

    useEffect(() => {
        fetch()
    }, [dispatch, limit, pagina])

    console.log(peliculas);

    const onChangeLimit = useCallback((e) => {
        e.preventDefault()
        setLimit(e.target.value)
    })

    const nextPage = useCallback((e) => {
        e.preventDefault();
        setPagina(pagina + 1);
    });
    
    const prevPage = useCallback((e) => {
        e.preventDefault();
        setPagina(pagina - 1);
    });

    return(
        <div className={classes.root}>
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