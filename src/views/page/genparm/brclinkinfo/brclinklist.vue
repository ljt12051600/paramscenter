<template>
    <div>
        <div slot="top" >
            <el-button @click="doAdd" type="primary" >参数增加</el-button>
            <!-- <el-button @click="doEdit"  type="warning" >修改</el-button> -->
            <!-- <el-button @click="deleteAll "  type="danger" >删除</el-button> -->
        </div>
        <div >
            <el-row :gutter="20" >
            <el-col :span="3">
              <div class="item-title"><span class="text-red">*</span> :</div>
            </el-col>
            <el-col :span="5">
              <div class="item-msg">
                <el-input
                  v-model.trim="data.link"
                  placeholder="输入内容"
                  size="mini"
                  clearable/>
              </div>
            </el-col>
          </el-row>
          
          <!-- 添加按钮 -->
          
          <el-row :gutter="20" >
            <el-col :span="3">
              <div  class="item-title" @click = "addShareLink">
                  <i class="el-icon-circle-plus"/>
                </div>
            </el-col>
          </el-row>
          
          <!-- 动态添加参数 -->
        
            <el-row
              v-for="(todo,index) in shareParams"
              :key="index">
              <el-row :gutter="20">
                <el-col :span="3">
                  <div
                    class="item-title"
                    @click = "removeParam(index)"><i class="el-icon-remove"/>
                  </div>
                </el-col>
                <el-col  :span="1"
                  style="margin-top:10px;margin-right:20px;">
                  参数:
                </el-col>
                <el-col :span="3" style="margin-left: -38px;">
                  <el-input
                    v-model.trim="todoObj[todo.value]"
                    placeholder="输入内容"
                    size="mini"
                    clearable/>
                </el-col>
                <el-col :span="3">
                  <el-select
                    v-model="todoObj[todo.type]"
                    placeholder="请选择类型">
                    <el-option
                      v-for="(item, index) in choose"
                      :key="index"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </el-col>
              </el-row>
            </el-row>
 
                    

        </div>
        <div v-if="showEdit">
            <brclinkEdit @doClose="closeAddPage" :brcCode='brcCode' 
                :type='type' :showEdit='showEdit' ></brclinkEdit>
        </div>
    </div>

    
</template>
<script>
import { deleteKey, deepClone } from '@/utils';

import {  instSubRalationTypeList, instRalationTypeList,instSubRalationTypeObj,instRalationTypeObj } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';

import {
    queryPdBButtons,
    queryPagPdBButtons

} from '@/api/parmbusi';
import brclinkEdit from './brclinkedit.vue';
export default {
    mixins: [MIXIN],
    components: {brclinkEdit},
    data() {
        return {
            instSubRalationTypeList,
            instRalationTypeList,
            instSubRalationTypeObj,
            instRalationTypeObj,

            // this.index：0,
	        shareParams: [],
	        todoObj: {},
            data: {
	            link: ""
          },
          showEdit: false,
          brcCode:{},
          type:'',
            
        }
    },

    methods: {
        async doAdd() {
            this.showEdit = true;
            this.type= 'add';
            this.brcCode= {};
        },
        async closeAddPage(){
            this.showEdit = false;
        },

           // 添加参数
	    addShareLink() {
	      this.index += 1;
	      this.shareParams.push({
	        id: this.index,
	        value: `link${this.index}`,
	        type: `type${this.index}`
	      });
	    },
	      // 删除分享参数
	    removeParam(index) {
            this.shareParams.splice(index, 1);
        },
        formatURL(obj) {
      let url = "";
      const tempArr = [];
      const arr = Object.keys(obj);
      let leng = 0;
      arr.map(item => {
        if (item.slice(-1) * 1 > leng) {
          leng = item.slice(-1) * 1;
        }
      });
      for (let i = 1; i <= leng; i += 1) {
        const obj1key = arr.filter(item => item.slice(-1) * 1 === i);
        const obj1 = {};
        obj1key.map(item => {
          obj1[item] = obj[item];
        });
        tempArr.push(obj1);
      }
      tempArr.forEach(v => {
        Object.keys(v).map(key => {
          url += `${key}=${v[key]}&`;
        });
      });
      url = url.substring(0, url.length - 1);
      return `${this.data.link}?${url}`;
    },

        
    },
    mounted() {
        
    }
}
</script>


<style>
.sortable-ghost {
    background: red;
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
  background-color: #f19944 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #f19944;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}

</style>