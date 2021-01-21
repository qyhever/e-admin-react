import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import 'mobx-react-lite/batchingForReactDom'
import React from 'react'
import ReactDOM from 'react-dom'
import './utils/global'
import './utils/visit'
import App from './App'

if (process.env.NODE_ENV !== 'development') {
  console.log(`last delopy: %c${process.env.NOW}`, 'color: #67C23A')
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
