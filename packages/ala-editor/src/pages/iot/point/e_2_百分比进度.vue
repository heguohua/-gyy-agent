<template>
    <div class="donut-progress">
      <svg ref="svgRef" :width="size" :height="size"></svg>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import * as d3 from 'd3';
  
  const svgRef = ref<SVGSVGElement | null>(null);
  
  // 参数设置
  const size = 250;
  const thickness = 16;
  const progress = 38; // 百分比
  const radius = size / 2;
  const color = '#ff6b5b';
  const backgroundColor = '#f4f4f8';
  
  onMounted(() => {
    const svg = d3.select(svgRef.value)
      .append('g')
      .attr('padding','30px')
      .attr('transform', `translate(${radius}, ${radius})`);
  
    const fullArc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(4 * Math.PI);
  
    // 背景环
    svg.append('path')
      .attr('d', fullArc as any)
      .attr('fill', backgroundColor);
  
    // 进度角度（转换为弧度）
    const progressAngle = (progress / 100) * 2 * Math.PI;
  
    const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(progressAngle);
  
    const arcHover = d3.arc()
      .innerRadius(radius - thickness - 3)
      .outerRadius(radius + 4)
      .startAngle(0)
      .endAngle(progressAngle);
  
    // 可交互前景环
    const foreground = svg.append('path')
      .attr('d', arc as any)
      .attr('fill', color)
      .style('cursor', 'pointer')
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover as any);
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc as any);
      });
  
    // 百分比文本
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('class', 'percent-text')
      .text(`${progress}%`);
  });
  </script>
  
  <style lang="scss" scoped>
  .donut-progress {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  
    svg {
      font-family: sans-serif;
  
      .percent-text {
        font-size: 20px;
        font-weight: bold;
        fill: #333;
      }
    }
  }
  </style>
  