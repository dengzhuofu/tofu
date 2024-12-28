<template>
  <div class="content">
    <div ref="chart" style="width: 480px; height: 280px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { getPriceTrend } from "@/api/line";

let chartInstance;
onMounted(() => {
  initChart();
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
  getorangeList();
});

// 存储柑橘价格
const data1 = ref([]);
const priceArray = [];
let chartInstances = null;

const getorangeList = async () => {
  let result = await getPriceTrend({ flag: 2 });
  if (result) {
    xData = [];
    result.forEach((item) => {
      // 价格
      const price = Number(item.price.toFixed(2));
      priceArray.push(price);
      // 时间
      xData.push(item.time.slice(6));
    });
    data1.value = priceArray;
    option.series[0].data = priceArray;
    option.series[0].data = data1.value;
    option.xAxis.data = xData;
    chartInstance.setOption(option);
  }
};

const chart = ref(null);
let xData = [];
const initChart = () => {};

const option = {
  title: {
    textStyle: {
      align: "center",
      color: "#b3efff",
      fontSize: 20,
    },
    top: "5%",
    left: "center",
  },
  grid: {
    borderWidth: 0,
    left: 30,
    textStyle: {
      color: "#FFFFFF",
    },
  },
  legend: {
    top: 10,
    textStyle: {
      fontSize: 14,
      fontFamily: "MicrosoftYaHeiUI",
      color: "#b3efff",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "category",
    axisLine: {
      show: true,
      symbol: ["none", "arrow"],
      lineStyle: {
        color: "#FFFFFF",
        width: 1,
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: true,
    },
    splitArea: {
      show: false,
    },
    axisLabel: {
      color: "#FFFFFF",
      fontSize: 16,
    },
    data: xData,
  },
  yAxis: [
    {
      type: "value",
      name: "元/斤",
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#FFFFFF",
          width: 1,
        },
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        interval: 0,
        color: "#FFFFFF",
        fontSize: 18,
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "柑橘",
      type: "line",
      symbolSize: 4,
      symbol: "circle",
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: "top",
            formatter: (params) => {
              return params.value + "%";
            },
            textStyle: {
              fontSize: 12,
              color: "#b3efff",
            },
          },
          color: "#FF8300",
          barBorderRadius: 2,
        },
      },
      lineStyle: {
        width: 3,
        type: "dotted",
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#55bb8a",
            },
            {
              offset: 1,
              color: "#55bb8b",
            },
          ],
          global: false,
        },
      },
      data: data1.value,
    },
  ],
};
</script>

<style scoped></style>
