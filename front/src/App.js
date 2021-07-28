import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'
import LoginScreen from './components/authComponents/LoginScreen';
import RegistroScreen from './components/authComponents/RegistroScreen';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { autenticar } from './redux/actions/authActions';
import Nav from './components/Nav';
import PeliculaScreen from './components/peliculaComponents/PeliculaScreen';
import ResultadoBusqueda from './components/peliculaComponents/ResultadoBusqueda';
import PeliculaLista from './components/peliculaComponents/PeliculaLista';

function App() {

  const dispatch = useDispatch()

  const autenticado = useSelector(state => state.autenticado);
  const autorizacion = axios.defaults.headers.common.authorization;

  //verifica que haya un token en el localStorage y
  //cambia el estado de autenticado a true para después hacer las redirecciones
  useEffect(() => {
    if(autorizacion !== null){
      dispatch(autenticar());
    }
  }, [dispatch]);
  console.log(autenticado);
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path="/login">
          {!autenticado?<LoginScreen/>:<Redirect to="/"/>}
        </Route>
        <Route exact path="/registro">
          {!autenticado?<RegistroScreen/>:<Redirect to="/"/>}
        </Route>
        <Route exact path="/" component={PeliculaScreen}/>
        <Route exact path="/pelicula/buscar" component={ResultadoBusqueda}/>
        <Route exact path="/peliculas" component={PeliculaLista}/>

      </Switch>
    </div>
  );
}

export default App;
