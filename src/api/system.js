

import { request } from '@/utils/request'
// 系统按钮
export const loginUser = async (data) => {
    return await request({
        url: '/user/loginUser',
        method: 'post',
        datas: data,
       
    })
}
export const querySysButtons = async (data) => {
    return await request({
        url: '/sysButtons/querySysButtons',
        method: 'post',
        datas: data,
       
    })
}
export const deleteSysButtons = async (data) => {
    return await request({
        url: '/sysButtons/deleteSysButtons',
        method: 'post',
        datas: data,
       
    })
}
export const createSysButtons = async (data) => {
    return await request({
        url: '/sysButtons/createSysButtons',
        method: 'post',
        datas: data,
       
    })
}
export const updateSysButtons = async (data) => {
    return await request({
        url: '/sysButtons/updateSysButtons',
        method: 'post',
        datas: data,
       
    })
}
//获取所有系统按钮
export const querySysButtonsListAll = async (data) => {
    return await request({
        url: '/sysButtons/querySysButtonsListAll',
        method: 'post',
        datas: data,
       
    })
}




//菜单

export const queryMenu = async (data) => {
    return await request({
        url: '/menu/queryMenu',
        method: 'post',
        datas: data,
       
    })
}
export const updateMenu = async (data) => {
    return await request({
        url: '/menu/updateMenu',
        method: 'post',
        datas: data,
       
    })
}
export const queryMenuForTree = async (data) => {
    return await request({
        url: '/menu/queryMenuForTree',
        method: 'post',
        datas: data,
       
    })
}
export const queryMenuListByUserFuncId = async (data) => {
    return await request({
        url: '/menu/queryMenuListByUserFuncIdForTree',
        method: 'post',
        datas: data,
       
    })
}



//用户

export const queryUserList = async (data) => {
    return await request({
        url: '/user/queryUserList',
        method: 'post',
        datas: data,
       
    })
}
export const createUser = async (data) => {
    return await request({
        url: '/user/createUser',
        method: 'post',
        datas: data,
       
    })
}
export const updateUser = async (data) => {
    return await request({
        url: '/user/updateUser',
        method: 'post',
        datas: data,
       
    })
}
export const deleteUser = async (data) => {
    return await request({
        url: '/user/deleteUser',
        method: 'post',
        datas: data,
       
    })
}
export const resetPassword = async (data) => {
    return await request({
        url: '/user/resetPassword',
        method: 'post',
        datas: data,
       
    })
}
export const updatePassword = async (data) => {
    return await request({
        url: '/user/updatePassword',
        method: 'post',
        datas: data,
       
    })
}
//角色相关
export const queryRoleList = async (data) => {
    return await request({
        url: '/role/queryRoleList',
        method: 'post',
        datas: data,
       
    })
}
export const deleteRole = async (data) => {
    return await request({
        url: '/role/deleteRole',
        method: 'post',
        datas: data,
       
    })
}
export const updateRole = async (data) => {
    return await request({
        url: '/role/updateRole',
        method: 'post',
        datas: data,
       
    })
}
export const createRole = async (data) => {
    return await request({
        url: '/role/createRole',
        method: 'post',
        datas: data,
       
    })
}
export const queryRoleListAll = async (data) => {
    return await request({
        url: '/role/queryRoleListAll',
        method: 'post',
        datas: data,
       
    })
}
//用户角色
export const searchUser = async (data) => {
    return await request({
        url: '/userRole/searchUser',
        method: 'post',
        datas: data,
       
    })
}
export const saveUserRole = async (data) => {
    return await request({
        url: '/userRole/saveUserRole',
        method: 'post',
        datas: data,
       
    })
}

//获取改用户有哪些菜单
export const queryUserRoleAll = async (data) => {
    return await request({
        url: '/userRole/queryUserRoleAll',
        method: 'post',
        datas: data,
       
    })
}





