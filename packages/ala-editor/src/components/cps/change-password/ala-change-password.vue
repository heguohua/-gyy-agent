<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-07-14 16:01:24
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-14 16:39:30
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/change-password/ala-change-password.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="update-password">
        <el-dialog v-model="visible" title="修改登录密码" width="400px" @closed="resetForm">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
                <el-form-item label="新的密码" prop="newPassword">
                    <el-input v-model="form.newPassword" type="password" placeholder="请输入密码" show-password />
                </el-form-item>

                <el-form-item label="再次输入" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue'
import { ElMessage } from 'element-plus'
import { alaPost } from '@/utils/req'
import u from '@/utils/u'
import notify from '@/utils/notify'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const visible = ref(false)
const formRef = ref()
import lstore from '@/utils/lstore'
import { alaConsts } from '@/config/alaConsts'

const form = ref({
    newPassword: '',
    confirmPassword: ''
})

const rules = {
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value !== form.value.newPassword) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
}

const open = () => {
    visible.value = true
}

const close = () => {
    visible.value = false
}

const handleCancel = () => {
    close()
}

const resetForm = () => {
    form.value.newPassword = ''
    form.value.confirmPassword = ''
    formRef.value?.clearValidate()
}

const handleSubmit = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            // 可根据需要替换为 emit 或 API 调用
            ElMessage.success('密码修改成功')

            alaPost(u.url('/u/user/updateSword'), { sword: form.value.newPassword }, false, 'PUT').then((response: any) => {
                console.log('response:', response);
                if (response.code === 200) {
                    // 删除本地 localStorage中的token
                    close()

                    notify.success(t('pop.warm_title'), "密码修改成功，请重新登录")

                    setTimeout(() => {
                        lstore.removeItem(alaConsts.is_logined_key)
                        window.location.href = '/login'
                    }, 3000)
                }
            })

        }
    })
}

// 对外暴露方法
defineExpose({ open })
</script>
<style scoped lang="scss">
.update-password {
    :deep(.show-close) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>