<template>
    <el-dialog :title="title" :visible="showTableField" width="800px" :show-close="false">
        <el-form ref="formTableField" :inline="true" :model="dialogObj" label-width="140px">
            <el-form-item label="表名">
                <el-input style="width:200px;" required disabled v-model.trim="dialogObj.tableName"></el-input>
            </el-form-item>
            <el-form-item label="字段名">
                <el-input style="width:200px;" disabled v-model.trim="dialogObj.fieldName"></el-input>
            </el-form-item>
            <el-form-item label="中文名称">
                <el-input style="width:200px;" disabled v-model.trim="dialogObj.fieldDesc"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input style="width:200px;" disabled v-model.trim="dialogObj.type"></el-input>
            </el-form-item>
            <el-form-item label="长度">
                <el-input style="width:200px;" disabled v-model.trim="dialogObj.length"></el-input>
            </el-form-item>
            <el-form-item label="小位数">
                <el-input style="width:200px;" disabled v-model.trim="dialogObj.point"></el-input>
            </el-form-item>
            <el-form-item label="主键类型">
                <el-select style="width:200px;" v-model="dialogObj.fieldPrimy" clearable placeholder="请选择">
                    <el-option label="0-非主键" value="0"></el-option>
                    <el-option label="1-自增主键" value="1"></el-option>
                    <el-option label="2-普通主键" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为空">
                <el-select style="width:200px;" v-model="dialogObj.fieldNull" clearable placeholder="请选择">
                    <el-option label="1-是" value="1"></el-option>
                    <el-option label="0-否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字段默认值">
                <el-input style="width:200px;" v-model.trim="dialogObj.fieldDef"></el-input>
            </el-form-item>
            <el-form-item label="处理描述">
                <el-input style="width:200px;" v-model.trim="dialogObj.processDesc"></el-input>
            </el-form-item>
            <el-form-item label="     ">
                <el-input style="width:200px;" v-model.trim="query.unitDataCode"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input style="width:200px;" v-model.trim="query.unitDataDesc"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button @click="queryList" type="primary">查询</el-button>
                <el-button @click="clearSearch" type="warning">清除</el-button>
            </el-form-item>
        </el-form>
        <el-table border height="180" highlight-current-row ref="table" @row-click="handleCurrentChange" align="center"
            :data="data.rows">
            <el-table-column align="center" type="index" label="序号" width="50" />
            <el-table-column align="center" prop="unitDataCode" label="元数据代码" />
            <el-table-column align="center" prop="unitDataDesc" label="元数据描述" />
            <el-table-column align="center" prop="type" label="类型" />
            <el-table-column align="center" prop="length" label="长度" />
            <el-table-column align="center" prop="point" label="小数" />
            <el-table-column align="center" prop="datePattern" label="日期格式" />
            <el-table-column align="center" prop="subSysId" label="子系统">
                <template slot-scope="scope">
                    {{subSysObj[scope.row.subSysId]}}
                </template>
            </el-table-column>
        </el-table>
        <div v-if="data.total" class="pagination">
            <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
                :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
                @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="doCloseTableFieldAction(false)">取 消</el-button>
            <el-button type="primary" @click="doCloseTableFieldAction(true)">添 加</el-button>
        </div>
    </el-dialog>

</template>
<script>
    import SYSTEM from '@views/mixin/system'
    import { deleteKey, deepClone } from '@/utils'
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import { createTp3004, updateTp3004 } from '@/api/frameManage';
    import { queryUnitDataListForSysId } from '@/api/basedata';
    export default {
        props: {
            showTableField: {
                type: Boolean
            },
            type: {
                type: String,
                default: 'add'
            },
            dialogObj: {
                type: Object
            },

        },
        mixins: [SYSTEM, FRAMEMANAGE],
        data() {
            return {
                check: '',
                title: '',
                tableColumnInfoList: [],
                tableIndexList: [],
                query: {
                    sysId: "",
                    subSysId: "",
                    pageNum: 1,
                    numPerPage: 10
                },
                data: {
                    total: 0,

                    rows: []
                },

                rules: {
                    tableName: [
                        { required: true, message: '请选择表名', trigger: 'blur' }
                    ],
                    fieldName: [
                        { required: true, message: '请选择字段', trigger: 'blur' }
                    ],
                    fieldDesc: [
                        { required: true, message: '请输入中文名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请输入类型', trigger: 'blur' }
                    ],
                    fieldPrimy: [
                        { required: true, message: '请选择主键类型', trigger: 'change' }
                    ],
                    fieldNull: [
                        { required: true, message: '请选择是否为空', trigger: 'change' }
                    ],

                },
            };
        },

        methods: {
            setCurrent(row) {
                this.$refs.table.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.$set(this.dialogObj, "fieldName", val.unitDataCode);
                this.dialogObj.fieldDesc = val.unitDataDesc;
                this.dialogObj.type = val.type;
                this.dialogObj.length = val.length;
                this.dialogObj.point = val.point;
                this.currentRow = val;



            },
            clearSearch() {
                this.query = {
                    unitDataCode: "",
                    unitDataDesc: "",
                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doCloseTableFieldAction(bol) {
                if (bol) {
                    this.$refs['formTableField'].validate(async valid => {
                        if (valid) {
                            if (this.type == "add") {
                                //新增，将数据填写到tableColumnInfoList中，然后在edit页中展现所有新增的字段

                                if (this.tableColumnInfoList.length > 0) {

                                    this.tableColumnInfoList.push(this.dialogObj);

                                    console.log(this.tableColumnInfoList, 11111111);
                                } else {

                                    this.tableColumnInfoList = [this.dialogObj];
                                    console.log(this.tableColumnInfoList, 222222222);
                                }

                            }
                            if (this.type == "edit") {



                            }
                        }
                    });
                } else {
                    this.$emit("doClose", false);

                }
            },
            async getList(num) {
                let postObj = deleteKey(this.query);
                postObj.sysId = this.dialogObj.sysId;
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
            },

        },
        mounted() {


            this.getList(1);
            // if(this.type == "add"){
            //     this.title = "新增操作";
            //     this.check = "确认添加";
            // }
            // if(this.type == "edit"){
            //     this.title = "修改操作";
            //     this.check = "确认修改";
            // }
        }
    };
</script>