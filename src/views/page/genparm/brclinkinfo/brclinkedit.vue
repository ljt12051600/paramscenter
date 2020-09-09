
  <template>
    <div>
        <el-dialog :visible="showEdit" :title='titlname' >
        <div>
            

    <el-form >
      <el-form-item v-for="(inputItem, key) in formList"
                    :key="key"
                    :required="inputItem.required"
                    v-if="inputItem.type == 'input'"
                    :label="inputItem.inputLabel">
        <el-input
          :ref="inputItem.modelName"
          :type="inputItem.inputType"
          :disabled="inputItem.disabled"
          :placeholder="inputItem.placeholder"
          v-model="inputItem.defaultValue"></el-input>
      </el-form-item>
      <!--select-->
      <el-form-item v-for="(inputItem, key) in formList"
                    :key="key"
                    :required="inputItem.required"
                    v-if="inputItem.type == 'select'"
                    :label="inputItem.inputLabel">
        <el-select v-model="inputItem.defaultValue"
                   :multiple=inputItem.multiple?true:false
                   :disabled="inputItem.disabled"
                   :placeholder="inputItem.placeholder">
          <el-option v-for="(item, key) in inputItem.options"
                     :key="key" :value="item.value"
                     :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <!--select_input_group-->
      <el-form-item class="select_input_group"
                    v-for="(inputItem, key) in formList"
                    :key="key"
                    :required="inputItem.required"
                    v-if="inputItem.type == 'select_input_group'"
                    :label="inputItem.inputLabel">
        <div class="group" v-for="(group_item, key) in inputItem.groupList" :key="key">
          <el-input
            v-if="group_item.type == 'input'"
            :ref="group_item.modelName"
            :type="group_item.inputType"
            :disabled="group_item.disabled"
            :placeholder="group_item.placeholder"
            v-model="group_item.defaultValue"></el-input>
          <el-select v-if="group_item.type == 'select'"
                     :model="group_item.defaultValue"
                     :disabled="group_item.disabled"
                     :placeholder="group_item.placeholder">
            <el-option v-for="(item, key) in group_item.options"
                       :key="key" :value="item.value"
                       :label="item.label">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
 
      <el-form-item  class="time_picker"
                     v-for="(inputItem, key) in formList"
                    :key="key"
                    :required="inputItem.required"
                    v-if="inputItem.type == 'time_picker'"
                    :label="inputItem.inputLabel">
                        <el-time-picker
                        format="HH:mm:ss"
                        v-model="inputItem.defaultValue"
                        :picker-options="inputItem.pickerOptions"
                        :placeholder="inputItem.placeholder">
                        </el-time-picker>
 
      </el-form-item>
      <!--textArea-->
      <el-form-item v-for="(inputItem, key) in formList"
                    :key="key"
                    :required="inputItem.required"
                    v-if="inputItem.type == 'textarea'"
                    :label="inputItem.inputLabel">
      <el-input
        :type="inputItem.inputType"
        :disabled="inputItem.disabled"
        :placeholder="inputItem.placeholder"
        v-model="inputItem.defaultValue"></el-input>
      </el-form-item>
      <!--<InputBar v-for="(item, key) in FormData.formList" :key="key" :inputItem="item"></InputBar>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="handleFormBarForm">确定</el-button>-->
        <!--<el-button>取消</el-button>-->
      <!--</el-form-item>-->
    </el-form>
            <el-form ref="showEdit" :model="brcCode" inline :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:200px;" v-model.trim="brcCode.id" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="机构代码" prop="brcCode">
                        <el-select style="width:200px;" v-model="brcCode.brcCode" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in pubBrcList" :label="item.brcCode+'-'+item.brcName" :value="item.brcCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关系种类" prop="baseCcy">
                        <el-select style="width:200px;" v-model="brcCode.baseCcy" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in instSubRalationTypeList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关系子类" prop="baseCcy">
                        <el-select style="width:200px;" v-model="brcCode.baseCcy" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in instRalationTypeList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="归属机构" prop="belongBrc">
                        <el-input style="width:200px;" v-model.trim="brcCode.belongBrc" :readonly='flag'></el-input>
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
import {  instSubRalationTypeList ,instRalationTypeList  } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {createcPdBButtons, updatePdBButtons, deletePdBButtons,queryPagPdBButtons,queryCompButtons } from '@/api/parmbusi';
import PUBPARM from '@views/mixin/baseparm';


export default {
    name: 'brclinkEdit',
    props: ['brcCode','type','showEdit'],
    mixins: [MIXIN],
    data: function() {
        return {
            instSubRalationTypeList,
            instRalationTypeList,
            queryCompButtons,
            
            show: false,
            flag: false,
            titlname: '',
            
                formList:[
                    {type: 'input', inputType: 'text', disabled: false, inputLabel: '用户名称', modelName: 'userName', placeholder: '请输入用户名', required: true, defaultValue: null},
                    {type: 'input', inputType: 'password', disabled: false, inputLabel: '用户密码', modelName: 'userPwd', placeholder: '请输入密码', required: true, defaultValue: null},
                    {type: 'select', inputType: 'select', disabled: true, inputLabel: '用户级别', modelName: 'userLevel', placeholder: '请输入选择用户级别', options: [{value: '0', label: '超级管理员'}, {value: '1', label: '测试管理员'}], required: true, defaultValue: null},
                    {type: 'textarea', inputType: 'textarea', disabled: false, inputLabel: '用户描述', modelName: 'userDescription', placeholder: '请输入用户描述', required: false, defaultValue: null}
                ],
            

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
                        this.brcCode.ids = this.brcCode.id;
                        let  info = await deletePdBButtons(this.brcCode);
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
            
                this.brcCode.brcTyp ='1';
                this.brcCode.effectiveDate = moment(this.brcCode.effectiveDate).format('YYYY-MM-DD');
                this.brcCode.openedTime =  moment(this.brcCode.openedTime).format('YYYY-MM-DD HH:mm:ss');
               
                let  info = '';
                if(this.type=='updat'){
                    info = await updatePdBButtons(this.brcCode);                  
                }else if(this.type=='add'){
                    info = await createcPdBButtons(this.brcCode);
                }else if(this.type=='copy'){
                    info = await createcPdBButtons(this.brcCode);                   
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
            if (this.type=='add'){
                this.flag =false;
                this.titlname = '增加机构关系';
            }else if(this.type=='copy'){
                this.flag =false;
                this.titlname = '复制增加机构关系';
            }else if(this.type=='updat'){   
                this.flag =false;
                this.titlname = '修改机构关系信息';
            }else if(this.type=='del'){
                this.flag =true;
                this.titlname = '删除机构关系';
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