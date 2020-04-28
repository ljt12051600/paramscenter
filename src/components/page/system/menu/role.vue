<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!--工具栏-->
                <div class="head-container">
                    <el-card>
                        <el-form ref="form" :inline="true" label-width="80px">

                            <el-form-item label="用户id">
                                <el-input style="width:200px;" v-model.trim="query.roleId"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input style="width:200px;" v-model.trim="query.roleName"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input style="width:200px;" v-model.trim="query.roleDesc"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="header-search">
                            <el-button @click="queryList" type="primary">查询</el-button>
                            <el-button @click="clearSearch" type="warning">清除</el-button>
                        </div>
                    </el-card>
                    <!-- <crudOperation show="" :permission="permission" /> -->
                </div>
                <div class="header-button">
                    <el-button @click="doAdd" type="primary">添加</el-button>
                </div>
                <!--表单渲染-->

                <!--表格渲染-->
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    <el-table-column align="center" type="index" label="序号" width="50"/>
                    <el-table-column align="center" prop="roleId" label="角色ID" />
                    <el-table-column align="center" prop="roleName" label="角色名" />
                    <el-table-column align="center" prop="roleDesc" label="角色描述" />

                    <el-table-column label="操作" width="300" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button
                                @click="doShowPeople(scope.row,scope.index)"
                                type="warning"
                            >查看用户</el-button>
                            <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--分页组件-->
                <div class="pagination">
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
            </el-col>
        </el-row>
        <div v-if="showAdd">
            <el-dialog title="添加角色" :visible="showAdd" width="800px" :show-close="false">
                <el-form
                    ref="formAdd"
                    :model="addObj"
                    :rules="rules"
                    :inline="true"
                    label-width="80px"
                >
                    <el-form-item label="角色id" prop="roleId">
                        <el-input style="width:200px;" v-model.trim="addObj.roleId"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名" prop="roleName">
                        <el-input style="width:200px;" v-model.trim="addObj.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input style="width:200px;" v-model.trim="addObj.roleDesc"></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseAdd(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseAdd(true)">确认添加</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-if="showEdit">
            <el-dialog title="编辑角色" :visible="showEdit" width="800px" :show-close="false">
                <el-form
                    ref="formEdit"
                    :model="editObj"
                    :rules="rules"
                    :inline="true"
                    label-width="80px"
                >
                    <el-form-item label="角色id" prop="roleId">
                        <el-input style="width:200px;" v-model.trim="editObj.roleId"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名" prop="roleName">
                        <el-input style="width:200px;" v-model.trim="editObj.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <el-input style="width:200px;" v-model.trim="editObj.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseEdit(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseEdit(true)">确认修改</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-if="showPeople">
            <el-dialog title="角色所对应用户" :visible="showPeople" width="800px" :show-close="false">
                <role-user :item="selectRole"></role-user>
                <div slot="footer" class="dialog-footer">
                   
                    <el-button type="primary" @click="doClosePeople(true)">确认</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { deleteKey } from '@/utils';
import roleUser from './role_user';

import { queryRoleList, deleteRole, createRole, updateRole } from '@/api/system';
export default {
    components: { roleUser },
    data() {
        return {
            query: {
                roleId: '',
                roleName: '',
                roleDesc: '',
                pageNum: 1,
                numPerPage: 10
            },
            sexDic: {
                '1': '男',
                '0': '女'
            },

            showAdd: false,
            addObj: {
                buttonId: '',
                buttonName: '',
                popId: ''
            },
            showEdit: false,
            editObj: {
                buttonId: '',
                buttonName: '',
                popId: ''
            },
            selectRole: {},
            showPeople: false,

            data: {
                total: 0,

                rows: []
            },
            rules: {
                roleId: [{ required: true, message: '请输入角色ID', trigger: 'blur' }],
                roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }
        };
    },
    methods: {
        clearSearch() {
            this.query = {
                roleId: '',
                roleName: '',
                roleDesc: '',
                userPhoneSearch: '',
                userIdnoSearch: '',
                userSexSearch: '',
                pageNum: 1,
                numPerPage: 10
            };
        },
        doDelete(item) {
            let postObj = { id: item.id };
            this.$msgbox({
                title: '删除',
                message: '确认删除此该角色吗？',

                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let info = await deleteRole(postObj);
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
            this.showAdd = true;
            this.addObj = {};
        },
        doCloseAdd(bol) {
            if (bol) {
                this.$refs['formAdd'].validate(async valid => {
                    if (valid) {
                        let info = await createRole(this.addObj);
                        if (info.resCode === '0') {
                            this.$message.success('添加成功');
                            this.queryList();
                            this.showAdd = false;
                        }
                    }
                });
            } else {
                this.showAdd = false;
            }
        },

        doEdit(item) {
            this.showEdit = true;
            this.editObj = {
                id: item.id,
                 roleId: item.roleId,
                roleName: item.roleName,
                roleDesc: item.roleDesc,
               
            };
        },
        doCloseEdit(bol) {
            if (bol) {
                this.$refs['formEdit'].validate(async valid => {
                    if (valid) {
                        let info = await updateRole(this.editObj);
                        if (info.resCode === '0') {
                            this.$message.success('修改成功');
                            this.getList();
                            this.showEdit = false;
                        }
                    }
                });
            } else {
                this.showEdit = false;
            }
        },
        async doShowPeople(item) {
            this.showPeople = true;
            this.selectRole = item;
            console.log(item);
        },
        async doClosePeople(item) {
            this.showPeople = false;
            
        },
        async getList(num) {
            let postObj = deleteKey(this.query);
            postObj.pageNum--;

            let info = await queryRoleList(postObj);
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
        }
    },
    mounted() {
        this.getList();
    }
};
</script>