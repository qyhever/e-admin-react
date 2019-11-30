import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD')
}
export const formatDateTime = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}
/**
 * 将一个扁平化的数组转换为树状结构
 * @param {Array} list 
 * @param {Null | String} id 子节点关联属性 值
 * @param {String} key 子节点关联属性 键
 * @param {String} parentKey 父节点关联属性 键
 * @return {Array} 树状数据
 */
export const listToTree = (list, id, key, parentKey) => {
  const ret = []
  const temp = list.filter(v => v[parentKey] === id)
  temp.forEach(item => {
    ret.push({
      ...item,
      id: String(item.id),
      children: listToTree(list, item[key], key, parentKey)
    })
  })
  return ret
}
/**
 * 判断当前路由是否拥有权限
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @param {Object} route 当前路由对象
 * @return {Boolean} 是否拥有权限
 */
export const hasPermission = (resourceCodes, route) => {
  if (route.auth && Array.isArray(route.auth)) {
    return route.auth.some(code => resourceCodes.includes(code))
  }
  return true
}
/**
 * 可访问菜单，从 routes 中过滤出 有权限的 menu
 * @param {Array} routes 路由表
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Array} 有权限的 menu list
 */
export const getAccessMenus = (routes, resourceCodes) => {
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
/**
 * 根据路由表获取扁平化的面包屑列表
 * @param {Array} routes 路由表
 * @return {Array} 面包屑列表
 */
export const getFlattenMenus = routes => {
  let result = []
  routes.forEach(item => {
    if (item.path && item.path !== '*') {
      result.push({
        path: item.path,
        breadcrumb: item.breadcrumb || item.title
      })
    }
    if (Array.isArray(item.routes)) {
      result = result.concat(getFlattenMenus(item.routes))
    }
  })
  return result
}
