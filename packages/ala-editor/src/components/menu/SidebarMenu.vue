<template>
    <div class="side-bar">

        <el-aside width="200px">
            <el-menu default-active="1" class="el-menu-vertical-ala" @open="handleOpen" @close="handleClose"
                :collapse="isCollapse">
                <!-- 递归渲染菜单项 -->
                <template v-for="item in menuList" :key="item.index">
                    <SidebarMenuItem v-if="item.children && item.children.length" :item="item" :is-collapse="isCollapse"
                        @toggle-collapse="toggleCollapse" />
                    <el-menu-item v-else :index="item.index">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
            <div class="collapse-btn" @click="toggleCollapse">
                <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
            </div>
        </el-aside>
    </div>

</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import SidebarMenuItem from '@/components/menu/SidebarMenuItem.vue'; // 引入递归子组件

const props = defineProps({
    menuList: Array
});

const isCollapse = ref(false);

const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
};

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};
</script>

<style scoped lang="scss">
.side-bar {
    margin-top: var(--layout-header-height);
    height: calc(100% - var(--layout-header-height));
    

    .el-menu-vertical-ala {
        i {}

        span {}

        &:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }

    .collapse-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        cursor: pointer;
        padding: 10px;
        background-color: #d3dce6;
        color: #fff;
        text-align: center;
        font-size: 20px;
        transform: translateY(50%);
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;

        .el-icon-arrow-right {}

        .el-icon-arrow-left {}
    }
}
</style>