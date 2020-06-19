/**
 * 架构管控常量定义
 */
//---------------发布常量--------------begin--------------------------
publishConstont={}
//发布模式
publishConstont.PATTERN_GENERAL = "0"//通用发布-前端传入发布报文
publishConstont.PATTERN_TASK = "1"//按任务发布
publishConstont.PATTERN_BACKEND= "2"//后端发布
//发布对象类型: 后端发布需定义
publishConstont.OT_TABLE = "tableExchange" //数据表
//--------------操作类型-------------
HANDLE_TYPE = {}
HANDLE_TYPE.ADD = "ADD"
HANDLE_TYPE.UPDATE = "UPDATE"
HANDLE_TYPE.DELETE= "DELETE"
//---------------外联系统接口:与(系统架构->外联系统接口)中定义的接口编码对应----------------
OS_ITF = {}
OS_ITF.OS_ITF001 = "OS_ITF001"//数据表接收发布接口
OS_ITF.OS_ITF002 = "OS_ITF002"//响应码接收发布接口
OS_ITF.OS_ITF003 = "OS_ITF003"//选项代码接收发布接口
OS_ITF.OS_ITF004 = "OS_ITF004"//数据字典接收发布接口
OS_ITF.OS_ITF005 = "OS_ITF005"//元数据接收发布接口
