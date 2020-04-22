

import { request } from '@/utils/request'
export const updateDictionaryGroup = async (data) => {
    return await request({
        url: '/updateDictionaryGroup',
        method: 'post',
        data: data,
       
    })
}
