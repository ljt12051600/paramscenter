
  <template>
    <div>
        <el-dialog :visible="showEdit" width="900px" :title='titlname' >
        <div>
            <el-form ref="showEdit" :model="editObj" inline v-model="$f" :dataForm="dataForm"
            :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:200px;" v-model.trim="editObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    
                    <el-form-item  label=titleObj.brcCode prop="baseCcy">
                        <!-- <el-label v-model.trim="titleObj.brcCode"></el-label> -->
                        <el-input style="width:200px;" v-model.trim="editObj.baseCcy" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="swift币种号" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="货币名称" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="币种英文名称" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="币种简称" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="小数点位数" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="国家/地区代码" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="找零最小券别" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="借方日利率转换天数" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="贷方日利率转换天数" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="利息精确单位" prop="brcName">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="标志" prop="baseCcy">
                        <el-select style="width:200px;" v-model="editObj.baseCcy" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in ccyTypeList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
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
import {  ccyTypeList   } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {createcPdBButtons, updatePdBButtons, deletePdBButtons,queryPagPdBButtons,queryCompButtons } from '@/api/parmbusi';

import PUBPARM from '@views/mixin/baseparm';


export default {
    name: 'pubccyEdit',
    props: ['editObj','type','showEdit','titleObj'],
    mixins: [MIXIN,PUBPARM],
    data: function() {
        return {
            ccyTypeList,
            
            show: false,
            flag: false,
            titlname: '',

            f$:{},
            dataForm:[
                {
                type:'el-input',
                field:'goods_name',
                title:'商品名称'
                },
                {
                type:'el-select',
                field:'goods_type',
                title:'商品种类'
                },
                {
                type:'el-datePicker',
                field:'created_at',
                title:'创建时间'
                }
            ],

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
                console.log(this.titleObj.brcCode);
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
        // console.log(typeof(this.tableData));
            this.getPubBrcList();
            if (this.type=='add'){
                this.flag =false;
                this.titlname = '增加币种';
            }else if(this.type=='copy'){
                this.flag =false;
                this.titlname = '复制增加币种';
            }else if(this.type=='updat'){   
                this.flag =false;
                this.titlname = '修改币种信息';
            }else if(this.type=='del'){
                this.flag =true;
                this.titlname = '删除币种';
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