import './App.css';

import { Switch, Route } from 'react-router-dom'
import LoginScreen from './components/authComponents/LoginScreen';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginScreen} />
      </Switch>
    </div>
  );
}

export default App;
