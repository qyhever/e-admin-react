import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD')
}
export const formatDateTime = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export function listToTree(list, id, key, parentKey) {
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
