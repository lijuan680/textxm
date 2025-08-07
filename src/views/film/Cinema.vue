<template>
  <div class="echarts-container">
    <!-- 渐变堆积图 -->
    <div class="chart-section">
      <div class="chart-wrapper">
        <div id="gradient-stack-chart" style="width: 100%; height: 400px"></div>
      </div>
    </div>

    <!-- 电影院场次图表 -->
    <div class="charts-row">
      <!-- 场次折线图 -->
      <div class="chart-wrapper half-width">
        <div id="cinema-sessions-chart" style="width: 100%; height: 350px"></div>
      </div>

      <!-- 市场份额饼图 -->
      <div class="chart-wrapper half-width">
        <div id="cinema-market-pie" style="width: 100%; height: 350px"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  // 渐变堆积图
  const stackChartDom = document.getElementById('gradient-stack-chart')
  const stackChart = echarts.init(stackChartDom)

  const stackOption = {
    title: {
      text: '电影票房数据渐变堆积图',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['动作片', '喜剧片', '科幻片', '恐怖片'],
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '票房（万元）',
      },
    ],
    series: [
      {
        name: '动作片',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 99, 132, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(255, 159, 64, 0.8)',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [2500, 3200, 1800, 2800, 3500, 4200, 3800, 3100, 2900, 2600, 2400, 3000],
      },
      {
        name: '喜剧片',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(54, 162, 235, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(75, 192, 192, 0.8)',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [1800, 2200, 1600, 2000, 2800, 3200, 2900, 2400, 2100, 1900, 1700, 2200],
      },
      {
        name: '科幻片',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 205, 86, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(255, 159, 64, 0.8)',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [1200, 1500, 1100, 1800, 2200, 2800, 2500, 2000, 1800, 1600, 1400, 1900],
      },
      {
        name: '恐怖片',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(153, 102, 255, 0.8)',
              },
              {
                offset: 1,
                color: 'rgba(201, 203, 207, 0.8)',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [800, 1200, 900, 1100, 1400, 1800, 1600, 1300, 1100, 1000, 900, 1200],
      },
    ],
  }

  stackChart.setOption(stackOption)

  // 电影院场次折线图
  const lineChartDom = document.getElementById('cinema-sessions-chart')
  const lineChart = echarts.init(lineChartDom)

  const lineOption = {
    title: {
      text: '电影院场次统计',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['万达影城', 'CGV影城', '星美国际', '大地影院'],
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
      name: '场次数量',
    },
    series: [
      {
        name: '万达影城',
        type: 'line',
        smooth: true,
        data: [45, 52, 48, 55, 68, 85, 92],
        lineStyle: {
          color: '#FF6B6B',
          width: 3,
        },
        itemStyle: {
          color: '#FF6B6B',
        },
      },
      {
        name: 'CGV影城',
        type: 'line',
        smooth: true,
        data: [38, 45, 42, 48, 62, 78, 85],
        lineStyle: {
          color: '#4ECDC4',
          width: 3,
        },
        itemStyle: {
          color: '#4ECDC4',
        },
      },
      {
        name: '星美国际',
        type: 'line',
        smooth: true,
        data: [32, 38, 35, 42, 55, 68, 75],
        lineStyle: {
          color: '#45B7D1',
          width: 3,
        },
        itemStyle: {
          color: '#45B7D1',
        },
      },
      {
        name: '大地影院',
        type: 'line',
        smooth: true,
        data: [28, 35, 32, 38, 48, 62, 68],
        lineStyle: {
          color: '#96CEB4',
          width: 3,
        },
        itemStyle: {
          color: '#96CEB4',
        },
      },
    ],
  }

  lineChart.setOption(lineOption)

  // 电影院市场份额饼图
  const pieChartDom = document.getElementById('cinema-market-pie')
  const pieChart = echarts.init(pieChartDom)

  const pieOption = {
    title: {
      text: '电影院市场份额分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
    },
    series: [
      {
        name: '市场份额',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 35, name: '万达影城', itemStyle: { color: '#FF6B6B' } },
          { value: 28, name: 'CGV影城', itemStyle: { color: '#4ECDC4' } },
          { value: 22, name: '星美国际', itemStyle: { color: '#45B7D1' } },
          { value: 15, name: '大地影院', itemStyle: { color: '#96CEB4' } },
        ],
      },
    ],
  }

  pieChart.setOption(pieOption)

  // 响应式处理
  window.addEventListener('resize', () => {
    stackChart.resize()
    lineChart.resize()
    pieChart.resize()
  })
})
</script>

<style scoped>
.echarts-container {
  padding: 20px;
  height: 100%;
  background: #f5f5f5;
}

.chart-section {
  margin-bottom: 20px;
}

.charts-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
}

.half-width {
  flex: 1;
}

#gradient-stack-chart,
#cinema-sessions-chart,
#cinema-market-pie {
  min-height: 350px;
}

@media (max-width: 768px) {
  .charts-row {
    flex-direction: column;
  }

  .half-width {
    width: 100%;
  }
}
</style>
