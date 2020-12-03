import { action, observable } from 'mobx'
import { login } from '@/views/login/service'
import { setToken, setUser, getUser } from '@/utils/local'
import { getAccessMenus, getFlattenMenus } from '@/utils'
import { routes } from '@/router/routes'
import { history } from '@/utils/history'

class User {
  constructor() {
    const localUser = getUser()
    if (localUser) {
      this.initUserData(localUser)
    } else {
      history.replace('/login')
    }
  }
  @observable currentUser = {}

  @observable menus = []

  @observable breads = []

  @action loginByAccount = async (data) => {
    const res = await login(data)
    const user = res.userInfo
    const token = res.token
    user.resourceCodes = user.resources.map(item => item.code)
    setUser(user) // set local
    setToken(token) // set local
    await this.initUserData(user)
  }

  @action initUserData = async (user) => {
    const menus = getAccessMenus(routes, user.resourceCodes)
    const breads = [...getFlattenMenus(routes), { path: '/', breadcrumb: '首页' }]

    this.currentUser = user
    this.menus = menus
    this.breads = breads
  }
}

export default new User()
