import md5 from 'md5'
import { login } from '@/api/user'
import { setToken, removeToken, setUser, removeUser } from '@/utils/local'
// import { setToken, clearLocal } from '@/utils/storage'
import { push } from 'connected-react-router'
// import { stringify } from 'qs'
export default {
  state: {
    user: {}
  },
  reducers: {
    updateState(state, payload) {
      return {...state, ...payload}
    }
  },
  effects: dispatch => ({
    async login(payload) {
      // twice md5 encypt
      const password = md5(md5(payload.password))
      const res = await login({
        ...payload,
        password
      })
      if (res.success) {
        const { token, userInfo } = res.data
        setToken(token) // setToken local
        setUser(userInfo) // setUser local
        dispatch.app.initUser(userInfo) // setUser store
        dispatch(push('/dashboard'))
      }
    },
    async logout() {
      removeToken() // removeToken local
      removeUser() // removeUser local
      dispatch.app.initUser({}) // removeUser store
    }
  })
}
