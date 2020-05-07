
import { request } from '@/utils/request'

// 系统按钮
export const queryTp3004 = async (data) => {
    return await request({
        url: '/tp3004/queryTp3004',
        method: 'post',
        datas: data,
       
    })
}
export const queryTp3003 = async (data) => {
    return await request({
        url: '/tp3003/queryTp3003',
        method: 'post',
        datas: data,
       
    })
}
export const queryVocabList = async (data) => {
    return await request({
        url: '/vocab/queryVocabList',
        method: 'post',
        datas: data,
       
    })
}
