<template>
  <div>
    <system-table>
      <div slot="top">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="维护用户">
            <el-select v-model="query.createUser" placeholder="请选择">
              <el-option v-for="item in userList" :key="item.value" :label="item.label" :value="item.value">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作类型">
            <el-select v-model="query.optionType" placeholder="请选择">
              <el-option v-for="item in optionType" :key="item.value" :label="item.label" :value="item.value">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更日期">
            <el-date-picker v-model="query.changeDate" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="交易">
            <el-input v-model.trim="query.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="search">
        <el-button @click="queryList" type="primary">查询</el-button>
        <el-button @click="clearSearch" type="warning">清除</el-button>
      </div>
      
      <div slot="body">
        <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">
          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column align="center" prop="remark" label="交易" />
          <el-table-column align="center" prop="createUser" label="维护用户" :formatter="formatterCreateUser" />
          <el-table-column align="center" prop="changeDate" label="变更日期" />
          <el-table-column align="center" prop="optionType" label="操作类型" :formatter="formatterOptionType" />
          <el-table-column align="center" prop="serialNo" label="交易流水" />
        </el-table>

        <!--分页组件-->
        <div v-if="data.total" class="pagination">
          <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
            :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
            @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
        </div>

      </div>
    </system-table>
   

  </div>
</template>

<script>
  import { deleteKey, deepClone } from "@/utils"
  import MIXIN from "@views/mixin/button"
  import {queryInfoChange,queryUserNoPage} from '@/api/logBook';
  export default {
    mixins: [MIXIN],
    data() {
      return {
        query: {
          createUser: "",
          optionType: null,
          changeDate: "",
          remark: "",
          pageNum: 1,
          numPerPage: 10,

        },
        userData:[],
        userList:[],
        optionType:[
          {label:"1-新增",name:"1-新增",value:1},
          {label:"2-修改",name:"2-修改",value:2},
          {label:"3-删除",name:"3-删除",value:3},
        ],
        data: {
          total: 20,

          rows: []
        },
        
      }
    },
    methods: {
      formatterCreateUser(row,column,cellValue,index){
        let userName = "";
        this.userData.forEach(element=>{
          if(element.userId==cellValue){
            userName = element.userName;
            return ;
          }
        })
        return userName;
      },
      formatterOptionType(row,column,cellValue,index){
        let optionType = "";
        this.optionType.forEach(element=>{
          if(element.value==cellValue){
            optionType = element.name.substring(element.name.indexOf("-")+1);
          }
        })
        return optionType;
      },
      clearSearch() {
        this.query.tblSearch = "";
      },      
      async getList(num) {

        let postObj = deleteKey(this.query);
        postObj.changeDate = String(postObj.changeDate).substring(0,10);
        postObj.pageNum--;
        if(postObj.changeDate=="undefined"){
          delete postObj.changeDate;
          
        }
        let info = await queryInfoChange(postObj);
        if (info.resCode === "0") {
          this.data = {
            total: info.total,
            rows: info.rows || []
          }
        }

      },
      queryList() {
        this.query.pageNum = 1;
        this.getList(1)

      },
      handlePageChange(num) {
        this.query.pageNum = num;
        this.getList(num);
      },
      handleSizeChange(num) {
        this.query.pageNum = 1;
        this.query.numPerPage = num;
        this.getList(num)
      }


    }
    ,async mounted() {
      this.getList();
      this.userList = []; 
      let userInfo = await queryUserNoPage();
      userInfo.rows.forEach(element => {
        this.userList.push({label:element.userId+"-"+element.userName,name:element.userId+"-"+element.userName,value:element.userId})
      });
      this.userData = userInfo.rows;
      // const tbody = document.querySelector(".el-table__body-wrapper tbody");
      //
    },
  }
</script>
<style>
  .sortable-ghost {
    background: red;
  }
</style>