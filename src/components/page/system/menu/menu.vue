<template>
    <div class="app-container">
        <el-row :gutter="20">

            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">



            </el-col>
        </el-row>


    </div>
</template>

<script>
    import { deleteKey } from "@/utils"
    import { queryMenu, querySysButtonsListAll } from "@/api/system"
    export default {
        data() {
            return {

            }
        },
        methods: {
            async init() {
                let info = await queryMenu();
                if (info.resCode === "0") {

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