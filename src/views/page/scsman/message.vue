<template>
    <div>
        <system-table>

            <div slot="search">
                <el-button @click="queryList" type="primary">查询</el-button>
              
            </div>
            <div slot="body">
                <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">

                    <el-table-column align="center" type="index" label="序号" width="50" />
                    <el-table-column align="center" prop="fengpiang" label="分片" />
                    <el-table-column align="center" prop="zhufu" label="主副" />
                    <el-table-column align="center" prop="address" label="地址" />
                    <el-table-column align="center" prop="brokerVersionDesc" label="版本" />
                  


                </el-table>

                <!--分页组件-->


            </div>
        </system-table>

        <div v-if="showAdd">
            <el-dialog :title="title" :visible="showAdd" width="1000px" :show-close="false">

                <el-table :show-header="false" border ref="table" align="center" :data="statusList"
                    style="width: 100%;height: 600px;overflow: auto">
                    <el-table-column align="center" prop="name" label="名称" />
                    <el-table-column align="center" prop="value" label="具体指" />
                </el-table>

                <div slot="footer" class="dialog-footer">

                    <el-button type="primary" @click="showAdd=false">确认</el-button>
                </div>

            </el-dialog>
        </div>

    </div>
</template>

<script>
    import { deleteKey, deepClone } from "@/utils"
    // import Sortable from "sortablejs";
    import MIXIN from "@views/mixin/button"

    import {topList, getClusterList, brokerConfig } from "@/api/cluser"
    export default {
        mixins: [MIXIN],
        data() {
            return {
                title:"",
                query: {
                },
                topList:[],
                showAdd: false,
                showEdit: false,
                statusList: [],
                data: {


                    rows: []
                },

            }
        },
        methods: {
            clearSearch() {
                this.query.tblSearch = "";

            },
            async init(){
                let info =await topList();
                if(info.resCode=="0"){
                    this.topList=info.data.topList;

                }

            },
            async doAddress(item) {
                this.title="配置"
                let info = await brokerConfig({ brokerAddr: item.address });
                if (info.resCode === "0") {

                    this.showAdd = true;
                    this.statusList=[];
                    for (var i in info.data) {
                        this.statusList.push({
                            name: i,
                            value:info.data[i]
                        })
                    }

                }


            },
            doAdd(item) {
                this.title="状态"
                this.showAdd = true;
                this.statusList=[];
                for (var i in item) {
                    this.statusList.push({
                        name: i,
                        value: item[i]
                    })
                }
            },



            async getList(num) {
                //后端垃圾处理 鄙视后端
                
                let postObj = deleteKey(this.query);
                let arr = [];
                let info = await getClusterList(postObj);
              

            },
            queryList() {

                this.getList()

            },



        }
        , mounted() {
           this.init();


        },
    }
</script>
<style>
    .sortable-ghost {
        background: red;
    }
</style>