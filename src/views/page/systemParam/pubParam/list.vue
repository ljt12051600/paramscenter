<template>
  <div>
    <system-table>
      <div slot="top">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="搜索条件">
            <el-input style="width:200px;" v-model.trim="query.tblSearch"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="search">
        <el-button @click="queryList" type="primary">查询</el-button>
        <el-button @click="clearSearch" type="warning">清除</el-button>
      </div>
      <div slot="action">
        <el-button @click="doAdd" type="primary">添加</el-button>
      </div>
      <div slot="body">
        <el-table border ref="table" align="center" :data="data.rows" style="width: 100%;">

          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column align="center" prop="paramCode" label="参数代码" />
          <el-table-column align="center" prop="paramName" label="参数名称" />
          <el-table-column align="center" prop="paramValue" label="参数值" />
          <el-table-column label="操作" width="300" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="doEdit(scope.row,scope.index)" type="primary">修改</el-button>
              <el-button @click="doDelete(scope.row,scope.index)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页组件-->
        <div v-if="data.total" class="pagination">
          <el-pagination background layout="total,pager,jumper,sizes" :current-page="query.pageNum"
            :page-sizes="[10,25,50]" :page-size="query.numPerPage" :total="data.total"
            @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
        </div>

      </div>
    </system-table>

    <!-- 新增和编辑弹框 -->
    <div v-if="showComponent">
        <dialogComponent @closeDialog="closeComponent" :showDialog="showComponent" :reqType="reqType" :reqObj="reqObj"></dialogComponent>
    </div>

    

  </div>
</template>

<script>
  import { deleteKey, deepClone } from "@/utils"
  import MIXIN from "@views/mixin/button"
  import { querySysButtons, deleteSysButtons, createSysButtons, updateSysButtons, querySysButtonsListAll } from "@/api/system"
  import {createParam,updateParam,deleteParam,queryParamList} from '@/api/systemParam';
  import dialogComponent from './edit.vue';
  export default {
    mixins: [MIXIN],
    components:{dialogComponent},
    data() {
      return {
        showComponent:false,
        reqType:"add",
        reqObj:{},
        query: {
          tblSearch: "",
          pageNum: 1,
          numPerPage: 10,

        },

        showAdd: false,
        addObj: {
          buttonId: "",
          buttonName: "",
          popId: "",
        },
        showEdit: false,
        editObj: {
          buttonId: "",
          buttonName: "",
          popId: "",
        },

        data: {
          total: 20,

          rows: []
        },
        rules: {
          paramCode: [
            { required: true, message: '请输入参数代码', trigger: 'blur' },
          ],
          paramName: [
            { required: true, message: '请输入参数名称', trigger: 'blur' },
          ],

        }
      }
    },
    methods: {
      //关闭组件
      closeComponent(result){
          if(result){
              this.getList();
          }
          this.showComponent = false;
      },  
      clearSearch() {
        this.query.tblSearch = "";
      },
      doDelete(item) {
        let postObj = { id: item.id };
        this.$msgbox({
          title: "确认删除此按钮吗？",
          beforeClose: async (action, instance, done) => {
            if (action == "confirm") {
              let info = await deleteParam(postObj);
              if (info.resCode === "0") {
                this.$message.success('删除成功');
                this.getList();
              }
              done();

            }
            else {
              done();
            }
          }
        })



      },
      doAdd() {
        // this.showAdd = true;
        // this.addObj = {};
        this.reqType = "add";
        this.showComponent = true;

      },
      
      doEdit(item) {
        // this.showEdit = true;
        // this.editObj = {
        //   id: item.id,
        //   paramCode: item.paramCode,
        //   paramName: item.paramName,
        //   paramValue: item.paramValue,
        // }
        this.reqObj = item;
        this.reqType = "edit";
        this.showComponent = true;
      },
      
      async getList(num) {

        let postObj = deleteKey(this.query);
        postObj.pageNum--;

        let info = await queryParamList(postObj);
        console.log(info);
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
    , mounted() {
      this.getList();
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      
    },
  }
</script>
<style>
  .sortable-ghost {
    background: red;
  }
</style>