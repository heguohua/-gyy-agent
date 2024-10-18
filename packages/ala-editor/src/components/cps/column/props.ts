/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 22:52:15
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/column/props.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { Viewport } from "@/types/editorType";
import { PropType } from "vue";

export type AlaColumnProps = {
    cols?: {
        desktop: number[],
        mobile: number[],
    },
    background?: {
        desktop: string,
        mobile: string,
    },
}


export const blockProps = {
    data: {
        type: Object as PropType<AlaColumnProps>,
        default: () => ({
            cols: {
                desktop: [0.5, 0.5],
                mobile: [0.5, 0.5],
            },
            background: {
                desktop: '',
                mobile: '',
            },
        })
    },
    children: {
        type: Object,
        default: () => {
            return {
                desktop: [[], []],
                mobile: [[], []],
            }
        }
    },
    viewport: {
        type: String as PropType<Viewport>,
        default: "desktop"
    }
}

