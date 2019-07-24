import { axios } from '@/utils/request'


/**
 * 用户列表分页
 * @param parameter
 * @returns {*}
 */
export function pageUser (parameter) {
  return axios({
    url: '/admin/page/user',
    method: 'post',
    params: parameter
  })
}

/**
 * 用户保存
 * @param parameter
 * @returns {*}
 */
export function addUser (parameter) {
  return axios({
    url: '/admin/add/user',
    method: 'post',
    params: parameter
  })
}
/**
 * 用户更新
 * @param parameter
 * @returns {*}
 */
export function editUser (parameter) {
  return axios({
    url: '/admin/edit/user',
    method: 'post',
    params: parameter
  })
}
/**
 * 用户操作
 * @param parameter
 * @returns {*}
 */
export function operUser (parameter) {
  return axios({
    url: '/admin/edit/user',
    method: 'post',
    params: parameter
  })
}