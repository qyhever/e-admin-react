import axios from '@/utils/axios'

export const getRoles = params => {
  return axios({
    method: 'get',
    url: '/role',
    params
  })
}

export const getTotalRoles = () => {
  return axios({
    method: 'get',
    url: '/role/total'
  })
}

export const createRole = params => {
  return axios({
    method: 'post',
    url: '/role',
    data: params
  })
}

export const updateRole = params => {
  return axios({
    method: 'put',
    url: '/role',
    data: params
  })
}

export const deleteRole = params => {
  return axios({
    method: 'delete',
    url: `/role/${params.id}`
  })
}
