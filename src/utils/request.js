import axios from 'axios'
import router from '@/router'
import Vue from 'vue';





const buildErrorResponse = (err) => {
    /**
     * 接口返回统一格式定义
     */
    let res = {
        data: {
            code: 999,
            msg: '网络不给力，重试一下吧～'
        },
        status: 999,
        statusText: '网络错误',
        config: {},
        headers: {}
    }

    if (err.response) {
        res = err.response
    } else {
        res.config = err.config
    }

    // 发生错误，服务端返回404，500一个html串
    if (typeof res.data !== 'object') {
        res.data = {
            RetCd: 999,
            msg: '网络不给力，重试一下吧～'
        }
    }

    return res
}

export const request = async ({
    url = '',
    method = 'GET',
    data = {},
    params = {},
    timeout = 10000,
    withCredentials = true,
    headers = {
        'Content-Type': 'application/json'
    },
    login = false
}, {
    autoToastError = true
} = {}) => {
    let res
    let baseUrl

    try {

        baseUrl = process.env.apiBase;
        if (login) {
            baseUrl = process.env.loginBase
        }



        res = await axios({
            url: `${baseUrl}${url}`,
            method,
            data,
            params,
            timeout,
            headers,
            //跨域请求是否需要凭证，默认false
            withCredentials
        })
    } catch (err) {
        res = buildErrorResponse(err)
    }


    if (autoToastError) {

        try {
            if (res.data.RetCd == 99) {
                $app.$router.push({
                    name: "Login"
                })
                Vue.prototype.$notify.error({
                    title: '错误',
                    message: '接口报错了'
                });
                // return $app.$Message.error("登录已失效请重新登录")


            }
            if (res.data.RetCd !== '000000') {
                Vue.prototype.$notify.error({
                    title: '错误',
                    message: '接口报错了'
                });
            }
        } catch (err) {

        }

    }
    return res.data
}