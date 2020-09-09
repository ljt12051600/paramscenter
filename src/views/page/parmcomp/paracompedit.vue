
  <template>
    <div>
        <el-dialog :visible="showEdit"  width="900px" :title='comptitle'>
        <div>
            <el-form ref="showEdit" :model="attrEditObj" inline :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-lable-item for='name'><span>{{message}}</span></el-lable-item>
                        <el-input style="width:200px;" v-model.trim="attrEditObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="机构代码" prop="brcCode">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.brcCode" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="机构名称" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.brcName" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="机构简称" prop="brcSrt">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.brcSrt" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="机构类型" prop="brcTyp">
                        <el-select style="width:200px;" v-model="attrEditObj.brcTyp" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in brcattrList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属核算机构" prop="belongAccBrc"> 
                        <el-input style="width:200px;" v-model.trim="attrEditObj.belongAccBrc" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="法人机构" prop="corpBrc">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.corpBrc" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="生效日期" prop="effectiveDate">
                        <el-date-picker  style="width:200px;" :readonly='flag'
                            v-model.trim="attrEditObj.effectiveDate" type="date" placeholder="选择日期"> 
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属国家" prop="belongCountry">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.belongCountry" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" prop="location">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.location" :readonly='flag'></el-input>
                    </el-form-item>

                    <el-form-item label="基础币种" prop="baseCcy">
                        <el-select style="width:200px;" v-model="attrEditObj.baseCcy" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in ccyList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="所属机构" prop="belongBrc">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.belongBrc" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="所在城市" prop="belongCity">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.belongCity" :readonly='flag'></el-input>
                    </el-form-item>
                    
                    <el-form-item label="分行代码" prop="branchCode">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.branchCode" :readonly='flag'></el-input>
                    </el-form-item>
                    
                    <el-form-item label="联系人" prop="contact">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.contact" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" prop="contactTel">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.contactTel" :readonly='flag'></el-input>
                    </el-form-item>
                    
                    
                    <el-form-item label="是否自贸区机构" prop="isFtaBrc">
                        <el-select style="width:200px;" v-model="attrEditObj.isFtaBrc" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in isList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="自贸区代码" prop="ftaCode">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.ftaCode" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="是否自动开立内部户" prop="isAutoOpenInsideAcct">
                        <el-select style="width:200px;" v-model="attrEditObj.isAutoOpenInsideAcct" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in isList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否利息税征收" prop="isInterestTaxLevied">
                        <el-select style="width:200px;" v-model="attrEditObj.isInterestTaxLevied" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in isList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="开业时间" prop="openedTime" class="block">
                        
                        <el-date-picker style="width:200px;" v-model.trim="attrEditObj.openedTime" :readonly='flag'
                            type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="零钞配置最小金额" prop="smachangeConfMinAmt" >
                        <el-input style="width:200px;" v-model.trim="attrEditObj.smachangeConfMinAmt" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="子系统" prop="subSysId">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.subSysId" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="邮编" prop="zip">
                        <el-input style="width:200px;" v-model.trim="attrEditObj.zip" :readonly='flag'></el-input>
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
import {  isList ,ccyList,brcattrList,brcattrObj  } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {createcPdBButtons, updatePdBButtons, deletePdBButtons } from '@/api/parmbusi';
import moment from "moment"

export default {
    name: 'paracompEdit',
    props: ['attrEditObj','type','showEdit','tableData'],
    mixins: [MIXIN],
    data: function() {
        return {
            isList,
            ccyList,
            brcattrList,
            brcattrObj,

            show: false,
            flag: false,
            comptitle: '',


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
                title: '确认删除此组件吗？',
                beforeClose: async (action, instance, done) => {
                    if (action == 'confirm') {
                        this.attrEditObj.ids = this.attrEditObj.id;
                        let  info = await deletePdBButtons(this.attrEditObj);
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
        doRet() {
            this.$emit("doClose")
        },
        async doClose() {
                this.attrEditObj.brcTyp ='1';
                this.attrEditObj.effectiveDate = moment(this.attrEditObj.effectiveDate).format('YYYY-MM-DD');
                this.attrEditObj.openedTime =  moment(this.attrEditObj.openedTime).format('YYYY-MM-DD HH:mm:ss');

                let  info = '';
                if(this.type=='updat'){
                    info = await updatePdBButtons(this.attrEditObj);                  
                }else if(this.type=='add'){
                    info = await createcPdBButtons(this.attrEditObj);
                }else if(this.type=='copy'){
                    info = await createcPdBButtons(this.attrEditObj);                   
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
        console.log(this.tableData);
        console.log(this.attrEditObj);
            if(this.type=='updat'){
                this.flag =false;
                this.comptitle = '修改机构信息';
            }else if (this.type=='add'){
                this.flag =false;
                this.comptitle = '增加机构';
            }else if(this.type=='copy'){
                this.flag =false;
                this.comptitle = '复制增加机构';
            }else if(this.type=='del'){
                this.flag =true;
                this.comptitle = '删除机构';
            }
    },

    
};
</script>

})
