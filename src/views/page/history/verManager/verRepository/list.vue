<template>
  <div>
    <system-table>
      <div slot="top">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="业务名称">
            <el-select v-model="query.businessFlag" placeholder="请选择">
              <el-option v-for="item in businessNameList" :key="item.label" :label="item.label" :value="item.value">

              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="变更类型">
            <el-select v-model="query.changeType" placeholder="请选择">
              <el-option v-for="item in changeTypeList" :key="item.value" :label="item.label" :value="item.value">

              </el-option>
            </el-select>
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
          <el-table-column align="center" prop="businessName" label="业务名称" />
          <el-table-column align="center" prop="dspNameValue" label="业务主键" />
          <el-table-column align="center" prop="changeType" label="变更类型" :formatter="formatterChangeType" />
          <el-table-column align="center" prop="ver" label="版本" width="70" />
          <el-table-column align="center" prop="changeStatus" label="状态" :formatter="formatterChangeStatus" />
          <el-table-column align="center" prop="checkoutUser" label="检出用户" width="80" />
          <el-table-column align="center" prop="checkoutDate" label="检出日期" />
          <el-table-column align="center" prop="createUser" label="检入用户" width="80" />
          <el-table-column align="center" prop="createTime" label="检入日期" />
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
  import {queryEditionChg,queryButtons,queryLeafMenu,queryHisRepository} from '@/api/verManager';
  export default {
    mixins: [MIXIN],
    data() {
      return {
        query: {
          businessName: "",
          changeType: "",
          pageNum: 1,
          numPerPage: 10,

        },
        changeStatusList : [
            {value:"80",label:"检出",name:"tomato"},
            {value:"81",label:"检出-已修改",name:"turquoise"},
            {value:"82",label:"检出-已删除",name:"deeppink"},
            {value:"89",label:"检出-已删除",name:"MediumTurquoise"},
            {value:"90",label:"已检入",name:"CornflowerBlue"},
            {value:"91",label:"提交审批",name:"Chocolate"},
            {value:"92",label:"驳回",name:"violet"},
            {value:"99",label:"撤销",name:"limegreen"},
        ],
        userData:[],
        userList:[],
        changeTypeList:[
          {label:"1-新增",name:"新增",value:1},
          {label:"2-修改",name:"修改",value:2},
          {label:"3-删除",name:"删除",value:3},
        ],
        businessNameList:[],
        data: {
          total: 20,

          rows: []
        },
        
      }
    },
    methods: {
      formatterChangeStatus(row,column,cellValue,index){
        let changeStatus = "";
        this.changeStatusList.forEach(element=>{
          if(element.value==cellValue){
            changeStatus = element.label;
            return ;
          }
        })
        return changeStatus;
      },
      formatterChangeType(row,column,cellValue,index){
        let changeType = "";
        this.changeTypeList.forEach(element=>{
          if(element.value==cellValue){
            changeType = element.name;
            return ;
          }
        })
        return changeType;
      },
      clearSearch() {
        this.query.businessFlag = "";
        this.query.changeType = "";
      },      
      async getList(num) {
        let postObj = deleteKey(this.query);
        postObj.pageNum--;
        if(postObj.businessFlag!=null){
            postObj.businessFlagSearch = postObj.businessFlag;
            this.businessNameList.forEach(element=>{
                if(element.value==postObj.businessFlag){
                    postObj.businessFlagDesc = element.label;
                }
            })
        }else{
            ;
        }
        let info = await queryHisRepository(postObj);
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
    //   this.userList = []; 
      let buttonsInfo = await queryButtons();
    //   buttonsInfo.rows.forEach(element => {
    //     this.userList.push({label:element.userId+"-"+element.userName,name:element.userId+"-"+element.userName,value:element.userId})
    //   });
    //   this.userData = userInfo.rows;
      // const tbody = document.querySelector(".el-table__body-wrapper tbody");
      //
      let businessNameInfo = await queryLeafMenu();
      if(businessNameInfo.resCode==0){
          let list = [];
          businessNameInfo.rows.forEach(element=>{
              list.push({label:element.tranName+"-"+element.name,name:element.name,value:element.tranName});
          })
          this.businessNameList = list;
      }
      this.getList();
    },
  }
</script>
<style>
  .sortable-ghost {
    background: red;
  }
</style>