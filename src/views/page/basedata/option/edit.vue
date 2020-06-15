<template>
    <div>
        <el-dialog style="max-height：400px" :visible="showDialog">
            <el-form ref="form" :inline="true" label-width="140px">
                <system-component :disabled="type=='add'?'':'12'" :required="true" :query="dialogObj" />

                <el-form-item required label="选项代码">
                    <el-input :disabled="type!='add'" style="width:160px;" v-model.trim="dialogObj.optionCode">
                    </el-input>
                    <el-button type="primary" @click="queryUnitDataDialog" v-show="type=='add'">选择</el-button>
                </el-form-item>
                <el-form-item required label="选项名称">
                    <el-input style="width:220px;" v-model.trim="dialogObj.optionName"></el-input>
                </el-form-item>
                <el-form-item required label="数据标准">
                    <el-select style="width:220px;" v-model="dialogObj.dataStand" clearable placeholder="请选择">
                        <el-option :key="index+'cc'" v-for="(item,index) in dataStandList"
                            :label="item.value+'-'+item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input style="width:220px;" v-model.trim="dialogObj.optionGroup"></el-input>
                </el-form-item>
            </el-form>
            <el-card>
                <div class="base">
                <el-button type="primary" @click="addBaseList">新增</el-button>
                <el-table border ref="table" align="center" :data="baseList" style="width: 100%;">

                    <el-table-column align="center" prop="optionValue" label="选项值">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.optionValue"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="optionDesc" label="选项描述">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.optionDesc"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="anotherName" label="别名">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.anotherName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="anotherName" label="别名">
                      
                    </el-table-column>


                </el-table>
            </div>

            </el-card>

            <div slot="footer" class="dialog-footer">
                <el-button @click="doClose(false)">取 消</el-button>
                <el-button type="primary" @click="doClose(true)">确认添加</el-button>
            </div>
        </el-dialog>
        <el-drawer :with-header="false" title="我是外面的 Drawer" :visible.sync="drawer" size="50%">
            <div style="margin-top:80px">
                <el-form ref="form" :inline="true" label-width="140px">
                    <el-form-item label="选项代码">
                        <el-input style="width:200px;" v-model.trim="query.unitDataCode"></el-input>
                    </el-form-item>
                    <el-form-item label="选项描述">
                        <el-input style="width:200px;" v-model.trim="query.unitDataDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="queryList">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" prop="unitDataCode" label="元数据代码" />
                    <el-table-column align="center" prop="unitDataDesc" label="元数据描述" />




                    <el-table-column label="操作" width="280" align="center" fixed="right">
                        <template slot-scope="scope">

                            <el-button @click="doChooseUnitDate(scope.row,scope.index)" type="primary">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="data.total" class="pagination">
                    <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
                        :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
                        @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
                </div>


            </div>
        </el-drawer>
    </div>
</template>

<script>
    import { deleteKey, deepClone } from '@/utils';
    import SYSTEM from '@views/mixin/system';
    import { queryUnitDataListForSysId } from '@/api/basedata';
    import Sortable from "sortablejs";


    import systemComponent from '@views/components/system.component.vue';
    export default {
        components: { systemComponent },
        mixins: [SYSTEM],
        props: {
            showDialog: {
                type: Boolean
            },

            type: {
                type: String,
                default: 'add'
            },
            actionObj: {
                type: Object
            },

        },
        data() {
            return {
                dialogObj: {
                    sysId: '',
                    subSysId: '',
                    unitDataDesc: "",
                    unitDataCode: "",

                },
                drawer: false,
                query: {
                    sysId: "",
                    subSysId: "",
                    pageNum: 1,
                    numPerPage: 10,
                },
                baseList: [],
                data: {
                    total: 0,
                    rows: []
                }
            };
        },
        methods: {
            doClose(bol) {
                this.$emit('doClose', bol);
            },


            addBaseList() {
                this.baseList.push({
                    id: 1,
                })
            },

            queryUnitDataDialog() {
                if (!this.dialogObj.subSysId) {
                    return this.$message.error("请选择子系统")
                }
                this.queryList();
                this.drawer = true;


            },//获取元数据代码
            doChooseUnitDate(item) {
                this.dialogObj.optionCode = item.unitDataCode;
                this.dialogObj.optionName = item.unitDataDesc;
                this.drawer = false;

            },
            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.sysId = this.dialogObj.sysId;
                postObj.subSysId = this.dialogObj.subSysId;
                postObj.pageNum--;


                let info = await queryUnitDataListForSysId(postObj);
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
            },//获取元数据代码结束
        },
        mounted() {

            if (this.type == 'add') {
                this.dialogObj = deepClone(this.actionObj);
            };
            const tbody = document.querySelector(".base .el-table__body-wrapper tbody");
            Sortable.create(tbody, {
                ghostClass: 'sortable-ghost',
                onEnd: ({ newIndex, oldIndex }) => {
                    alert(1)
                    let newArr = deepClone(this.baseList);
                    const currRow = newArr.splice(oldIndex, 1)[0]
                    newArr.splice(newIndex, 0, currRow)
                    // 重新排序完的表格数据
                    this.baseList= []
                    this.$nextTick(function () {
                        this.baseList = newArr
                    })

                }
            })
        }
    };
</script>