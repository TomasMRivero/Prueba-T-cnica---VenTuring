import { ClickAwayListener, Grid, IconButton, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from "@material-ui/core/styles";
import { useCallback, useState } from "react";

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
    }
}));

export default function PeliculaItem (props){
    const classes = useStyles()
    const [expandir, setExpandir] = useState(false);
    const [editando, setEditando] = useState(false);

    const onClickContainer = useCallback(() => {
        setExpandir(true);
    })

    const onClickAway = () => {
        setExpandir(false)
    }

    const onClickEditar = useCallback((e) => {
        e.preventDefault();
        setEditando(true);
    });

    const onClickCancelar = useCallback((e) => {
        e.preventDefault();
        setEditando(false);
    })
    return(
        <ClickAwayListener onClickAway={onClickAway}>
        <Grid container className={classes.container} onClick={onClickContainer}>
            <Grid item xs={12}>
                <Typography style={{margin: 5}} variant="h6"> <b>{props.pelicula.titulo}</b> ({props.pelicula.anio})</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">{props.pelicula.descripcion}</Typography>
            </Grid>
            {expandir && <Grid item xs={12}>
                {!editando && <IconButton onClick={onClickEditar}>
                    <EditIcon/>
                </IconButton>}
                {editando && <>
                <IconButton>
                    <SaveIcon/>
                </IconButton>
                <IconButton onClick={onClickCancelar}>
                    <CancelIcon/>
                </IconButton>
                </>}
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </Grid>}
        </Grid>
        </ClickAwayListener>
    )
}