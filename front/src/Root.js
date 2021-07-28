import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';

import App from './App';

export default function Root() {
    return (
        <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                
            </Provider>
        </StrictMode>
    )
}