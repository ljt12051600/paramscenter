
  <template>
    <div>
        <el-dialog :visible="showEdit" :title='titlname' width="900px">
        <div>
            <el-form ref="showEdit" :model="editObj" inline :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:200px;" v-model.trim="editObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    
                    <el-form-item label="机构类别" prop="belongBrc">
                        <el-input style="width:200px;" v-model.trim="editObj.brcCode" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="类别描述" prop="belongBrc">
                        <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="是否自贸区机构" prop="isFtaBrc">
                        <el-select style="width:200px;" v-model="editObj.brcName" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in isList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <template v-for="(col) in tableData" >
                        <el-form-item :show-overflow-tooltip="true" 
                            :prop="col.dataItem" :label="col.dataName" 
                            :key="col.dataItem">
                            <el-select style="width:200px;" v-model="editObj.brcName" :disabled='flag' clearable placeholder="请选择"  >
                                <el-option :key="index+'cc'" v-for="(item,index) in isList" :label="item.value+'-'+item.name" :value="item.value"
                                ></el-option>
                                
                            </el-select>
                             <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                        </el-form-item>
                    </template>

                    <!-- <template v-for="(col) in tableData">
                        <el-form-item :show-overflow-tooltip="true" 
                        :prop="col.dataItem" :label="col.dataName" 
                        :key="col.dataItem">
                            <el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                        </el-form-item>
                    </template> -->

                    
                    <!-- <template v-for="(col) in tableData">
                    <el-form-item 
                        sortable
                        :show-overflow-tooltip="true"
                        :prop="col.dataItem"
                        :label="col.dataName"
                        :key="col.dataItem"
                        width="124px"
                    >
                        el-input style="width:200px;" v-model.trim="editObj.brcName" :disabled='flag'></el-input>
                    </el-form-item >
                    </template> -->
                    
                   
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
import {  isList   } from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import {createcPdBButtons, updatePdBButtons, deletePdBButtons,queryPagPdBButtons,queryCompButtons } from '@/api/parmbusi';
import PUBPARM from '@views/mixin/baseparm';


export default {
    name: 'brctypeEdit',
    props: ['editObj','type','showEdit'],
    mixins: [MIXIN,PUBPARM],
    data: function() {
        return {
            isList,
            
            
            show: false,
            flag: false,
            titlname: '',

            tableData: [
                {
                    dataItem: 'brcCode',
                    dataName: '机关代码'
                },
                {
                    dataItem: 'brcName',
                    dataName: '机构名称'
                },
                {
                    dataItem: 'brcSrt',
                    dataName: '机构简称'
                },
                {
                    dataItem: 'corpBrc',
                    dataName: '机构法人'
                },
                {
                    dataItem: 'belongAccBrc',
                    dataName: '所属核算机构'
                },
                {
                    dataItem: 'belongCountry',
                    dataName: '所在国家'
                }
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
                this.editObj.effectiveDate = moment(this.editObj.effectiveDate).format('YYYY-MM-DD');
                this.editObj.openedTime =  moment(this.editObj.openedTime).format('YYYY-MM-DD HH:mm:ss');
               
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
            // console.log(tableData);
            // console.log(this.editObj);
            this.getPubBrcList();
            if (this.type=='add'){
                this.flag =false;
                this.titlname = '增加机构类别';
            }else if(this.type=='copy'){
                this.flag =false;
                this.titlname = '复制增加机构类别';
            }else if(this.type=='updat'){   
                this.flag =false;
                this.titlname = '修改机构类别信息';
            }else if(this.type=='del'){
                this.flag =true;
                this.titlname = '删除机构类别';
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