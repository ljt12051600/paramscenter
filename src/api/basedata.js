
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

export const queryVocab = async (data) => {
    return await request({
        url: '/vocab/queryVocab',
        method: 'post',
        datas: data,
       
    })
}
export const createVocab = async (data) => {
    return await request({
        url: '/vocab/createVocab',
        method: 'post',
        datas: data,
       
    })
}
export const updateVocab = async (data) => {
    return await request({
        url: '/vocab/updateVocab',
        method: 'post',
        datas: data,
       
    })
}
export const deleteVocab = async (data) => {
    return await request({
        url: '/vocab/deleteVocab',
        method: 'post',
        datas: data,
       
    })
}
export const queryDictList = async (data) => {
    return await request({
        url: '/dict/queryDictList',
        method: 'post',
        datas: data,
       
    })
}
//數據字典類型和數據類型
export const queryOptionCodeNoPage = async (data) => {
    return await request({
        url: '/optionDetail/queryOptionCodeNoPage',
        method: 'post',
        datas: data,
       
    })
}
