import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'
import LoginScreen from './components/authComponents/LoginScreen';
import RegistroScreen from './components/authComponents/RegistroScreen';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { autenticar } from './redux/actions/authActions';
import Nav from './components/Nav';

function App() {

  const dispatch = useDispatch()

  const autenticado = useSelector(state => state.autenticado);
  const autorizacion = axios.defaults.headers.common.authorization;

  //verifica que haya un token en el localStorage y
  //cambia el estado de autenticado a true para después hacer las redirecciones
  useEffect(() => {
    if(autorizacion !== null){
      dispatch(autenticar());
      console.log(autenticado);
    }
  }, [dispatch]);
  
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route path="/login">
          {!autenticado?<LoginScreen/>:<Redirect to="/"/>}
        </Route>
        <Route path="/registro">
          {!autenticado?<RegistroScreen/>:<Redirect to="/"/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
