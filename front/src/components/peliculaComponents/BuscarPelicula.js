import { Button, InputBase, makeStyles } from "@material-ui/core"
import { useCallback, useState } from "react";
import { useHistory } from "react-router";

//estilos
const useStyles = makeStyles(() => ({
    buscar:{
        display: 'flex',
    },
    input:{
        maxWidth: '90%',
        flexGrow:1,
        borderRadius: '10px 5px 5px 10px',
        border: '1px solid #f0f0f0',
        '&:hover':{
            borderColor: '#544e68'
        },
        padding: 10
    },
    button:{
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

export default function BuscarPelicula(){
    const classes = useStyles();
    const history = useHistory();

    const [busqueda, setBusqueda] = useState('');
    const onChangeBusqueda = useCallback((e) => {
        setBusqueda(e.target.value);
    });

    //permite el uso de caracteres reservados como &
    //redirige a la pantalla de resultados de búsqueda
    const onBusqueda = useCallback((e) => {
        e.preventDefault();
        if(!busqueda){
            return
        }
        const uri = busqueda.trim();
        const req = encodeURIComponent(uri);

        history.push(`/pelicula/buscar?titulo=${req}`);
    }, [history, busqueda]);

    return(
        <form
            className={classes.buscar}
            onSubmit = {onBusqueda}
            label="buscar"
        >
            <InputBase
                className={classes.input}
                placeholder = "Buscar película: "
                onChange={onChangeBusqueda}
                value={busqueda}
            />
            <Button type="submit" className = {classes.button}>Buscar</Button>
        </form>
    )
}