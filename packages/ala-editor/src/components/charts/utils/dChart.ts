/*
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2025-05-26 13:44:21
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-06-05 17:48:13
 * @FilePath: /1-low-coding/packages/ala-editor/src/components/charts/utils/dChart.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
 */

import u from '@/utils/u';
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

// 计算 px 和 % 具体的值
export const calculateValue = (sourceValue: number, value: string) => {
    let v = 0
    if (value.includes('px')) {
        v = +(value.replaceAll('px', '').trim())
    } else if (value.includes('%')) {
        v = sourceValue * (+(value.replaceAll('%', '').trim())) / 100
    }
    return v
}

/**
 *  计算 图形标题样式（ 非 svg 图形中的主标题 ）
 * @param formData 
 * @param value 
 * @returns 
 */
export const mainTitleCssStyle = (formData: { [key: string]: any }) => {

    const style: { [key: string]: any } = {}

    const text_color = formData.text_color?.desktop
    if (text_color) style.color = text_color
    // 文字粗细
    const text_fontWeight = formData.text_fontWeight?.desktop || 400
    if (text_fontWeight) style.fontWeight = text_fontWeight

    // 文字水平偏移距离
    const text_left = formData.text_left?.desktop
    if (text_left) style.paddingLeft = text_left

    // 设置垂直偏移
    const text_top = formData.text_top?.desktop
    const text_bottom = formData.text_bottom?.desktop
    if (text_top) style.paddingTop = text_top
    if (text_bottom) style.paddingBottom = text_bottom

    // 文字大小
    const text_fontSize = formData.text_fontSize?.desktop
    if (text_fontSize) {
        style.fontSize = text_fontSize + 'px'
        style.lineHeight = text_fontSize + 'px'
    }

    return style
}

/**
 * 设定曲线样式
 * @param line 
 * @param line_curve_style 
 */
export const curveStyle = (line: any, line_curve_style: string) => {
    if (line_curve_style === 'curveLinear') {
        line.curve(d3.curveLinear)
    } else if (line_curve_style === 'curveMonotoneX') {
        line.curve(d3.curveMonotoneX)
    } else if (line_curve_style === 'curveMonotoneY') {
        line.curve(d3.curveMonotoneY)
    } else if (line_curve_style === 'curveBasis') {
        line.curve(d3.curveBasis)
    } else if (line_curve_style === 'curveCardinal') {
        line.curve(d3.curveCardinal)
    } else if (line_curve_style === 'curveCatmullRom') {
        line.curve(d3.curveCatmullRom)
    }
}

interface DataPoint {
    name: string
    value: number
    category: string
    originalIndex: number
}

export const drawArea = (group: any, data: DataPoint[], areaColor: any, area: d3.Area<DataPoint>) => {
    group.append('path')
        .datum(data)
        .attr('class', 'area-path')
        .attr('fill', areaColor)
        .attr('d', area);
}



/**
 * 绘制折线
 * @param formData 
 * @param group 
 * @param data 
 * @param line 
 * @returns 
 */
export const drawLine = (formData: Record<string, any>, group: d3.Selection<SVGGElement, unknown, null, undefined>, data: DataPoint[], line: d3.Line<DataPoint>, line_color: string) => {

    const line_width = formData.line_width?.desktop || 1;
    const line_dashed_style = formData.line_dashed_style?.desktop || '';
    const line_dashed_point = formData.line_dashed_point?.desktop || 0;
    const lineAnimation = formData.lineAnimation?.desktop || false;
    const lineAnimationTime = formData.lineAnimationTime?.desktop || 1000;

    // const path = group.append('path')
    //     .datum(data)
    //     .attr('class', 'line-path')
    //     .attr('fill', 'none')
    //     .attr('stroke', line_color)
    //     .attr('stroke-width', line_width)
    //     .attr('d', line)

    const path = group.append('path')
        .datum(data)
        .attr('class', 'line-path')
        .attr('fill', 'none')
        .attr('stroke', line_color)
        .attr('stroke-width', line_width)
        .attr('d', line)


    // 然后使用过渡来显示路径
    // 透明度变化动画
    if (lineAnimation) {

        // 获取 path 总长度
        const totalLength = path.node()!.getTotalLength();
        path
            .attr("stroke-dasharray", totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(lineAnimationTime) // 动画时间 2 秒
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        // path.transition()
        //     .duration(1000)
        //     .attr('opacity', 1);
    }

    if (line_dashed_style) {
        path.attr("stroke-dasharray", line_dashed_style) // 虚线样式，8-虚线线段长度、2-虚线间隔
            .attr("stroke-linecap", line_dashed_point); // 端点样式，butt - 平直（默认值）、round - 圆形、square - 方形
    }
}


/**
 * 绘制 线性 坐标轴
 * @param formData 
 * @param data 
 * @param height 
 * @param width 
 * @param group 
 * @returns 
 */
export const drawScaleLinear = (formData: Record<string, any>, yData: any[], height: number, width: number, group: d3.Selection<SVGGElement, unknown, null, undefined>) => {

    // 先按照最小值百分比填充，如果最小值百分比不存在则再按照 补充 0 值填充
    const addMinPercentage = formData.addMinPercentage?.desktop;

    const maxValue = d3.max(yData)


    if (addMinPercentage) {
        const minValue = d3.min(yData)
        yData.push(minValue * addMinPercentage / 100);
    } else {
        const addZero = formData.addZero?.desktop || false;
        if (addZero) yData.push(0);
    }

    const yScale = aScaleLinear(yData, [0, height], true);

    // 纵坐标轴 在 右侧
    // const yTicks = ad3.aTick(yScale, 'right', undefined, 2, 6, width, 0)
    const yTicks = aTick(yScale, 'left', undefined, 2, 6, -width, 0);

    // 计算纵坐标档位数
    // const decimalNum = formData.decimalNum?.desktop
    let levelNum = formData.levelNum?.desktop
    if (levelNum) {
        yTicks.ticks(levelNum)
    }

    const yAxisAttrs = new Map<string, any>();
    yAxisAttrs.set("class", "ala-axis-y");
    yAxisAttrs.set("transform", `translate(0,0)`);

    const yAxis = aAxis(group, yTicks, yAxisAttrs);

    // 设置 轴线 样式
    const y_axis_width = formData.y_axis_width?.desktop;
    const y_axis_color = formData.y_axis_color?.desktop;

    yAxis.selectAll('.domain')
        .style("stroke-width", y_axis_width) // 轴线宽度
        .style('stroke', y_axis_color); // 轴线颜色

    // 设置 刻度线 样式
    let y_scaleMarks_length = formData.y_scaleMarks_length?.desktop;
    const y_scaleMarks_width = formData.y_scaleMarks_width?.desktop;
    const y_scaleMarks_color = formData.y_scaleMarks_color?.desktop;
    const y_dashed_line_style = formData.y_dashed_line_style?.desktop;
    const y_dashed_line_point = formData.y_dashed_line_point?.desktop;

    // 这里和 x 轴不同，height 换成了 width
    y_scaleMarks_length = calculateValue(width, y_scaleMarks_length);

    yAxis.selectAll('line')
        // 这里和 x 轴不同，y2 换成了 x2
        .attr('x2', y_scaleMarks_length) // 刻度线长度
        .style("stroke-width", y_scaleMarks_width) // 刻度线宽度
        .style('stroke', y_scaleMarks_color); // 刻度线颜色

    if (y_dashed_line_style) {
        yAxis.selectAll('line')
            .style("stroke-dasharray", y_dashed_line_style) // 虚线样式，8-虚线线段长度、2-虚线间隔
            .style("stroke-linecap", y_dashed_line_point); // 端点样式，butt - 平直（默认值）、round - 圆形、square - 方形
    }

    // 刻度标签字体样式
    const y_label_color = formData.y_label_color?.desktop || 'red';
    const y_label_fontSize = formData.y_label_fontSize?.desktop || 14;
    const y_label_weight = formData.y_label_weight?.desktop || 400;
    const y_label_textAnchor = formData.y_label_textAnchor?.desktop || 'middle';
    const y_label_dy = formData.y_label_dy?.desktop || 6;
    const y_label_rotate = formData.y_label_rotate?.desktop || 0;

    yAxis.style("stroke", y_label_color);
    yAxis.style("font-size", y_label_fontSize + "px");
    yAxis.style("font-weight", y_label_weight);
    // 对齐方式
    yAxis.style("text-anchor", y_label_textAnchor);
    // xAxis.tickPadding(10)
    // 设置 刻度标签 样式
    yAxis.selectAll('text')
        .attr('dx', y_label_dy) //  设置 标签和轴线 间的距离
        .style('transform', `rotate(${y_label_rotate}deg)`); //  设置 标签 旋转角度

    return yScale;
}

/**
 * 绘制 序列 坐标轴 
 * @param formData 
 * @param data 
 * @param width 
 * @param height 
 * @param group 
 * @returns 
 */
export const drawScaleOrdinal = (formData: Record<string, any>, data: DataPoint[], width: number, height: number, group: d3.Selection<SVGGElement, unknown, null, undefined>) => {

    const xName = formData.xName?.desktop

    const xScale = aScaleBand(data, xName, [0, width]);
    const ticks = aTick(xScale, 'bottom');
    const xAxisAttrs = new Map<string, any>();
    xAxisAttrs.set("transform", `translate(0,${height})`);
    const xAxis = aAxis(group, ticks, xAxisAttrs);

    // 设置 轴线 样式
    const x_axis_width = formData.x_axis_width?.desktop;
    const x_axis_color = formData.x_axis_color?.desktop;

    xAxis.selectAll('.domain')
        .style("stroke-width", x_axis_width) // 轴线宽度
        .style('stroke', x_axis_color); // 轴线颜色

    // 设置 刻度线 样式
    let x_scaleMarks_length = formData.x_scaleMarks_length?.desktop;
    const x_scaleMarks_width = formData.x_scaleMarks_width?.desktop;
    const x_scaleMarks_color = formData.x_scaleMarks_color?.desktop;
    const x_dashed_line_style = formData.x_dashed_line_style?.desktop;
    const x_dashed_line_point = formData.x_dashed_line_point?.desktop;

    x_scaleMarks_length = calculateValue(height, x_scaleMarks_length);

    xAxis.selectAll('line')
        .attr('y2', x_scaleMarks_length) // 刻度线长度
        .style("stroke-width", x_scaleMarks_width) // 刻度线宽度
        .style('stroke', x_scaleMarks_color); // 刻度线颜色

    if (x_dashed_line_style) {
        xAxis.selectAll('line')
            .style("stroke-dasharray", x_dashed_line_style) // 虚线样式，8-虚线线段长度、2-虚线间隔
            .style("stroke-linecap", x_dashed_line_point); // 端点样式，butt - 平直（默认值）、round - 圆形、square - 方形
    }

    // 刻度标签字体样式
    const x_label_color = formData.x_label_color?.desktop || 'red';
    const x_label_fontSize = formData.x_label_fontSize?.desktop || 14;
    const x_label_weight = formData.x_label_weight?.desktop || 400;
    const x_label_textAnchor = formData.x_label_textAnchor?.desktop || 'middle';
    const x_label_dy = formData.x_label_dy?.desktop || 6;
    const x_label_rotate = formData.x_label_rotate?.desktop || 0;

    xAxis.style("stroke", x_label_color);
    xAxis.style("font-size", x_label_fontSize + "px");
    xAxis.style("font-weight", x_label_weight);
    // 对齐方式
    xAxis.style("text-anchor", x_label_textAnchor);
    // xAxis.tickPadding(10)
    // 设置 刻度标签 样式
    xAxis.selectAll('text')
        .attr('dy', x_label_dy) //  设置 标签和轴线 间的距离
        .style('transform', `rotate(${x_label_rotate}deg)`); //  设置 标签 旋转角度

    return xScale;
}


/**
 * 绘制 图形中的 主标题
 * @param formData 
 * @param width 
 * @param height 
 * @param group 
 */
export const drawMainTitle = (formData: Record<string, any>, width: number, height: number, group: d3.Selection<SVGGElement, unknown, null, undefined>) => {

    const mainTitleText = formData.mainTitleText?.desktop

    const titleAttrs = new Map<string, any>();

    // 文字颜色
    const text_color = formData.text_color?.desktop;
    titleAttrs.set("fill", text_color);

    // 文字水平偏移距离
    let titleLeft = 0;
    const text_left = formData.text_left?.desktop;
    if (text_left) {
        titleLeft = calculateValue(width, text_left);
    }
    titleAttrs.set("x", titleLeft);
    titleAttrs.set("text-anchor", 'middle');

    // 设置垂直偏移
    titleAttrs.set("dominant-baseline", 'middle');
    let titleTop = 0;
    const text_top = formData.text_top?.desktop;
    if (text_top) {
        titleTop = calculateValue(height, text_top);
    }
    const text_bottom = formData.text_bottom?.desktop;
    if (text_bottom) {
        titleTop += calculateValue(height, text_bottom);
    }
    titleAttrs.set('y', titleTop);
    const title = aText(group, mainTitleText, titleAttrs);

    // 文字大小
    const text_fontSize = formData.text_fontSize?.desktop;
    title.style("font-size", text_fontSize);
}


/**
 * 计算 svg 实际可用高度
 * 外层div高度 - 外部标题栏高度
 * @param height 
 * @param formData 
 * @returns 
 */
export const calculateSVGHeight = (height: number, formData: Record<string, any>) => {

    const mainTitleText = formData.mainTitleText?.desktop;
    const freeTitle = formData.freeTitle?.desktop;
    const text_fontSize = formData.text_fontSize?.desktop;
    const text_top = formData.text_top?.desktop;
    const text_bottom = formData.text_bottom?.desktop;

    if (mainTitleText && freeTitle) {
        const newHeight = height - (text_fontSize + calculateValue(height, text_top) + calculateValue(height, text_bottom));
        height = newHeight;
    }

    return height;
}

/**
 * 绘制 折线图中的 拐点，并设置拐点 tooltip显示和隐藏逻辑
 * @param formData 
 * @param group 
 * @param data 
 * @param xScale 
 * @param yScale 
 * @param xName 
 * @param yName 
 * @param tooltip 
 */
export const drawLineCircle = (formData: Record<string, any>, group: d3.Selection<SVGGElement, unknown, null, undefined>, data: DataPoint[], xScale: d3.ScaleBand<string>, yScale: any, chartWrapper: any) => {

    d3.select(chartWrapper).selectAll('.ala-chart-tooltip').remove()
    const tooltip = d3.select(chartWrapper).append('div').attr('class', 'ala-chart-tooltip').style('opacity', 0)

    const xName = formData.xName?.desktop
    const yName = formData.yName?.desktop

    const line_inflection_point = formData.line_inflection_point?.desktop || 0
    const line_inflection_color = formData.line_inflection_color?.desktop || 'red'
    const y_label_unit = formData.y_label_unit?.desktop || ''
    const line_color = formData.line_color?.desktop || 'red'
    const circleAnimation = formData.circleAnimation?.desktop || false
    const circleAnimationTime = formData.circleAnimationTime?.desktop || 2000

    const circle = group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
        .attr('cy', (d: any) => yScale(d[yName]))
        .attr('r', line_inflection_point)
        .attr('fill', line_inflection_color)
        .on('mouseover', (event, d: any) => {

            // 添加 tooltip
            tooltip.html(`
                <div class='tooltip-title' style='color:${line_color}'>${d[xName]}</div>
                <div class='tooltip-row'>
                    <p class='category'>值：</p>
                    <p class='value-wrapper'>
                        <i class='value' style='color:${line_color}'>${d[yName]}</i>
                        <i class='unit'>${y_label_unit}</i>
                    </p>
                </div>
                
            `)
                .style('left', `${event.offsetX + 10}px`)
                .style('top', `${event.offsetY - 28}px`);

            // 显示 tooltip
            tooltip.transition().duration(200).style('opacity', 1);

            // 鼠标悬停时扩大半径
            d3.select(event.target)
                .transition()
                .duration(200) // 动画过渡时间
                .attr('r', line_inflection_point * 1.5); // 半径扩大到原来的 1.5 倍（假设初始半径为4）

        })
        .on('mouseout', (event, d: any) => {

            // 隐藏 tooltip
            tooltip.transition().duration(500).style('opacity', 0);

            // 鼠标悬停时扩大半径
            d3.select(event.target)
                .transition()
                .duration(100) // 动画过渡时间
                .attr('r', line_inflection_point);
        })

    if (circleAnimation) {
        circle.transition()
            .duration(circleAnimationTime)
            .attr('opacity', 1);
    }

}

export const drawLineCircles = (formData: Record<string, any>, group: d3.Selection<SVGGElement, unknown, null, undefined>, data: Array<DataPoint[]>, xScale: d3.ScaleBand<string>, yScale: any, chartWrapper: any) => {

    d3.select(chartWrapper).selectAll('.ala-chart-tooltip').remove()
    const tooltip = d3.select(chartWrapper).append('div').attr('class', 'ala-chart-tooltip').style('opacity', 0)

    const xName = formData.xName?.desktop
    const yName = formData.yName?.desktop

    const line_inflection_point = formData.line_inflection_point?.desktop || 0
    const line_inflection_colors = formData.line_inflection_color?.desktop || ['red']
    const y_label_unit = formData.y_label_unit?.desktop || ''
    const line_colors = formData.line_color?.desktop || ['red']
    const circleAnimation = formData.circleAnimation?.desktop || false
    const circleAnimationTime = formData.circleAnimationTime?.desktop || 2000
    const x_scaleMarks_color = formData.x_scaleMarks_color?.desktop || 'red'
    const decimalNum = formData.decimalNum?.desktop || 0

    data.forEach((one, index) => {

        const circle = group.selectAll('circle-' + index)
            .data(one)
            .enter()
            .append('circle')
            .attr('cx', (d: any) => (xScale!(d[xName]) || 0) + xScale!.bandwidth() / 2)
            .attr('cy', (d: any) => yScale(d[yName]))
            .attr('r', line_inflection_point)
            .attr('fill', line_inflection_colors[index])
            .on('mouseover', (event, d: any) => {

                //     // 添加 tooltip
                //     tooltip.html(`
                //     <div class='tooltip-title' style='color:${line_colors[index]}'>${d[xName]}</div>
                //     <div class='tooltip-row'>
                //         <p class='category'>值：</p>
                //         <p class='value-wrapper'>
                //             <i class='value' style='color:${line_colors[index]}'>${d[yName]}</i>
                //             <i class='unit'>${y_label_unit}</i>
                //         </p>
                //     </div>

                // `)
                //         .style('left', `${event.offsetX + 10}px`)
                //         .style('top', `${event.offsetY - 28}px`);

                //     // 显示 tooltip
                //     tooltip.transition().duration(200).style('opacity', 1);

                //     // 鼠标悬停时扩大半径
                //     d3.select(event.target)
                //         .transition()
                //         .duration(200) // 动画过渡时间
                //         .attr('r', line_inflection_point * 1.5); // 半径扩大到原来的 1.5 倍（假设初始半径为4）

            })
            .on('mouseout', (event, d: any) => {

                // // 隐藏 tooltip
                // tooltip.transition().duration(500).style('opacity', 0);

                // // 鼠标悬停时扩大半径
                // d3.select(event.target)
                //     .transition()
                //     .duration(100) // 动画过渡时间
                //     .attr('r', line_inflection_point);
            })

        if (circleAnimation) {
            circle.transition()
                .duration(circleAnimationTime)
                .attr('opacity', 1);
        }
    })


    const xData = data[0]

    const tooltip_group = group.append('g')
        .attr('class', 'tooltip-group')

    const tooltip_column = tooltip_group.selectAll('g')
        .data(xData)
        .enter()
        .append('g')
        .attr('class', 'tooltip-column')
        .attr('transform', (d: any) =>
            `translate(${(xScale!(d[xName]) || 0)}, 0)`
        )
        .style('opacity', '0')



    // 将原始二维数组的数据进行行列转换，方便循环遍历渲染某一列的点
    const columnData = u.transpose2DArray(data)

    tooltip_column.each(function (d, index) {

        const currentGroup = d3.select(this)

        currentGroup.append('rect')
            .attr('width', xScale!.bandwidth())
            .attr('height', '100%')
            .attr('fill', 'rgb(55 255 255 / 0%)')

        currentGroup.selectAll('circle')
            .data(columnData[index]) // 假设每个 d 里有个 points 数组
            .enter()
            .append('circle')
            .attr('cx', (d: any) => xScale!.bandwidth() / 2)
            .attr('cy', (d: any) => yScale(d[yName]))
            .attr('r', 6)
            .attr('fill', (d: any, i: number) => line_inflection_colors[i])


        currentGroup.append('line')
            .attr('x1', (d: any) => xScale!.bandwidth() / 2)
            .attr('x2', (d: any) => xScale!.bandwidth() / 2)
            .attr('y1', '-1%')
            .attr('y2', '90%') // 或 '100%'，取决于上下文单位
            .attr('stroke', x_scaleMarks_color)
            .attr('stroke-width', 1)
            .style("stroke-dasharray", '20,12') // 虚线样式，8-虚线线段长度、2-虚线间隔
            .style("stroke-linecap", 'round'); // 端点样式，butt - 平直（默认值）、round - 圆形、square - 方形


        currentGroup.on('mouseover', (event, d: any) => {

            // 显示拐点
            d3.select(this).transition().duration(1000).style('opacity', '1');

            // 显示 tooltip 系列信息
            const sortedColumnData = u.sortByProperty(columnData[index], 'value', true)
            const rows: string[] = []
            sortedColumnData.forEach((one) => {
                rows.push(
                    `
                    <div class='tooltip-row'>
                        <i class='tooltip-label' style='background:${line_colors[one.originalIndex]}'>&nbsp;</i>
                        <p class='category'>${one.category}：</p>
                        <p class='value-wrapper'>
                            <i class='value'>${one.value.toFixed(decimalNum)}</i>
                            <i class='unit'>${y_label_unit}</i>
                        </p>
                    </div>
                `
                )
            })

            // 添加 tooltip
            const transform = d3.select(this).attr('transform');
            const match = /translate\(([-\d.]+),\s*([-\d.]+)\)/.exec(transform || '');
            const x = match ? parseFloat(match[1]) : 0;

            tooltip.html(`
                    <div class='tooltip-title' style='color:${line_colors[sortedColumnData[0].originalIndex]}'>${d[xName]}</div>
                    <div class='tooltip-rows'>
                        ${rows.join('')}
                    </div>

                `)
                .style('left', `${x + (xScale!.bandwidth())}px`)
                .style('top', `${25 + Math.random() * 10}%`);

            // 显示 tooltip
            tooltip.transition().duration(200).style('opacity', 1);



        }).on('mouseout', (event, d: any) => {
            d3.select(this).transition().duration(200).style('opacity', '0');
            tooltip.transition().duration(500).style('opacity', 0);
        })

    })


}


export default DataPoint
