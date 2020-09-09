
  <template>
    <div>
        <el-dialog :visible="showEdit"  :title='titlname' >
        <div>
            <el-form ref="showEdit" :model="editObj"  :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:200px;" v-model.trim="editObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="代码" prop="baseCcy">
                        <el-input style="width:200px;" v-model.trim="editObj.baseCcy" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="标准代码" prop="baseCcy">
                        <el-input style="width:200px;" v-model.trim="editObj.baseCcy" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="国家名称" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="国家英文名称" prop="baseCcy">
                        <el-input style="width:200px;" v-model.trim="editObj.baseCcy" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="利息税计划编码" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
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
import {  loanSignList,cshAttrList   } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {createcPdBButtons, updatePdBButtons, deletePdBButtons,queryPagPdBButtons,queryCompButtons } from '@/api/parmbusi';

import PUBPARM from '@views/mixin/baseparm';


export default {
    name: 'pubcountryEdit',
    props: ['editObj','type','showEdit'],
    mixins: [MIXIN,PUBPARM],
    data: function() {
        return {
            loanSignList,
            cshAttrList,
            
            show: false,
            flag: false,
            titlname: '',

            rules: {
                brcCode: [
                    {
                        required: true,
                        message: '请输入系统编码',
                        trigger: 'blur'
                    }
                ],
                brcName: [
                    {
                        required: true,
                        message: '请输入系统名称',
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
                this.doClose();
            }
        },
        doDel() { 
            this.$msgbox({
                title: '确定要删除吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        this.editObj.ids = this.editObj.id;
                        let  info = await deletePdBButtons(this.editObj);
                        if (info.resCode === '0') {
                            this.$message.success('删除成功');
                            this.$emit("doClose");
                        }
                        done();
                    } else if(action =='cancel') {
                        done();
                    }else{
                        done();
                    }
                }
            }).catch(e => e);
        },
        doRet() {
            this.$emit("doClose")
        },
        async doClose() {
            
                this.editObj.brcTyp ='1';
                let  info = '';
                if(this.type=='updat'){
                    info = await updatePdBButtons(this.editObj);                  
                }else if(this.type=='add'){
                    info = await createcPdBButtons(this.editObj);
                }else if(this.type=='copy'){
                    
                    info = await createcPdBButtons(this.editObj);                   
                }
                if (info.resCode === '0') {
                    this.$message.success('交易成功');
                    this.$emit("doClose")
                } else {
                    this.$alert('交易失败', info.resMsg);
                }
            
            
        } ,

        
    },
    mounted() {
         console.log("@@@"+this.editObj.brcCode);
            this.getPubBrcList();
            if (this.type=='add'){
                this.flag =false;
                this.titlname = '增加现金项目代码';
            }else if(this.type=='copy'){
                this.flag =false;
                this.titlname = '复制现金项目代码';
            }else if(this.type=='updat'){   
                this.flag =false;
                this.titlname = '修改现金项目代码信息';
            }else if(this.type=='del'){
                this.flag =true;
                this.titlname = '删除现金项目代码';
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