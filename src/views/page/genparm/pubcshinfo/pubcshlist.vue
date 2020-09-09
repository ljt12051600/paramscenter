<template>
  <div class='useradd height'>
      <div class='btnDiv'>
            <el-button @click="addAll" icon='el-icon-plus' size='mini' type="primary">新增</el-button>
            <el-button @click="submit"  size='mini' type="primary">提交</el-button>
            <!-- <el-button @click="editAll" icon='el-icon-edit' size='mini' type="success">批量编辑</el-button>
            <el-button @click="delectAll" icon='el-icon-edit' size='mini' type='danger'>批量删除</el-button> -->
      </div>
        <el-table :data="tabledatas" stripe border @selection-change="handleSelectionChange"   size='small' :header-cell-style="{background:'#EFF3F8',color:'#606266'}">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="属性编码" sortable prop="name">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.name"></el-input>
                    </span>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="属性名称" sortable prop="name">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.name"></el-input>
                    </span>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="属性值选择方式">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.sex"></el-input>
                    </span>
                    <span v-else>{{scope.row.sex}}</span>
                </template>
            </el-table-column>
            <el-table-column label="关键字标志">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.sex"></el-input>
                    </span>
                    <span v-else>{{scope.row.sex}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否子组件">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.sex"></el-input>
                    </span>
                    <span v-else>{{scope.row.sex}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否子必填">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.sex"></el-input>
                    </span>
                    <span v-else>{{scope.row.sex}}</span>
                </template>
            </el-table-column>
            <el-table-column label="属性检查">
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.phone"></el-input>
                    </span>
                    <span v-else>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size='mini' type="text" @click="edit(scope.row,scope.$index)">{{scope.row.show?'保存':"编辑"}}</el-button>
                    <el-button size='mini' type="text" @click="copy(scope.row,scope.$index)" >复制</el-button>
                    <!-- <el-button size='mini' type="text" @click="delect(scope.$index)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
      return {
          flag: false,
          tabledatas: [
                { name: '小明', sex: '男' ,show:false,status:false,date:'2020-05-30',phone:15000000000},
                { name: '小红', sex: '女' ,show:false,status:true,date:'2020-05-28',phone:18317773787},
                { name: '5', sex: '女' ,show:false,status:true,date:'2020-05-20',phone:18317773782},
          ],
         multipleSelection: [],
      }
    },
    methods: {
        //新增
        addAll() {
            this.tabledatas.push({name: '', sex: '' ,show:false,status:true,date:'',phone:''});
            // console.log(this.tabledatas.length);
            // console.log(this.tabledatas[this.tabledatas.length-1].show = true);
            this.tabledatas[this.tabledatas.length-1].show = true;
            
        },
       edit(row, index) {
            row.show = row.show ? false : true;
            Vue.set(this.tabledatas, index, row)
        },
        editAll() { 
            this.tabledatas.map((i, index) => {
                i.show = true
                Vue.set(this.tabledatas, index, i)
            })
        },
        // 单个复制
        copy(val,index) { 
            this.tabledatas.splice(index, 0,JSON.parse(JSON.stringify(val)))
        },  
        // 单个删除
        delect(index) {
            this.tabledatas.splice(index, 1)
        },
        
        //批量删除
        delectAll() {
            for (let i = 0; i < this.tabledatas.length; i++) {
                const element = this.tabledatas[i];
                element.id = i
            }
            if (this.multipleSelection.length == 0) this.$message.error('请先至少选择一项')
            this.multipleSelection.forEach(element => {
                this.tabledatas.forEach((e, i) => {
                    if (element.id == e.id) {
                        this.tabledatas.splice(i, 1)
                    }
                });
            });
        },
        submit() {
                this.tabledatas.map((i, index) => {
                    i.show = false
                    Vue.set(this.tabledatas, index, i)
                });
                console.log(this.tabledatas);
            },
        //选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // change:function(index,row){
        //     console.log(index,row);
        // },
        
    }
}
</script>
<style scoped lang="less">
.useradd{
    padding:20px;
    box-sizing: border-box;
    background-color: #fff
}
.btnDiv{
    margin-bottom: 20px;
}
</style>