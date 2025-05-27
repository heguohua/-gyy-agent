<template>
    <div class="stacked-line-chart">
        <div ref="chartContainer" class="chart"></div>
        <div class="legend">
            <div v-for="(color, key) in colorMap" :key="key" class="legend-item">
                <span class="legend-color" :style="{ backgroundColor: color }"></span>
                {{ key }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import * as d3 from 'd3'

// 🔢 数据格式：[ { date, seriesA, seriesB, ... } ]
interface RawDataPoint {
    date: Date
    [key: string]: any
}

const props = defineProps({
    data: {
        type: Array<RawDataPoint>,
        default: () => {
            const stackedData = [
                {
                    date: new Date('2024-01-01'),
                    apples: 10,
                    bananas: 5,
                    cherries: 3
                },
                {
                    date: new Date('2024-02-01'),
                    apples: 15,
                    bananas: 8,
                    cherries: 4
                },
                {
                    date: new Date('2024-03-01'),
                    apples: 20,
                    bananas: 12,
                    cherries: 6
                },
                {
                    date: new Date('2024-04-01'),
                    apples: 18,
                    bananas: 15,
                    cherries: 8
                },
                {
                    date: new Date('2024-05-01'),
                    apples: 22,
                    bananas: 20,
                    cherries: 10
                }
            ]

            return stackedData
        }
    }
})

const chartContainer = ref<HTMLDivElement | null>(null)
const colorMap = ref<Record<string, string>>({}) // 图例颜色

const drawChart = () => {
    if (!chartContainer.value || !props.data.length) return

    chartContainer.value.innerHTML = ''

    const margin = { top: 20, right: 30, bottom: 30, left: 50 }
    const width = 400 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const svg = d3.select(chartContainer.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    const seriesKeys = Object.keys(props.data[0]).filter(k => k !== 'date')
    const stackedData = d3.stack<RawDataPoint>().keys(seriesKeys)(props.data)

    // 创建颜色映射
    const color = d3.scaleOrdinal<string>()
        .domain(seriesKeys)
        .range(d3.schemeCategory10)
    colorMap.value = Object.fromEntries(seriesKeys.map(k => [k, color(k)]))

    const x = d3.scaleTime()
        .domain(d3.extent(props.data, d => d.date) as [Date, Date])
        .range([0, width])

    const y = d3.scaleLinear()
        .domain([
            0,
            d3.max(stackedData[stackedData.length - 1], d => d[1]) || 0
        ])
        .nice()
        .range([height, 0])

    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%b')))

    g.append('g')
        .call(d3.axisLeft(y))

    // 折线生成器
    const line = d3.line<[number, number]>()
        .x((d, i) => x(props.data[i].date))
        .y(d => y(d[1]))

    // 绘制堆叠折线
    stackedData.forEach((series, i) => {
        g.append('path')
            .datum(series)
            .attr('fill', 'none')
            .attr('stroke', color(seriesKeys[i]))
            .attr('stroke-width', 2)
            .attr('d', line)
    })
}
onMounted(() => nextTick(drawChart))
//   watch(() => props.data, () => nextTick(drawChart))
</script>

<style scoped lang="scss">
.stacked-line-chart {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

    .chart {
        position: relative;
    }

    .legend {
        margin-top: 10px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;

        .legend-item {
            display: flex;
            align-items: center;
            font-size: 14px;

            .legend-color {
                width: 12px;
                height: 12px;
                margin-right: 6px;
                border-radius: 2px;
            }
        }
    }
}
</style>