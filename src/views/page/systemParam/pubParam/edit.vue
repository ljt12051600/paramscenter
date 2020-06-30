<template>
    <div>
        <el-dialog :title="dialogTitle" :visible="showDialog" width="800px" :show-close="false">
            <el-form ref="formDialog" :model="dialogObj" :rules="rules" :inline="true" label-width="120px">
                <el-form-item label="参数代码" prop="paramCode">
                   <el-input v-model.trim="dialogObj.paramCode" :disabled="ifDisabled" style="width: 280px;" />
                </el-form-item>
                <el-form-item label="参数名称" prop="paramName">
                    <el-input v-model.trim="dialogObj.paramName"  style="width: 280px;" />
                </el-form-item>
                <el-form-item label="参数值"  prop="paramValue">
                    <el-input v-model.trim="dialogObj.paramValue"  style="width: 280px;" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="doCloseDialog(false)">取 消</el-button>
                <el-button type="primary" @click="doCloseDialog(true)">确认添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteKey, deepClone } from "@/utils"
    import MIXIN from "@views/mixin/button"
    import { querySysButtons, deleteSysButtons, createSysButtons, updateSysButtons, querySysButtonsListAll } from "@/api/system"
    import {createParam,updateParam,deleteParam,queryParamList} from '@/api/systemParam';
    export default {
        mixins: [MIXIN],
        props:{
            reqType:{
                type:String,
                default:"add"
            },
            showDialog:false,
            reqObj:{
                type:Object,
                default:{
                    buttonId: "",
                    buttonName: "",
                    popId: "",
                }
            }
        },
        data () {
            return {
                dialogTitle:"",
                ifDisabled:false,
                dialogObj:{},
                //使用状态
                useStsList: [
                    {
                        name: "正常",
                        label:"正常",
                        value: "0"
                    },
                    {
                        name: "停用",
                        label:"停用",
                        value: "1"
                    }
                ],
                rules: {
                    // chnlNo: [
                    //     { required: true, message: '请选择渠道号', trigger: 'blur' },
                    // ],
                    paramCode:[
                        { required: true, message: '请输入参数代码', trigger: 'blur' },
                    ],
                    paramName:[
                        { required: true, message: '请输入参数名称', trigger: 'blur' },
                    ],
                    paramValue:[
                        { required: true, message: '请输入参数值', trigger: 'blur' },
                    ]
                },
            }
        },
        methods:{            
            doCloseDialog(bol){
                if(bol){
                    this.$refs['formDialog'].validate(async valid => {
                        if (valid) {                            
                            if(this.reqType=="add"){                                
                                let info = await createParam(this.dialogObj);
                                if (info.resCode === '0') {                            
                                    this.$message.success("添加成功");
                                    this.$emit("closeDialog",true);
                                }
                            }else{                                 
                                let info = await updateParam(this.dialogObj);
                                if (info.resCode === '0') {
                                    this.$message.success("修改成功");
                                    this.$emit("closeDialog",true);
                                }
                            }   
                        }
                                             
                        
                    })
                }else{
                    this.$emit("closeDialog",false);
                }
            },
        },
        mounted(){
            if(this.reqType=="add"){
                this.dialogObj = {
                   
                }
                this.dialogTitle = "添加参数";
                this.ifDisabled = false;
            }else{
                this.dialogObj = deepClone(this.reqObj);
                this.ifDisabled = true;
                this.dialogTitle = "修改参数";
            }
        },
        watch:{
            
        }
    }    
</script>