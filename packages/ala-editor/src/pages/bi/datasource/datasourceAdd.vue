<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-13 14:24:09
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-26 21:55:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/bi/datasource/datasourceAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>

    <AlaBaseForm v-model="showDrawer" @confirm="confirm" v-bind="props" :fields="basicFields" :formData="formData"
        labelPosition="top" :moduleName="moduleName" :url="url" :updateUrl="updateUrl" :tipTitle="$t('pop.warm_title')"
        :formAttr="formAttr" :beforeSave="beforeSave" />

</template>

<script setup lang="ts">
import { logger } from '@/utils/logger';
import { alaLl8_, alaLOrlOr8Or_, alaNumberRange, alaNumberMin, alaRequired, alaStrLength, alaStrLengthRange, alaStrMax, alaStrMin, alaNumberMax, alaEmail, alaPhone, alaUrl, alaCard, alaNumber, alaLetter, alaLOrlOr8, alaLl8, alaPassword, alaLinuxPort } from '@/config/alaRules';
import { alaBuildCheckbox, alaBuildDate, alaBuildHidden, alaBuildInput, alaBuildNumber, alaBuildPassword, alaBuildRadio, alaBuildRating, alaBuildRawInput, alaBuildSelect, alaBuildDivider, alaBuildSlider, alaBuildSwitch, alaBuildCascader, alaBuildTextarea, alaBuildChapter } from '@/config/alaBuilders';
import u from '@/utils/u';
import { date } from '@/utils/date';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
const url = '/u/menu/add'
const updateUrl = '/u/menu/update'
// 表单数据保存对象
const formData = reactive<{ [key: string]: any }>({
    configuration: {}
})

watch(() => props.baseInfo.item, (item) => {
    logger.info(`观察到 baseInfo 中的 item 发生了变化`, item);
    // u.merged(formData, item)
    if (!item.id) {
        u.clear(formData)
    }
    Object.assign(formData, item)
    logger.info(`formData数据更新后`, formData);
}, {
    deep: true
})


const preFields = ref([
    alaBuildHidden('pid'),// 固定格式
    alaBuildHidden('id'),// 固定格式
    alaBuildCascader('type', '数据源类型', '[{"value":"OLTP","label":"OLTP","children":[{"value":"MySQL","label":"MySQL","image":"/db/mysql.svg"},{"value":"Db2","label":"Db2","image":"/db/db2.svg"},{"value":"MariaDB","label":"MariaDB","image":"/db/mariadb.svg"},{"value":"Mongodb-BI","label":"Mongodb-BI","image":"/db/mongo.svg"},{"value":"Oracle","label":"Oracle","image":"/db/oracle.svg"},{"value":"PostgreSQL","label":"PostgreSQL","image":"/db/postgreSQL.svg"},{"value":"SQL Server","label":"SQL Server","image":"/db/sqlServer.svg"},{"value":"TiDB","label":"TiDB","image":"/db/TiDB.svg"}]},{"value":"OLAP","label":"OLAP","children":[{"value":"Apache Impala","label":"Apache Impala","image":"/db/impala.svg"},{"value":"Apache Doris","label":"Apache Doris","image":"/db/doris.svg"},{"value":"ClickHouse","label":"ClickHouse","image":"/db/clickHouse.svg"},{"value":"StarRocks","label":"StarRocks","image":"/db/starRocks.svg"}]},{"value":"数据湖","label":"数据湖","children":[{"value":"AWS Redshift","label":"AWS Redshift","image":"/db/redshift.svg"}]},{"value":"API数据","label":"API数据","children":[{"value":"API","label":"API","image":"/db/api.svg"}]},{"value":"本地文件","label":"本地文件","children":[{"value":"Excel","label":"Excel","image":"/db/excel.svg"}]}]', [alaRequired()], '请选择数据源类型', { columnNum: 2 }),
    alaBuildInput("name", "数据源名称", [alaRequired(), alaStrLengthRange(2, 32)], "请输入数据源名称", { columnNum: 2 }),
    alaBuildTextarea("description", "描述", [], "请输入数据源描述信息", { columnNum: 2 }),

])

const subFields = ref([
    alaBuildChapter('数据源连接池配置', "", { columnNum: 2 }),
    alaBuildNumber("configuration.initialPoolSize", "初始连接数", [alaRequired(), alaNumberRange(5, 15)], "请输入数据源连接池初始连接线程数", { initValue: 5, position: 'left', labelWidth: 110 }),
    alaBuildNumber("configuration.minPoolSize", "最小连接数", [alaRequired(), alaNumberRange(5, 15)], "请输入数据源连接池最小连接线程数", { initValue: 5, position: 'left', labelWidth: 110 }),
    alaBuildNumber("configuration.maxPoolSize", "最大连接数", [alaRequired(), alaNumberRange(5, 15)], "请输入数据源连接池最大连接线程数", { initValue: 5, position: 'left', labelWidth: 110 }),
    alaBuildNumber("configuration.queryTimeout", "查询超时(秒)", [alaRequired(), alaNumberRange(1, 600)], "请输入数据源查询最大超时时间", { initValue: 30, position: 'left', labelWidth: 110 }),
])

const datasourceFields = ref<Array<any>>([])

// 基础表单字段
const basicFields = computed(() => {
    return preFields.value.concat(datasourceFields.value)
})

watch(() => formData['type'], (value: string) => {
    // 数据源类型发生变化，重新初始化表单区域

    let fields: any[] = []
    if (value === '["OLTP","MySQL"]') {
        fields = [
            alaBuildChapter('数据源连接地址&账号信息', "", { columnNum: 2 }),
            alaBuildInput("configuration.host", "主机名/IP地址", [alaRequired(), alaStrLengthRange(2, 256)]),
            alaBuildNumber("configuration.port", "端口号", [alaRequired(), alaLinuxPort()], "请输入数据源连接端口号"),
            alaBuildInput("configuration.dataBase", "数据库名称", [alaRequired(), alaStrLengthRange(2, 256)]),
            alaBuildInput("configuration.username", "用户名", [alaRequired(), alaStrLengthRange(2, 256)]),
            alaBuildPassword("configuration.password", "密码", [alaRequired(), alaStrLengthRange(2, 256)]),
            alaBuildTextarea("configuration.extraParams", "额外的 JDBC 连接字符串", [alaRequired(), alaStrLengthRange(2, 256)], "请输入数据库连接额外参数信息，如 ‘ ?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true ’", { cleanNewlineCharacter: true, columnNum: 2 }),
        ].concat(subFields.value)

    } else if (value === '["OLTP","Db2"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'Db2', [alaRequired()]),
        ]
    } else if (value === '["OLTP","MariaDB"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'MariaDB', [alaRequired()]),
        ]
    } else if (value === '["OLTP","Mongodb-BI"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'Mongodb-BI', [alaRequired()]),
        ]
    } else if (value === '["OLTP","Oracle"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'Oracle', [alaRequired()]),
        ]
    } else if (value === '["OLTP","PostgreSQL"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'PostgreSQL', [alaRequired()]),
        ]
    } else if (value === '["OLTP","SQL Server"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'SQL Server', [alaRequired()]),
        ]
    } else if (value === '["OLTP","TiDB"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'TiDB', [alaRequired()]),
        ]
    } else if (value === '["OLAP","Apache Impala"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'Apache Impala', [alaRequired()]),
        ]
    } else if (value === '["OLAP","Apache Doris"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'Apache Doris', [alaRequired()]),
        ]
    } else if (value === '["OLAP","ClickHouse"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'ClickHouse', [alaRequired()]),
        ]
    } else if (value === '["OLAP","StarRocks"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'StarRocks', [alaRequired()]),
        ]
    } else if (value === '["数据湖","AWS Redshift"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'AWS Redshift', [alaRequired()]),
        ]
    } else if (value === '["API数据","API"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'API', [alaRequired()]),
        ]
    } else if (value === '["本地文件","Excel"]') {
        datasourceFields.value = [
            alaBuildInput("name", 'Excel', [alaRequired()]),
        ]
    }

    datasourceFields.value = fields

    // datasourceField.value = [
    //     alaBuildSwitch('value', t('module.menu.name') + ' or ' + t('module.menu.url'), t('module.menu.url'), t('module.menu.name'), 2, 1, [alaRequired()]),
    //     alaBuildInput("name", t('module.menu.name'), [alaRequired()]),
    //     // alaBuildDivider("这里是分隔线", "right"),

    //     alaBuildInput("url", t('module.menu.url'), []),
    //     alaBuildInput("fullPath", t('module.menu.dynamicUrl'), []),
    //     alaBuildInput("code", t('i18n.i18n'), []),
    //     // alaBuildDivider("这里是分隔线", "left"),
    //     alaBuildSwitch('delFlag', t('common.enable'), t('buttons.enable'), t('buttons.disable'), 2, 1, [alaRequired()]),
    //     alaBuildInput("icon", t('module.menu.icon'), [alaRequired()]),
    //     // alaBuildDivider("这里是分隔线"),
    //     alaBuildNumber("width", t('module.menu.width'), [alaRequired()]),
    //     alaBuildNumber("height", t('module.menu.height'), [alaRequired()]),
    //     alaBuildNumber("sort", t('common.sorting')),
    // ]

})

// // 基础表单字段
// const basicFields = [
//     alaBuildHidden('pId'),
//     alaBuildRawInput('AlaCustomerizationComponentDemo', '自定义文本框', [alaRequired()], '请输入内容'),
//     alaBuildInput("username", "用户名", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
//     alaBuildPassword("password", "密码", [alaRequired(), alaLOrlOr8(), alaStrLengthRange(8, 16)]),
//     alaBuildNumber("age", "年龄", [alaRequired(), alaNumber(), alaNumberRange(18, 99)]),
//     alaBuildRadio('gender', "性别", [{ '男': 'man' }, { '女': 'men' }, { '未知': 'unknown' }], [alaRequired()]),
//     alaBuildCheckbox('color', "偏好色系", [{ '红色': 'red' }, { '绿色': 'green' }, { '黄色': 'yellow' }], [alaRequired()]),
//     alaBuildSelect('channel', "购票渠道", [{ '拼多多': 'pin' }, { '美团': 'mei' }, { '淘票票': 'yellow' }], [alaRequired()]),
//     alaBuildSwitch('status', "账号状态", '正常', '禁用', [alaRequired()]),
//     alaBuildDate('bornDate', "出生日期", 'date', "YYYY-MM-DD", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
//     alaBuildDate('registerTime', "认证时间", 'datetime', "YYYY-MM-DD HH:mm:ss", [alaRequired()], "", date.YYYY_MM_DD(new Date())),
//     alaBuildSlider('weight', "大概体重", 40, 200, 5, [alaRequired()]),
//     alaBuildRating('score', "整体评分", 10, [alaRequired()], true),
// ]


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

// ##########################  以上是公共方法，不需要修改 end #########################################
const formAttr = ref({
    formWidth: 800,
    columnNum: 2,
    labelWidth: 200,
    labelPosition: 'top',
    useFormTitle: false,
})


const beforeSave = (data: { [key: string]: any }) => {
    console.log('data:', data);
    throw '111'

}


</script>

<style scoped lang="scss"></style>