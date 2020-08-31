<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" :inline="true" label-width="100px">
                    <system-component :required="false" :query="query" />
                    <el-form-item label="表类型">
                        <el-select
                            style="width:200px;"
                            v-model="query.tableType"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option label="定义类" value="0"></el-option>
                            <el-option label="账户类" value="1"></el-option>
                            <el-option label="明细类" value="2"></el-option>
                            <el-option label="登记簿类" value="3"></el-option>
                            <el-option label="流水类" value="4"></el-option>
                            <el-option label="报表类" value="5"></el-option>
                            <el-option label="历史类" value="6"></el-option>
                            <el-option label="临时类" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表名">
                        <el-input style="width:200px;" v-model.trim="query.tableName"></el-input>
                    </el-form-item>
                    <el-form-item label="表中文名称">
                        <el-input style="width:200px;" v-model.trim="query.tableNameDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select
                            style="width:200px;"
                            v-model="query.dataStatus"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option label="未建表" value="1"></el-option>
                            <el-option label="已建表" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="search">
                <el-button @click="queryList" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </div>

            <div slot="action">
                <el-button @click="doAdd" type="primary">添加</el-button>
                <el-button @click="doPublist" type="primary">发布</el-button>
            </div>
            <div slot="body">
                <!--表单渲染-->

                <!--表格渲染-->
                <el-table
                    border
                    @selection-change="changeChoose"
                    ref="table"
                    align="center"
                    :data="data.rows"
                    style="width: 100%;"
                >
                    <el-table-column type="selection" align="center" label="选择" />
                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" prop="status" label="状态">
                        <template slot-scope="scope">{{tableTypeDescObj[scope.row.status]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="subSysId" label="子系统">
                        <template slot-scope="scope">{{subSysObj[scope.row.subSysId]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="subDomain" label="子域">
                        <template slot-scope="scope">{{domainObj[scope.row.subDomain]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="tableName" label="表名" />
                    <el-table-column align="center" prop="tableNameDesc" label="表中文名称" />
                    <el-table-column align="center" prop="ver" label="版本" />
                    <el-table-column align="center" prop="dataDesc" label="数据描述" />
                    <el-table-column align="center" prop="processDesc" label="处理描述" />
                    <el-table-column align="center" prop="ascDesc" label="关联描述" />
                    <el-table-column label="操作" align="center" fixed="right" width="160px">
                        <template slot-scope="scope">
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页组件-->
                <div v-if="data.total" class="pagination">
                    <el-pagination
                        background
                        layout="total,pager,jumper,sizes"
                        :current-page="query.pageNum"
                        :page-sizes="[10,25,50]"
                        :page-size="query.numPerPage"
                        :total="data.total"
                        @current-change="handlePageChange"
                        @size-change="handleSizeChange"
                    ></el-pagination>
                </div>
            </div>
        </system-table>
        <div v-if="showAction">
            <edit-component
                @doClose="doCloseAction"
                :type="type"
                :showAction="showAction"
                :actionObj="actionObj"
            />
        </div>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import editComponent from './edit.vue';
import tablefieldComponent from './tablefield.vue';
import FRAMEMANAGE from '@views/mixin/frameManage';
import SYSTEM from '@views/mixin/system.js';
import MIXIN from '@views/mixin/button';
import systemComponent from '@views/components/domain.component.vue';
import { queryTable, deleteTable, createTableInDatabase } from '@/api/basedata.js';

export default {
    components: { editComponent, systemComponent },
    mixins: [FRAMEMANAGE, SYSTEM, MIXIN],
    data() {
        return {
            type: 'add',
            query: {
                subDomain: '',
                subSysId: '',
                sysId: '',
                tableTypeDesc: '',
                tableName: '',
                tableNameDesc: '',
                dataStatus: '',
                pageNum: 1,
                numPerPage: 10
            },
            tableTypeDescObj: {
                '1': '新增',
                '2': '修改',
                '3': '删除',

                '80': '检出',
                '81': '检出-已修改',
                '82': '检出-已删除',
                '89': '检入',
                '90': '提交审批',
                '92': '撤销',
                '99': '审批通过'
            },
            rules: {
                sysId: [{ required: true, message: '请输入系统标识', trigger: 'blur' }],
                sysName: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
                displaySeqno: [
                    { required: true, message: '请输入系统顺序号', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' }
                ]
            },
            showAction: false,
            actionObj: {
                ascDesc: '',
                belongDb: '',
                checkUser: '',
                clnCyc: '',
                clnDesc: '',
                complexity: '',
                createTime: '',
                createUser: '',
                dataBaseName: '',
                dataBaseType: '',
                dataDesc: '',
                dataStatus: '',
                handleType: '',
                id: '',
                isHotspot: '',
                lastUpdateTime: '',
                lastUpdateUser: '',
                level: '',
                processDesc: '',
                remark: '',
                sourceVer: '',
                status: '',
                subDomain: '',
                subSysId: '',
                sysId: '',
                tableColumnInfoList: [],
                tableIndexList: [],
                tableName: '',
                tableNameDesc: '',
                tableType: '',
                taskSeqno: '',
                userId: '',
                ver: '',
                verStatus: '',
                weight: ''
            },
            data: {
                total: 0,

                rows: []
            },
           
        };
    },

    methods: {
       
        clearSearch() {
            this.query = {
                tableTypeDesc: '',
                tableName: '',
                tableNameDesc: '',
                dataStatus: '',
                subDomain: '',
                subSysId: '',
                sysId: '',
                pageNum: 1,
                numPerPage: 10
            };
        },
        //删除表
        doDelete(item) {
            let postObj = { id: item.id, tableName: item.tableName };
            this.$msgbox({
                title: '删除',
                message: '确认删除此表吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let info = await deleteTable(postObj);
                        if (info.resCode === '0') {
                            this.$message.success('删除成功');
                            this.getList();
                        }
                        done();
                    } else {
                        done();
                    }
                }
            });
        },

        doAdd() {
            this.showAction = true;
            this.actionObj = {
                id: '',
                dataStatus: '',
                subDomain: '',
                subSysId: '',
                tableName: '',
                tableNameDesc: '',
                tableType: '',
                clnCyc: '',
                dataBaseName: '',
                dataBaseType: '',
                belongDb: '',
                syslevel: '',
                complexity: '',
                weight: '',
                isHotspot: '',
                dataDesc: '',
                processDesc: '',
                ascDesc: '',
                clnDesc: '',
                ver: '',
                status: '',
                sourceVer: '',
                verStatus: '',
                checkUser: '',
                taskSeqno: '',
                remark: '',
                createTime: '',
                createUser: '',
                lastUpdateTime: '',
                lastUpdateUser: '',
                sysId: ''
            };
            this.type = 'add';
        },
     
        //修改表，将表中的数据返显到表单中
        async doEdit(item) {
            //查询 tableColumnInfoList isCollection true
            let info = await queryTable({ tableName: item.tableName, ver: item.ver, isCollection: 'true' });
            if (info.resCode === '0') {
                this.actionObj = {
                    ascDesc: item.ascDesc,
                    belongDb: item.belongDb,
                    checkUser: item.checkUser,
                    clnCyc: item.clnCyc + '',
                    clnDesc: item.clnDesc,
                    complexity: item.complexity,
                    createTime: item.createTime,
                    createUser: item.createUser,
                    dataBaseName: item.dataBaseName,
                    dataBaseType: item.dataBaseType,
                    dataDesc: item.dataDesc,
                    dataStatus: item.dataStatus,
                    handleType: item.handleType,
                    id: item.id,
                    isHotspot: item.isHotspot,
                    lastUpdateTime: item.lastUpdateTime,
                    lastUpdateUser: item.lastUpdateUser,
                    level: item.level,
                    processDesc: item.processDesc,
                    remark: item.remark,
                    sourceVer: item.sourceVer,
                    status: item.status,
                    subDomain: item.subDomain,
                    subSysId: item.subSysId,
                    sysId: item.sysId,
                    tableColumnInfoList: info.rows[0].tableColumnInfoList,
                    tableIndexList: info.rows[0].tableIndexList,
                    tableName: item.tableName,
                    tableNameDesc: item.tableNameDesc,
                    tableType: item.tableType,
                    taskSeqno: item.taskSeqno,
                    userId: item.userId,
                    ver: item.ver,
                    verStatus: item.verStatus,
                    weight: item.weight
                };
                this.showAction = true;
                this.type = 'edit';
            }
        },
        doCloseAction(bol) {
            if (bol) {
                this.getList(1);
                this.showAction = false;
            } else {
                this.showAction = false;
            }
        },
        async getList(num) {
            let postObj = deleteKey(this.query);
            postObj.pageNum--;

            let info = await queryTable(postObj);
            if (info.resCode === '0') {
                this.data = {
                    total: info.total,
                    rows: info.rows || []
                };
            }
        },
        queryList() {
            this.query.pageNum = 1;
            this.getList(1);
        },
        handlePageChange(num) {
            this.query.pageNum = num;
            this.getList(num);
        },
        handleSizeChange(num) {
            this.query.pageNum = 1;
            this.query.numPerPage = num;
            this.getList(num);
        },
        async doPublist() {
            let goNext = this.checkOne();
            if (!goNext) return;
            let item = deepClone(this.chooseArray[0]);
            delete item.id;
            delete item.dataStatus;
            delete item.lastUpdateTime;
            delete item.lastUpdateUser;
            delete item.status;
            delete item.tableType;
            delete item.ver;

            this.$msgbox({
                title: '建表',
                message: '确认建表吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let info = await createTableInDatabase(item);
                        if (info.resCode === '0') {
                            this.$message.success('删除成功');
                            this.getList();
                        }
                        done();
                    } else {
                        done();
                    }
                }
            });
            console.log(item);
        }
    },
    mounted() {
        this.getList(1);
    }
};
</script>