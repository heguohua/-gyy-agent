<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-01-31 16:56:53
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-03 10:51:21
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/sql-editor/ala-sql-editor.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-sql-editor">
        <div class="header">
            <slot name=header></slot>
            <AlaButton :showButton="true" name="format" @format="handleFormat()" buttonType="primary" />
        </div>
        <v-ace-editor v-model:value="sqlContent" lang="sql" :theme="theme" :options="editorOptions"
            class="ala-sql-editor-ace" @init="editorInit" />
        <!-- <div class="editor-buttons">
            <el-button type="primary" @click="formatSql">格式化</el-button>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';

import * as ace from 'ace-builds';
// 设置 basePath
ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { format } from 'sql-formatter';

// State
// const sqlContent = ref('-- \nselect * from xxx');
const sqlContent = ref('-- \nselect sm.* from sys_menu sm left join sys_user su on sm.created_by = su.id');
const theme = ref('chrome');
const editorOptions = ref({
    fontSize: '16px',
    fontFamily: 'monospace', // 设置字体类型
    showPrintMargin: false, // 隐藏打印边距
    highlightActiveLine: true, // 高亮当前行
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
});

// Methods
const editorInit = (editor: any) => {

    // 自定义表名和字段提示
    const tableFields = {
        your_table_name: ['id', 'name', 'created_at'],
        // 可以继续添加更多表名和字段
    };

    editor.completers.push({
        getCompletions: (editor: any, session: any, pos: any, prefix: string, callback: Function) => {
            const wordList = [];
            for (const table in tableFields) {
                if (prefix.toLowerCase().includes(table.toLowerCase())) {
                    wordList.push(...tableFields[table].map((field: string) => ({
                        name: field,
                        value: field,
                        meta: `字段(${table})`,
                    })));
                }
            }
            callback(null, wordList);
        },
    });
};


const handleFormat = () => {
    sqlContent.value = format(sqlContent.value)
}

defineExpose({
    sqlContent
})

</script>

<style scoped lang="scss">
.ala-sql-editor {
    width: 100%;
    height: calc(100% - 38px);

    // box-shadow: 0 0 0 1px var(--el-border-color) inset;
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        justify-items: center;
        height: 36px;

        // background: #fff;
        // box-shadow: 0 0 0 1px var(--el-border-color) inset;
    }

    .ala-sql-editor-ace {
        height: 100%;
        background: #EFF0F1;

        :deep(.ace_gutter) {
            background: var(--ala-color-bg);
            color: var(--el-color-info-light-5);
        }

        :deep(.ace_gutter-active-line) {
            color: var(--el-color-primary);
            font-weight: bold;
        }
    }
}
</style>