import { createContext, useContext } from 'react'
import appStore from './app'
import userStore from './user'

const store = {
  appStore,
  userStore
}

const StoreContext = createContext(store)

export const useStore = () => useContext(StoreContext)

export default store
