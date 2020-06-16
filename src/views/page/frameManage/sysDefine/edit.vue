<template>
    <div>
        <el-dialog :title="title" :visible="showDialog" width="800px" :show-close="false">
            <el-form ref="formAction" :model="dialogObj" :rules="rules" :inline="true" label-width="130px">
                <el-form-item label="系统标识" prop="sysId">
                    <el-input style="width:200px;" v-model.trim="dialogObj.sysId"></el-input>
                </el-form-item>
                <el-form-item label="系统名称" prop="sysName">
                    <el-input style="width:200px;" v-model.trim="dialogObj.sysName"></el-input>
                </el-form-item>
                <el-form-item label="系统顺序号" prop="displaySeqno">
                    <el-input style="width:200px;" v-model.number="dialogObj.displaySeqno"></el-input>
                </el-form-item>
                <el-form-item label="归属业务领域">
                    <el-input style="width:200px;" v-model.trim="dialogObj.businessDomain"></el-input>
                </el-form-item>
                <el-form-item label="系统范围概述">
                    <el-input style="width:200px;" v-model.trim="dialogObj.sysDesc"></el-input>
                </el-form-item>
                <el-form-item label="系统重要等级">
                    <el-select v-model="dialogObj.imptntLevel" filterable clearable placeholder="请选择"
                        style="width:200px;">
                        <el-option v-for="item in imptntLevelObj" :key="item.optionValue" :label="item.optionValue"
                            :value="item.optionValue">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="安全保护等级">
                    <el-select v-model="dialogObj.safeLevel" filterable clearable placeholder="请选择"
                        style="width:200px;">
                        <el-option v-for="item in safeLevelObj" :key="item.optionValue"
                            :label="item.optionValue + '-' + item.optionDesc" :value="item.optionValue">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="doCloseEdit(false)">取 消</el-button>
                <el-button type="primary" @click="doCloseEdit(true)">确认修改</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import { deleteKey,deepClone } from '@/utils'
    import { queryTp3003List, createTp3003, updateTp3003, deleteTp3003, queryOptionCodeNoPage } from '@/api/frameManage';
    export default {
        props: {
            showDialog: {
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
        data() {
            return {
                title: '',
                imptntLevelObj: [],
                safeLevelObj: [],
                queryImpLevel: {
                    optionCode: "imptntLevel",
                },
                querySafeLevel: {
                    optionCode: "safeLevel",
                },
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
               
                dialogObj: {
                    id: "",
                    businessDomain: "",
                    displaySeqno: "",
                    imptntLevel: "",
                    safeLevel: "",
                    sysDesc: "",
                    sysId: "",
                    sysName: "",
                },
            };
        },

        methods: {
            doCloseEdit(bol) {
                if (bol) {
                    console.log("this.dialogObj.imptntLevel: "+this.dialogObj.imptntLevel);
                    console.log("dialogObj: " + this.dialogObj)
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            this.dialogObj.displaySeqno += "";
                            if(this.type == "add"){
                                let info = await createTp3003(this.dialogObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                }
                                //this.
                            }
                            if(this.type == "edit"){
                                let info = await updateTp3003(this.dialogObj);
                                console.log("info.resCode: "+info.resCode)
                                this.$message.success('修改成功');
                            }
                            
                            this.getList();
                          
                        }
                    });
                } else {
                  
                }
            },
      
      
            async impLevelList() {
                let postObj = deleteKey(this.queryImpLevel);
                let info = await queryOptionCodeNoPage(postObj);
                if (info.resCode === "0") {
                    this.imptntLevelObj = info.rows
                }

            },
            async safeLevelList() {
                let postObj = deleteKey(this.querySafeLevel);
                let info = await queryOptionCodeNoPage(postObj);
                if (info.resCode === "0") {
                    this.safeLevelObj = info.rows
                }
            },
        },
        mounted() {
            if(this.type == "add"){
                console.log("新增！")
                this.title = "新增操作";
            }
            if(this.type == "edit"){
                this.title = "修改操作";
            }
            this.dialogObj = deepClone(this.actionObj);
            this.impLevelList();
            this.safeLevelList();

        }
    };
</script>