

import { request } from '@/utils/request'

export const createCompButtons = async (data) => {
        return await request({
            url: '/paramComp/createParamComp',
            method: 'post',
            datas: data,
            timeout:10000,
           
     })
    
}

export const queryCompButtons = async (data) => {
        return await request({
            url: '/paramComp/findParamCompByCondition',
            method: 'post',
            datas: data,
            timeout:10000, 
        })
}

export const updateCompButtons = async (data) => {
return await request({
    url: '/paramComp/updateParamComp',
    method: 'post',
    datas: data,
    timeout:10000,
    
})
}

export const deleteCompButtons = async (data) => {
    return await request({
        url: '/paramComp/deleteParamComp',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//组件属性创建
export const createPCPButtons = async (data) => {
    return await request({
        url: '/paramCompProperty/createParamCompProperty',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//组件属性查询
export const findPCPButtons = async (data) => {
    return await request({
        url: '/paramCompProperty/findParamCompPropertyByCondition',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//组件属性删除
export const deletePCPButtons = async (data) => {
    return await request({
        url: '/paramCompProperty/deleteParamCompProperty',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//组件属性修改
export const updatePCPButtons = async (data) => {
    return await request({
        url: '/paramCompProperty/updateParamCompProperty',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}

//机构信息查询
export const queryPdBButtons = async (data) => {
    return await request({
        url: '/pmcPdBrc/queryList',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//机构信息分页查询
export const queryPagPdBButtons = async (data) => {
    return await request({
        url: '/pmcPdBrc/queryListPaging',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//机构信息增加
export const createcPdBButtons = async (data) => {
    return await request({
        url: '/pmcPdBrc/create',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//机构信息修改
export const updatePdBButtons = async (data) => {
    return await request({
        url: '/pmcPdBrc/update',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}
//机构信息删除
export const deletePdBButtons = async (data) => {
    return await request({
        url: '/pmcPdBrc/delete',
        method: 'post',
        datas: data,
        timeout:10000,
        
    })
    
}





