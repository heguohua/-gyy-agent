<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-07-06 21:06:22
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-07-07 09:37:34
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/cps/permission/ala-permission.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <ul class="permission-menu">
        <li v-for="node in nodes" :key="node.id" class="permission-item" :style="{ marginLeft: level * indent + 'px' }">
            <div class="permission-one-menu" @click="emit('select', node)">
                <div class="menu-name">
                    <input type="checkbox" :checked="false" />{{ node.name }}
                    <input type="checkbox" @click="check($event, node)" :checked="node.authorized === 1 ? true : false"
                        class="menu-checkbox" />菜单
                </div>
                <div class="permissions" v-if="node.resources && node.resources.length">

                    <div class="permission" v-for="(item, index) in node.resources" :key="item.id" @click="">
                        <input type="checkbox" @click="check($event, item)"
                            :checked="item.authorized === 1 ? true : false" />{{
                                permissionName(node.name, item.description) }}
                    </div>
                </div>
            </div>

            <!-- Recursive branch -->
            <AlaPermission v-if="node.children && node.children.length" :nodes="node.children" :level="level + 1"
                :indent="indent" @select="emit('select', $event)" />
        </li>
    </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineOptions, computed } from 'vue'

export interface PermissionNode {
    id: string | number
    name: string
    children?: PermissionNode[]
    resources?: Array<any>
    authorized: number

}

defineOptions({
    name: 'AlaPermission'
})

const props = defineProps<{
    /** Array of nodes to render */
    nodes: PermissionNode[]
    /** Current depth level (root=0). Omit when using component externally */
    level?: number
    /** Indentation (px) per level. Default 16 */
    indent?: number
}>()

const emit = defineEmits<{
    (e: 'select', node: PermissionNode): void
}>()

const level = computed(() => props.level ?? 0)
const indent = computed(() => props.indent ?? 16)

const check = (event: Event, item: any) => {
    // 强制断言为 HTMLInputElement 才有 checked 属性
    const el = event.target as HTMLInputElement
    const checked = el.checked
    if (checked) {
        item.authorized = 1
    } else {
        item.authorized = 2
    }

}

const permissionName = (nodeName: string, permissionDescription: string) => {
    if (permissionDescription.startsWith(nodeName + '-')) {
        return permissionDescription.substring(permissionDescription.indexOf('-') + 1)
    } else {
        return permissionDescription
    }
}

</script>

<style scoped lang="scss">
.permission-menu {
    list-style: none;
    margin: 0;
    padding: 0;

    .permission-item {
        line-height: 3rem;


        .permission-one-menu {
            display: flex;
            flex-wrap: nowrap;

            .menu-name {
                display: flex;
                flex-wrap: nowrap;
                white-space: nowrap;
                margin-right: 16px;
                align-items: center;
                justify-content: center;
                height: 3rem;

                .menu-checkbox {
                    margin-left: 18px;
                }
            }

            .permissions {
                padding: 0px 4px 0px 18px;

                .permission {
                    display: inline-flex;
                    margin-right: 16px;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: center;


                }
            }

            // cursor: pointer;
            user-select: none;
            transition: background-color 0.2s ease;
            text-align: left;
            border-bottom: 1px solid var(--el-border-color-lighter);
            padding-left: 4px;

            &:hover {
                background-color: var(--el-fill-color-light);
            }


            input[type="checkbox"] {
                // accent-color: var(--el-color-primary-light-5);
                appearance: none;
                width: 1.1rem;
                height: 1.1rem;
                margin-right: 3px;
                border: 1px solid var(--el-border-color);
                border-radius: 3px;

                &:hover {
                    cursor: pointer;
                }

                &:checked {
                    background: var(--el-color-primary);
                    position: relative;
                    border: 1px solid var(--el-color-primary);

                    &::after {
                        content: "✔";
                        /* 把对号作为文字插进去 */
                        font-size: 14px;
                        /* ← 对号大小 */
                        color: #fff;
                        /* 对号颜色 */
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);

                    }
                }


            }
        }
    }
}
</style>