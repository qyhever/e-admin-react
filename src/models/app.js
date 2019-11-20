import routes from '@/router/routes'

function hasPermission(resourceCodes, route) {
  if (route.auth && Array.isArray(route.auth)) {
    return route.auth.every(code => resourceCodes.includes(code))
  }
  return true
}

// 可访问菜单，从 routes 中过滤出 有权限的 的 menu
function getAccessMenus(routes, resourceCodes) {
  const res = []
  
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(resourceCodes, tmp)) {
      if (tmp.routes) {
        tmp.routes = getAccessMenus(tmp.routes, resourceCodes)
        if (tmp.routes.length) {
          res.push(tmp)
        }
      } else {
        res.push(tmp)
      }
    }
  })

  return res
}
// 需要放入有 item.routes 的菜单
const getFlattenMenus = menus => {
  let result = []
  menus.forEach(item => {
    if (item.path && item.path !== '*') {
      result.push({
        path: item.path,
        breadcrumb: item.breadcrumb || item.title
      })
    }
    if (Array.isArray(item.routes)) {
      result  = result.concat(getFlattenMenus(item.routes))
    }
  })
  return result
}
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
