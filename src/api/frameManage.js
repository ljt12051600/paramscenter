import { request } from '@/utils/request'
// 系统定义-查询
export const queryTp3003List = async (data) => {
    return await request({
        url: '/tp3003/queryTp3003List',
        method: 'post',
        datas: data,
       
    })
}
// 系统定义-添加
export const createTp3003 = async (data) => {
    return await request({
        url: '/tp3003/createTp3003',
        method: 'post',
        datas: data,
       
    })
}
// 系统定义-修改
export const updateTp3003 = async (data) => {
    return await request({
        url: '/tp3003/updateTp3003',
        method: 'post',
        datas: data,
       
    })
}
// 系统定义-删除
export const deleteTp3003 = async (data) => {
    return await request({
        url: '/tp3003/deleteTp3003',
        method: 'post',
        datas: data,
       
    })
}
// 系统定义-等级查询
export const queryOptionCodeNoPage = async (data) => {
    return await request({
        url: '/optionDetail/queryOptionCodeNoPage',
        method: 'post',
        datas: data,
       
    })
}
// 子系统定义-查询
export const queryTp3004List = async (data) => {
    return await request({
        url: '/tp3004/queryTp3004List',
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