
  <template>
    <div>
        <el-dialog :visible="showAdd" width="600px" :title="comptitle">
            <div>
                <el-form
                    ref="formAdd"
                    :model="addObj"
                    :rules="rules"
                    size="small"
                    label-width="80px"
                >
                    <el-form-item label="序号" prop="id" v-if="flagc">
                        <el-input v-model.trim="addObj.id" style="width: 370px;" :readonly="flagc" />
                    </el-form-item>
                    <el-form-item label="组件编码" prop="compCode">
                        <el-input
                            style="width:370px;"
                            v-model.trim="addObj.compCode"
                            :readonly="flagc"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="组件名称" prop="compName">
                        <el-input
                            style="width:370px;"
                            v-model.trim="addObj.compName"
                            :readonly="flag"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="组件分类" prop="compClassification">
                        <el-select
                            style="width:370px;"
                            :disabled="flag"
                            v-model="addObj.compClassification"
                            @change="checkFlag1"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in compKindList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="产品分类">
                        <el-select
                            style="width:370px;"
                            :disabled="flag1"
                            v-model="addObj.productParamClassification"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                :key="index+'cc'"
                                v-for="(item,index) in compPrdtList"
                                :label="item.value+'-'+item.name"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="属性检查" prop="sysId">
                        <el-input
                            style="width:370px;"
                            v-model.trim="addObj.inspectionRules"
                            :readonly="flag"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doCommit">确 认</el-button>
                <el-button type="warning" @click="doCansel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { deleteKey, deepClone } from '@/utils';
import Vue from 'vue';
import { compKindList, compPrdtList  } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { createCompButtons,updateCompButtons,deleteCompButtons } from '@/api/parmbusi';
export default {
    name: 'compEdit',
    props: ['addObj','type','showAdd'],
    mixins: [MIXIN],
    data: function() {
        return {
            compKindList,
            compPrdtList,
            
            flag: false,
            flagc: false,
            flag1:false,
            comptitle: '',
            
            
            oldName: "",
            postObj: {},
      

            rules: {
                compCode: [
                    {
                        required: true,
                        message: '请输入组件编码',
                        trigger: 'blur'
                    }
                ],
                compName: [
                    {
                        required: true,
                        message: '请输入组件名称',
                        trigger: 'blur'
                    }
                ],
                compClassification: [
                    {
                        required: true,
                        message: '请输入组件分类',
                        trigger: 'blur'
                    }
                ],
                productParamClassification: [
                    {
                        required: true,
                        message: '请输入产品分类',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        checkFlag1(){
            if(this.addObj.compClassification=='3'){
                this.flag1=false;
            }else{
                this.addObj.productParamClassification='';
                this.flag1=true; 
            }
        },
        doCommit(){
            if(this.type=='del'){
                this.doDel();
            }else{
                console.log('2323');
                if(this.addObj.compCode=='' || this.addObj.compCode== undefined){
                    return this.$message.error('组件编码不能为空!');
                }else if(this.addObj.compName==''|| this.addObj.compName== undefined){
                    return this.$message.error('组件名称不能为空!');
                }
                else if(this.addObj.compClassification==''|| this.addObj.compClassification== undefined){
                    return this.$message.error('组件分类不能为空!');
                }else{
                    this.doClose();
                }
                
            }
        },
        doCansel(){
            this.$emit("doClose")
        },

        doDel() { 
            this.$msgbox({
                title: '确认删除此组件吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        let postObj = {
                            ids: this.addObj.id,
                            compName: this.addObj.compName
                        };
                        let  info = await deleteCompButtons(postObj);
                        if (info.resCode === '0') {
                            this.$message.success('删除成功');
                            this.$emit("doClose");
                        }
                        
                        done();
                    } else if(action =='cancel') {
                        console.log('22');
                        done();
                    }else{
                        done();
                    }
                }
            }).catch(e => e);
        },
        
        async doClose() {
                
                let  info = '';
                if(this.type=='add'){
                    console.log('3333');
                    info = await createCompButtons(this.addObj);   
                } else if(this.type=='copy'){  
                    //若不改名字，原来名字后加复制
                    if(this.oldName==this.addObj.compName){
                        this.addObj.compName+="复制";
                    }
                    info = await createCompButtons(this.addObj);   
                }else   if(this.type=='updat'){   
                    info = await updateCompButtons(this.addObj);   
                }
                if (info.resCode === '0') {
                        this.$message.success('交易成功');
                        this.$emit("doClose")
                    } else {
                        this.$alert('交易失败', info.resMsg);
                    }
            
        },


    },
    mounted() {
         if(this.type=='updat'){
                this.flag =false;
                this.flagc =true;
                this.comptitle = "修改组件信息";
            }else if (this.type=='add' ){
                this.flagc =false;
                this.flag =false;
                this.comptitle = "新增组件";
            }else if (this.type == 'copy'){
                this.oldName=this.addObj.compName  ;
                this.flagc =false;
                this.flag =false;
                this.comptitle = "复制增加组件";
            }else if(this.type=='del'){
                this.comptitle = "删除组件";
                this.flag =true;
                this.flagc =true;
            }
            this.flag1=this.flag;
    },

    
};
</script>

})

