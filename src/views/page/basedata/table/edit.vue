<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="800px" :show-close="false">
            <el-tabs>
                <el-tab-pane label="基础信息">
                    <el-form ref="formAction" :model="dialogObj" :rules="rules" :inline="true" label-width="120px">
                        <system-component :required="true" :query="dialogObj" />
                        <el-form-item required label="表类型" prop="tableType">
                            <el-select style="width:200px;" v-model="dialogObj.tableType" clearable placeholder="请选择">
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
                            <el-input style="width:200px;" v-model.trim="dialogObj.tableName"></el-input>
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
                <el-tab-pane label="表字段">
                    <div class="one">
                        <el-button type="primary" @click="addBaseList">新增</el-button>
                        <el-table readonly border ref="table" align="center" :data="baseList" style="width: 100%;">

                            <el-table-column align="center" prop="fieldName" label="字段名">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.fieldName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="fieldDesc" label="中文名称">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.fieldDesc"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="type" label="类型">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.type"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="length" label="长度">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.length"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="point" label="小位数">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.point"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="fieldNull" label="是否为空">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.fieldNull"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="fieldPrimy" label="主键类型">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.fieldPrimy"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="fieldDef" label="默认值">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.fieldDef"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="processDesc" label="处理描述">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.processDesc"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="表索引">
                    <div class="one">
                        <el-button type="primary" @click="">编辑</el-button>
                        <el-table readonly border ref="table" align="center" :data="baseList" style="width: 100%;">
                            <el-table-column align="center" type="index" label="序号" width="50" />
                            <el-table-column align="center" prop="indexId" label="索引id">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.indexId"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="indexDesc" label="索引描述">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.indexDesc"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="indexField" label="索引字段">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.indexField"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="isUnique" label="是否唯一索引">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.isUnique"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="remark" label="备注">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.remark"></el-input>
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
    </div>

</template>
<script>
    import SYSTEM from '@views/mixin/system'
     import { deleteKey,deepClone } from '@/utils'
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import systemComponent from '@views/components/domain.component.vue';
    import { createTable } from '@/api/basedata.js';
    export default {
        components: { systemComponent },
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
                baseList: [],
                dialogObj: {
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
                },

                rules: {
                    sysId: [
                        { required: true, message: '请选择系统', trigger: 'change' }
                    ],
                    subSysId: [
                        { required: true, message: '请输入子系统标识', trigger: 'blur' }
                    ],
                    subDomain: [
                        { required: true, message: '请输入子系统名称', trigger: 'blur' }
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
            doCloseAction(bol) {
                if (bol) {
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            if (this.type == "add") {
                                //alert("actionObj-add: " + JSON.stringify(this.actionObj))
                                console.log(this.dialogObj, 121212);
                                let info = await createTable(this.dialogObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose", true)
                                }
                            }
                            if (this.type == "edit") {
                                //alert("actionObj-add: " + JSON.stringify(this.actionObj))
                                let info = await updateTp3004(this.dialogObj);
                                console.log("info.resCode: " + info.resCode)
                                this.$message.success('修改成功');
                                this.$emit("doClose", true)
                            }
                        }
                    });
                } else {
                    this.$emit("doClose", false)

                }
            },
            addBaseList() {
                this.baseList.push({
                    id: 1,
                })
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
            }
          this.dialogObj=deepClone(this.actionObj);
        },
        watch:{
            "dialogObj.subSysId"(val){
                if(!val){
                    this.dialogObj.subDomain = "";
                    this.dialogObj.tableName="";
                }
                else{
                    this.dialogObj.tableName=`${this.dialogObj.subSysId}_`;
                }
                
            },
            "dialogObj.subDomain"(val){
                if(!val){
                    this.dialogObj.tableName="";
                }
                else{
                    this.dialogObj.tableName=`${this.dialogObj.subSysId}_${this.dialogObj.subDomain}_`;
                }
                
            }
            
        }
    };
</script>