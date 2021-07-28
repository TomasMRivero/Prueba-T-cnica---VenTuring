import { ClickAwayListener, Grid, IconButton, Snackbar, TextField, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from "@material-ui/core/styles";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { borrarPelicula, editarPelicula } from "../../redux/actions";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    container:{
        transition: "0.3s ease",
        margin: "auto", 
        width: '100%',
        padding: 10,
        [theme.breakpoints.down('xs')]: {
            width:'95%'
        },
        border: '1px solid #f0f0f0',
        borderRadius: 15,
        '&:hover':{
            background: '#fbfbfb',
            border: '1px solid #544e68',
            cursor: 'pointer'
        }
    },
    input:{
        width: '100%',
        borderColor: '#544e68'
    },
}));

export default function PeliculaItem (props){
    const dispatch = useDispatch();
    const classes = useStyles()
    const [expandir, setExpandir] = useState(false);
    const [editando, setEditando] = useState(false);

    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState("");

    const [titulo, setTitulo] = useState(props.pelicula.titulo);
    const onChangeTitulo = useCallback((e) => {
        setTitulo(e.target.value)
    })
    const [anio, setAnio] = useState(props.pelicula.anio);
    const onChangeAnio = useCallback((e) => {
        setAnio(e.target.value)
    })
    const [descripcion, setDescripcion] = useState(props.pelicula.descripcion);
    const onChangeDescripcion = useCallback((e) => {
        setDescripcion(e.target.value)
    })

    async function borrar(){
        await axios.delete(`api/pelicula/${props.pelicula.id}`)
        .then(() => {
            dispatch(borrarPelicula(props.pelicula));
        }).catch(error => {
            if(error.response){
                setError(error.response.data);
            }
            setAlerta(true);
        })
    }

    async function editar(){
        await axios.put(`api/pelicula/${props.pelicula.id}`,{
            titulo,
            descripcion,
            anio
        }).then(response => {
            dispatch(editarPelicula(response.data));
        }).catch(error => {
            if(error.response){
                setError(error.response.data);
            }
            setTitulo(props.pelicula.titulo);
            setAnio(props.pelicula.anio);
            setDescripcion(props.pelicula.descripcion);
            setAlerta(true);
        });
    }

    const onClickContainer = useCallback(() => {
        setExpandir(true);
    })

    const onClickAway = () => {
        setTitulo(props.pelicula.titulo);
        setAnio(props.pelicula.anio);
        setDescripcion(props.pelicula.descripcion);
        setExpandir(false);
        setEditando(false);
    }

    const onClickEditar = useCallback((e) => {
        e.preventDefault();
        setEditando(true);
    });

    const onClickCancelar = useCallback((e) => {
        e.preventDefault();
        setTitulo(props.pelicula.titulo);
        setAnio(props.pelicula.anio);
        setDescripcion(props.pelicula.descripcion);
        setEditando(false);
    });

    const onClickBorrar = useCallback((e) => {
        e.preventDefault();
        borrar();        
    },[props.pelicula])

    const onClickGuardar = useCallback((e) => {
        e.preventDefault();
        editar();
        setExpandir(false);
        setEditando(false);
    });

    const cerrarAlerta = () => {
        setAlerta(false);
    }

    return(<>

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

        <ClickAwayListener onClickAway={onClickAway}>

        <Grid container className={classes.container} onClick={onClickContainer}>
            {!editando && <>
            <Grid item xs={12}>
                <Typography style={{margin: 5}} variant="h6"> <b>{props.pelicula.titulo}</b> ({props.pelicula.anio})</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">{props.pelicula.descripcion}</Typography>
            </Grid>
            </>}
            {editando && <Grid item container xs={12} spacing={2}>
                <Grid item xs={9}>
                    <TextField
                        className={classes.input}
                        label="Titulo"
                        variant="outlined"
                        value={titulo}
                        onChange={onChangeTitulo}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        className={classes.input}
                        label="Año"
                        variant="outlined"
                        value={anio}
                        onChange={onChangeAnio}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.input}
                        label="Descripcion"
                        variant="outlined"
                        multiline
                        value={descripcion}
                        onChange={onChangeDescripcion}
                    />
                </Grid>
            </Grid>}
            {expandir && <Grid item xs={12}>
                {!editando && <IconButton onClick={onClickEditar}>
                    <EditIcon/>
                </IconButton>}
                {editando && <>
                <IconButton onClick={onClickGuardar}>
                    <SaveIcon/>
                </IconButton>
                <IconButton onClick={onClickCancelar}>
                    <CancelIcon/>
                </IconButton>
                </>}
                <IconButton onClick={onClickBorrar}>
                    <DeleteIcon/>
                </IconButton>
            </Grid>}
        </Grid>
        </ClickAwayListener>
    </>)
}