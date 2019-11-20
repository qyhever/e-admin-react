import { init } from '@rematch/core'
import { createBrowserHistory } from 'history'
import createLoadingPlugin from '@rematch/loading'
import { routerMiddleware, connectRouter, replace } from 'connected-react-router'
import { getUser } from '@/utils/local'

import models from '@/models'

const history = createBrowserHistory({
  basename: '/e-admin-react'
})
const middleware = routerMiddleware(history)
const loading = createLoadingPlugin()

const store = init({
  redux: {
    reducers: {
      router: connectRouter(history)
    },
    middlewares: [middleware]
  },
  models,
  plugins: [loading]
})

const user = getUser() // getUser local
if (user) {
  // store.dispatch.app.updateState({
  //   user
  // })
  store.dispatch.app.initUser(user)
} else {
  store.dispatch(replace('/login'))
}

export default store
