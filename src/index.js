import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
//redux
import '../src/assets/themes/index.css'
import {Provider} from 'react-redux'

import store from './redux/index'
import MainContainer from './containers/MainContainer';

ReactDOM.render(<Provider store={store}>
    <MainContainer/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
