<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" :inline="true" label-width="100px">
                    <el-form-item label="系统">
                        <el-select v-model="query.sysId" filterable clearable placeholder="请选择" style="width:200px;">
                            <el-option v-for="item in sysList" :key="item.sysId" :label="item.sysId + '-' +item.sysName"
                                :value="item.sysId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="子系统标识">
                        <el-input style="width:200px;" v-model.trim="query.subSysId"></el-input>
                    </el-form-item>
                    <el-form-item label="子系统名称">
                        <el-input style="width:200px;" v-model.trim="query.subSysName"></el-input>
                    </el-form-item>
                    <el-form-item label="子系统顺序号">
                        <el-input style="width:200px;" v-model.trim="query.displaySeqno"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="search">
                <el-button @click="queryList" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </div>

            <div slot="action">
                <el-button @click="doAdd" type="primary">添加</el-button>
            </div>
            <div slot="body">
                <!--表单渲染-->

                <!--表格渲染-->
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">

                    <el-table-column align="center" prop="id" label="主键" v-if="showId" />
                    <el-table-column align="center" prop="sysId" label="系统" width="100px">
                        <template slot-scope="scope">
                            {{sysObj[scope.row.sysId]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="subSysId" label="子系统" width="60px" />
                    <el-table-column align="center" prop="subSysName" label="名称" width="110px" />
                    <el-table-column align="center" prop="displaySeqno" label="序号" width="50px" />
                    <el-table-column align="center" prop="deptCode" label="业务主管部门" width="100px" />
                    <el-table-column align="center" prop="db" label="数据库" width="70px">
                        <template slot-scope="scope">
                            {{dbObj[scope.row.db]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="isTfs" label="是否7*24" width="70px">
                        <template slot-scope="scope">
                            {{isTfsObj[scope.row.isTfs]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="imptntLevel" label="重要等级" width="70px">
                        <template slot-scope="scope">
                            {{imptntLevelObj[scope.row.imptntLevel]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="safeLevel" label="安全保护等级" width="100px">
                        <template slot-scope="scope">
                            {{safeLevelObj[scope.row.safeLevel]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="pipStatus" label="投产状态" width="70px">
                        <template slot-scope="scope">
                            {{pipStatusObj[scope.row.pipStatus]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="pipTime" label="投产时间" width="90px" />
                    <el-table-column align="center" prop="subSysDesc" label="范围概述" width="70px" />
                    <el-table-column label="操作" align="center" fixed="right" width="150px">
                        <template slot-scope="scope">
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页组件-->
                <div v-if="data.total" class="pagination">
                    <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
                        :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
                        @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
                </div>
            </div>


        </system-table>

        <div v-if="showAction">
            <edit-component @doClose="doCloseAction" :type="type" :showAction="showAction" :actionObj="actionObj" />
        </div>
    </div>
</template>

<script>
    import { deleteKey } from '@/utils';
    import SYSTEM from '@views/mixin/system'
    import MIXIN from "@views/mixin/button"
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import editComponent from "./edit.vue"
    import { queryTp3004List, createTp3004, updateTp3004, deleteTp3004 } from '@/api/frameManage';
    export default {
        components: { editComponent },
        mixins: [SYSTEM, FRAMEMANAGE,MIXIN],
        data() {
            return {
                //check: '',
                showId: false,
                query: {
                    sysId: '',
                    subSysId: '',
                    subSysName: '',
                    displaySeqno: '',
                    tranCodePrefix: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                
                showAction: false,
                actionObj: {
                    id: "",
                    displaySeqno: "",
                    imptntLevel: "",
                    safeLevel: "",
                    subSysDesc: "",
                    subSysId: "",
                    subSysName: "",
                },
                type: "add",
                data: {
                    total: 0,

                    rows: []
                },
            };
        },

        methods: {
            clearSearch() {
                this.query = {
                    sysId: '',
                    subSysId: '',
                    subSysName: '',
                    displaySeqno: '',
                    tranCodePrefix: '',
                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doDelete(item) {
                let postObj = { id: item.id, sysId: item.sysId };
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此系统吗？',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteTp3004(postObj);
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
                this.actionObj = {};
                this.type = "add";
            },
            doEdit(item) {
                this.showAction = true;
                this.type = "edit";
                this.actionObj = {
                    id: item.id,
                    sysId: item.sysId,
                    subSysId: item.subSysId,
                    subSysName: item.subSysName,
                    displaySeqno: item.displaySeqno,
                    deptCode: item.deptCode,
                    isTfs: item.isTfs,
                    db: item.db,
                    safeLevel: item.safeLevel,
                    imptntLevel: item.imptntLevel,
                    pipStatus: item.pipStatus,
                    pipTime: item.pipTime,
                    subSysDesc: item.subSysDesc,
                };

            },
            doCloseAction(bol) {
                if (bol) {
                    this.getList();
                    this.showAction = false;
                } else {
                    this.showAction = false;
                }
            },

            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.pageNum--;

                let info = await queryTp3004List(postObj);
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

        },
        mounted() {
            this.getList();

        }
    };
</script>