import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import { routerMiddleware, connectRouter, replace } from 'connected-react-router'
import { getUser } from '@/utils/local'
import models from '@/models'
import { history } from '@/router'

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
  store.dispatch.app.initUser(user)
} else {
  store.dispatch(replace('/login'))
}

export default store
