import { request } from '@/utils/request'
// 系统按钮
export const getButtonsByMenuIdRoleId = async(data) => {
    return await request({
        url: '/sysButtons/getButtonsByMenuIdRoleId',
        method: 'post',
        datas: data,
    })
}