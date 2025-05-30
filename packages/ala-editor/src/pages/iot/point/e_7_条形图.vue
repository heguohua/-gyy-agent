<template>
    <div class="bar-chart" ref="chartRef"></div>
  </template>
  
  <script lang="ts" setup>
  import * as d3 from 'd3'
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  
  // 模拟数据
  const data = [
    { name: 'A', value: 30 },
    { name: 'B', value: 80 },
    { name: 'C', value: 45 },
    { name: 'D', value: 60 },
    { name: 'E', value: 20 },
    { name: 'F', value: 90 },
    { name: 'G', value: 50 },
  ]
  
  const chartRef = ref<HTMLDivElement | null>(null)
  let svg: d3.Selection<SVGGElement, unknown, null, undefined> | null = null
  
  const drawChart = () => {
    const margin = { top: 20, right: 30, bottom: 30, left: 50 }
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
  
    if (!chartRef.value) return
  
    d3.select(chartRef.value).selectAll('*').remove()
  
    const svgContainer = d3
      .select(chartRef.value)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
  
    svg = svgContainer
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
  
    // Y 轴为分类轴
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, height])
      .padding(0.2)
  
    // X 轴为数值轴
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([0, width])
  
    // 添加 Y 轴
    svg.append('g').call(d3.axisLeft(y))
  
    // 添加 X 轴
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
  
    // 画条形
    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('y', d => y(d.name)!)
      .attr('x', 0)
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.value))
      .attr('fill', 'steelblue')
      .on('mouseover', function () {
        d3.select(this).attr('fill', 'orange')
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'steelblue')
      })
  }
  
  onMounted(drawChart)
  onBeforeUnmount(() => {
    svg = null
  })
  </script>
  
  <style lang="scss" scoped>
  .bar-chart {
    width: 100%;
    max-width: 600px;
    margin: auto;
  
    svg {
      font-family: sans-serif;
    }
  
    .bar {
      transition: fill 0.3s ease;
    }
  }
  </style>
  