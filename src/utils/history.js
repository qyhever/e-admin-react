import { createBrowserHistory, createHashHistory } from 'history'

let history = null
if (process.env.REACT_APP_IS_HASH) {
  history = createHashHistory()
} else {
  history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
  })
}
export {
  history
}
