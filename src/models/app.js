import routes from '@/router/routes'
import { getAccessMenus, getFlattenMenus } from '@/utils'

export default {
  state: {
    user: {},
    menus: [],
    breads: [],
    pageLoading: false,
    loading: false
  },
  reducers: {
    updateState(state, payload) {
      return { ...state, ...payload }
    },
    initUser(state, user) {
      const resourceCodes = Array.isArray(user.resources) ? user.resources.map(item => item.code) : []
      const menus = getAccessMenus(routes[0].routes, resourceCodes)
      const breads = [...getFlattenMenus(routes[0].routes), { path: '/', breadcrumb: '首页' }]
      return {
        ...state,
        user,
        menus,
        breads
      }
    }
  },
  effects: {}
}
