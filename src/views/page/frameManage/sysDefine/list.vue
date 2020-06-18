<template>
    <div>
        <system-table>

            <div slot="top">
                <el-form ref="form" :inline="true" label-width="100px">

                    <el-form-item label="系统标识">
                        <el-input style="width:200px;" v-model.trim="query.sysId"></el-input>
                    </el-form-item>
                    <el-form-item label="系统名称">
                        <el-input style="width:200px;" v-model.trim="query.sysName"></el-input>
                    </el-form-item>
                    <el-form-item label="系统顺序号">
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
                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" prop="id" label="主键" v-if="showId" />
                    <el-table-column align="center" prop="sysId" label="系统标识" />
                    <el-table-column align="center" prop="sysName" label="系统名称" />
                    <el-table-column align="center" prop="displaySeqno" label="系统顺序号" />
                    <el-table-column align="center" prop="businessDomain" label="归属业务领域" />
                    <el-table-column align="center" prop="sysDesc" label="系统范围概述" />
                    <el-table-column align="center" prop="imptntLevel" label="系统重要等级">
                        <template slot-scope="scope">
                            {{imptntLevelObj[scope.row.imptntLevel]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="safeLevel" label="安全保护等级">
                        <template slot-scope="scope">
                            {{safeLevelObj[scope.row.safeLevel]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" fixed="right" width="160px">
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
    import { deleteKey } from '@/utils'
    import editComponent from "./edit.vue"
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import { queryTp3003List, createTp3003, updateTp3003, deleteTp3003 } from '@/api/frameManage';
    export default {
        components: { editComponent },
        mixins: [FRAMEMANAGE],
        data() {
            return {
                type: "add",
                showId: false,
                query: {
                    sysId: '',
                    sysName: '',
                    displaySeqno: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                rules: {
                    sysId: [
                        { required: true, message: '请输入系统标识', trigger: 'blur' }
                    ],
                    sysName: [
                        { required: true, message: '请输入系统名称', trigger: 'blur' }
                    ],
                    displaySeqno: [
                        { required: true, message: '请输入系统顺序号', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],

                },
                showAction: false,
                actionObj: {
                    id: "",
                    businessDomain: "",
                    displaySeqno: "",
                    imptntLevel: "",
                    safeLevel: "",
                    sysDesc: "",
                    sysId: "",
                    sysName: "",
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
                    sysId: '',
                    sysName: '',
                    displaySeqno: '',
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
                            let info = await deleteTp3003(postObj);
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
               // this.title = "新增操作";
            },
            doEdit(item) {
                this.showAction = true;
                this.type = "edit";
                //this.title = "修改操作";
                this.actionObj = {
                    id: item.id,
                    sysId: item.sysId,
                    sysName: item.sysName,
                    displaySeqno: item.displaySeqno,
                    safeLevel: item.safeLevel,
                    businessDomain: item.businessDomain,
                    sysDesc: item.sysDesc,
                    imptntLevel: item.imptntLevel,

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

                let info = await queryTp3003List(postObj);
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