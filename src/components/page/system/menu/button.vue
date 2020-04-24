<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <!--工具栏-->
        <div class="head-container">
          <el-card>
            <el-form ref="form" :inline="true" label-width="80px">
              <el-form-item label="按钮id">
                <el-input style="width:200px;" v-model="query.buttonId"></el-input>
              </el-form-item>
              <el-form-item label="按钮名称">
                <el-input style="width:200px;" v-model="query.buttonName"></el-input>
              </el-form-item>
              <el-form-item label="弹框id">
                <el-input style="width:200px;" v-model="query.popId"></el-input>
              </el-form-item>
            </el-form>
            <div class="header-search">
              <el-button @click="queryList" type="primary">查询</el-button>
              <el-button @click="clearSearch" type="warning">清除</el-button>

            </div>
          </el-card>
          <!-- <crudOperation show="" :permission="permission" /> -->
        </div>
        <div class="header-button">
          <el-button @click="doAdd" type="primary">添加</el-button>
        </div>
        <!--表单渲染-->

        <!--表格渲染-->
        <el-table ref="table" align="center" :data="data.rows" style="width: 100%;">
          <el-table-column align="center"  prop="buttonId" label="按钮id" />
          <el-table-column align="center"  prop="buttonName" label="按钮名称" />
          <el-table-column align="center"  prop="popId" label="弹框id" />
          <el-table-column label="操作" width="300" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
              <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        
        <!--分页组件-->
        <div class="pagination">
            <el-pagination
                background
                layout="total,pager,jumper,sizes"
                :current-page="query.pageNum"
                
                :page-sizes="[10,25,50]"
                :page-size="query.numPerPage"
                :total="data.total"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
            ></el-pagination>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {deleteKey} from "@/utils"
  import {querySysButtons,deleteSysButtons} from "@/api/system"
  export default {
    data() {
      return {
        query:{
          buttonId:"",
          buttonName:"",
          popId:"",
          pageNum:1,
          numPerPage:10,

        },
        data: {
          total:20,

          rows: []
        },
      
        

      }
    },
    methods: {
      clearSearch(){
        this.query.buttonId="";
        this.query.buttonName="";
        this.query.popId="";
      },
      doEdit(item) {
      
      },
      doDelete(item){
        let postObj={id:item.id};
        this.$msgbox({
          title:"确认删除此按钮吗？",
          beforeClose:async (action,instance,done)=>{
            if(action=="confirm"){
              let info= await deleteSysButtons(postObj);
              if(info.resCode==="0"){
                this.$message.success('删除成功');
                this.getList();
              }
              done();
             
            }
            else{
              done();
            }
          }
        })
        
        console.log(item);

      },
      doAdd(){

      },
      async getList(num){
        console.log(this.query)
        let postObj=deleteKey(this.query);
        postObj.pageNum--;
       
        let info = await querySysButtons(postObj);
        if(info.resCode==="0"){
          this.data={
            total:info.total,
            rows:info.rows||[]
          }
        }
        


      },
      queryList(){
        this.getList(1)

      },
      handlePageChange(num){
        this.query.pageNum=num;
        this.getList(num);
      },
      handleSizeChange(num){
        this.query.pageNum=1;
        this.query.numPerPage=num;
        this.getList(num)
      }
      
     
    }
    ,mounted() {
      this.getList();
    },
  }
</script>