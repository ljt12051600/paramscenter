<template>
    <div>
        <system-table>

            <div slot="top">
                <el-form ref="form" :inline="true" label-width="100px">

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
                    <el-table-column align="center" prop="sysId" label="系统">
                        <template slot-scope="scope">
                            {{sysObj[scope.row.sysId]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="subSysId" label="子系统">
                        <template slot-scope="scope">
                            {{subSysObj[scope.row.subSysId]}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="displaySeqno" label="子域顺序号" />
                    <el-table-column align="center" prop="subDomainValue" label="子域码" />
                    <el-table-column align="center" prop="subDomainName" label="子域名称" />
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
    import systemComponent from '@views/components/system.component.vue';
    import { deleteKey } from '@/utils'
    import editComponent from "./edit.vue"
    import SYSTEM from '@views/mixin/system'
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import { queryTp3005List, deleteTp3005 } from '@/api/frameManage';
    export default {
        components: { systemComponent ,editComponent },
        mixins: [SYSTEM,FRAMEMANAGE],
        data() {
            return {
                type: "add",
                showId: false,
                query: {
                    sysId: '',
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10
                },
                showAction: false,
                actionObj: {
                    id: "",
                    displaySeqno: "",
                    subDomainValue: "",
                    subDomainName: "",
                    sysId: "",
                    subSysId: "",
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
                    subSysId: '',
                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doDelete(item) {
                let postObj = { id: item.id, subDomainValue: item.subDomainValue };
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此系统吗？',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            let info = await deleteTp3005(postObj);
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
                    sysId: "",
                    subSysId: "",
                };
                this.type = "add";
            },
            doEdit(item) {
                this.showAction = true;
                this.type = "edit";
                this.actionObj = {
                    id: item.id,
                    sysId: item.sysId,
                    subSysId: item.subSysId,
                    displaySeqno: item.displaySeqno,
                    subDomainValue: item.subDomainValue,
                    subDomainName: item.subDomainName,
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

                let info = await queryTp3005List(postObj);
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