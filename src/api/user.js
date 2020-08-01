import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'post',
    url: '/user/login',
    data
  })
}

export const getInfo = () => {
  return request({
    method: 'get',
    url: '/user/current'
  })
}

// export const getUsers = params => {
//   return request({
//     method: 'get',
//     url: '/user',
//     params
//   })
// }
export const getUsers = (loadingCb, params) => {
  return request({
    method: 'get',
    url: '/user',
    params,
    loadingCb
  })
}

export const createUser = params => {
  return request({
    method: 'post',
    url: '/user',
    data: params
  })
}

export const updateUser = params => {
  return request({
    method: 'put',
    url: '/user',
    data: params
  })
}

export const patchUser = (loadingCb, params) => {
  return request({
    method: 'patch',
    url: '/user',
    data: params,
    loadingCb
  })
}

export const deleteUser = (loadingCb, params) => {
  return request({
    method: 'delete',
    url: `/user/${params.id}`,
    params,
    loadingCb
  })
}
