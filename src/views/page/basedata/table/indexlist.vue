<template>
    <el-dialog :title="title" :visible="showIndexList" width="800px" :show-close="false">
        <el-form ref="formIndexList" :inline="true" :rules="rules" :model="indexObj" label-width="140px">
            <el-form-item label="表名" required>
                <el-input style="width:200px;" required disabled v-model.trim="dialogObj.tableName"></el-input>
            </el-form-item>
            <el-form-item label="索引id" prop="indexId">
                <el-input style="width:200px;" v-model.trim="indexObj.indexId" clearable></el-input>
            </el-form-item>
            <el-form-item label="索引描述">
                <el-input style="width:200px;" v-model.trim="indexObj.indexDesc" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否唯一索引" prop="isUnique">
                <el-select style="width:200px;" v-model="indexObj.isUnique" clearable placeholder="请选择">
                    <el-option label="1-是" value="1"></el-option>
                    <el-option label="0-否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input style="width:200px;" v-model.trim="indexObj.remark" clearable></el-input>
            </el-form-item>
            <el-transfer :props="{
                key: 'value',
                label: 'desc'
              }" style="margin-left:100px;" filterable v-model="tableFieldList" :titles="['可选索引', '已选索引']"
                :data="allTableFieldList">

            </el-transfer>



        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="doCloseIndexListAction(false)">关 闭</el-button>
            <el-button type="primary" @click="doCloseIndexListAction(true)">{{check}}</el-button>
        </div>
    </el-dialog>

</template>
<script>
    import { deleteKey, deepClone } from '@/utils'
    export default {
        props: {
            showIndexList: {
                type: Boolean
            },
            indextype: {
                indextype: String,
                default: 'add'
            },
            dialogObj: {
                type: Object
            },
            index:{
                type: Number,
                default: 0
            }
        },
        data() {

            return {

                indexObj: {
                    indexField: "",
                    indexDesc: "",
                    indexId: "",
                    isUnique: "",
                    remark: ""
                },
                title: '',
                check:'',
                allTableFieldList: [],
                tableFieldList: [],
                rules: {
                    indexId: [
                        { required: true, message: '请选择表名', trigger: 'blur' }
                    ],
                    isUnique: [
                        { required: true, message: '请选择字段', trigger: 'blur' }
                    ],
                },
            };
        },

        methods: {

            doCloseIndexListAction(bol) {

                if (bol) {
                    this.$refs['formIndexList'].validate(async valid => {
                        if (valid) {
                            if (this.indextype=="add") { //新增
                    
                                this.indexObj.indexField = this.tableFieldList.join(",");
                                 //如tableIndexList不为[]，
                                if (this.dialogObj.tableIndexList.length > 0) {
                                    //则为tableIndexList 数组添加值
                                    this.dialogObj.tableIndexList.push(deepClone(this.indexObj));

                                } else {
                                    //如tableIndexList为[]，则为tableColumnInfoList 赋初值
                                    this.dialogObj.tableIndexList = [deepClone(this.indexObj)];

                                }//tableIndexList 中的数组值 传递给父组件
                                this.$emit("doTableIndexList", this.dialogObj.tableIndexList);
                                this.$message.success("添加成功,可继续添加")
                            }else if(this.indextype=="edit"){  //修改
                                this.dialogObj.tableIndexList[this.index].indexField =  this.tableFieldList.join(",");
                                this.dialogObj.tableIndexList[this.index].indexDesc = this.indexObj.indexDesc;
                                this.dialogObj.tableIndexList[this.index].isUnique = this.indexObj.isUnique;
                                this.dialogObj.tableIndexList[this.index].remark = this.indexObj.remark;
                                this.$message.success("修改成功")
                            }

                            this.indexObj.indexId = "";
                            this.indexObj.indexDesc = "";
                            this.indexObj.isUnique = "";
                            this.indexObj.remark = "";
                        }
                    });
                } else {
                    this.$emit("doClose", false);

                }
            },
            getTableFieldList() {
                const data = [];
                for (let i = 0; i < this.dialogObj.tableColumnInfoList.length; i++) {
                    data.push({
                        value: this.dialogObj.tableColumnInfoList[i].fieldName,
                        desc: `${i + 1} - ${this.dialogObj.tableColumnInfoList[i].fieldName}`,
                    });
                }
                return data;
            },
            //如果修改编辑，返显数据
            getShowFirst() {

                if(this.indextype == "add"){
                    this.tableFieldList = [];
                    this.allTableFieldList = this.getTableFieldList();
                    this.indexObj.indexId = `${this.dialogObj.tableName}_idx1`;
                }else{
                    this.indexObj = {
                        indexId:this.dialogObj.tableIndexList[this.index].indexId,
                        indexDesc:this.dialogObj.tableIndexList[this.index].indexDesc,
                        isUnique:this.dialogObj.tableIndexList[this.index].isUnique+"",
                        remark:this.dialogObj.tableIndexList[this.index].remark,
                        indexField:this.dialogObj.tableIndexList[this.index].indexField
                    }
                    this.tableFieldList = this.indexObj.indexField.split(",");
                    this.allTableFieldList = this.getTableFieldList();
                }
                
            },
        },
        mounted() {
           
            if (this.indextype == "add") {
                this.title = "新增操作";
                this.check = "确认添加";
            }
            if (this.indextype == "edit") {
                this.title = "修改操作";
                this.check = "确认修改";

        //        this.isOk = true;
            }
            this.getShowFirst();
        }
    };
</script>