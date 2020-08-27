<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="800px" :show-close="false">
            <el-form ref="formAction" :model="actionObj" :rules="rules" :inline="true" label-width="130px">
                <el-form-item label="系统标识" prop="sysId">
                    <el-input style="width:200px;" v-model.trim="actionObj.sysId"></el-input>
                </el-form-item>
                <el-form-item label="系统名称" prop="sysName">
                    <el-input style="width:200px;" v-model.trim="actionObj.sysName"></el-input>
                </el-form-item>
                <el-form-item label="系统顺序号" prop="displaySeqno">
                    <el-input style="width:200px;" v-model.number="actionObj.displaySeqno"></el-input>
                </el-form-item>
                <el-form-item label="归属业务领域">
                    <el-input style="width:200px;" v-model.trim="actionObj.businessDomain"></el-input>
                </el-form-item>
                <el-form-item label="系统范围概述">
                    <el-input style="width:200px;" v-model.trim="actionObj.sysDesc"></el-input>
                </el-form-item>
                <el-form-item label="系统重要等级">
                    <el-select v-model="actionObj.imptntLevel" filterable clearable placeholder="请选择"
                        style="width:200px;">
                        <el-option v-for="item in imptntLevelList" :key="item.optionValue" :label="item.optionValue"
                            :value="item.optionValue">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="安全保护等级">
                    <el-select v-model="actionObj.safeLevel" filterable clearable placeholder="请选择"
                        style="width:200px;">
                        <el-option v-for="item in safeLevelList" :key="item.optionValue"
                            :label="item.optionValue + '-' + item.optionDesc" :value="item.optionValue">
                        </el-option>
                    </el-select>
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
    import {createTp3003, updateTp3003} from '@/api/frameManage';
    import FRAMEMANAGE from '@views/mixin/frameManage';
    export default {
        props: {
            showAction: {
                type: Boolean
            },
            title: {
                type: String,
            },
            check: {
                type: String,
            },

            type: {
                type: String,
                default: 'add'
            },
            actionObj: {
                type: Object
            },
        },
        mixins: [FRAMEMANAGE],
        data() {
            return {
                rules: {
                    sysId: [
                        { required: true, message: '请输入系统标识', trigger: 'blur' }
                    ],
                    sysName: [
                        { required: true, message: '请输入系统名称', trigger: 'blur' }
                    ],
                    displaySeqno: [
                        { required: true, message: '请输入系统顺序号', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                },
            };
        },
        methods: {
            doCloseAction(bol) {
                if (bol) {
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            //this.actionObj.displaySeqno += "";
                            if(this.type == "add"){
                                let info = await createTp3003(this.actionObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose",true)//触发父组件的@doClose
                                }
                            }
                            if(this.type == "edit"){
                                let info = await updateTp3003(this.actionObj);
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