<template>
    <div class="ala-ai-page">
        <div class="side-bar">
            <div class="collapse-btn">
                <p class="company">
                    <!-- {{ $t('system.company') }} -->
                </p>

            </div>
            <el-aside class="ala-aside">
                <el-menu class="el-menu-vertical-ala" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                    :default-active="activeMenu" router>

                    <!-- 递归渲染菜单项 -->
                    <template v-for="item in menuList" :key="item.code">

                        <!-- 渲染菜单 -->

                        <el-sub-menu :index="`${item.code ? item.code : item.id}`" class="ala-sub-menu">
                            <!-- 1、先渲染当前节点 -->
                            <template #title>
                                <span>{{ item.name }}</span>
                            </template>

                            <!-- 2、直接遍历子节点并进行渲染 -->
                            <template v-for="child in item.children" :key="child.id">

                                <!-- 3、如果当前节点不存在子节点，直接渲染普通菜单 -->
                                <!-- <el-menu-item v-if="!child.children || child.children.length === 0" :index="`${child.id}`" -->
                                <el-menu-item v-if="!child.children || child.children.length === 0"
                                    :index="`${child.code ? child.code : child.id}`" @click="handleSelect(child)">

                                    <!-- <span>{{ child.code }}</span> -->
                                    <span>{{ child.name }}</span>

                                </el-menu-item>



                            </template>

                        </el-sub-menu>



                    </template>

                </el-menu>

            </el-aside>
        </div>
        <div class="right-content">
            <AiChat></AiChat>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Menu = {
    id: number,
    name: string,
    code: string,
    children?: Array<Menu>,
}

// State
const isCollapse = defineModel({
    type: Boolean,
    default: false
})




const activeMenu = ref('/');

const menuList = ref<Array<Menu>>([
    {
        id: 1,
        name: '聊天助手',
        code: 'chat'
    },
    {
        id: 2,
        name: '模型文件',
        code: 'model'
    },
    {
        id: 3,
        name: '提示词',
        code: 'prompt'
    },
    {
        id: 4,
        name: '文档',
        code: 'doc'
    },
    {
        id: 5,
        name: '知识库',
        code: 'knowledge'
    },
])

// Methods

const handleOpen = (key: any, keyPath: any) => {
    // console.log(key, keyPath);
};

const handleClose = (key: any, keyPath: any) => {
    // console.log(key, keyPath);
};

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};

const handleSelect = (menu: Menu) => {
    console.log('menu:', menu);
}

</script>

<style scoped lang="scss">
.ala-ai-page {

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100%;

    .side-bar {
        height: 100%;

        --el-aside-width: 200px;


        .ala-aside {
            height: 100%;
            background: #fff;
        }
    }

    .right-content {
        width: calc(100% - 200px);
        height: 100%;

    }
}
</style>