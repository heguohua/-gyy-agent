
<template>
    <draggable :list="list" :group="group" :sort="sort" animation="200" item-key="id" ghost-class="ghost-class"
        class="edit-block-drag" :clone="clone" :move="move">

        <template #item="{ element }">

            <div class="block-item" @dragstart="onDragStart($event, element)">
                <div class="block-name">{{ element.name }}</div>
                <div class="block-image">
                    <img :src="'/charts/' + element.icon" />
                </div>
            </div>

        </template>

    </draggable>

</template>

<script setup lang="ts">

import { clone, move } from "@/components/editor/nested"
import u from "@/utils/u"

const props = defineProps({
    list: {
        type: Array,
        required: true,
        default: () => []
    },
    group: {
        type: [String, Object],
        default: 'group'
    },
    sort: {
        type: Boolean,
        default: false
    },
    bType: {
        type: String,
        default: 'page'
    },
})
const bType = props.bType

// State

// Methods
// 兼容 HTML5 拖放 API + 自定义画布 方式实现的拖拽
const onDragStart = (e: DragEvent, element: any) => {
    e.dataTransfer?.setData('alaChartBlock', u.tojson(element))
}

</script>

<style scoped lang="scss">
.edit-block-drag {
    display: flex;
    flex-wrap: wrap;

    .block-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: grab;
        width: 100%;
        text-align: center;
        border-radius: var(--border-radius);
        padding: 4px 0px;
        align-items: center;

        &:active {
            cursor: grabbing;
        }

        .block-image {
            img {
                width: 100%;
            }
        }

        &:hover {
            background: var(--color-block-hover);
            border: 1px solid var(--color-border);
            color: var(--el-color-primary);
        }

        .block-name {
            font-size: 0.8rem;
            line-height: 0.8rem;
            padding-top: 4px;
        }
    }
}

.ghost-class {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    background: var(--color-active-bg);
    border: 1px solid var(--color-active-text);

    img,
    svg {
        width: 20px;
        height: 20px;
        margin: 0 auto;
    }
}
</style>