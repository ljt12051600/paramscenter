
  <template>
    <div>
        <el-dialog :visible="showEdit" :title='titlname' >
        <div >
            <el-form ref="showEdit" :model="brcObj" inline :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:200px;" v-model.trim="brcObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="法人编码" prop="brcCode">
                        <el-input style="width:200px;" v-model.trim="brcObj.brcCode" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="法人名称" prop="brcCode">
                        <el-input style="width:200px;" v-model.trim="brcObj.brcCode" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="启用日期" prop="effectiveDate">
                        <el-date-picker  style="width:200px;" :readonly='flag'
                            v-model.trim="brcObj.effectiveDate" type="date" placeholder="选择日期"> 
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="失效日期" prop="effectiveDate">
                        <el-date-picker  style="width:200px;" :readonly='flag'
                            v-model.trim="brcObj.effectiveDate" type="date" placeholder="选择日期"> 
                        </el-date-picker>
                    </el-form-item>
                   
                </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="doClose(true)">确 认</el-button>
            <el-button type="warning" @click="doClose(false)">取 消</el-button>
        </div>
        </el-dialog>

    </div>
</template>

<script>

import { deleteKey, deepClone } from '@/utils';
import {  instSubRalationTypeList ,instRalationTypeList  } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {createcPdBButtons, updatePdBButtons, deletePdBButtons } from '@/api/parmbusi';
import moment from "moment"

export default {
    name: 'puborgEdit',
    props: ['brcObj','type','showEdit'],
    mixins: [MIXIN],
    data: function() {
        return {
             instSubRalationTypeList,
             instRalationTypeList,
            
            show: false,
            flag: false,
            titlname: '',
      

            rules: {
                brcCode: [
                    {
                        required: true,
                        message: '请输入机构代码',
                        trigger: 'blur'
                    }
                ],
                brcName: [
                    {
                        required: true,
                        message: '请输入机构名称',
                        trigger: 'blur'
                    }
                ],
                belongCountry: [
                    {
                        required: true,
                        message: '请输入所属国家',
                        trigger: 'blur'
                    }
                ],
                brcTyp: [
                    {
                        required: true,
                        message: '请输入机构类型',
                        trigger: 'blur'
                    }
                ],
                location: [
                    {
                        required: true,
                        message: '请输入所在地区',
                        trigger: 'blur'
                    }
                ],
                effectiveDate: [
                    {
                        required: true,
                        message: '请输入生效日期',
                        trigger: 'blur'
                    }
                ],
                
                belongAccBrc: [
                    {
                        required: true,
                        message: '请输入所属核算机构',
                        trigger: 'blur'
                    }
                ],
                corpBrc: [
                    {
                        required: true,
                        message: '请输入法人机构',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        async doClose(bol) {
            
            if(bol){ 
                this.brcObj.brcTyp ='1';
                this.brcObj.effectiveDate = moment(this.brcObj.effectiveDate).format('YYYY-MM-DD');
                this.brcObj.openedTime =  moment(this.brcObj.openedTime).format('YYYY-MM-DD HH:mm:ss');
               
                let  info = '';
                if(this.type=='updat'){
                    info = await updatePdBButtons(this.brcObj);                  
                }else if(this.type=='add'){
                    info = await createcPdBButtons(this.brcObj);
                }else if(this.type=='del'){
                    info = await deletePdBButtons(this.brcObj);                   
                }
                if (info.resCode === '0') {
                    this.$message.success('交易成功');
                    this.$emit("doClose")
                } else {
                    this.$alert('交易失败', info.resMsg);
                }
            }
            else{
                
                this.$emit("doClose")

            }
            
        } ,


    },
    mounted() {
            if(this.type=='updat'){
                this.flag =false;
            }else if (this.type=='add'){
                this.flag =false;
            }else if(this.type=='del'){
                this.flag =true;
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