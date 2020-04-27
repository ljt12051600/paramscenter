<template>
    <div class="app-container">
        <el-row :gutter="20">

            <el-col :span="8">
                <el-card class="min-height">
                    <div slot="header" class="clearfix">
                        <span>菜单结构</span>
                    </div>
                    <el-tree :data="TreeData">
                    </el-tree>
                </el-card>
            </el-col>


            <el-col :span="16">
                <el-card class="min-height">
                    <div slot="header" class="clearfix">
                        <span>菜单内容</span>

                        <el-button @click="edit" size="big" style="float: right; padding: 3px 0;width: 100px;height: 30px;margin-left:20px;" type="primary">
                            <i class="el-icon-edit"></i>修改</el-button>
                        <el-button size="big" style="float: right; padding: 3px 0;width: 100px;height: 30px;" type="danger">
                            <i class="el-icon-lx-redpacket_fill"></i>删除菜单</el-button>
                        <el-button size="big" style="float: right; padding: 3px 0;width: 100px;height: 30px;" type="primary">
                            <i class="el-icon-plus"></i>新增子菜单</el-button>
                        

                    </div>
                    {{postObj}}
                    <el-form :rules="rules" :model="postObj" ref="form" label-width="100px">
                        <el-row :gutter="20">
                            <el-col align="left" :span="12">
                                <el-form-item label="父级菜单" >
                                    根目录
                                    

                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item label="菜单类型" prop="menuType">
                                    <el-select style="width:200px;" v-model="postObj.menuType" clearable
                                        placeholder="请选择">
                                        <el-option label="F-父级菜单" value="F"></el-option>
                                        <el-option label="L-子菜单" value="L"></el-option>
                                    </el-select>

                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item label="菜单号" prop="menuId">
                                    <el-input style="width:200px;" v-model.trim="postObj.menuId"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item prop="name" label="菜单名称">
                                    <el-input style="width:200px;" v-model.trim="postObj.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item label="流程编号">
                                    <el-input style="width:200px;" v-model.trim="postObj.flowKey"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item label="版本管理">
                                    <el-select style="width:200px;" v-model="postObj.isEdition" clearable
                                        placeholder="请选择">
                                        <el-option label="0-否" value="0"></el-option>
                                        <el-option label="1-是" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item label="交易名称">
                                    <el-input style="width:200px;" v-model.trim="postObj.tranName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col align="left" :span="12">
                                <el-form-item label="菜单URL">
                                    <el-input style="width:200px;" v-model.trim="postObj.menuUrl"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-transfer :props="{
                            key: 'buttonId',
                            label: 'buttonName'
                          }" style="margin-left:100px;" filterable v-model="value" :titles="['可选按钮', '已选按钮']"
                            :data="allButtons">

                        </el-transfer>

                    </el-form>



                </el-card>

            </el-col>

        </el-row>


    </div>
</template>

<script>
    function unitTree(arr) {
        let newArr = [];
        let Arr = deleteKey(arr);

        Arr.forEach(item => {
            item.label = item.name;
            console.log(item.pId)
            if (item.pId === "0") {
                // alert(1);

                newArr.push(item);
            }
        });
        console.log(newArr);


    }
    import { deleteKey } from "@/utils"
    import { queryMenu, querySysButtonsListAll, updateMenu,queryMenuForTree,queryMenuListByUserFuncId } from "@/api/system"
    export default {
        data() {
            return {
                TreeData: [],
                value: [],
                data: [{
                    key: 'success',
                    label: "123",
                }],
                postObj: {},
                allButtons: [],
                rules: {
                    menuType: [
                        { required: true, message: '请输入菜单类型', trigger: 'change' },

                    ],
                    menuId: [
                        { required: true, message: '请输入菜单号', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                }


            }
        },

        methods: {
            async init() {
                let info = await queryMenuForTree();
                if (info.resCode === "0") {
                    let TreeData = info.rows;
                    unitTree(TreeData)

                    // console.log(this.TreeData)

                }
                let info_button = await querySysButtonsListAll();
                if (info_button.resCode === "0") {
                    this.allButtons = info_button.rows;
                }
                let info_button1 = await queryMenuListByUserFuncId();
              

            },
            edit(){
                console.log(this.$refs['form'].resetField)
            }



        }
        , mounted() {
            this.init();
        },
    }
</script>
<style type="less" scoped>
    .min-height{
        height: 750px;overflow: auto
    }
    .el-transfer-panel{
        height: 300px;
    }

</style>