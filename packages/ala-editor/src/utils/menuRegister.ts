/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-10 12:57:08
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-09-03 17:49:12
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
        component: "../pages/system/role/roleList.vue",
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
        component: "../pages/system/user/userList.vue",
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
        // component: "../pages/drag/Designer.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/process/design/page": {
        name: "ProcessDesignListPage",
        component: "../pages/process/designList.vue",
        requiresAuth: true,
    },
    "/process/design": {
        name: "Design",
        component: "../pages/process/design.vue",
        requiresAuth: true,
        uniqueCheck: true,
    },
    "/process/designAdd": {
        name: "ProcessDesignAdd",
        component: "../pages/process/designAdd.vue",
        requiresAuth: true,
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
        name: "ProcessMyStartListPage",
        component: "../pages/process/myStartList.vue",
        requiresAuth: true,
    },
    "/process/instance": {
        name: "ProcessInstanceListPage",
        component: "../pages/process/instanceList.vue",
        requiresAuth: true,
    },
    "/process/myTodo": {
        name: "ProcessMyTodoListPage",
        component: "../pages/process/myTodoList.vue",
        requiresAuth: true,
    },
    "/process/task": {
        name: "ProcessTaskListPage",
        component: "../pages/process/taskList.vue",
        requiresAuth: true,
    },
    "/process/myDone": {
        name: "ProcessMyDoneListPage",
        component: "../pages/process/myDoneList.vue",
        requiresAuth: true,
        uniqueCheck: false,
    },
    "/process/myCopy": {
        name: "ProcessMyCopyListPage",
        component: "../pages/process/mySendCopyList.vue",
        requiresAuth: true,
    },
    "/datasource/page": {
        name: "DatasourceListPage",
        component: "../pages/bi/datasource/index.vue",
        requiresAuth: true,
    },
    "/datasetGroup/page": {
        name: "DatasetGroupListPage",
        component: "../pages/bi/datasetGroup/index.vue",
        requiresAuth: true,
    },
    "/chatGroup/page": {
        name: "ChatGroupListPage",
        component: "../pages/im/chatGroup/chatGroupList.vue",
        requiresAuth: true,
    },
    "/chatMsg/page": {
        name: "ChatMsgListPage",
        component: "../pages/im/chatMsg/chatMsgList.vue",
        requiresAuth: true,
    },
    "/todo/page": {
        name: "TodoListPage",
        component: "../pages/oa/todo/todoList.vue",
        requiresAuth: true,
    },
    "/todo/mypage": {
        name: "TodoListMyPage",
        component: "../pages/oa/todoMy/todoList.vue",
        requiresAuth: true,
    },
    "/aiAssist/page": {
        name: "AiAssistPage",
        component: "../pages/ai/aiAssist.vue",
        requiresAuth: true,
    },
    "/profile/page": {
        name: "profilePage",
        component: "../pages/iot/profile/index.vue",
        requiresAuth: true,
    },
    "/device/page": {
        name: "devicePage",
        component: "../pages/iot/device/index.vue",
        requiresAuth: true,
    },
    "/point/page": {
        name: "pointPage",
        component: "../pages/iot/point/index.vue",
        requiresAuth: true,
    },
    "/warehouseAndLocations/page": {
        name: "warehouseAndLocationsPage",
        component: "../pages/storage/kuqukuwei/index.vue",
        requiresAuth: true,
    },
    "/camera/page": {
        name: "cameraPage",
        component: "../pages/iot/camera/index.vue",
        requiresAuth: true,
    },
    "/physical/servers": {
        name: "physicalServersPage",
        component: "../pages/cloud/physicalServers/index.vue",
        requiresAuth: true,
    },
    "/cloudServers/page": {
        name: "cloudServersPage",
        component: "../pages/cloud/cloudServers/index.vue",
        requiresAuth: true,
    },
    "/physicalServers/disks": {
        name: "physicalServersDisks",
        component: "../pages/cloud/physicalServersDisks/index.vue",
        requiresAuth: true,
    },
    "/snapshot": {
        name: "snapshot",
        component: "../pages/cloud/snapshot/index.vue",
        requiresAuth: true,
    },


}

export default class MenuUtil {

    static registerDynamicRouter(menus: Menu[], fn: Function, modules: Record<string, () => Promise<unknown>>, level = 0): void {

        if (menus && menus.length > 0) {

            menus.forEach(menu => {

                // logger.info('  '.repeat(level) + `ID: ${menu.id}, Name: ${menu.name}`);
                logger.info('==》'.repeat(level) + `Level: ${level}, ID: ${menu.id}, Name: ${menu.name}`);

                let keepAlive = true
                if (menu.url && menu.url.startsWith('/bi/')) {
                    keepAlive = false
                }

                if (menu.url) {
                    let menuComponent = allMenuComponents[menu.url]
                    if (menuComponent) {

                        let p = menuComponent.component
                        if (p.startsWith('../')) {
                            p = '/src' + p.substring(2)
                        }
                        router.addRoute({
                            path: menu.url,
                            // name: fn(menu.code),
                            name: menuComponent.name,
                            // component: () => import(p),
                            component: modules[p],
                            meta: {
                                requiresAuth: menuComponent.requiresAuth,
                                menuName: menu.name,
                                menuCode: menu.code,
                                viewName: menuComponent.viewName,
                                uniqueCheck: menuComponent.uniqueCheck,
                                keepAlive: keepAlive
                            },
                        });
                    } else if (menu.fullPath) {

                        logger.info(`menu.fullPath [ ${menu.fullPath} ]【 动态渲染组件 】，菜单名[ ${menu.name} ]`);

                        menuComponent = {
                            name: menu.url.replaceAll('/', '_'),
                            component: menu.fullPath,
                            requiresAuth: true,
                        }

                        let p = menuComponent.component
                        if (p.startsWith('../')) {
                            p = '/src' + p.substring(2)
                        }
                        router.addRoute({
                            path: menu.url,
                            // name: fn(menu.code),
                            name: menuComponent.name,
                            component: modules[p],
                            meta: {
                                requiresAuth: menuComponent.requiresAuth,
                                menuName: menu.name,
                                menuCode: menu.code,
                                keepAlive: keepAlive
                            },
                        });


                    } else {
                        logger.error(`menu.url [ ${menu.url} ] 渲染的组件不存在，菜单名[ ${menu.name} ]`);
                    }

                } else {
                    logger.warn(`[ ${menu.name} ]'s menu.url 不存在，不注册路由`);
                }

                this.registerDynamicRouter(menu.children, fn, modules, level + 1);


            });
        }
    }
}