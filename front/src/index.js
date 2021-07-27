import {render} from 'react-dom';
import './index.css';
import Root from './Root'
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:4000/';
axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

render(<Root />, document.getElementById('root'));
reportWebVitals();
