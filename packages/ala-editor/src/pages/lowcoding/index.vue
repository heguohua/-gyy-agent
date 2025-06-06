<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-06 18:31:32
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/lowcoding/index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <!-- 查询条件 -->
    <SearchPanel :baseFields="baseFields" :advancedFields="advancedFields" :params="params" @refresh="refresh"
        @showAdd="showAdd({ id: null, pid: 0 })" labelWidth="180px" />

    <!-- 分页列表 -->
    <PageTable ref="pageRef" :url="url" :deleteUrl="deleteUrl" :columns="columns" :params="params"
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')"
        :showEditButton="true" :showDeleteButton="true">


        <template #cols="{ row, columnName, formItem }">
            <template v-if="formItem.code === 'dateRange'">

                <component :is="getComponent(formItem.code)"
                    :value="{ start: row[formItem.formData.startFieldName.desktop], end: row[formItem.formData.endFieldName.desktop] }"
                    :formItem="formItem" :data="row" />
            </template>
            <template v-else>
                <!-- 该条渲染分支，适用于 <SwitchColumn :value="row[columnName]" :formItem="formItem" /> 类组件渲染，即 可以通过row[columnName]直接获取到Column值-->
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-if="formItem.formData.detail?.desktop" @showDetail="showDetail" />
                <component :is="getComponent(formItem.code)" :value="row[columnName]" :formItem="formItem" :data="row"
                    v-else />
            </template>

        </template>

        <template #btns="{ row }">
            <AlaButton :showButton="true" name="publish" @publish="handlePublish(row)" buttonType="primary" />
            <AlaButton :showButton="true" name="force_publish" @force_publish="handleForcePublish(row)"
                buttonType="danger" />
        </template>
        <!-- <template #cols="{ row, columnName }">
            {{ row[columnName] }}
        </template>

        <template #btns="{ row }">
            <AlaButton :showButton="true" name="publish" @publish="handlePublish(row)" buttonType="primary" />
            <AlaButton :showButton="true" name="force_publish" @force_publish="handleForcePublish(row)"
                buttonType="danger" />
        </template> -->

    </PageTable>

    <!-- 新增、编辑 -->
    <!-- <MenuAdd @refresh="refresh" v-model="showAddForm" :baseInfo="baseInfo" /> -->

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput, alaBuildSelect } from '@/config/alaBuilders';
import u from '@/utils/u';
import { useI18n } from 'vue-i18n';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
import { alaDetailBuild, alaDetailDate, alaDetailSelect } from '@/config/alaDetailBuilder';
import { formTypes } from '@/components/cps/dynamic/formTypes';
import { dType } from '@/components/cps/dynamic/detailType';
const { t } = useI18n();
const router = useRouter()

// ############## 初始化基本数据，该部分代码不用修改 start ######################################
// 1、获取当前模块名
const route = useRoute();
const moduleName = computed(() => {
    const code = route.meta.menuCode as string;
    return t(code)
})
// 2、定义当前编辑对象id
const baseInfo = reactive({
    moduleName,
    id: null,
    selectedList: Array<{ id: string }>,
    item: {}
})
provide('baseInfo', baseInfo);

// ############## 初始化基本数据，该部分代码不用修改 end ######################################

// ############## 分页列表通用方法，该部分代码不用修改 start ######################################

const showAddForm = ref(false)
const showAdd = (item: { [key: string]: any }) => {
    u.clear(baseInfo.item)
    u.merged(baseInfo, { item: { id: null, pid: item.id } })
    logger.info(`【新增】方法接收到参数【 item 】`, item);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    showAddForm.value = true
}

const showEdit = (item: { [key: string]: any }) => {
    showAddForm.value = true
    // 解除 响应式引用，防止新增页面数据影响列表数据
    const entity = toRaw(item)
    entity.typeEntity = [{ id: entity.type }]

    u.merged(baseInfo, { entity })
    logger.info(`【编辑】方法接收到参数 entity `, entity);
    logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    // u.merged(baseInfo, { item })
    // logger.info(`【编辑】方法接收到参数 item `, item);
    // logger.info(`当前模块【 baseInfo 】对象参数为`, baseInfo);
    // showAddForm.value = true
    // 打开form编辑页面
    router.push({ name: "FormDesignPage", query: { type: 'edit', id: entity.id } })
}

// 查询条件
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/l/lowcodingConfig/page"
const deleteUrl = "/l/lowcodingConfig/delete"

// 分页列表中列属性配置
const columns = computed(() => {
    return [
        alaDetailBuild(dType.input, 'name', t('module.lowcoding.name')),
        alaDetailSelect("formType", "页面类型", formTypes),
        alaDetailBuild(dType.input, 'className', t('module.lowcoding.className')),
        alaDetailBuild(dType.input, 'version', t('module.lowcoding.version')),
        alaDetailBuild(dType.input, 'createdName', "创建人", 1, false, { columnWidth: { desktop: '120' } }),
        alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss', 1, false, { columnWidth: { desktop: '180' } }),
        alaDetailBuild(dType.input, 'updatedName', "更新人"),
        alaDetailDate(dType.date, 'updatedTime', "更新时间", 'YYYY-MM-DD HH:mm:ss'),
    ]
})


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("name", t('module.lowcoding.name')),
    ]
})
// const baseFields = [
//     { componentName: 'AlaInput', label: '单行文本框', placeholder: '请输入单行文本', fieldName: 'input' },
//     { componentName: 'AlaInput', label: '多行文本框', placeholder: '请输入多行文本', fieldName: 'textarea' },
//     { componentName: 'AlaPassword', label: '密码框', placeholder: '请输入密码', fieldName: 'password' },
//     { componentName: 'AlaRadio', label: '单选组件', fieldName: 'radio', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
//     { componentName: 'AlaCheckbox', label: '多选组件', fieldName: 'checkbox', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
//     { componentName: 'AlaSelect', label: '下拉选', fieldName: 'select', other: { items: [{ name: "男", value: "man", }, { name: "女", value: "men", }] } },
//     { componentName: 'AlaSwitch', label: '开关', fieldName: 'switch', other: { activeText: "开", inActiveText: "关" } },
//     // {
//     //     componentName: 'AlaDate', label: '创建时间', fieldName: 'date', other: {
//     //         dateType: "datetimerange",
//     //         format: "YYYY-MM-DD HH:mm:ss", start: "2024-11-10", end: "2024-11-13"
//     //     }
//     // },
//     { componentName: 'AlaSlider', label: '取值范围', placeholder: '请指定取值范围', fieldName: 'slider', other: { min: 2, max: 10, step: 1, } },
//     { componentName: 'AlaRating', label: '评分', placeholder: '请指定评分', fieldName: 'rating', other: { max: 8, allowHalf: true } },
// ]


// 高级查询条件
const advancedFields: any[] = []

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})

const showDetail = (item: { [key: string]: any }) => {
    // u.clear(detailItem.item)
    // u.merged(detailItem, { item })
    // logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    // showDetailPage.value = true
}
// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################


const handlePublish = (item: any) => {
    // 保存数据并刷新分页列表
    // 判断当前数据 id 存不存在，不存在调用【 新增 】接口，存在则调用【 更新 】接口
    const url = "/l/lowcodingConfig/publish"
    logger.info(`发布配置项，url【 ${url} 】，数据对象：`, item);
    alaPost(u.url(url || ''), { id: item.id }, false, '').then((data: any) => {
        const response = data;
        notify.success(t('pop.warm_title'), t('buttons.publish') + '成功')
    });
}

const handleForcePublish = (item: any) => {
    // 保存数据并刷新分页列表
    // 判断当前数据 id 存不存在，不存在调用【 新增 】接口，存在则调用【 更新 】接口
    const url = "/l/lowcodingConfig/forcePublish"
    logger.info(`发布配置项，url【 ${url} 】，数据对象：`, item);
    alaPost(u.url(url || ''), { id: item.id }, false, '').then((data: any) => {
        const response = data;
        notify.success(t('pop.warm_title'), t('buttons.force_publish') + '成功')

    });
}

</script>

<style lang="scss" scoped></style>