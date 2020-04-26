

import { request } from '@/utils/request'
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
