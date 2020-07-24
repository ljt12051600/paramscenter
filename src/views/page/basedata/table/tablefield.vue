<template>
    <el-dialog :title="title" :visible="showTableField" width="800px" :show-close="false">
        <el-form ref="formTableField" :inline="true" :rules="rules"  :model="tableObj" label-width="140px">
            <el-form-item label="表名" required>
                <el-input style="width:200px;" required disabled v-model.trim="dialogObj.tableName"></el-input>
            </el-form-item>
            <el-form-item label="字段名" prop="fieldName">
                <el-input style="width:200px;" disabled v-model.trim="tableObj.fieldName"></el-input>
            </el-form-item>
            <el-form-item label="中文名称" prop="fieldDesc">
                <el-input style="width:200px;" disabled v-model.trim="tableObj.fieldDesc"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input style="width:200px;" disabled v-model.trim="tableObj.type"></el-input>
            </el-form-item>
            <el-form-item label="长度">
                <el-input style="width:200px;" disabled v-model.trim="tableObj.length"></el-input>
            </el-form-item>
            <el-form-item label="小位数">
                <el-input style="width:200px;" disabled v-model.trim="tableObj.point"></el-input>
            </el-form-item>
            <el-form-item label="主键类型" prop="fieldPrimy">
                <el-select style="width:200px;" v-model="tableObj.fieldPrimy" clearable placeholder="请选择">
                    <el-option label="0-非主键" value="0"></el-option>
                    <el-option label="1-自增主键" value="1"></el-option>
                    <el-option label="2-普通主键" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为空" prop="fieldNull">
                <el-select style="width:200px;" v-model="tableObj.fieldNull" clearable placeholder="请选择">
                    <el-option label="1-是" value="1"></el-option>
                    <el-option label="0-否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字段默认值">
                <el-input style="width:200px;" v-model.trim="tableObj.fieldDef"></el-input>
            </el-form-item>
            <el-form-item label="处理描述">
                <el-input style="width:200px;" v-model.trim="tableObj.processDesc"></el-input>
            </el-form-item>
            <el-form-item label="     ">
                <el-input style="width:200px;" v-model.trim="query.unitDataCode" placeholder="请输入元数据代码"> </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input style="width:200px;" v-model.trim="query.unitDataDesc" placeholder="请输入中文名称"></el-input>
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
            <el-button @click="doCloseTableFieldAction(false)">关 闭</el-button>
            <el-button type="primary" @click="doCloseTableFieldAction(true)">添 加</el-button>
        </div>
    </el-dialog>

</template>
<script>
    import SYSTEM from '@views/mixin/system'
    import { deleteKey, deepClone } from '@/utils'
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import { queryUnitDataListForSysId } from '@/api/basedata';
    export default {
        props: {
            showTableField: {
                type: Boolean
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
                query: {
                    sysId: "",
                    subSysId: "",
                    pageNum: 1,
                    numPerPage: 10
                },
                tableObj:{},
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
                this.$set(this.tableObj, "fieldName", val.unitDataCode);
                this.tableObj.fieldDesc = val.unitDataDesc;
                this.tableObj.type = val.type;
                this.tableObj.length = val.length;
                this.tableObj.point = val.point;
                this.currentRow = val;
                this.$refs['formTableField'].clearValidate()
            },
            clearSearch() {  //清空查询字段
                this.query = {
                    unitDataCode: "",
                    unitDataDesc: "",
                    pageNum: 1,
                    numPerPage: 10
                };
            },
            doCloseTableFieldAction(bol) {  //

                if (bol) {
                    this.$refs['formTableField'].validate(async valid => {
                        if (valid) {
                                    //如tableColumnInfoList不为[]，
                                if (this.dialogObj.tableColumnInfoList.length > 0) {
                                    //则为tableColumnInfoList 数组添加值
                                    this.dialogObj.tableColumnInfoList.push(deepClone(this.tableObj));

                                } else {
                                    //如tableColumnInfoList为[]，则为tableColumnInfoList 赋初值
                                    this.dialogObj.tableColumnInfoList = [deepClone(this.tableObj)];

                                }//将tableColumnInfoList 中的数组值 传递给父组件
                                this.$emit("doTableColumnInfoList", this.dialogObj.tableColumnInfoList);
                                this.tableObj.fieldName = "";
                                this.tableObj.fieldDesc = "";
                                this.tableObj.type = "";
                                this.tableObj.length = "";
                                this.tableObj.point = "";
                                this.tableObj.fieldPrimy = "0";
                                this.tableObj.fieldNull = "1";
                                this.tableObj.fieldDef = "";
                                this.tableObj.processDesc = "";
                                this.$refs['formTableField'].clearValidate()
                                this.$message.success("添加成功,可继续添加")
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

        }
    };
</script>