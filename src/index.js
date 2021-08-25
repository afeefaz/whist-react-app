import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from "mobx-react";

import productsStore from './stores/productsStore'

let productStore = new productsStore()

let stores = {
    productStore
}

ReactDOM.render(<Provider {...stores}><App /></Provider>,document.getElementById('root'))