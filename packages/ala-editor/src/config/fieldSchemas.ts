/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-11-12 19:13:12
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-13 15:40:49
 * @FilePath: /1-low-coding/packages/ala-editor/src/config/fieldSchemas.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
export interface AlaField {
    componentName: string,
    fieldName: string,
    label: string,
    position?: string,
    placeholder?: string,
    other?: {
        [key: string]: any
    },
    model: any
}

export interface AlaInputField extends AlaField {

}

export interface AlaTextareaField extends AlaField {

}

export interface AlaPasswordField extends AlaField {

}


export interface AlaSliderField extends AlaField {
    other: {
        min: number,
        max: number,
        step?: number,
        disabled?: boolean,
        range?: boolean,
    }
}



