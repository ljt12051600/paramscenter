
import { request } from '@/utils/request'
// 系统按钮
export const queryVocabList = async (data) => {
    return await request({
        url: '/vocab/queryVocabList',
        method: 'post',
        datas: data,
       
    })
}
