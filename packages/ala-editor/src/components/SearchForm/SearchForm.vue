<template>
    <div class="search-form">
        <el-form :model="form" label-width="120px">
            <!-- 基本查询区域 -->
            <el-form-item label="普通文本">
                <el-input v-model="form.text"></el-input>
            </el-form-item>
            <el-form-item label="下拉选择">
                <el-select v-model="form.select" placeholder="请选择">
                    <el-option label="选项1" value="1"></el-option>
                    <el-option label="选项2" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单选按钮">
                <el-radio-group v-model="form.radio">
                    <el-radio :label="1">选项1</el-radio>
                    <el-radio :label="2">选项2</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="复选框">
                <el-checkbox-group v-model="form.checkbox">
                    <el-checkbox label="1">选项1</el-checkbox>
                    <el-checkbox label="2">选项2</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!-- 高级查询区域 -->
            <el-collapse v-model="activeNames" v-if="showAdvanced">
                <el-collapse-item title="高级查询" name="1">
                    <el-form-item label="日期范围">
                        <el-date-picker v-model="form.dateRange" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <!-- 可以根据需要添加更多高级查询条件 -->
                </el-collapse-item>
            </el-collapse>

            <!-- 高级查询按钮 -->
            <el-button type="text" @click="toggleAdvanced">高级查询</el-button>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElRadio, ElRadioGroup, ElCheckbox, ElCheckboxGroup, ElDatePicker, ElCollapse, ElCollapseItem, ElButton } from 'element-plus';

export default defineComponent({
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElSelect,
        ElOption,
        ElRadio,
        ElRadioGroup,
        ElCheckbox,
        ElCheckboxGroup,
        ElDatePicker,
        ElCollapse,
        ElCollapseItem,
        ElButton
    },
    setup() {
        const form = reactive({
            text: '',
            select: '',
            radio: null,
            checkbox: [],
            dateRange: []
        });

        const showAdvanced = reactive({
            value: false
        });

        const activeNames = reactive({
            value: ''
        });

        function toggleAdvanced() {
            showAdvanced.value = !showAdvanced.value;
        }

        return {
            form,
            showAdvanced,
            activeNames,
            toggleAdvanced
        };
    }
});
</script>

<style lang="scss" scoped>
.search-form {
    max-width: 600px;
    margin: 0 auto;
}
</style>