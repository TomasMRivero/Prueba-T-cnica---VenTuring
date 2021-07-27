import './App.css';

import { Switch, Route } from 'react-router-dom'
import LoginScreen from './components/authComponents/LoginScreen';
import RegistroScreen from './components/authComponents/RegistroScreen';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/registro" component={RegistroScreen} />
      </Switch>
    </div>
  );
}

export default App;
