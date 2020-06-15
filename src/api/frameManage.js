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