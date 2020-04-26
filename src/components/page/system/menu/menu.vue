<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <el-tree  :data="TreeData">

                </el-tree>



            </el-col>
        </el-row>


    </div>
</template>

<script>
    function unitTree(arr) {
        let newArr=[];
        console.log(arr);
        arr.forEach(item=>{
            if(item.pId=="0"){
                newArr.push(item);
            }
        });
        

    }
    import { deleteKey } from "@/utils"
    import { queryMenu, querySysButtonsListAll } from "@/api/system"
    export default {
        data() {
            return {
                TreeData:[],


            }
        },

        methods: {
            async init() {
                let info = await queryMenu();
                if (info.resCode === "0") {
                    let TreeData=info.rows;
                    unitTree(TreeData)
                  
                    console.log(this.TreeData)

                }
                let info_button = await querySysButtonsListAll()

            }



        }
        , mounted() {
            this.init();
        },
    }
</script>
<style type="less" scoped>

</style>