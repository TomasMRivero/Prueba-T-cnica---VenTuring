import {render} from 'react-dom';
import './index.css';
import Root from './Root'
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

//url base de la api
axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:4000/';

//header de la autorizacion
axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

render(<Root />, document.getElementById('root'));
reportWebVitals();
