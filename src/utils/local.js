import { Base64 } from 'js-base64'

const TOKEN = 'e-admin-react-token'
const COLLAPSE = 'e-admin-react-collapse'
const USER = 'e-admin-react-user'

export const setToken = token => {
  return localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

export const removeToken = () => {
  return localStorage.removeItem(TOKEN)
}

export const setCollapse = value => {
  return localStorage.setItem(COLLAPSE, value)
}

export const getCollapse = () => {
  return JSON.parse(localStorage.getItem(COLLAPSE))
}
// data must be a object
export const setUser = data => {
  const enText = Base64.encode(JSON.stringify(data))
  return localStorage.setItem(USER, enText)
}

export const getUser = () => {
  const enText = localStorage.getItem(USER)
  if (!enText) {
    return null
  }
  let data = null
  try {
    const deText = Base64.decode(enText)
    data = JSON.parse(deText)
  } catch (err) {
    console.log(err)
  }
  return data
}

export const removeUser = () => {
  return localStorage.removeItem(USER)
}