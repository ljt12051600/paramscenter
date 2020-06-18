<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="800px" :show-close="false">
                <el-form ref="formAction" :model="actionObj" :rules="rules" :inline="true" label-width="130px">
                    <el-form-item label="系统" prop="sysId">
                        <el-select v-model="actionObj.sysId" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in sysList" :key="item.sysId" :label="item.sysId + '-' +item.sysName"
                                :value="item.sysId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="子系统标识" prop="subSysId">
                        <el-input style="width:200px;" v-model.trim="actionObj.subSysId"></el-input>
                    </el-form-item>
                    <el-form-item label="子系统名称" prop="subSysName">
                        <el-input style="width:200px;" v-model.trim="actionObj.subSysName"></el-input>
                    </el-form-item>
                    <el-form-item label="子系统顺序号" prop="displaySeqno">
                        <el-input style="width:200px;" v-model.number="actionObj.displaySeqno"></el-input>
                    </el-form-item>
                    <el-form-item label="业务主管部门">
                        <el-input style="width:200px;" v-model.trim="actionObj.deptCode"></el-input>
                    </el-form-item>
                    <el-form-item label="是否7*24" prop="isTfs">
                        <el-select v-model="actionObj.isTfs" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in isTfsList" :key="item.optionValue" :label="item.optionDesc"
                                :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数据库">
                        <el-select v-model="actionObj.db" filterable clearable placeholder="请选择" style="width:200px;">
                            <el-option v-for="item in dbList" :key="item.optionValue"
                                :label="item.optionValue + '-' + item.optionDesc" :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="重要等级">
                        <el-select v-model="actionObj.imptntLevel" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in imptntLevelList" :key="item.optionValue" :label="item.optionDesc"
                                :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="安全保护等级">
                        <el-select v-model="actionObj.safeLevel" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in safeLevelList" :key="item.optionValue" :label="item.optionDesc"
                                :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投产状态" prop="pipStatus">
                        <el-select v-model="actionObj.pipStatus" filterable clearable placeholder="请选择"
                            style="width:200px;">
                            <el-option v-for="item in pipStatusList" :key="item.optionValue"
                                :label="item.optionValue + '-' + item.optionDesc" :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投产时间">
                        <el-date-picker v-model="actionObj.pipTime" type="date" placeholder="选择日期" 
                                        value-format="yyyy-MM-dd" style="width:200px;">
                        </el-date-picker>                 
                    </el-form-item>
                    <el-form-item label="范围概述">
                        <el-input style="width:200px;" v-model.trim="actionObj.subSysDesc"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseAction(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseAction(true)">{{check}}</el-button>
                </div>
            </el-dialog>
    </div>

</template>
<script>
    import SYSTEM from '@views/mixin/system'
    import FRAMEMANAGE from '@views/mixin/frameManage'
    import { createTp3004, updateTp3004 } from '@/api/frameManage';
    export default {
        props: {
            showAction: {
                type: Boolean
            },

            type: {
                type: String,
                default: 'add'
            },
            actionObj: {
                type: Object
            },

        },
        mixins: [SYSTEM, FRAMEMANAGE],
        data() {
            return {
                check: '',
                title: '',
                rules: {
                    sysId: [
                        { required: true, message: '请选择系统', trigger: 'change' }
                    ],
                    subSysId: [
                        { required: true, message: '请输入子系统标识', trigger: 'blur' }
                    ],
                    subSysName: [
                        { required: true, message: '请输入子系统名称', trigger: 'blur' }
                    ],
                    displaySeqno: [
                        { required: true, message: '请输入系统顺序号', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    isTfs: [
                        { required: true, message: '请选择是否7*24', trigger: 'change' }
                    ],
                    pipStatus: [
                        { required: true, message: '请选择投产状态', trigger: 'change' }
                    ],

                },
            };
        },

        methods: {
            doCloseAction(bol) {
                if (bol) {
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            if(this.type == "add"){
                                //alert("actionObj-add: " + JSON.stringify(this.actionObj))
                                let info = await createTp3004(this.actionObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose",true)
                                }
                            }
                            if(this.type == "edit"){
                                //alert("actionObj-add: " + JSON.stringify(this.actionObj))
                                let info = await updateTp3004(this.actionObj);
                                console.log("info.resCode: "+info.resCode)
                                this.$message.success('修改成功');
                                this.$emit("doClose",true)
                            }  
                        }
                    });
                } else {
                     this.$emit("doClose",false)
                  
                }
            },
        },
        mounted() {
            if(this.type == "add"){
                this.title = "新增操作";
                this.check = "确认添加";
            }
            if(this.type == "edit"){
                this.title = "修改操作";
                this.check = "确认修改";
            }
        }
    };
</script>