<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-28 15:59:53
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-01-06 15:36:06
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/process/start.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="ala-start">

        <template v-for="(define, index) in defines" :key="index" @click="">
            <div class="one-class">
                <p class="class-title">
                    {{ define.name }}
                </p>
                <div class="cards">
                    <div class="ala-card" v-for="(item, i) in define.defineVos" :key="index + '-' + i"
                        @click="handleClick(item)">
                        <div class="ala-card-image">
                            <img :src="imageSrc(item)" :style="{ width: imageWidth, height: imageHeight }" />
                        </div>
                        <div class="ala-card-content">
                            <p class="title">
                                {{ item.displayName }}
                            </p>
                            <p class="remark">
                                <el-tooltip effect="light" :content="item.remark" :hide-after="0">
                                    {{ showValue(item.remark) }}
                                </el-tooltip>

                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { alaPost, get } from '@/utils/req'
import u from '@/utils/u'


// State

// 图片高度
const imageWidth = '36px'
const imageHeight = '36px'

const src = '/flow/'
const imageSrc = (item: any) => {
    const imgSrc = item.icon ? src + item.icon + '.svg' : src + 'leave.svg'
    return imgSrc
}

const remark = '普工请假审批普工请假审批普工请假审批'

// Methods
const showValue = (value: string) => {
    const maxlength = 12
    if (value && value.length > maxlength) {
        value = value.slice(0, maxlength) + ' ...'
    }
    return value
}

const url = '/p/define/listForApply'
const params = { state: 1 }
const defines = ref<any>([])
onActivated(() => {
    alaPost(u.url(url), params, false, '').then((data: any) => {
        const response = data;
        if (response.data) {
            defines.value = response.data
        }
    });
})



const classifyByProperty = (items: [], propertyName: string) => {
    const classified: { [key: string]: [] } = {};
    items.forEach(item => {
        const key = item[propertyName]
        if (!classified[key]) {
            classified[key] = [];
        }
        classified[key].push(item);
    });

    console.log('classified:', classified);


    const sortedKeys = getSortedPropertyKeys(classified)
    const sortedValues: any = []
    sortedKeys.forEach(key => {
        sortedValues.push(classified[key])
    })

    return sortedValues;
}

const getSortedPropertyKeys = (obj: any) => {
    // 获取对象的所有属性名，并转换为数组
    const keys = Object.keys(obj);
    // 对属性值进行排序
    const sortedValues = keys.sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        } else if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return 0;
    });
    return sortedValues;
}

const getUrl = '/p/define/get'
const handleClick = (item: { id: number }) => {
    get(u.url(getUrl || ''), { id: item.id }).then((response: any) => {
        console.log('response:', response.data.data);
        const data = response.data.data
        const content = data.content
        console.log('content:', u.parseJson(content));


    });
}

</script>

<style scoped lang="scss">
.ala-start {
    padding: 20px;


    .one-class {
        margin-bottom: 22px;

        background: #fff;
        padding: 12px 8px;
        border-radius: 8px;

        .class-title {
            height: 32px;
            line-height: 32px;
            text-align: left;
            font-weight: bold;
            font-size: 1.2rem;
            padding-left: 8px;
        }

        .cards {
            display: flex;
            gap: 20px;
            padding: 8px;
            align-items: center;
            flex-wrap: wrap;

            .ala-card {

                display: flex;
                padding: 16px 20px;
                width: 300px;
                background: #f3f7fa;
                border-radius: 8px;


                .ala-card-image {
                    padding: 8px;
                    background: radial-gradient(circle, rgb(64 158 255 / 93%) 50%, rgb(64 158 255 / 99%) 100%);
                    margin-right: 8px;
                    border-radius: 8px;

                    img {}
                }

                .ala-card-content {
                    width: 200px;
                    text-align: left;

                    .title {
                        font-size: 1.1rem;
                        font-weight: bold;
                    }

                    .remark {
                        margin-top: 4px;
                        font-size: 0.9rem;
                        color: var(--el-text-color-regular);
                    }
                }

                &:hover {
                    cursor: pointer;
                }


            }
        }
    }



}
</style>