
  <template>
    <div>
        <el-dialog :visible="showCompare" :title='titlname' >
        <div>
            <el-form ref="showCompare" :model="brcObj" inline :rules="rules" size="small" label-width="160px">
                    <el-form-item label="id" prop="id" v-if="show">
                        <el-input style="width:200px;" v-model.trim="brcObj.id" :readonly='flag'></el-input>
                    </el-form-item>
                    <el-form-item label="机构代码" prop="brcCode">
                        <el-select style="width:200px;" v-model="brcObj.brcCode" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in pubBrcList" :label="item.brcCode+'-'+item.brcName" :value="item.brcCode"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="关系种类" prop="baseCcy">
                        <el-select style="width:200px;" v-model="brcObj.baseCcy" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in instSubRalationTypeList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关系子类" prop="baseCcy">
                        <el-select style="width:200px;" v-model="brcObj.baseCcy" :disabled='flag' clearable placeholder="请选择"  >
                            <el-option :key="index+'cc'" v-for="(item,index) in instRalationTypeList" :label="item.value+'-'+item.name" :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="归属机构" prop="belongBrc">
                        <el-input style="width:200px;" v-model.trim="brcObj.belongBrc" :readonly='flag'></el-input>
                    </el-form-item>
                   
                </el-form>
        </div>
        <div style="margin-top: 20px">
            <el-table
                :data="data.rows"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="selectArInfo"
            >
                <el-table-column type="selection" width="45px" ></el-table-column>
                <!-- <el-table-column label="序号" width="62px" type="index"></el-table-column> -->
                <template v-for="(col) in tableData">
                    <el-table-column
                        
                        :show-overflow-tooltip="true"
                        :prop="col.dataItem"
                        :label="col.dataName"
                        :key="col.dataItem"
                        width="124px"
                    ></el-table-column>
                </template>
            </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="doRet">返回</el-button>
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
    name: 'parmCompare',
    props: ['showCompare','brcObj'],
    mixins: [MIXIN,PUBPARM],
    data: function() {
        return {
            instSubRalationTypeList,
            instRalationTypeList,
            queryCompButtons,
            
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
        doRet() {
            this.$emit("doClose")
        },
        
        
    },
    mounted() {
            // this.getPubBrcList();
            this.titlname = '参数比较'; 
            
    },

    
};
</script>

})

<style>
.sortable-ghost {
    background: red;
}
</style>