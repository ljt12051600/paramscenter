<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="800px" :show-close="false">
            <el-form ref="formAction" :model="actionObj" :rules="rules" :inline="true" label-width="130px">
                <system-component :required="true" :query="actionObj" />
                <el-form-item label="子域顺序号" prop="displaySeqno">
                    <el-input style="width:200px;" v-model.number="actionObj.displaySeqno"></el-input>
                </el-form-item>
                <el-form-item label="子域码" prop="subDomainValue">
                    <el-input style="width:200px;" v-model.trim="actionObj.subDomainValue"></el-input>
                </el-form-item>
                <el-form-item label="子域名称" prop="subDomainName">
                    <el-input style="width:200px;" v-model.trim="actionObj.subDomainName"></el-input>
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
    import systemComponent from '@views/components/system.component.vue';
    import {createTp3005, updateTp3005} from '@/api/frameManage';
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
        components: { systemComponent },
        data() {
            return {
                check: '',
                title: '',
                rules: {
                    sysId: [
                        { required: true, message: '请选择系统标识', trigger: 'change' }
                    ],
                    subSysId: [
                        { required: true, message: '请选择子系统标识', trigger: 'change' }
                    ],
                    displaySeqno: [
                        { required: true, message: '请输入子域顺序号', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    subDomainValue: [
                        { required: true, message: '请输入子域码', trigger: 'blur' }
                    ],
                    subDomainName: [
                        { required: true, message: '请输入子域名称', trigger: 'blur' },
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
                                let info = await createTp3005(this.actionObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose",true)
                                }
                                //this.
                            }
                            if(this.type == "edit"){
                                let info = await updateTp3005(this.actionObj);
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