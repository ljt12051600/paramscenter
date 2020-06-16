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
                    <el-table-column align="center" prop="imptntLevel" label="系统重要等级" />
                    <el-table-column align="center" prop="safeLevel" label="安全保护等级" />
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
        <div v-if="showDialog">
            <edit-component @doClose="doCloseEdit" :type="type" :showDialog="showDialog" :actionObj="actionObj"/>
         
        </div>
    </div>
</template>

<script>
    import { deleteKey } from '@/utils'
    import editComponent from "./edit.vue"
    import { queryTp3003List, createTp3003, updateTp3003, deleteTp3003, queryOptionCodeNoPage } from '@/api/frameManage';
    export default {
        components: {editComponent},
        data() {
            return {
                type: "add",
                showId: false,
                imptntLevelObj: [],
                safeLevelObj: [],
                query: {
                    sysId: '',
                    sysName: '',
                    displaySeqno: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                queryImpLevel: {
                    optionCode: "imptntLevel",
                },
                querySafeLevel: {
                    optionCode: "safeLevel",
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
                showDialog: false,
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
                let postObj = { id: item.id,sysId: item.sysId };
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
                this.showDialog = true;
                this.actionObj = {};
                this.type = "add";
                this.title = "新增操作";
            },
            doEdit(item) {
                this.showDialog = true;
                this.type = "edit";
                this.title = "修改操作";
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
            doCloseEdit(bol) {
                if (bol) {
                    console.log("this.actionObj.imptntLevel: "+this.actionObj.imptntLevel);
                    console.log("actionObj: " + this.actionObj)
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            this.actionObj.displaySeqno += "";
                            if(this.type == "add"){
                                let info = await createTp3003(this.actionObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                }
                            }
                            if(this.type == "edit"){
                                let info = await updateTp3003(this.actionObj);
                                console.log("info.resCode: "+info.resCode)
                                this.$message.success('修改成功');
                            }
                            
                            this.getList();
                            this.showDialog = false;
                        }
                    });
                } else {
                    console.log("取消")
                    this.showDialog = false;
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
            async impLevelList() {
                let postObj = deleteKey(this.queryImpLevel);
                let info = await queryOptionCodeNoPage(postObj);
                if (info.resCode === "0") {
                    this.imptntLevelObj = info.rows
                }

            },
            async safeLevelList() {
                let postObj = deleteKey(this.querySafeLevel);
                let info = await queryOptionCodeNoPage(postObj);
                if (info.resCode === "0") {
                    this.safeLevelObj = info.rows
                }
            },
        },
        mounted() {
            this.getList();
            this.impLevelList();
            this.safeLevelList();

        }
    };
</script>