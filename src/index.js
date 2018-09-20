import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
//redux
import '../src/assets/themes/index.css'
import { Provider } from 'react-redux'

import createStore from "./redux"
import MainContainer from './containers/MainContainer';


const store = createStore

ReactDOM.render(<Provider store={ store }>
    <MainContainer />
</Provider>, document.getElementById('root'));
registerServiceWorker();

