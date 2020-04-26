

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
//系统按钮结束




//菜单

export const queryMenu = async (data) => {
    return await request({
        url: '/menu/queryMenu',
        method: 'post',
        datas: data,
       
    })
}


