import {
    request
} from '@/utils/request'

// 系统按钮
export const queryTp3004 = async(data) => {
        return await request({
            url: '/tp3004/queryTp3004',
            method: 'post',
            datas: data,

        })
    }
    //查询子域名
export const queryTp3005 = async(data) => {
    return await request({
        url: '/tp3005/queryTp3005',
        method: 'post',
        datas: data,

    })
}

export const queryTp3003 = async(data) => {
    return await request({
        url: '/tp3003/queryTp3003',
        method: 'post',
        datas: data,

    })
}
export const createTp0004 = async(data) => { //分配菜单
    return await request({
        url: '/menu/createTp0004',
        method: 'post',
        datas: data,

    })
}
export const queryVocabList = async(data) => {
    return await request({
        url: '/vocab/queryVocabList',
        method: 'post',
        datas: data,

    })
}

export const queryVocab = async(data) => {
    return await request({
        url: '/vocab/queryVocab',
        method: 'post',
        datas: data,

    })
}
export const createVocab = async(data) => {
    return await request({
        url: '/vocab/createVocab',
        method: 'post',
        datas: data,

    })
}
export const updateVocab = async(data) => {
    return await request({
        url: '/vocab/updateVocab',
        method: 'post',
        datas: data,

    })
}
export const deleteVocab = async(data) => {
    return await request({
        url: '/vocab/deleteVocab',
        method: 'post',
        datas: data,

    })
}
export const queryDictList = async(data) => {
    return await request({
        url: '/dict/queryDictList',
        method: 'post',
        datas: data,

    })
}
export const createDict = async(data) => {
    return await request({
        url: '/dict/createDict',
        method: 'post',
        datas: data,

    })
}
export const deleteDict = async(data) => {
    return await request({
        url: '/dict/deleteDict',
        method: 'post',
        datas: data,

    })
}
export const updateDict = async(data) => {
        return await request({
            url: '/dict/updateDict',
            method: 'post',
            datas: data,

        })
    }
    //數據字典類型和數據類型
export const queryOptionCodeNoPage = async(data) => {
    return await request({
        url: '/optionDetail/queryOptionCodeNoPage',
        method: 'post',
        datas: data,

    })
}
export const queryUnitDataList = async(data) => {
    return await request({
        url: '/unitData/queryUnitDataList',
        method: 'post',
        datas: data,

    })
}
export const createUnitData = async(data) => {
    return await request({
        url: '/unitData/createUnitData',
        method: 'post',
        datas: data,

    })
}
export const deleteUnitData = async(data) => {
    return await request({
        url: '/unitData/deleteUnitData',
        method: 'post',
        datas: data,

    })
}
export const updateUnitData = async(data) => {
    return await request({
        url: '/unitData/updateUnitData',
        method: 'post',
        datas: data,

    })
}
export const queryDistinctOption = async(data) => {
    return await request({
        url: '/optionDetail/queryDistinctOption',
        method: 'post',
        datas: data,

    })
}
export const queryListPaging2 = async(data) => {
    return await request({
        url: '/dict/queryListPaging2',
        method: 'post',
        datas: data,

    })
}
export const queryListDatagovnce = async(data) => {
    return await request({
        url: '/tp1012/queryTp1012List',
        method: 'post',
        datas: data,

    })
}
export const createTp1012 = async(data) => {
    return await request({
        url: '/tp1012/createTp1012',
        method: 'post',
        datas: data,

    })
}
export const updateTp1012 = async(data) => {
    return await request({
        url: '/tp1012/updateTp1012',
        method: 'post',
        datas: data,

    })
}
export const deleteTp1012 = async(data) => {
        return await request({
            url: '/tp1012/deleteTp1012',
            method: 'post',
            datas: data,

        })
    }
    //获取选项代码列表
export const queryOptionDetailList = async(data) => {
        return await request({
            url: '/optionDetail/queryOptionDetailList/',
            method: 'post',
            datas: data,
        })
    }
    //查询选项值列表-参数：optionCode: "itfStandName"
export const queryOptionCodeList = async(data) => {
        return await request({
            url: '/optionDetail/queryOptionCodeList/',
            method: 'post',
            datas: data,
        })
    }
    //查询选项组别列表-参数：optionCode: "itfStandName"    optionGroup: "excel"
export const queryTp1009List = async(data) => {
        return await request({
            url: '/tp1009/queryTp1009List/',
            method: 'post',
            datas: data,
        })
    }
    //删除选项列表
export const deleteOptionDetail = async(data) => {
        return await request({
            url: '/optionDetail/deleteOptionDetail/',
            method: 'post',
            datas: data,
        })
    }
    //修改选项列表
export const updateOptionDetail = async(data) => {
    return await request({
        url: '/optionDetail/updateOptionDetail/',
        method: 'post',
        datas: data,
    })
}
export const queryUnitDataListForSysId = async(data) => {
        return await request({
            url: '/unitData/queryUnitDataListForSysId',
            method: 'post',
            datas: data,
        })
    }
    //新增选项代码和选项组别
export const createOptionDetail = async(data) => {
        return await request({
            url: '/optionDetail/createOptionDetail',
            method: 'post',
            datas: data,
        })
    }
    //数据表定义
export const queryTable = async(data) => {
        return await request({
            url: '/table/queryTable',
            method: 'post',
            datas: data,

        })
    }
    //数据表创建
export const createTable = async(data) => {
        return await request({
            url: '/table/createTable',
            method: 'post',
            datas: data,

        })
    }
    //数据表删除
export const deleteTable = async(data) => {
        return await request({
            url: '/table/deleteTable',
            method: 'post',
            datas: data,

        })
    }
    //数据表修改
export const updateTable = async(data) => {
        return await request({
            url: '/table/updateTable',
            method: 'post',
            datas: data,

        })
    }
    //数据表建表
export const createTableInDatabase = async(data) => {
    return await request({
        url: '/table/createTableInDatabase',
        method: 'post',
        datas: data,

    })
}