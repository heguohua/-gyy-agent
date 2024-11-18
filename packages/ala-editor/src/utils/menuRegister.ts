/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 12:57:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-17 23:05:02
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
    "/lowcoding/page": {
        name: "LowCodingPage",
        component: "../pages/lowcoding/index.vue",
        requiresAuth: true
    }
}

export default class MenuUtil {

    static registerDynamicRouter(menus: Menu[], fn: Function, level = 0): void {

        if (menus && menus.length > 0) {

            menus.forEach(menu => {

                // logger.info('  '.repeat(level) + `ID: ${menu.id}, Name: ${menu.name}`);
                logger.info('==》'.repeat(level) + `Level: ${level}, ID: ${menu.id}, Name: ${menu.name}`);

                if (menu.url) {
                    const menuComponent = allMenuComponents[menu.url]
                    if (menuComponent) {
                        router.addRoute({
                            path: menu.url,
                            // name: fn(menu.code),
                            name: menuComponent.name,
                            component: () => import(menuComponent.component),
                            meta: { requiresAuth: menuComponent.requiresAuth, menuName: menu.name, menuCode: menu.code }
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