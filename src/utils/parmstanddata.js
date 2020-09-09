
export const compKindObj = {}
export const compTypeObj = {}
export const compPrdtObj = {}
export const smObj = {}
export const modelTypeObj = {}
export const instSubRalationTypeObj = {}
export const instRalationTypeObj = {}
export const isObj = {}
export const brcattrObj = {}
export const ccyTypeObj = {}
export const loanSignObj = {}
export const cshAttrObj = {}
export const channelObj = {}
export const customerTypeObj = {}





//判断是否
export const isList= [
    {
        name: '是',
        value: '1'
    },
    {
        name: '否',
        value: '0'
    }
]

//渠道类型大类
export const channelList= [
    {
        name: '电子渠道',
        value: '1'
    },
    {
        name: '柜面渠道',
        value: '2'
    },
    {
        name: '自助渠道',
        value: '3'
    }
]

//现金项目代码属性
export const cshAttrList= [
    {
        name: '现金收付',
        value: '1'
    },
    {
        name: '与发行库往来',
        value: '2'
    },
    {
        name: '内部现金往来',
        value: '3'
    }
]

//借贷标志
export const loanSignList= [
    {
        name: '借',
        value: '1'
    },
    {
        name: '贷',
        value: '2'
    }
]

//机构类型
export const brcattrList=[
    {
        name: '营业机构',
        value: '1'
    },
    {
        name: '管理机构',
        value: '3'
    },
    {
        name: '汇总机构',
        value: '5'
    }
]

//机构关系子类
export  const instSubRalationTypeList= [
    {
        name: '上级清算机构 ',
        value: '01'
    }
    ,
    {
        name: '外币上级清算机构',
        value: '02'
    }
    ,
    {
        name: '优惠',
        value: '同城出口清算机构'
    }
]
//机构关系分类
export  const instRalationTypeList= [
    {value: '01',
        name: '上级清算机构'
    },
    {value: '03',
        name: '票据出口机构'
    }, 
    {value: '04' ,
        name: '票据出口机构'
    },
    {value: '05',
        name: '上级制卡中心'
    },
    {value: '07',
        name: '现金上缴/申领机构'
    }, 
    {value: '08',
        name: '系统内往来（上存）' 
    },
    {value: '09',
        name: '系统内往来（借调）'
    }, 
    {value: '10',
        name: '上级授权机构' 
    },
    {value: '11',
        name: '汇总机构' 
    },
    {value: '12',
        name: '凭证管理'
    },
    {value: '13',
        name: '支付系统上下级关系（地方）'
    }, 
    {value: '14',
        name: '支付系统上下级关系（发送）'
    },
    {value: '15',
        name: '通兑上下级关系'
    } ,
    {value: '25',
        name: '分行管理'
    }, 
    {value: '26',
        name: '准备金上缴'
    }, 
    {value: '31',
        name: '外币平盘'
    }
]
// 模板分类
export  const modelTypeList= [
    {
        name: '产品',
        value: '1'
    }
    ,
    {
        name: '分类',
        value: '2'
    }
    ,
    {
        name: '优惠',
        value: '3'
    }
] 

// 产品类型
export  const productTypeList= [
    {
        name: '存款',
        value: '1'
    }
    ,
    {
        name: '贷款',
        value: '2'
    }
    ,
    {
        name: '内部户',
        value: '3'
    }
    ,
    {
        name: '中间业务',
        value: '4'
    }
] 

// 客户类型
export  const customerTypeList= [
    {
        name: '个人',
        value: '1'
    }
    ,
    {
        name: '对公',
        value: '2'
    }
    ,
    {
        name: '同业',
        value: '3'
    }
] 

// 属性值选择方式
export  const smList= [
    {
        name: '自由值',
        value: '1'
    }
    ,
    {
        name: '固定值',
        value: '2'
    }
    ,
    {
        name: '单选',
        value: '3'
    }
    ,
    {
        name: '多选',
        value: '4'
    }
]  

//法人代码
export  const orgList= [
    {
        name: '001-昆仑银行',
        value: '001'
    }
]

//系统代码
export const sysList= [
    {
        name: '001-核心系统',
        value: '001'
    },
    {
        name: '002-核算系统',
        value: '002'
    }
]

//利息税名称
export const taxList= [
    {
        name: '001-对私存款利息',
        value: '001'
    }
]
//币种标志
export const ccyTypeList= [
    {
        name: '业务币种',
        value: '0'
    },
    {
        name: '折算币种',
        value: '1'
    }
]

//币种
export const ccyList= [
    {
        name: '人民币',
        value: '01'
    }
]


//组件分类
export const compKindList= [
    {
        name: '技术参数',
        value: '1'
    },
    {
        name: '业务参数',
        value: '2'
    },
    {
        name: '产品参数',
        value: '3'
    }
]

// 产品参数
export const compPrdtList = [{
    name: "存款",
    value: "1"
},
{
    name: "贷款",
    value: "2"
},
{
    name: "内部户",
    value: "3"
},
{
    name: "核算",
    value: "4"
},
    {
    name: "定价",
    value: "5"
},
]

//组件类型
export const compTypeList = [
    {
        name: '单一',
        value: '1'
    },
    {
        name: '复合',
        value: '2'
    }
]
