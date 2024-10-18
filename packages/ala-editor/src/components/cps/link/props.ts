/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-18 20:22:46
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 20:47:33
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/link/props.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { PropType } from "vue";

export type AlaLinkPropsTarget = '_blank' | '_self' | '_parent' | '_top'

export type LinkProps = {

    to: {
        desktop: '',
        mobile: '',
    },

    target: {
        desktop: '',
        mobile: '',
    },

}

export const blockProps = {
    /**
     * @Description: 跳转链接
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 20:41:56
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/link/props.ts
     */
    to: {
        type: String,
        default: ''
    },
    /**
     * @Description: 跳转方式
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 20:41:46
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/link/props.ts
     */
    target: {
        type: String as PropType<AlaLinkPropsTarget>,
        default: "_blank"
    }
}

