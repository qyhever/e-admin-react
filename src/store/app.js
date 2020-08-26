import { action, observable } from 'mobx'
import { setCollapse, getCollapse } from '@/utils/local'
import { isDefined } from '@/utils/type'

class App {
  @observable
  collapsed = Boolean(getCollapse())

  @action
  toggleCollapsed = (data) => {
    const value = isDefined(data) ? data : !this.collapsed
    setCollapse(value)
    this.collapsed = value
  }
}

export default new App()
