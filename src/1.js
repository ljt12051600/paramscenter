<el-dialog title="添加词根" :visible="showEdit" width="800px" :show-close="false">
                <el-form ref="formEdit" :model="editObj" :rules="rules" :inline="true" label-width="140px">
                    <system-component :required="true" :query="editObj" />
                    <el-form-item prop="dictCodeType" label="数据字典类型">
                        <el-select style="width:200px;" v-model="editObj.dictCodeType" clearable placeholder="请选择">
                            <el-option :key="index+'c3'" v-for="(item,index) in dicCodeList"
                                :label="item.optionValue+'-'+item.optionDesc" :value="item.optionValue">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="type" label="数据类型">
                        <el-select style="width:200px;" v-model="editObj.type" clearable placeholder="请选择">
                            <el-option :key="index+'c4'" v-for="(item,index) in typeList" :label="+item.optionDesc"
                                :value="item.optionDesc">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="词根拼接">
                        <el-select filterable style="width:200px;" v-model="wordCode" clearable placeholder="请选择">
                            <el-option :key="index+'c5'" v-for="(item,index) in voCabList"
                                :label="item.wordDesc+'-'+item.wordCode" :value="item.wordCode">
                            </el-option>
                        </el-select>
                        <el-button @click="addCombin">组合</el-button>
                    </el-form-item>
                    <el-form-item label="字典代码">
                        <el-input style="width:400px;" disabled v-model.trim="editObj.dictCode"></el-input>
                        <el-button @click="deleteCombin" type="primary" icon="el-icon-back"></el-button>
                        <el-button @click="clearCombin " type="primary" icon="el-icon-delete"></el-button>

                    </el-form-item>
                    <el-form-item label="字典名称">
                        <el-input style="width:400px;" v-model.trim="editObj.dictDesc"></el-input>

                    </el-form-item>
                    <el-form-item label="长度">
                        <el-input style="width:200px;" v-model.trim="editObj.length"></el-input>

                    </el-form-item>
                    <el-form-item label="小数">
                        <el-input style="width:200px;" v-model.trim="editObj.point"></el-input>

                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="doCloseAdd(false)">取 消</el-button>
                    <el-button type="primary" @click="doCloseAdd(true)">确认添加</el-button>
                </div>
            </el-dialog>