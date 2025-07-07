<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-07 09:45:52
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/system/role/roleAuthorization.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <div class="authorization">

        <el-drawer v-model="showDrawer" direction="rtl" :before-close="handleClose" class="ala-drawer"
            :size="drawerWidth" :with-header="true">

            <template #header>
                <h4>{{ useFormTitle() }} </h4>
            </template>

            <template #default>
                <AlaPermission :nodes="permissionNodes" :indent="20" @select="handleSelect" />
            </template>

            <template #footer>
                <div class="ala-drawer-buttons">
                    <el-button @click="cancelClick">
                        {{ $t('buttons.cancel') }}
                    </el-button>
                    <el-button type="primary" @click="confirmClick">
                        {{ $t('buttons.save') }}
                    </el-button>
                </div>
            </template>
        </el-drawer>

    </div>

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import u from '@/utils/u';
import formConfigs from '@/config/formConfigs';
import AlaPermission, { PermissionNode } from '@/components/cps/permission/ala-permission.vue'


const props = defineProps({
    baseInfo: {
        type: Object,
        default: {
            id: null,
            pid: 0,
            moduleName: "模块名称不存在",
            item: {}
        }
    },
})


// ##########################  以下当前模块自定义业务逻辑处理部分  #########################################

const permissionNodes = ref<Array<PermissionNode>>([])

watch(() => props.baseInfo.item, (item) => {
    logger.info(`观察到 baseInfo 中的 item 发生了变化`, item);

    if (!item.id) return
    // Methods
    const url = '/u/menu/findForAuthorization'

    let params = { id: item.id }


    logger.info(`从 api 图标数据，url【 ${url} 】，查询参数：`, params);

    alaPost(u.url(url), params, false, '').then((response: any) => {
        const data = response.data
        permissionNodes.value = data
    });


}, {
    deep: true
})

// ##########################  以下是公共方法，不需要修改 start #########################################


// Methods
// State
const showDrawer = defineModel({
    type: Boolean,
    default: false
})

// 监听表单回调事件
const emit = defineEmits(["refresh"])
const confirm = (data: any) => {
    logger.warn("新增页面 confirm 接收到回调数据，即将回调list页面", data);
    logger.warn("新增页面 confirm 接收到回调数据，当前formData数据为", formData);
    emit('refresh', data)
}

const moduleName = computed(() => {
    return props.baseInfo.moduleName
})

const beforeSave = (item: any) => {
    // 转换
    return item
}
// ##########################  以上是公共方法，不需要修改 end #########################################
// { value: { labelWidth: 90, columnNum: 1, formWidth: 500 } }

import { useI18n } from 'vue-i18n';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
const { t } = useI18n();

const handleClose = (done: () => void) => {
    console.log('handleClose')

    ElMessageBox.confirm(
        "确定要关闭【授权页面】吗？",
        "温馨提示",
        {
            confirmButtonText: t("buttons.confirm"),
            cancelButtonText: t("buttons.cancel"),
            type: 'warning',
        })
        .then(() => {
            done()
        })
        .catch(() => {
            logger.info("点击右上角关闭按钮，弹出取消提示信息框，用户选择【取消关闭】");
        })
}

/**
 * 点击取消按钮，关闭弹窗 
 */
function cancelClick() {
    console.log('cancelClick')
    showDrawer.value = false
}


/** 资源对象 */
interface Resource {
    id: number | string
    authorized: number
    [k: string]: any
}

/** 树节点 */
interface TreeNode {
    resources?: Resource[]
    children?: TreeNode[]
    [k: string]: any
}

/**
 * 收集 resources 中 auth === 1 的 id
 * @param root  根节点或节点数组
 * @returns     id 数组
 */
function collectResourceAuthorizedIds(root: TreeNode | TreeNode[]): Array<number | string> {
    const ids: Array<number | string> = []

    const dfs = (node: TreeNode) => {

        // 处理当前节点 resources
        node.resources?.forEach(res => {
            if (res.authorized === 1) ids.push(res.id)
        })
        // 递归遍历子节点
        node.children?.forEach(dfs)
    }

    Array.isArray(root) ? root.forEach(dfs) : dfs(root)
    return ids
}

function collectMenuAuthorizedIds(root: TreeNode | TreeNode[]): Array<number | string> {
    const ids: Array<number | string> = []

    const dfs = (node: TreeNode) => {

        // 处理当前节点菜单权限
        if (node.authorized === 1) ids.push(node.id)

        // 递归遍历子节点
        node.children?.forEach(dfs)
    }

    Array.isArray(root) ? root.forEach(dfs) : dfs(root)
    return ids
}

/**
 * 点击确认按钮，弹窗消息提示框
 */
function confirmClick() {

    // Methods
    const url = '/u/role/saveRoleResourceRelations'

    const roleId = props.baseInfo.item.id
    const resourceIds = collectResourceAuthorizedIds(permissionNodes.value)
    const menuIds = collectMenuAuthorizedIds(permissionNodes.value)

    let params = { roleId, resourceIds, menuIds }


    logger.info(`【 保存 角色-资源关联关系 】，url【 ${url} 】，参数：`, params);

    alaPost(u.url(url), params, false, '').then((response: any) => {
        const data = response.data
        logger.info(`【 保存 角色-资源关联关系 】，返参data：`, data);
        if (response.code === 200) {
            notify.success(t('pop.warm_title'), "数据保存成功。")
            showDrawer.value = false
        } else {
            notify.error(t('pop.warm_title'), "数据保存失败，请联系管理员！")
        }
    });

    // emit("confirm", {
    //     abc: 123
    // })
}
const useFormTitle = () => {
    return "角色授权"
}
const drawerWidth = computed((): string => {
    const paddingWidth = 66
    let width = (900 + paddingWidth) + 'px'
    return width
})

const handleSelect = (node: PermissionNode) => {
}

</script>

<style scoped lang="scss">
.authorization {

    :deep(.el-drawer__header) {
        color: #3d446e !important;
        font-size: 1.1rem !important;
        background: #F9F9FA !important;
        padding: 4px 0px !important;
        margin-bottom: 0px !important;
    }
}
</style>