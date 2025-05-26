/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-26 13:44:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-05-26 18:34:44
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/utils/dchart.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import * as d3 from 'd3';

export const aTitleAttrs = (width: number) => {

    const titleAttrs = new Map<string, any>()

    // 文字颜色
    titleAttrs.set("fill", '#ef4d4b')

    // 文字水平居中
    titleAttrs.set("x", width / 2)
    titleAttrs.set("text-anchor", 'middle')

    // 设置垂直居中
    titleAttrs.set("y", 10)
    titleAttrs.set("dominant-baseline", 'middle')

    titleAttrs.set("font-size", "20px")
    return titleAttrs

}

export const aText = (svg: any, text: string | number, attrs?: Map<string, any>) => {

    // 创建一个文本元素
    const t = svg.append("text")
        // 设置文本内容
        .text(text.toString())

    // 设置文本 属性
    if (attrs && attrs.size > 0) {
        attrs.forEach((value, key) => {
            t.attr(key, value)
        })
    }

    return t

}

export const aTick = (scale: any, direction: 'top' | 'bottom' | 'left' | 'right', ticks?: Array<any>, tickSize = 6, tickPadding = 3, tickSizeInner = 6, tickSizeOuter = 6) => {

    let d = d3.axisBottom(scale)

    if (direction === 'left') {
        d = d3.axisLeft(scale)
    } else if (direction === 'right') {
        d = d3.axisRight(scale)
    } else if (direction === 'top') {
        d = d3.axisTop(scale)
    }
    
    d.tickSize(tickSize)
    d.tickPadding(tickPadding)
    d.tickSizeInner(tickSizeInner)
    d.tickSizeOuter(tickSizeOuter)


    if (ticks && ticks.length > 0) {
        d.tickValues(ticks)
    }

    return d

}

export const aAxis = (svg: any, domain: any, attrs?: Map<string, any>) => {

    // 创建一个坐标系group元素
    const axis = svg.append("g")

    // 设置属性
    if (attrs && attrs.size > 0) {
        attrs.forEach((value, key) => {
            axis.attr(key, value)
        })
    }

    axis.call(domain)

    return axis

}

export const aScaleLinear = (domains: Array<number>, ranges: Array<number>, reverse = false) => {
    // 创建一个线性比例尺
    const linearScale = d3.scaleLinear()
        // 设置输入域(从0到100)
        .domain([d3.min(domains) as any, d3.max(domains) as any])
        // 设置输出范围(从0到300)
        .range(ranges);
    if (reverse) {
        linearScale.domain([d3.max(domains) as any, d3.min(domains) as any])
    }

    return linearScale;
}

export const aScaleBand = (data: Array<any>, categoryName: string, ranges: Array<number>) => {

    // 创建一个线性比例尺
    const bandScale = d3.scaleBand()
        .domain(data.map(d => d[categoryName]))
        .range(ranges)
        .padding(0.1);

    return bandScale;
}

