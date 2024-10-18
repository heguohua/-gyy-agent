/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 17:26:15
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/image/props.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { Viewport } from "@/types/editorType";
import { PropType } from "vue";

export type AlaImageProps = {
    /**
     * @Description: 图片是否在对应屏幕显示
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 17:24:47
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/image/props.ts
     */
    display: {
        desktop: '',
        mobile: '',
    },
    /**
     * @Description: 图片地址
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 17:25:09
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/image/props.ts
     */
    src: {
        desktop: '',
        mobile: '',
    },
    /**
     * @Description: 图片链接
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 17:25:19
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/image/props.ts
     */
    link: {
        desktop: '',
        mobile: '',
    },
    /**
     * @Description: 图片宽度
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 17:25:38
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/image/props.ts
     */
    width: {
        desktop: '',
        mobile: '',
    },
    /**
     * @Description: 图片高度
     * @Author: darcy.zhang
     * @Email: tech.darcy.zhang@outlook.com
     * @Date: 2024-10-18 17:25:50
     * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/cps/image/props.ts
     */
    height: {
        desktop: '',
        mobile: '',
    },
}

export const blockProps = {
    data: {
        type: Object as PropType<AlaImageProps>,
        default: () => ({
            display: {
                desktop: '',
                mobile: '',
            },
            src: {
                desktop: '',
                mobile: '',
            },
            link: {
                desktop: '',
                mobile: '',
            },
            width: {
                desktop: '',
                mobile: '',
            },
            height: {
                desktop: '',
                mobile: '',
            },
        })
    },
    viewport: {
        type: String as PropType<Viewport>,
        default: "desktop"
    }
}

