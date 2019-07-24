import { axios } from '@/utils/request'


/**
 * 菜单列表分页
 * @param parameter
 * @returns {*}
 */
export function pageMenu (parameter) {
  return axios({
    url: '/admin/page/menu',
    method: 'post',
    params: parameter
  })
}

/**
 * 菜单列表 树形
 * @param parameter
 * @returns {*}
 */
export function treeMenu (parameter) {
  return axios({
    url: '/admin/tree/menu',
    method: 'post',
    params: parameter
  })
}

/**
 * 菜单保存
 * @param parameter
 * @returns {*}
 */
export function addMenu (parameter) {
  return axios({
    url: '/admin/add/menu',
    method: 'post',
    params: parameter
  })
}

/**
 * 菜单更新
 * @param parameter
 * @returns {*}
 */
export function editMenu (parameter) {
  return axios({
    url: '/admin/edit/menu',
    method: 'post',
    params: parameter
  })
}

/**
 * 菜单操作
 * @param parameter
 * @returns {*}
 */
export function operMenu (parameter) {
  return axios({
    url: '/admin/edit/menu',
    method: 'post',
    params: parameter
  })
}