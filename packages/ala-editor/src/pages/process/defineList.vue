<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-11 11:20:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-09 11:03:34
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/defineList.vue
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
        :showSelectCheckbox="false" @add="showAdd" @edit="showEdit" :tipTitle="$t('pop.warm_title')">


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

            <AlaButton :showButton="true" name="preview" @preview="handlePreview(row)" buttonType="default" />
            <AlaButton v-if="row.state === 2" :showButton="true" name="enable" @enable="handleEnable(row)"
                buttonType="success" />
            <AlaButton v-if="row.state === 1" :showButton="true" name="disable" @disable="handleDisable(row)"
                buttonType="danger" />
            <!-- <AlaButton v-if="row.state === 1" :showButton="true" name="form_initiate"
                @form_initiate="handleApply(row)" buttonType="primary" /> -->

        </template>
        <!-- <template #cols="{ row, columnName }">
            <AlaPageViewStatus v-if="columnName === 'delFlag'" :isValid="row.delFlag === 2" valid-name="启用"
                in-valid-name="禁用" :value="row[columnName]" />
            <template v-else>{{ row[columnName] }}</template>
        </template> -->

    </PageTable>

    <AlaDetail :data="detailItem" v-model="showDetailPage" :fields="detailFields" :formAttr="formAttr" />
    <AlaTabPage v-if="showPreviewPage" v-model="showPreviewPage" title="【 预览 】流程图" width="1800" :tabs="tabs" />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MenuAdd from '@/pages/menu/menuAdd.vue';
import { useRoute } from 'vue-router';
import PageTable from '@/components/cps/page/page-table.vue';
import { logger } from '@/utils/logger';
import { alaBuildInput, alaBuildSelectDict } from '@/config/alaBuilders';
import u from '@/utils/u';
import { id } from 'element-plus/es/locale';
import { useI18n } from 'vue-i18n';
import { alaDetailBuild, alaDetailDate, alaDetailSelectDict, alaDetailSwitch, alaDetailTextarea } from '@/config/alaDetailBuilder';
import { dType } from '@/components/cps/dynamic/detailType';
import { alaPost } from '@/utils/req';
import notify from '@/utils/notify';
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
    router.push({ name: "Design", query: { type: 'edit', id: entity.id } })

}

// 查询条件
const params = reactive({})

const pageRef = ref<InstanceType<typeof PageTable> | null>(null)
const refresh = () => {
    if (pageRef.value) {
        pageRef.value.refresh(params)
    }
}
/**
 * 动态解析国际化字符串
 * @param label 
 */
const parseLabel = (label: string) => {
    return t(label);
}

const getComponent = ((code: string) => {
    return 'Detail' + code.charAt(0).toUpperCase() + code.slice(1) + 'Column';
})

const formAttr = ref({
    formWidth: 600,
    columnNum: 1,
    labelWidth: 150,
    labelPosition: 'left',
    useFormTitle: false,
})

/**
 * 详情页面字段
 */
const detailFields: any = ref([
    alaDetailBuild(dType.input, 'displayName', "流程名称", 1, true),
    alaDetailBuild(dType.input, 'name', "唯一编码"),
    alaDetailSelectDict(dType.selectDict, 'typeEntity', "流程分类", 'dictLabel'),
    alaDetailSwitch(dType.switch, 'state', "状态", "启用", 1, "禁用", 2),
    alaDetailBuild(dType.input, 'version', "版本号"),
    alaDetailBuild(dType.input, 'createdName', "创建人"),
    alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
    alaDetailBuild(dType.input, 'updatedName', "重新部署人"),
    alaDetailDate(dType.date, 'updatedTime', "重新部署时间", 'YYYY-MM-DD HH:mm:ss'),

])
const detailItem = reactive({
    moduleName,
    item: {}
})
const showDetailPage = ref(false)
const showDetail = (item: { [key: string]: any }) => {
    u.clear(detailItem.item)
    u.merged(detailItem, { item })
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    showDetailPage.value = true
}

// ############## 分页列表通用方法，该部分代码不用修改 end ######################################


// ############## 分页列表自定义方法，该部分代码需要按需定制 start ######################################

const url = "/p/define/page"
const deleteUrl = "/p/define/delete"

// 分页列表中列属性配置

const columns = computed(() => {
    return [
        // alaDetailBuild(dType.input, 'displayName', "流程名称", 1, true),
        // alaDetailBuild(dType.input, 'name', "流程编码"),

        // alaDetailBuild(dType.selectDict, 'type', "流程分类"),

        // alaDetailBuild(dType.input, 'version', "版本号"),
        // alaDetailBuild(dType.input, 'state', "状态"),
        alaDetailBuild(dType.input, 'displayName', "流程名称", 1, true),
        alaDetailBuild(dType.input, 'name', "唯一编码"),
        alaDetailSelectDict(dType.selectDict, 'typeEntity', "流程分类", 'dictLabel'),
        alaDetailSwitch(dType.switch, 'state', "状态", "启用", 1, "禁用", 2),
        alaDetailBuild(dType.input, 'version', "版本号"),
        alaDetailDate(dType.date, 'createdTime', "创建时间", 'YYYY-MM-DD HH:mm:ss'),
        alaDetailDate(dType.date, 'updatedTime', "重新部署时间", 'YYYY-MM-DD HH:mm:ss'),


        // { prop: 'displayName', label: '名称' },
        // { prop: 'type', label: '流程分类' },
        // { prop: 'version', label: '版本号' },
        // { prop: 'state', label: '状态' },
    ]
})


// 基础查询条件
const baseFields = computed(() => {
    return [
        alaBuildInput("displayName", '名称'),
        alaBuildSelectDict("type", "流程分类", { "dictValue": "pType" }, { "propertyName": 'dictLabel', "valueName": 'id' }, [], "请选择流程分类", { clearable: true, singleValue: true, width: 200 })
    ]
})


// 高级查询条件
const advancedFields: any[] = []


// ############## 分页列表自定义方法，该部分代码需要按需定制 end ######################################
const showPreviewPage = ref(false)
const previewPageProps = reactive({})

const tabs = computed(() => {
    return reactive([
        { title: '流程图', code: 'ProcessPreview', props: { ...previewPageProps, viewer: true } },
    ])
})


const handlePreview = (row: any) => {
    logger.info(`当前模块【 detailItem 】对象参数为`, detailItem);
    u.merged(previewPageProps, { id: row.id })
    showPreviewPage.value = true
}

const handleEnable = (row: any) => {
    update(row.id, { state: 1 }, t("buttons.enable"))
}

const handleDisable = (row: any) => {
    update(row.id, { state: 2 }, t("buttons.disable"))
}

const update = (id: number, params: any, type: string) => {
    const url = '/p/define/update'
    const item = { id, ...params }
    alaPost(u.url(url || ''), item, false, 'put').then((data: any) => {
        notify.success(t('pop.warm_title'), type + "成功")
        refresh()
    });
}

const handleApply = (row: any) => {
    const url = '/p/instance/start'
    const item = { defineId: row.id }
    alaPost(u.url(url || ''), item, false, '').then((data: any) => {
        notify.success(t('pop.warm_title'), t("buttons.form_initiate") + "成功")
        refresh()
    });
}

</script>

<style lang="scss" scoped></style>