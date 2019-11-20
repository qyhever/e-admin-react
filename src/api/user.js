import axios from '@/utils/axios'

export const login = data => {
  return axios({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const getInfo = () => {
  return axios({
    method: 'get',
    url: '/user/current'
  })
}

export const getUsers = params => {
  return axios({
    method: 'get',
    url: '/user',
    params
  })
}

export const createUser = params => {
  return axios({
    method: 'post',
    url: '/user',
    data: params
  })
}

export const updateUser = params => {
  return axios({
    method: 'put',
    url: '/user',
    data: params
  })
}

export const patchUser = params => {
  return axios({
    method: 'patch',
    url: '/user',
    data: params
  })
}

export const deleteUser = params => {
  return axios({
    method: 'delete',
    url: `/user/${params.id}`,
    params
  })
}
