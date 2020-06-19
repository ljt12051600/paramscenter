<template>
    <div>
        <system-table>

            <div slot="top">
                <el-form ref="form" :inline="true" label-width="100px">

                    <el-form-item label="接口编码">
                        <el-input style="width:200px;" v-model.trim="query.itfCode"></el-input>
                    </el-form-item>
                    <el-form-item label="接口名称">
                        <el-input style="width:200px;" v-model.trim="query.itfName"></el-input>
                    </el-form-item>
                    <system-component :required="false" :query="query" />

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
                    <el-table-column align="center" prop="subSysId" label="子系统">
                        <template slot-scope="scope">
                            {{subSysObj[scope.row.subSysId]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="itfCode" label="接口编码" />
                    <el-table-column align="center" prop="itfName" label="接口名称" />
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
        <!--添加+修改组件-->
        <div v-if="showAction">
            <edit-component @doClose="doCloseAction" :type="type" :showAction="showAction" :actionObj="actionObj"
                            :title="title" :check="check" />
        </div>
    </div>
</template>

<script>
    import { deleteKey } from '@/utils'
    import editComponent from "./edit.vue"
    import systemComponent from '@views/components/system.component.vue';
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import SYSTEM from '@views/mixin/system'
    import { queryTpsArOsItfList, deleteTpsArOsItf } from '@/api/frameManage';
    export default {
        components: { editComponent,systemComponent },
        mixins: [FRAMEMANAGE,SYSTEM],
        data() {
            return {
                title: "",
                check: "",
                type: "add",
                showId: false,
                query: {
                    itfCode: '',
                    itfName: '',
                    sysId: '',
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                showAction: false,
                actionObj: {
                    id: "",
                    sysId: "",
                    sysIdDesc: "",
                    subSysId: "",
                    subSysIdDesc: "",
                    itfCode: "",
                    itfName: "",
                    dispSeqno: "",
                    targetSubSys: "",
                    targetSubSysDesc: "",
                    commuType: "",
                    url: "",
                    port: "",
                    itfStandCode: "",
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
                    sitfCode: '',
                    itfName: '',
                    sysId: '',
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doDelete(item) {
                let postObj = { id: item.id };
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此系统吗？',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteTpsArOsItf(postObj);
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
                this.title = "新增操作";
                this.check = "确认添加";
            },
            doEdit(item) {
                this.showAction = true;
                this.type = "edit";
                this.title = "修改操作";
                this.check = "确认修改";
                this.actionObj = {
                    id: item.id,
                    sysId: item.sysId,
                    sysIdDesc: item.sysIdDesc,
                    itfCode: item.itfCode,
                    itfName: item.itfName,
                    dispSeqno: item.dispSeqno,
                    targetSubSys: item.targetSubSys,
                    targetSubSysDesc: item.targetSubSysDesc,
                    commuType: item.commuType,
                    url: item.url,
                    port: item.port,
                    itfStandCode: item.itfStandCode,
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

                let info = await queryTpsArOsItfList(postObj);
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