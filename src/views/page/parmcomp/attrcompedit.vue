
  <template>
    <div>
        <el-dialog :visible="showEdit" :title='titlEdit' :modal-append-to-body="false">
        <div >
            <el-form ref="showEdit" :model="attrEditObj" inline :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:300px;" v-model.trim="attrEditObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="组件编码" prop="compCode" v-if="flagAdd">
                        <el-input style="width:300px;" v-model.trim="attrEditObj.compCode" 
                        :readonly='false' ></el-input>
                    </el-form-item>
                    <el-form-item label="组件名称" prop="compName" v-if="flagAdd">
                        <el-input style="width:300px;" v-model.trim="attrEditObj.compName" 
                        :readonly='false' ></el-input>
                    </el-form-item>
                    <el-form-item label="属性编号" prop="compPropertyCode" v-if="flagAdd2"> 
                        <el-input style="width:300px;" v-model.trim="attrEditObj.compPropertyCode" 
                        :readonly='flag' ></el-input>
                    </el-form-item>
                    <el-form-item label="属性名称" prop="compPropertyName">
                        <el-input style="width:300px;" v-model.trim="attrEditObj.compPropertyName" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="关键字标志" prop="selectionMethod">
                        <el-select style="width:300px;" v-model="attrEditObj.selectionMethod" clearable placeholder>
                            <el-option :key="index+'cc'" v-for="(item,index) in isList" :disabled='flag'
                                :label="item.value+'-'+item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="属性检查" prop="inspectionRules">
                        <el-input style="width:300px;" v-model.trim="attrEditObj.inspectionRules" :readonly='flag'></el-input>
                    </el-form-item>
                   
                </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="doType">确 认</el-button>
            <el-button type="warning" @click="doRet">取 消</el-button>
        </div>
        </el-dialog>

    </div>
</template>

<script>

import { deleteKey, deepClone } from '@/utils';
import { isList  } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {updatePCPButtons, deletePCPButtons,createPCPButtons } from '@/api/parmbusi';
import moment from "moment"

export default {
    name: 'attrcompEdit',
    props: ['attrEditObj','type','showEdit'],
    mixins: [MIXIN],
    data: function() {
        return {
             isList,
            
            show: false,
            flag: false,
            flagAdd: false,
            flagAdd2: true,
            titlEdit: '',
            oldName: '',
            attrCopyObjs: [{
                id: this.attrEditObj.id,
                compPropertyName: '',
                selectionMethod: '',//下拉框码值转为string
                inspectionRules: ''
                // popId: item.popId
            }],
      

            rules: {
                compPropertyName: [
                    {
                        required: true,
                        message: '请输入属性名称',
                        trigger: 'blur'
                    }
                ],
                compPropertyCode:[
                    {
                        required: true,
                        message: '请输入属性编码',
                        trigger: 'blur'
                    }
                    
                ]
            }
        };
    },
    methods: {
        doType(){
            if(this.type=='del'){
                
                this.doDel();
            }else{
                if(this.attrEditObj.compPropertyName=="" ||
                    this.attrEditObj.compPropertyName== undefined){
                        return this.$message.error('属性名称不能为空');
                    }
                        
                this.doClose();
                
            }
        },
        //删除属性，因if层数太多,删除单独处理
        doDel() { 
            this.$msgbox({
                title: '确认删除此组件吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        this.attrEditObj.ids = this.attrEditObj.id;
                        let  info = await deletePCPButtons(this.attrEditObj);
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
        //取消 返回上一页
        doRet() {
            this.$emit("doClose")
        },
        async doClose() {
                var  info = ''; 
                if(this.type=='updat'){
                    if(this.attrEditObj.compPropertyCode=="" ){
                        return this.$message.error('属性编码不能为空!');
                    }
                    info = await updatePCPButtons(this.attrEditObj); 
                }else if(this.type=='add'){
                    
                    this.attrCopyObjs[0].compPropertyName= this.attrEditObj.compPropertyName;
                    this.attrCopyObjs[0].selectionMethod= this.attrEditObj.selectionMethod;
                    this.attrCopyObjs[0].inspectionRules= this.attrEditObj.inspectionRules;
                    info = await createPCPButtons({
                            compCode: this.attrEditObj.compCode,
                            list: this.attrCopyObjs
                        });
                    
                }else if(this.type=='copy'){
                    
                    if(this.oldName==this.attrEditObj.compPropertyName){
                           this.attrCopyObjs[0].compPropertyName= this.attrEditObj.compPropertyName+"复制";
                        }else {
                            this.attrCopyObjs[0].compPropertyName= this.attrEditObj.compPropertyName;
                        }
                        
                    this.attrCopyObjs[0].selectionMethod= this.attrEditObj.selectionMethod;
                    this.attrCopyObjs[0].inspectionRules= this.attrEditObj.inspectionRules;
                    info = await createPCPButtons({
                            compCode: this.attrEditObj.compCode,
                            list: this.attrCopyObjs
                        });
                }

                if (info.resCode === '0') {
                    this.$message.success('交易成功');
                    this.$emit("doClose")
                } else {
                    this.$alert('交易失败', info.resMsg);
                }
            
            
        } 

    },
    mounted() {
        this.oldName = this.attrEditObj.compPropertyName;
        if(this.attrEditObj.selectionMethod =='' ||
            this.attrEditObj.selectionMethod ==undefined){
            this.attrEditObj.selectionMethod==''
        }else{
            this.attrEditObj.selectionMethod = this.attrEditObj.selectionMethod+"";
        }
        
        if(this.type=='add'){
            this.flag =false;
            this.flagAdd = true;
            this.flagAdd2 = false;
            this.titlEdit = '新增组件属性';
        }else if(this.type=='updat'){
                this.flag =false;
                this.flagAdd = false;
                this.flagAdd2 = true;
                this.titlEdit = '修改组件属性信息';
            }else if (this.type=='copy'){
                this.flag =false;
                this.flagAdd = false;
                this.flagAdd2 = true;
                this.titlEdit = '复制新增组件属性';
            }else if(this.type=='del'){
                this.flag =true;
                this.flagAdd = false;
                this.flagAdd2 = true;
                this.titlEdit = '删除组件属性';
            }
    },

    
};
</script>

})

<style>
.sortable-ghost {
    background: red;
}
</style>