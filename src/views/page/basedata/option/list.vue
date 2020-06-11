<template>
    <div>
        <system-table>
            <div slot="top">
                <el-form ref="form" :inline="true" label-width="120px">
                    <system-component :required="false" :query="query" />
                    <el-form-item label="发布状态">
                        <el-select
                            style="width:200px;"
                            v-model="query.issueStatus"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option label="未发布" value="-1"></el-option>
                            <el-option label="已发布" value="9"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据标准">
                        <el-select
                      
                            style="width:200px;"
                            v-model="query.dataStand"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in dataStandList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选项代码">
                        <el-input style="width:200px;" v-model.trim="query.optionCode"></el-input>
                    </el-form-item>
                    <el-form-item label="选项名称">
                        <el-input style="width:200px;" v-model.trim="query.optionName"></el-input>
                    </el-form-item>
                    <el-form-item style="width:320px" label>
                        <el-checkbox style="margin-left:50px" v-model="query.isDspGroup">显示组别</el-checkbox>
                        <el-checkbox v-model="query.isDspOptionValue">显示选项值</el-checkbox>
                    </el-form-item>
                    <el-form-item v-if="query.isDspGroup" label="选项组别">
                        <el-input style="width:200px;" v-model.trim="query.optionGroup"></el-input>
                    </el-form-item>
                    <el-form-item v-if="query.isDspGroup" label="组别名称">
                        <el-input style="width:200px;" v-model.trim="query.groupName"></el-input>
                    </el-form-item>
                    <el-form-item v-if="query.isDspOptionValue" label="选项值">
                        <el-input style="width:200px;" v-model.trim="query.optionValue"></el-input>
                    </el-form-item>
                    <el-form-item v-if="query.isDspOptionValue" label="选项描述：">
                        <el-input style="width:200px;" v-model.trim="query.optionDesc"></el-input>
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
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" prop="userSex" label="子系统">
                        <template slot-scope="scope">{{subSysObj[scope.row.subSysId]}}</template>
                    </el-table-column>
                    <el-table-column align="center" prop="optionCode" label="选项代码" />
                    <el-table-column align="center" prop="optionName" label="选项名称" />
                    <el-table-column align="center" prop="optionValue" label="选项值" />
                    <el-table-column align="center" prop="optionDesc" label="选项描述" />
                    <el-table-column align="center" prop="optionGroup" label="选项组别" />
                    <el-table-column align="center" prop="groupName" label="组别名称" />
                    <el-table-column label="操作" width="300" align="center" fixed="right">
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
        <div v-if="showDialog">
            <edit-component @doClose="closeAdd" :type="type" :showDialog="showDialog" :actionObj="actionObj"></edit-component>
        </div>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import systemComponent from '@views/components/system.component.vue';
import editComponent from "./edit.vue"

// import Sortable from "sortablejs";
import MIXIN from '@views/mixin/button';
import SYSTEM from '@views/mixin/system';
import { queryOptionDetailList } from '@/api/basedata';
import { deleteSysButtons } from '@/api/system';
export default {
    mixins: [MIXIN, SYSTEM],
    components: { systemComponent ,editComponent},
    data() {
        return {
            query: {
                sysId: '',
                subSysId: '',
                pageNum: 1,
                numPerPage: 10,
                groupName: '',
                optionGroup: '',
                optionValue: '',
                optionDesc: ''
            },
            showDialog: false,
            actionObj:{},
            type: 'add',
            data: {
                total: 20,
                rows: []
            }
        };
    },
    methods: {
        clearSearch() {
            this.query = {
                sysId: '',
                subSysId: '',
                pageNum: 1,
                numPerPage: 10,
                groupName: '',
                optionGroup: '',
                optionValue: '',
                optionDesc: ''
            };
        },
        doDelete(item) {
            let postObj = { id: item.id };
            this.$msgbox({
                title: '确认删除此选项代码吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let info = await deleteSysButtons(postObj);
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
            this.type = 'add';
            this.actionObj={
                sysId:"",
                subSysId:"",
            }
        },
        closeAdd(bol) {
            if (bol) {
                if (this.type == 'add') this.getList();
                else if (this.type == 'edit') this.queryList();
            }
            this.showDialog = false;
        },

        async getList(num) {
            let postObj = deleteKey(this.query);
            postObj.isDspGroup = postObj.isDspGroup ? 1 : 0;
            postObj.isDspOptionValue = postObj.isDspOptionValue ? 1 : 0;

            postObj.pageNum--;

            let info = await queryOptionDetailList(postObj);
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
    mounted() {},
    watch: {
        'query.isDspGroup'() {
            this.query.optionGroup = '';
            this.query.groupName = '';
        },
        'query.isDspOptionValue'() {
            this.query.optionValue = '';
            this.query.optionDesc = '';
        }
    }
};
</script>
<style>
.sortable-ghost {
    background: red;
}
</style>