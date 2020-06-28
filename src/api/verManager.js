import { request } from '@/utils/request'

// 变更-查询
export const queryEditionChg = async (data) => {
    return await request({
        url: '/editionChg/queryListPaging/',
        method: 'post',
        datas: data,
    
    })
}
// 按钮权限-查询
export const queryButtons = async (data) => {
    return await request({
        url: '/sysButtons/getButtonsByMenuIdRoleId/',
        method: 'post',
        datas: data,
    
    })
}
// 版本库-查询业务名称
export const queryLeafMenu = async (data) => {
    return await request({
        url: '/menu/queryLeafMenu/',
        method: 'post',
        datas: data,
    
    })
}
// 版本库-查询列表
export const queryHisRepository = async (data) => {
    return await request({
        url: '/editionHis/queryHisRepository/',
        method: 'post',
        datas: data,
    
    })
}