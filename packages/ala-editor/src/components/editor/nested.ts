import { nanoid } from "@/utils/nanoid"
import { cloneDeep } from "lodash"
/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 16:04:34
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-10-17 17:17:56
 * @FilePath: /low-coding/packages/ala-editor/src/components/editor/nested.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

/**
 * @Description: column 嵌套 class，用来在move方法中判断当前组件是否可以被嵌套
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:00:45
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const nestedClass = "nested-container"

/**
 * @Description: 多个 draggable 组件的group名，只有相同group名字的组件才能相互拖拽
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:00:38
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const dragGroup = 'blocks'

/**
 * @Description: 监听 draggable的移动事件，判断目标元素是否可以通过拖拽添加当前元素
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 16:59:09
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const move = (e: any) => {
    const classList = Array.from(e?.to?.classList)
    const isRelatedNested = classList?.includes(nestedClass)
    if (e?.draggedContext?.element?.nested && isRelatedNested) return false
    return true
}

/**
 * @Description: 被 draggable 对象clone函数
 * @Author: darcy.zhang
 * @Email: tech.darcy.zhang@outlook.com
 * @Date: 2024-10-17 17:18:51
 * @FilePath: ~/mwp/low-coding/packages/ala-editor/src/components/editor/nested.ts
 */
export const clone = (e: object) => {
    return cloneDeep({ ...e, id: nanoid(8) })
}