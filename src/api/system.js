import { axios } from '@/utils/request'

const api = {
  user: 'http://localhost:8083/admin/user',
  role: 'http://localhost:8083/admin/role',
  allRole: 'http://localhost:8083/admin/roles',
  roleAuth: 'http://localhost:8083/admin/role/auth',
  menu: 'http://localhost:8083/admin/menu',
  allMenu: 'http://localhost:8083/admin/menus',
  menuAction: 'http://localhost:8083/admin/menuAction',
}

export default api

/** ========用户相关接口========== **/

/**
 * 用户列表分页
 * @param parameter
 * @returns {*}
 */
export function queryUserPage (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

/**
 * 用户查询
 * @param parameter
 * @returns {*}
 */
export function queryUser (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

/**
 * 用户保存
 * @param parameter
 * @returns {*}
 */
export function saveUser (parameter) {
  return axios({
    url: api.user,
    method: 'post',
    params: parameter
  })
}

/**
 * 用户更新
 * @param parameter
 * @returns {*}
 */
export function updateUser (parameter) {
  return axios({
    url: api.user,
    method: 'put',
    params: parameter
  })
}

/**
 * 用户删除
 * @param parameter
 * @returns {*}
 */
export function deleteUser (parameter) {
  return axios({
    url: api.user,
    method: 'delete',
    params: parameter
  })
}

/** ========角色相关接口========== **/

/**
 * 角色列表分页
 * @param parameter
 * @returns {*}
 */
export function queryAllRole (parameter) {
  return axios({
    url: api.allRole,
    method: 'get',
    params: parameter
  })
}

/**
 * 角色列表分页
 * @param parameter
 * @returns {*}
 */
export function queryRolePage (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

/**
 * 角色查询
 * @param parameter
 * @returns {*}
 */
export function queryRole (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

/**
 * 角色保存
 * @param parameter
 * @returns {*}
 */
export function saveRole (parameter) {
  return axios({
    url: api.role,
    method: 'post',
    params: parameter
  })
}

/**
 * 角色更新
 * @param parameter
 * @returns {*}
 */
export function updateRole (parameter) {
  return axios({
    url: api.role,
    method: 'put',
    params: parameter
  })
}

/**
 * 角色删除
 * @param parameter
 * @returns {*}
 */
export function deleteRole (parameter) {
  return axios({
    url: api.role,
    method: 'delete',
    params: parameter
  })
}

/**
 * 角色权限列表
 * @param parameter
 * @returns {*}
 */
export function roleAuths (parameter) {
  return axios({
    url: api.roleAuth,
    method: 'get',
    params: parameter
  })
}

/**
 * 权限保存
 * @param parameter
 * @returns {*}
 */
export function roleAuth (parameter) {
  return axios({
    url: api.roleAuth,
    method: 'post',
    params: parameter
  })
}

/** ========菜单相关接口========== **/
/**
 * 列表分页
 * @param parameter
 * @returns {*}
 */
export function queryAllMenu (parameter) {
  return axios({
    url: api.allMenu,
    method: 'get',
    params: parameter
  })
}


/**
 * 菜单列表分页
 * @param parameter
 * @returns {*}
 */
export function queryMenuPage (parameter) {
  return axios({
    url: api.menu,
    method: 'get',
    params: parameter
  })
}


/**
 * 菜单保存
 * @param parameter
 * @returns {*}
 */
export function saveMenu (parameter) {
  return axios({
    url: api.menu,
    method: 'post',
    params: parameter
  })
}

/**
 * 菜单更新
 * @param parameter
 * @returns {*}
 */
export function updateMenu (parameter) {
  return axios({
    url: api.menu,
    method: 'put',
    params: parameter
  })
}

/**
 * 删除菜单
 * @param parameter
 * @returns {*}
 */
export function deleteMenu (parameter) {
  return axios({
    url: api.menu,
    method: 'delete',
    params: parameter
  })
}



/**
 * 列表分页
 * @param parameter
 * @returns {*}
 */
export function queryAllMenuAction (parameter) {
  return axios({
    url: api.menuAction,
    method: 'get',
    params: parameter
  })
}


/**
 * 菜单保存
 * @param parameter
 * @returns {*}
 */
export function saveMenuAction (parameter) {
  return axios({
    url: api.menuAction,
    method: 'post',
    params: parameter
  })
}

/**
 * 菜单更新
 * @param parameter
 * @returns {*}
 */
export function updateMenuAction (parameter) {
  return axios({
    url: api.menuAction,
    method: 'put',
    params: parameter
  })
}

/**
 * 菜单更新
 * @param parameter
 * @returns {*}
 */
export function deleteMenuAction (parameter) {
  return axios({
    url: api.menuAction,
    method: 'delete',
    params: parameter
  })
}