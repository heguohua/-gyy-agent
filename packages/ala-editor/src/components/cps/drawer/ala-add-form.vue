<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 13:59:33
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 14:36:24
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/drawer/ala-add-form.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-add-form">
        <el-drawer v-model="showDrawer" :direction="direction" :before-close="handleClose">
            <template #header>
                <h4>set title by slot</h4>
            </template>
            <template #default>
                <div>
                    <el-radio v-model="radio1" value="Option 1" size="large">
                        Option 1
                    </el-radio>
                    <el-radio v-model="radio1" value="Option 2" size="large">
                        Option 2
                    </el-radio>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">cancel</el-button>
                    <el-button type="primary" @click="confirmClick">confirm</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { DrawerProps, ElMessageBox } from 'element-plus';
import { ref } from 'vue'

// State


const props = defineProps({

})


const showDrawer = defineModel({
    type: Boolean,
    default: false
})

const emit = defineEmits(["callback"])

const direction = ref<DrawerProps['direction']>('rtl')
const radio1 = ref('Option 1')
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure you want to close this?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
function cancelClick() {
    showDrawer.value = false
}
function confirmClick() {
    ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
        .then(() => {
            showDrawer.value = false
            emit("callback", {
                // data: {
                //     [key]: data
                // },
                // id
                abc: 123
            })
        })
        .catch(() => {
            // catch error
        })


}

// Methods

</script>

<style scoped lang="scss"></style>