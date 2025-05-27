<template>
    <div class="radar-chart">
      <svg ref="svgRef" :width="size" :height="size"></svg>
      <div ref="tooltipRef" class="tooltip" v-show="tooltip.visible" :style="tooltip.style">
        {{ tooltip.text }}
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue';
  import * as d3 from 'd3';
  
  const size = 300;
  const radius = size / 2 - 40;
  const levels = 5;
  const categories = ['信号报警', '压力报警', '反向报警', '电池报警', '故障报警', '其他报警'];
  const values = [75, 89, 40, 55, 65, 80];
  
  const svgRef = ref<SVGSVGElement | null>(null);
  const tooltipRef = ref<HTMLDivElement | null>(null);
  
  const tooltip = reactive({
    visible: false,
    text: '',
    style: {
      left: '0px',
      top: '0px',
    } as Record<string, string>,
  });
  
  onMounted(() => {
    const angleSlice = (Math.PI * 2) / categories.length;
  
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);
  
    const svg = d3.select(svgRef.value)
      .append('g')
      .attr('transform', `translate(${size / 2}, ${size / 2})`);
  
    // Draw grid levels
    for (let level = 1; level <= levels; level++) {
      const levelFactor = (radius / levels) * level;
      svg.append('polygon')
        .attr('points', categories.map((_, i) => {
          const angle = angleSlice * i - Math.PI / 2;
          const x = levelFactor * Math.cos(angle);
          const y = levelFactor * Math.sin(angle);
          return `${x},${y}`;
        }).join(' '))
        .attr('stroke', '#d0d7f5')
        .attr('fill', 'none');
    }
  
    // Axis lines
    svg.selectAll('.axis-line')
      .data(categories)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (_, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', '#d0d7f5');
  
    // Category labels
    svg.selectAll('.label')
      .data(categories)
      .enter()
      .append('text')
      .attr('x', (_, i) => (rScale(100 + 10)) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_, i) => (rScale(100 + 10)) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('fill', '#333')
      .text(d => d);
  
    // Radar area
    const radarLine = d3.lineRadial<number>()
      .radius((d, i) => rScale(d))
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);
  
    svg.append('path')
      .datum(values)
      .attr('d', radarLine)
      .attr('fill', 'rgba(75, 123, 255, 0.2)')
      .attr('stroke', '#4b7bff')
      .attr('stroke-width', 2);
  
    // Data points
    const points = svg.selectAll('.dot')
      .data(values)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => rScale(d) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('r', 4)
      .attr('fill', '#4b7bff')
      .on('mouseover', function (event, d) {
        const i = values.indexOf(d);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8);
  
        const [x, y] = d3.pointer(event, svgRef.value);
        tooltip.visible = true;
        tooltip.text = `${categories[i]} ${d}`;
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y + 10}px`;
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 4);
        tooltip.visible = false;
      });
  });
  </script>
  
  <style lang="scss" scoped>
  .radar-chart {
    position: relative;
    width: fit-content;
    margin: auto;
    display: inline-flex;
  
    .tooltip {
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      padding: 4px 8px;
      font-size: 12px;
      color: #333;
      border-radius: 4px;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
  </style>
  