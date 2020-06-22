<template>
    <div>
        <el-dialog :title="title" :visible="showAction" width="1000px" :show-close="false">
            <el-form ref="formAction" :model="dialogObj" :rules="rules" :inline="true" label-width="200px">

                <system-component :required="true" :query="dialogObj" />

                <el-form-item label="接口编码" prop="itfCode">
                    <el-input style="width:200px;" v-model.trim="dialogObj.itfCode"></el-input>
                </el-form-item>
                <el-form-item label="接口名称" prop="itfName">
                    <el-input style="width:200px;" v-model.trim="dialogObj.itfName"></el-input>
                </el-form-item>
                
                <el-button @click="doAdd" type="primary">添加</el-button>
                
                <el-table border ref="table" align="center" :data="data" style="width: 100%;">
                    <el-table-column align="center" type="index"  label="序号" width="50" />
                    <el-table-column align="center" prop="targetSubSys" label="目标系统">

                    </el-table-column>
                    <el-table-column align="center" prop="commuType" label="通讯类型">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.commuType">
                                <el-option key="httpCommunication" label="HTTP" value="httpCommunication" />
                                <el-option key="socketCommunication" label="Socket" value="socketCommunication" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="url" label="服务器地址">
                        <el-template slot-scope="scope">
                            <el-input  v-model.trim="scope.row.url"></el-input>
                        </el-template>
                    </el-table-column>
                    <el-table-column align="center" prop="port" label="端口">
                        <el-template slot-scope="scope">
                            <el-input  v-model.trim="scope.row.port"></el-input>
                        </el-template>
                    </el-table-column>
                    <el-table-column align="center" prop="itfStandCode" label="接口标准编码">
                        <el-template slot-scope="scope">
                            <el-input  v-model.trim="scope.row.itfStandCode"></el-input>
                        </el-template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" fixed="right" width="150px">
                        <el-template slot-scope="scope">
                            <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
                            <el-button @click="dodelete(scope.row,scope.index)" type="danger">删除</el-button>
                        </el-template>
                    </el-table-column>
                </el-table>

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
    import { deleteKey, deepClone } from '@/utils';
    import { createTpsArOsItf, updateTpsArOsItf } from '@/api/frameManage';
    import systemComponent from '@views/components/system.component.vue';
    //import selectComponent from './targetSubSys.vue';
    import FRAMEMANAGE from '@views/mixin/frameManage';
    export default {
        components: {  systemComponent },
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
                data:  [],
                dialogObj: {},
                rules: {
                    itfCode: [
                        { required: true, message: '请输入接口编码', trigger: 'blur' }
                    ],
                    itfName: [
                        { required: true, message: '请输入接口名称', trigger: 'blur' }
                    ],
                },
                dataObj: {
                    targetSubSys: "lgs",
                    targetSubSysDesc: "lgs-日志中心",
                    commuType: "httpCommunication",
                    url: "",
                    port: "",
                    itfStandCode: "",
                }

            };
        },
        methods: {
            doAdd(){
                //alert(JSON.stringify(this.dialogObj))
               // this.dataObj.dispSeqdno = this.dataObj.index;
                this.data.push(deepClone(this.dataObj));(
                this.data.forEach((item,index)=>{
                    item.dispSeqno = index+1;
                }))
                
            },
            doCloseAction(bol) {
                if (bol) {
                    this.$refs['formAction'].validate(async valid => {
                        if (valid) {
                            this.dialogObj.extension = JSON.stringify(this.data);
                            //alert("对象："+ JSON.stringify(this.dialogObj));

                            if (this.type == "add") {
                                let info = await createTpsArOsItf(this.dialogObj);
                                if (info.resCode == '0') {
                                    this.$message.success('添加成功');
                                    this.$emit("doClose", true)//触发父组件的@doClose
                                }
                            }
                            if (this.type == "edit") {
                                
                                let info = await updateTpsArOsItf(this.dialogObj);
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
            //if (this.type == 'add') {
                this.dialogObj = deepClone(this.actionObj);
                console.log("this.dialogObj: "+ JSON.stringify(this.dialogObj));
                if(this.type == 'edit'){
                    this.data = deepClone(this.dialogObj.data);
                    alert("this.data: "+ this.data)
                }
                
            // }
            // else {
            //     return
            // }
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