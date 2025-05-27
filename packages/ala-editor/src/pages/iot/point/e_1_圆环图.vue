<template>
    <div class="donut-chart">
        <svg ref="svgRef" :width="size" :height="size"></svg>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';

const size = 300;
const radius = size / 2 - 20;

const data = [100, 120, 90, 110, 180, 150];
const total = 883;
const colors = ['#f56c6c', '#f6c23e', '#67c23a', '#36cfc9', '#409eff', '#a36cf5'];

const svgRef = ref<SVGSVGElement | null>(null);

onMounted(() => {
    const svg = d3.select(svgRef.value)
        .append('g')
        .attr('transform', `translate(${size / 2},${size / 2})`);

    const pie = d3.pie<number>().value(d => d).sort((a, b) => { return b - a });

    // 普通和放大的 arc
    const arc = d3.arc<d3.PieArcDatum<number>>()
        .innerRadius(radius - 20)
        .outerRadius(radius);

    const arcHover = d3.arc<d3.PieArcDatum<number>>()
        .innerRadius(radius - 25)
        .outerRadius(radius + 5); // 放大效果

    const paths = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (_, i) => colors[i])
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function (event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('d', arcHover);
        })
        .on('mouseout', function (event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('d', arc);
        });

    // 中心数字
    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -10)
        .attr('class', 'center-value')
        .text(total.toString());

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 20)
        .attr('class', 'center-label')
        .text('设备总数');
});
</script>

<style lang="scss" scoped>
.donut-chart {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    svg {
        font-family: sans-serif;

        .center-value {
            font-size: 24px;
            font-weight: bold;
            fill: #333;
        }

        .center-label {
            font-size: 14px;
            fill: #888;
        }
    }
}
</style>