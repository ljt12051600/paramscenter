<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="800px" :show-close="false">
            <el-tabs @tab-click="changeTab" v-model="editableTabsValue">
                <el-tab-pane label="基础信息" name="1">
                    <el-form ref="formAction" :model="dialogObj" :rules="rules" :inline="true" label-width="120px">
                        <system-component :disabled="type=='add'?'':'123'" :required="true" :query="dialogObj" />
                        <el-form-item required label="表类型" prop="tableType">
                            <el-select style="width:200px;" :disabled="isOk" v-model="dialogObj.tableType" clearable
                                placeholder="请选择">
                                <el-option label="定义类" value="0"></el-option>
                                <el-option label="账户类" value="1"></el-option>
                                <el-option label="明细类" value="2"></el-option>
                                <el-option label="登记簿类" value="3"></el-option>
                                <el-option label="流水类" value="4"></el-option>
                                <el-option label="报表类" value="5"></el-option>
                                <el-option label="历史类" value="6"></el-option>
                                <el-option label="临时类" value="7"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item required label="表名" prop="tableName">
                            <el-input style="width:200px;" :disabled="isOk" v-model.trim="dialogObj.tableName">
                            </el-input>
                        </el-form-item>
                        <el-form-item required label="表中文名称" prop="tableNameDesc">
                            <el-input style="width:200px;" v-model.trim="dialogObj.tableNameDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="版本" prop="ver">
                            <el-input style="width:200px;" disabled v-model.trim="dialogObj.ver"></el-input>
                        </el-form-item>
                        <el-form-item label="清理周期" prop="clnCyc">
                            <el-select style="width:200px;" v-model="dialogObj.clnCyc" clearable placeholder="请选择">
                                <el-option label="不清理" value="0"></el-option>
                                <el-option label="每日" value="1"></el-option>
                                <el-option label="每月" value="2"></el-option>
                                <el-option label="三个月" value="3"></el-option>
                                <el-option label="半年" value="4"></el-option>
                                <el-option label="一年" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数据库类型" prop="dataBaseType">
                            <el-select v-model="dialogObj.dataBaseType" filterable clearable placeholder="请选择"
                                style="width:200px;">
                                <el-option v-for="item in dbList" :key="item.optionValue"
                                    :label="item.optionValue + '-' + item.optionDesc" :value="item.optionValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="数据描述" prop="dataDesc">
                            <el-input style="width:200px;" v-model.trim="dialogObj.dataDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="处理描述" prop="processDesc">
                            <el-input style="width:200px;" v-model.trim="dialogObj.processDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="关联描述" prop="ascDesc">
                            <el-input style="width:200px;" v-model.trim="dialogObj.ascDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="清理描述" prop="clnDesc">
                            <el-input style="width:200px;" v-model.trim="dialogObj.clnDesc"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="表字段" name="2">
                    <div class="one">
                        <el-button type="primary" @click="doShowTableField()">新增</el-button>

                        <el-table highlight-current-row border ref="table" align="center"
                            :data="dialogObj.tableColumnInfoList" style="width: 100%;">
                            <el-table-column align="center" type="index" label="序号" width="50" />

                            <el-table-column align="center" prop="fieldName" label="字段" />
                            <el-table-column align="center" prop="fieldDesc" label="中文名称" />
                            <el-table-column align="center" prop="type" label="类型" />
                            <el-table-column align="center" prop="length" label="长度" />
                            <el-table-column align="center" prop="point" label="小位数" />
                            <el-table-column align="center" prop="fieldNull" label="是否为空" />
                            <el-table-column align="center" prop="fieldPrimy" label="主键类型" />
                            <el-table-column align="center" prop="fieldDef" label="默认值" />
                            <el-table-column align="center" prop="processDesc" label="处理描述" />
                            <el-table-column label="操作" align="center" fixed="right" width="160px">
                                <template slot-scope="scope">
                                    <el-button @click="doDeleteTableField(scope.$index)" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="表索引" name="3">
                    <div class="one">
                        <el-button type="primary" @click="doShowIndexList()">新增</el-button>
                        <el-table readonly border ref="table" highlight-current-row @row-click="handleCurrentChange"
                            align="center" :data="dialogObj.tableIndexList" style="width: 100%;">
                            <el-table-column align="center" type="index" label="序号" width="50" />
                            <el-table-column align="center" prop="indexId" label="索引id" />
                            <el-table-column align="center" prop="indexDesc" label="索引描述" />
                            <el-table-column align="center" prop="indexField" label="索引字段" />
                            <el-table-column align="center" prop="isUnique" label="是否唯一索引" />
                            <el-table-column align="center" prop="remark" label="备注" />
                            <el-table-column label="操作" align="center" fixed="right" width="160px">
                                <template slot-scope="scope">
                                    <el-button @click="doEditIndex(scope.row,scope.$index)" type="primary">修改
                                    </el-button>
                                    <el-button @click="doDeleteIndex(scope.$index)" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </div>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="doCloseAction(false)">取 消</el-button>
                <el-button type="primary" @click="doCloseAction(true)">{{check}}</el-button>
            </div>
        </el-dialog>
        <div v-if="showTableField">
            <tablefield-component @doTableColumnInfoList="doTableColumnInfoList" @doClose="doCloseTableField"
                :dialogObj="dialogObj"  :showTableField="showTableField" />
        </div>
        <div v-if="showIndexList">
            <indexlist-component @doTableIndexList="doTableIndexList" @doClose="doCloseIndexList"
                 :indextype="indextype" :dialogObj="dialogObj"  :showIndexList="showIndexList" :index="index" />
        </div>
    </div>

</template>
<script>
    import SYSTEM from '@views/mixin/system'
    import { deleteKey, deepClone } from '@/utils'
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import systemComponent from '@views/components/domain.component.vue';
    import tablefieldComponent from "./tablefield.vue"
    import indexlistComponent from "./indexlist.vue"
    import { createTable, updateTable } from '@/api/basedata.js';
    export default {
        components: { tablefieldComponent, indexlistComponent, systemComponent },
        mixins: [SYSTEM, FRAMEMANAGE],
        props: {
            showAction: {
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
                check: '',
                title: '',
                indextype: "add",
                isOk: false,
                index: 0,//索引列表坐标
                editableTabsValue: "1",
                showTableField: false,
                showIndexList: false,
                query: {
                    sysId: "",
                    subSysId: "",
                    pageNum: 1,
                    numPerPage: 10,
                },
                dialogObj: {
                    unitDataDesc: "",
                    unitDataCode: "",
                    id: "",
                    dataStatus: "",
                    subDomain: "",
                    subSysId: "",
                    tableName: "",
                    tableNameDesc: "",
                    tableType: "",
                    clnCyc: "",
                    dataBaseName: "",
                    dataBaseType: "",
                    belongDb: "",
                    syslevel: "",
                    complexity: "",
                    weight: "",
                    isHotspot: "",
                    dataDesc: "",
                    processDesc: "",
                    ascDesc: "",
                    clnDesc: "",
                    ver: "",
                    status: "",
                    sourceVer: "",
                    verStatus: "",
                    checkUser: "",
                    taskSeqno: "",
                    remark: "",
                    createTime: "",
                    createUser: "",
                    lastUpdateTime: "",
                    lastUpdateUser: "",
                    sysId: "",

                    clickMenuId: "",
                    clnCycDesc: "",
                    clnCycPop: "",
                    dataBaseTypeDesc: "",
                    dataBaseTypePop: "",
                    deptCode: "",
                    modifyBrc: "",
                    subDomainDesc: "",
                    subDomainPop: "",
                    subSysId: "",
                    subSysIdDesc: "",
                    subSysIdPop: "",
                    sysIdDesc: "",
                    sysIdPop: "",
                    tableColumnInfoList: [],
                    tableIndexList: [],
                    tableTypeDesc: "",
                    tableTypePop: "",
                    updateUser: "",
                    userId: "",
                },
                data: {
                    total: 0,
                    rows: []
                },
                rules: {
                    sysId: [
                        { required: true, message: '请选择系统', trigger: 'change' }
                    ],
                    subSysId: [
                        { required: true, message: '请输入子系统', trigger: 'blur' }
                    ],
                    subDomain: [
                        { required: true, message: '请选择子域', trigger: 'blur' }
                    ],
                    tableType: [
                        { required: true, message: '请选择表类型', trigger: 'change' }
                    ],
                    tableName: [
                        { required: true, message: '请输入表名', trigger: 'blur' }
                    ],
                    tableNameDesc: [
                        { required: true, message: '请输入表中文名称', trigger: 'blur' }
                    ],

                },
            };
        },

        methods: {
            setCurrent(row) {
                this.$refs.table.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            doTableColumnInfoList(val) { //获得子组件表字段内容
                this.dialogObj.tableColumnInfoList = val;

            },
            doTableIndexList(val) {  //获得子组件索引内容
                this.dialogObj.tableIndexList = val;

            },
            doCloseAction(bol) {//新增表 或 修改表 是否成功
                if (bol) {
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            if (!this.dialogObj.sysId) {
                                this.$message.error("请选择系统");
                                return;
                            }
                            if (!this.dialogObj.subSysId) {
                                this.$message.error("请选择子系统");
                                return;
                            }
                            if (!this.dialogObj.subDomain) {
                                this.$message.error("请选择子域");
                                return;
                            }


                            if (this.type == "add") {

                                let info = await createTable(this.dialogObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose", true)
                                }
                            }
                            if (this.type == "edit") {

                                let info = await updateTable(this.dialogObj);
                                if (info.resCode == "0") {
                                    this.$message.success('修改成功');
                                    this.$emit("doClose", true)
                                }
                            }
                        }
                    });
                } else {
                    this.$emit("doClose", false)

                }
            },
            changeTab() {  //跳转tab页，判断当前页必选项是否都有值
                if (this.editableTabsValue === "1") return
                if (!this.dialogObj.sysId || !this.dialogObj.subSysId || !this.dialogObj.subDomain || !this.dialogObj.tableType
                    || !this.dialogObj.tableName || !this.dialogObj.tableNameDesc) {
                    this.$message.error("请输入必选项内容");
                    this.$nextTick(() => {
                        this.editableTabsValue = "1"
                    })
                }
            },
            doCloseTableField(bol) { //设置表字段面板是否展示
                if (bol) {
                    this.showTableField = false;
                } else {
                    this.showTableField = false;
                }
            },

            queryList() {
                this.query.pageNum = 1;
                this.getList(1);
            },
            doShowTableField() {  //新增表字段
                this.showTableField = true;
            },
            doEditTableField(item, index) {  //修改表字段
                this.index = index;
                this.showTableField = true;
            },
            doDeleteTableField(index) {  //删除表字段
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此表字段吗？',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            this.dialogObj.tableColumnInfoList.splice(index, 1);
                            this.$message.success('删除成功');
                            done();
                        } else {
                            done();
                        }
                    }
                });
            },
            doCloseIndexList(bol) {  //设置索引面板是否展示
                if (bol) {
                    this.showIndexList = false;
                } else {
                    this.showIndexList = false;
                }
            },
            doShowIndexList() { //新增索引
                this.indextype = "add";
                this.showIndexList = true;
            },
            doEditIndex(item, index) {  //修改索引
                this.indextype = "edit";
                this.index = index;
                this.showIndexList = true;
            },
            doDeleteIndex(index) {  //删除索引
                this.$msgbox({
                    title: '删除',
                    message: '确认删除此条索引吗？',
                    beforeClose: async (action, instance, done) => {
                        if (action == 'confirm') {
                            this.dialogObj.tableIndexList.splice(index, 1);
                            this.$message.success('删除成功');
                            done();
                        } else {
                            done();
                        }
                    }
                });
            },

        },
        mounted() {

            if (this.type == "add") {
                this.title = "新增操作";
                this.check = "确认添加";
            }
            if (this.type == "edit") {
                this.title = "修改操作";
                this.check = "确认修改";

                this.dialogObj = deepClone(this.actionObj);
                this.isOk = true;
            }

        },
        watch: {
            //根据子域的变化，显示 tableName
            "dialogObj.subDomain"(val) {
                if (this.type == "add") {
                    if (!val) {
                        this.dialogObj.tableName = "";
                    }
                    else {
                        this.dialogObj.tableName = `${this.dialogObj.subSysId}_${this.dialogObj.subDomain}_`;
                    }
                }


            }

        }
    };
</script>