<template>
    <div ref="chartContainer" class="line-chart"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import * as d3 from 'd3'

interface DataPoint {
    date: Date
    value: number
}

const props = defineProps({
    data: {
        type: Array<DataPoint>,
        default: () => {return [{ date: new Date(), value: '' }]}
    }
})

const chartContainer = ref<HTMLDivElement | null>(null)

const drawChart = () => {
    if (!chartContainer.value) return

    // 清空旧图表
    chartContainer.value.innerHTML = ''

    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const width = 400 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const svg = d3.select(chartContainer.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleTime()
        .domain(d3.extent(props.data, d => d.date) as [Date, Date])
        .range([0, width])

    const y = d3.scaleLinear()
        .domain([0, d3.max(props.data, d => d.value)!])
        .nice()
        .range([height, 0])

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))

    svg.append('g')
        .call(d3.axisLeft(y))

    const line = d3.line<DataPoint>()
        .x(d => x(d.date))
        .y(d => y(d.value))

    svg.append('path')
        .datum(props.data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line)

    // Circle 点和 tooltip
    const tooltip = d3.select(chartContainer.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

    svg.selectAll('circle')
        .data(props.data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.value))
        .attr('r', 4)
        .attr('fill', 'steelblue')
        .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style('opacity', 0.9)
            tooltip.html(`${d3.timeFormat('%Y-%m-%d')(d.date)}<br/>值: ${d.value}`)
                .style('left', `${event.offsetX + 10}px`)
                .style('top', `${event.offsetY - 28}px`)
        })
        .on('mouseout', () => {
            tooltip.transition().duration(500).style('opacity', 0)
        })
}

onMounted(() => {
    nextTick(drawChart)
})

watch(() => props.data, () => {
    nextTick(drawChart)
})
</script>

<style lang="scss" scoped>
.line-chart {
    position: relative;
    display: inline-flex;

    svg {
        font-family: sans-serif;
    }

    .tooltip {
        position: absolute;
        text-align: center;
        padding: 6px 8px;
        background: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        font-size: 12px;
        pointer-events: none;
        z-index: 10;
    }
}
</style>