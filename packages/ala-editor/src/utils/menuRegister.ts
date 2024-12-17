/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 12:57:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-12-17 17:33:41
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/menuRegister.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
import Menu from "@/types/menuType";
import router from "@/router";
import { logger } from "@/utils/logger";

export interface MenuComponent {
    [key: string]: {
        name: string,
        component: string,
        requiresAuth: boolean,
        viewName?: string,
        uniqueCheck?: boolean,
    }
}

export const allMenuComponents: MenuComponent = {
    "/dict/page": {
        name: "DictPage",
        component: "../pages/dict/index.vue",
        requiresAuth: true
    },
    "/log/page": {
        name: "LogPage",
        component: "../pages/log/index.vue",
        requiresAuth: true
    },
    "/organization/page": {
        name: "OrganizationPage",
        component: "../pages/organization/index.vue",
        requiresAuth: true
    },
    "/role/page": {
        name: "RolePage",
        component: "../pages/role/index.vue",
        requiresAuth: true
    },
    "/sysMenu/page": {
        name: "SysMenuPage",
        component: "../pages/sysMenu/index.vue",
        requiresAuth: true
    },
    "/team/page": {
        name: "TeamPage",
        component: "../pages/team/index.vue",
        requiresAuth: true
    },
    "/user/page": {
        name: "UserPage",
        component: "../pages/user/index.vue",
        requiresAuth: true
    },
    "/menu/user/page": {
        name: "UserMenuPage",
        component: "../pages/userMenu/index.vue",
        requiresAuth: true
    },
    "/menu/page": {
        name: "MenuPage",
        component: "../pages/menu/index.vue",
        requiresAuth: true
    },
    "/lowcodingConfig/page": {
        name: "EditorListPage",
        component: "../pages/lowcoding/index.vue",
        requiresAuth: true
    },
    "/editor/design": {
        name: "EditorDesignPage",
        component: "../pages/lowcoding/editor.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/editor/formDesign": {
        name: "FormDesignPage",
        component: "../pages/lowcoding/form-design-editor.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/editor/screenDesign": {
        name: "ScreenDesignPage",
        component: "../pages/lowcoding/screen-design-editor.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/process/design/page": {
        name: "ProcessDesignListPage",
        component: "../pages/process/designList.vue",
        requiresAuth: true,
    },
    "/process/design": {
        name: "ProcessDesign",
        component: "../pages/process/design.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/process/define/Page": {
        name: "ProcessDefineListPage",
        component: "../pages/process/defineList.vue",
        requiresAuth: true,
    },
    "/process/start": {
        name: "ProcessStartPage",
        component: "../pages/process/start.vue",
        requiresAuth: true,
    },
    "/process/my": {
        name: "ProcessMyListPage",
        component: "../pages/process/myList.vue",
        requiresAuth: true,
    },
    "/process/myTodo": {
        name: "ProcessMyTodoListPage",
        component: "../pages/process/myTodoList.vue",
        requiresAuth: true,
    },
    "/process/myDone": {
        name: "ProcessMyDoneListPage",
        component: "../pages/process/myDoneList.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/process/myCopy": {
        name: "ProcessMyCopyListPage",
        component: "../pages/process/mySendCopyList.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },

}

export default class MenuUtil {

    static registerDynamicRouter(menus: Menu[], fn: Function, level = 0): void {

        if (menus && menus.length > 0) {

            menus.forEach(menu => {

                // logger.info('  '.repeat(level) + `ID: ${menu.id}, Name: ${menu.name}`);
                logger.info('==》'.repeat(level) + `Level: ${level}, ID: ${menu.id}, Name: ${menu.name}`);

                if (menu.url) {
                    let menuComponent = allMenuComponents[menu.url]
                    if (menuComponent) {
                        router.addRoute({
                            path: menu.url,
                            // name: fn(menu.code),
                            name: menuComponent.name,
                            component: () => import(menuComponent.component),
                            meta: {
                                requiresAuth: menuComponent.requiresAuth,
                                menuName: menu.name,
                                menuCode: menu.code,
                                viewName: menuComponent.viewName,
                                uniqueCheck: menuComponent.uniqueCheck,
                            },
                        });
                    } else if (menu.fullPath) {

                        logger.info(`menu.fullPath [ ${menu.fullPath} ]【 动态渲染组件 】，菜单名[ ${menu.name} ]`);

                        menuComponent = {
                            name: menu.url.replaceAll('/', '_'),
                            component: menu.fullPath,
                            requiresAuth: true,
                        }

                        router.addRoute({
                            path: menu.url,
                            // name: fn(menu.code),
                            name: menuComponent.name,
                            component: () => import(menuComponent.component),
                            meta: {
                                requiresAuth: menuComponent.requiresAuth,
                                menuName: menu.name,
                                menuCode: menu.code,
                            },
                        });


                    } else {
                        logger.error(`menu.url [ ${menu.url} ] 渲染的组件不存在，菜单名[ ${menu.name} ]`);
                    }

                } else {
                    logger.warn(`[ ${menu.name} ]'s menu.url 不存在，不注册路由`);
                }

                this.registerDynamicRouter(menu.children, fn, level + 1);


            });
        }
    }
}