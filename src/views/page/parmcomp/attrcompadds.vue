
  <template>
    <div>
        <el-dialog :visible="showAdds" :title="titlEdit" width="1200px" :modal-append-to-body="false">
            <div>
                <system-table ref="showAdds">
                    <div slot="top">
                        <el-form ref="attrEditPage" inline label-width="80px">
                            <el-form-item label="组件编码" prop="compCode">
                                <el-input
                                    v-model.trim="attrEditObj.compCode"
                                    readonly
                                    style="width: 200px;"
                                />
                            </el-form-item>
                            <el-form-item label="组件名称" prop="compName">
                                <el-input
                                    v-model.trim="attrEditObj.compName"
                                    readonly
                                    style="width: 200px;"
                                />
                            </el-form-item>
                            <el-form-item label="组件分类" prop="compClassification">
                                <el-select
                                    style="width:200px;"
                                    v-model="attrEditObj.compClassification"
                                    disabled
                                >
                                    <el-option
                                        :key="index+'cc'"
                                        v-for="(item,index) in compKindList"
                                        :label="item.value+'-'+item.name"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div slot="action" style="margin-bottom: 20px;">
                        <el-button @click="doExitEdit" size="mini" type="warning">返  回</el-button>
                        <el-button @click="addAll" size="mini" type="primary">新增</el-button>
                        <el-button @click="submit" size="mini" type="primary">提交</el-button>
                    </div>
                    <div slot="body">
                        <el-table
                            :data="tabledatas"
                            stripe
                            border
                            @selection-change="handleSelectionChange"
                            size="small"
                            :header-cell-style="{background:'#EFF3F8',color:'#606266'}"
                        >
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column label="属性编码"  prop="compPropertyCode">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input size="mini"   placeholder="请输入内容"
                                            v-model="scope.row.compPropertyCode"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyCode}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性名称"  prop="compPropertyName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input
                                            size="mini"
                                            placeholder="请输入内容"
                                            v-model="scope.row.compPropertyName"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.compPropertyName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性值选择方式">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.selectionMethod"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in smList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.selectionMethod}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性值类型 "  prop="valueType">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input
                                            size="mini"
                                            placeholder="请输入内容"
                                            v-model="scope.row.valueType"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.valueType}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性值长度 "  prop="valueLength">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input
                                            size="mini"
                                            placeholder="请输入内容"
                                            v-model="scope.row.valueLength"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.valueLength}}</span>
                                </template>
                            </el-table-column>
                            
                            <el-table-column label="是否子组件">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.isCom"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in isList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.isCom}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="关键字标志">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.isKey"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in isList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.isKey}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否显示">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.isDisplay"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in isList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.isDisplay}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否可修改">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.isChangeable"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in isList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.isChangeable}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="是否必填">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.isMandatory"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in isList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.isMandatory}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="默认值">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-input
                                            size="mini"
                                            placeholder="请输入内容"
                                            v-model="scope.row.defaultValue"
                                        ></el-input>
                                    </span>
                                    <span v-else>{{scope.row.defaultValue}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="影响权重">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.show">
                                        <el-select
                                            size="mini"
                                            placeholder="请选择"
                                            v-model="scope.row.effectWeight"
                                        >
                                            <el-option
                                                :key="index+'cc'"
                                                v-for="(item,index) in isList"
                                                :label="item.value+'-'+item.name"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>{{scope.row.effectWeight}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="text" @click="edit(scope.row,scope.$index)">{{scope.row.show?'保存':"修改"}}</el-button>
                                    <!-- <el-button size="mini" type="text" @click="copy(scope.row,scope.$index)">复制</el-button> -->
                                    <el-button size='mini' type="text" @click="delect(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    
                </system-table>
            </div>
            <div v-if="dataShow">
                <dataList @doAttrClose="closeattrPage" @childevent="datachose" :dataObj='dataObj' :dataShow='dataShow'></dataList>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { deleteKey, deepClone } from '@/utils';
import { isList ,smList,compKindList} from '@/utils/parmstanddata';
import MIXIN from '@views/mixin/button';
import { updatePCPButtons, deletePCPButtons, createPCPButtons } from '@/api/parmbusi';
import moment from 'moment';
import Vue from 'vue';
import dataList from  './datalist';

export default {
    name: 'attrcompAdds',
    props: ['attrEditObj', 'type', 'showAdds'],
    components: {dataList},
    mixins: [MIXIN],
    data: function () {
        return {
            flag: false,
            tabledatas: [
                
            ],
            multipleSelection: [],

            isList,
            smList,
            compKindList,

            show: false,
            flag: false,
            flagAdd: false,
            flagAdd2: true,
            dataShow: false,
            datachseObj:{},
            titlEdit: '',
            oldName: '',
            attrCopyObjs: [
                {
                    id: this.attrEditObj.id,
                    compPropertyName: '',
                    selectionMethod: '', //下拉框码值转为string
                    inspectionRules: ''
                    // popId: item.popId
                }
            ],

            rules: {
                compPropertyName: [
                    {
                        required: true,
                        message: '请输入属性名称',
                        trigger: 'blur'
                    }
                ],
                compPropertyCode: [
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
        //关闭元数据界面
        async closeattrPage(){
           this.dataShow = false;
        },
        datachose(){
            console.log(this.datachseObj);
            this.tabledatas.push(this.datachseObj);
        },
        addAll() {
            this.tabledatas.push({ name: '', sex: '', show: false, status: true, date: '', phone: '' });
            this.tabledatas[this.tabledatas.length - 1].show = true;
            // this.dataShow = true;
            // this.dataObj= "";
        },
        edit(row, index) {
            row.show = row.show ? false : true;
            
            
            var find = false;
            for (var i = 0; i < this.tabledatas.length; i++) {
                for (var j = i + 1; j < this.tabledatas.length; j++) {
                if (this.tabledatas[i].compPropertyName == this.tabledatas[j].compPropertyName )
                 { find = true; alert('有重名'+this.tabledatas[i].compPropertyName);break;}
            }
                if (find) {break}else{
                    Vue.set(this.tabledatas, index, row);
                };
            }
            // alert('有重名'+this.tabledatas[i].compPropertyName);
        },
        editAll() {
            this.tabledatas.map((i, index) => {
                i.show = true;
                Vue.set(this.tabledatas, index, i);
            });
        },
        // 单个复制
        copy(val, index) {
            this.tabledatas.splice(index, 0, JSON.parse(JSON.stringify(val)));
            this.tabledatas[index+1].show = true;index
        },
        // 单个删除
        delect(index) {
            this.tabledatas.splice(index, 1);
        },

        //批量删除
        delectAll() {
            for (let i = 0; i < this.tabledatas.length; i++) {
                const element = this.tabledatas[i];
                element.id = i;
            }
            if (this.multipleSelection.length == 0) this.$message.error('请先至少选择一项');
            this.multipleSelection.forEach((element) => {
                this.tabledatas.forEach((e, i) => {
                    if (element.id == e.id) {
                        this.tabledatas.splice(i, 1);
                    }
                });
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        doType() {
            if (this.type == 'del') {
                this.doDel();
            } else {
                if (this.attrEditObj.compPropertyName == '' || this.attrEditObj.compPropertyName == undefined) {
                    return this.$message.error('属性名称不能为空');
                }

                this.doClose();
            }
        },
        async doExitEdit() {
            this.$emit('doClose');
        },
        //取消 返回上一页
        doRet() {
            this.$emit('doClose');
        },

        isRe(){
            var find = false;
            for (var i = 0; i < tabledatas.length; i++) {
                for (var j = i + 1; j < tabledatas.length; j++) {
                if (tabledatas[i].compPropertyName == tabledatas[j].compPropertyName )
                 { find = true; console.log('有重复'+tabledatas[i].compPropertyName);break;}
            }
                if (find) break;
            }
            alert(find);
            
        },
        async submit() {
            this.tabledatas.map((i, index) => {
                i.show = false;
                // Vue.set(this.tabledatas, index, i);
            });
            var info = '';
                this.attrCopyObjs[0].compPropertyName = this.attrEditObj.compPropertyName;
                this.attrCopyObjs[0].selectionMethod = this.attrEditObj.selectionMethod;
                this.attrCopyObjs[0].inspectionRules = this.attrEditObj.inspectionRules;
                info = await createPCPButtons({
                    compCode: this.attrEditObj.compCode,
                    list: this.tabledatas
                });
            

            if (info.resCode === '0') {
                this.$message.success('交易成功');
                this.$emit('doClose');
            } else {
                this.$alert('交易失败', info.resMsg);
            }
        }
    },
    mounted() {
        console.log(this.attrEditObj.compClassificatio);
        this.oldName = this.attrEditObj.compPropertyName;
        this.titlEdit = '组件属性新增';
    }
};
</script>

})

<style>
.sortable-ghost {
    background: red;
}
</style>