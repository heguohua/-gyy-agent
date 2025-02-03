/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-02-03 19:44:48
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-02-03 19:47:38
 * @FilePath: /1-low-coding/packages/ala-editor/src/utils/logic-flow/CustomNode.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */
// CustomNode.js
import { RectNode, RectNodeModel } from '@logicflow/core';

export class CustomNodeModel extends RectNodeModel {
    setAttributes() {
        this.width = 100;
        this.height = 40;
        // this.anchors = [
        //     { id: 'top', position: { x: 0, y: -1 } },
        //     { id: 'bottom', position: { x: 0, y: 1 } },
        //     { id: 'left', position: { x: -1, y: 0 } },
        //     { id: 'right', position: { x: 1, y: 0 } },
        // ];
    }
}

export class CustomNodeView extends RectNode {
    getShape() {
        const { x, y, width, height } = this.props.model;
        const { fill, stroke, strokeWidth } = this.props.model.getNodeStyle();
        return this.h('rect', {
            x: x - width / 2,
            y: y - height / 2,
            width,
            height,
            fill,
            stroke,
            strokeWidth,
        });
    }
}

export default {
    type: 'custom-node',
    view: CustomNodeView,
    model: CustomNodeModel,
};