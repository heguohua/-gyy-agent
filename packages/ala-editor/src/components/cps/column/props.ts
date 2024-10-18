/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 14:35:30
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-18 22:38:30
 * @FilePath: /low-coding/packages/ala-editor/src/components/cps/column/props.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import { Viewport } from "@/types/editorType";
import { PropType } from "vue";

export type AlaColumnProps = {

    src: {
        desktop: '',
        mobile: '',
    },
    
}


export const blockProps = {
    data: {
        type: Object as PropType<AlaColumnProps>,
        default: () => ({

            src: {
                desktop: '',
                mobile: '',
            },
        })
    },
    // viewport: {
    //     type: String as PropType<Viewport>,
    //     default: "desktop"
    // }
}

