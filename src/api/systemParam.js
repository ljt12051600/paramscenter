import { request } from '@/utils/request'
// 参数管理-添加
export const createParam = async (data) => {
    return await request({
        url: '/param/createParam',
        method: 'post',
        datas: data,
       
    })
}
// 参数管理-编辑
export const updateParam = async (data) => {
    return await request({
        url: '/param/updateParam',
        method: 'post',
        datas: data,
       
    })
}
// 参数管理-删除
export const deleteParam = async (data) => {
    return await request({
        url: '/param/deleteParam',
        method: 'post',
        datas: data,
       
    })
}
// 参数管理-查询
export const queryParamList = async (data) => {
    return await request({
        url: '/param/queryParamList',
        method: 'post',
        datas: data,
       
    })
}
// 操作日志-查询
export const queryInfoChange = async (data) => {
    return await request({
        url: '/infoChange/queryOptionCodeNoPage',
        method: 'post',
        datas: data,
       
    })
}
// 维护用户-查询
export const queryUserNoPage = async (data) => {
    return await request({
        url: '/user/queryUserNoPage',
        method: 'post',
        datas: data,
       
    })
}
// 子系统定义-添加
export const createTp3004 = async (data) => {
    return await request({
        url: '/tp3004/createTp3004',
        method: 'post',
        datas: data,
       
    })
}
// 子系统定义-修改
export const updateTp3004 = async (data) => {
    return await request({
        url: '/tp3004/updateTp3004',
        method: 'post',
        datas: data,
       
    })
}
// 子系统定义-删除
export const deleteTp3004 = async (data) => {
    return await request({
        url: '/tp3004/deleteTp3004',
        method: 'post',
        datas: data,
       
    })
}
// 子域-查询
export const queryTp3005List = async (data) => {
    return await request({
        url: '/tp3005/queryTp3005List',
        method: 'post',
        datas: data,
       
    })
}
// 子域-添加
export const createTp3005 = async (data) => {
    return await request({
        url: '/tp3005/createTp3005',
        method: 'post',
        datas: data,
       
    })
}
// 子域-修改
export const updateTp3005 = async (data) => {
    return await request({
        url: '/tp3005/updateTp3005',
        method: 'post',
        datas: data,
       
    })
}
// 子域-删除
export const deleteTp3005 = async (data) => {
    return await request({
        url: '/tp3005/deleteTp3005',
        method: 'post',
        datas: data,
       
    })
}
// 外联系统接口-查询
export const queryTpsArOsItfList= async (data) => {
    return await request({
        url: '/tpsArOsItf/queryListPaging',
        method: 'post',
        datas: data,
       
    })
}
// 外联系统接口-添加
export const createTpsArOsItf = async (data) => {
    return await request({
        url: '/tpsArOsItf/create',
        method: 'post',
        datas: data,
       
    })
}
// 外联系统接口-修改
export const updateTpsArOsItf = async (data) => {
    return await request({
        url: '/tpsArOsItf/update',
        method: 'post',
        datas: data,
       
    })
}
// 外联系统接口-删除
export const deleteTpsArOsItf = async (data) => {
    return await request({
        url: '/tpsArOsItf/delete',
        method: 'post',
        datas: data,
       
    })
}
