import { request } from '@/utils/request'

// 操作日志-查询
export const queryInfoChange = async (data) => {
    return await request({
        url: '/infoChange/queryInfoChange',
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
