import axios from '@/utils/axios'

export const getResources = params => {
  return axios({
    method: 'get',
    url: '/resource',
    params
  })
}

export const getTotalResources = params => {
  return axios({
    method: 'get',
    url: '/resource/total',
    params
  })
}

export const getDirs = params => {
  return axios({
    method: 'get',
    url: '/resource/dir',
    params
  })
}

export const createResource = params => {
  return axios({
    method: 'post',
    url: '/resource',
    data: params
  })
}

export const updateResource = params => {
  return axios({
    method: 'put',
    url: '/resource',
    data: params
  })
}

export const patchResource = params => {
  return axios({
    method: 'patch',
    url: '/resource',
    data: params
  })
}

export const deleteResource = params => {
  return axios({
    method: 'delete',
    url: `/resource/${params.id}`,
    params
  })
}
