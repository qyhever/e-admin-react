import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'mobx-react-lite/batchingForReactDom'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
