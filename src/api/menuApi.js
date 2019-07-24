import { axios } from '@/utils/request'


/**
 * 角色列表分页
 * @param parameter
 * @returns {*}
 */
export function pageRole (parameter) {
  return axios({
    url: '/admin/page/role',
    method: 'post',
    params: parameter
  })
}

/**
 * 角色列表
 * @param parameter
 * @returns {*}
 */
export function listRole (parameter) {
  return axios({
    url: '/admin/list/role',
    method: 'post',
    params: parameter
  })
}

/**
 * 角色保存
 * @param parameter
 * @returns {*}
 */
export function addRole (parameter) {
  return axios({
    url: '/admin/add/role',
    method: 'post',
    params: parameter
  })
}
/**
 * 角色更新
 * @param parameter
 * @returns {*}
 */
export function editRole (parameter) {
  return axios({
    url: '/admin/edit/role',
    method: 'post',
    params: parameter
  })
}
/**
 * 角色操作
 * @param parameter
 * @returns {*}
 */
export function operRole (parameter) {
  return axios({
    url: '/admin/edit/role',
    method: 'post',
    params: parameter
  })
}