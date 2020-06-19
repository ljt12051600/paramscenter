<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="900px" :show-close="false">
            <el-form ref="formAction" :model="actionObj" :rules="rules" :inline="true" label-width="200px">

                <system-component :required="true" :query="actionObj" />

                <el-form-item label="接口编码" prop="itfCode">
                    <el-input style="width:200px;" v-model.trim="actionObj.itfCode"></el-input>
                </el-form-item>
                <el-form-item label="接口名称" prop="itfName">
                    <el-input style="width:200px;" v-model.trim="actionObj.itfName"></el-input>
                </el-form-item>
                <el-form-item label="目标系统" prop="itfName">
                    <select-component></select-component>
                </el-form-item>
                
                <div style="border:1px solid #F00; width:750px; height:200px;float:left;">
                    <el-table border ref="table" align="center" :data="actionObj" style="width: 100%;">
                        <el-table-column align="center" type="displaySeqno" label="序号" width="50" />
                        <el-table-column align="center" prop="targetSubSys" label="目标系统">
                        </el-table-column>
                        <el-table-column align="center" prop="commuType" label="通讯类型">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.commuType">
                                    <el-option :key="httpCommunication" :label="HTTP" :value="httpCommunication" />
                                    <el-option :key="socketCommunication" :label="Socket"
                                        :value="socketCommunication" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="url" label="服务器地址" />
                        <el-table-column align="center" prop="port" label="端口" />
                        <el-table-column align="center" prop="itfStandCode" label="接口标准编码" />
                    </el-table>
                </div>

                <div style="float:right;">
                    <el-row>
                        <el-button type="primary" plain>添加</el-button>
                    </el-row>
                    <el-row>
                        <el-button type="primary" plain>移除</el-button>
                    </el-row>
                    <el-row>
                        <el-button type="primary" plain>上移</el-button>
                    </el-row>
                    <el-row>
                        <el-button type="primary" plain>下移</el-button>
                    </el-row>
                    <el-row>
                        <el-button type="primary" plain>最前</el-button>
                    </el-row>
                    <el-row>
                        <el-button type="primary" plain>最后</el-button>
                    </el-row>
                </div>
            </el-form>
            <!--操作table的6个按钮-->

            <div style="float:clear;" slot="footer" class="dialog-footer">
                <el-button @click="doCloseAction(false)">取 消</el-button>
                <el-button type="primary" @click="doCloseAction(true)">{{check}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { createTpsArOsItf, updateTpsArOsItf } from '@/api/frameManage';
    import systemComponent from '@views/components/system.component.vue';
    import selectComponent from './targetSubSys.vue';
    import FRAMEMANAGE from '@views/mixin/frameManage';
    export default {
        components: { selectComponent, systemComponent },
        props: {
            showAction: {
                type: Boolean
            },
            title: {
                type: String,
            },
            check: {
                type: String,
            },

            type: {
                type: String,
                default: 'add'
            },
            actionObj: {
                type: Object
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
                            if (this.type == "add") {
                                let info = await createTp3003(this.actionObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose", true)//触发父组件的@doClose
                                }
                            }
                            if (this.type == "edit") {
                                let info = await updateTp3003(this.actionObj);
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
            // alert(JSON.stringify(this.$parent))
        }
    };
</script>