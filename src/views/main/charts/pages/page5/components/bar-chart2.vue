<template>
  <div class="content">
    <div ref="charts" style="width: 450px; height: 280px"></div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref } from "vue";
import * as echarts from "echarts";
import { getProduceData } from "@/api/produce";
import { getSpecificMonth } from "@/utils/string";

const { proxy } = getCurrentInstance();
onMounted(() => {
  initCharts();
  load();
});
const initCharts = () => {
  const charts = echarts.init(proxy.$refs.charts);
  charts.setOption(option);
};
const load = async () => {
  const data = await getProduceData({
    flag: 2,
    searchType: 0,
    count: 5,
    endTime:getSpecificMonth(0) //获取当前月份
  });
  if (data && data.length > 0) {
    data.sort((a, b) => {
      return a.month - b.month;
    });
    data.forEach((item) => {
      xData.push(item.month + "月");
      yData.push(item.yield);
      yData2.push(item.produceScale / 10000);
    });
    option.xAxis.data = xData;
    option.series[0].data = yData2;
    option.series[1].data = yData2;
    option.series[2].data = yData2;
    option.series[3].data = yData;
    initCharts();
  }
};

let xData = [];
let yData = [];
let yData2 = [];

const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: [
    {
      top: "5.5%",
      left: "20%",
      textStyle: {
        color: "#b3efff",
        fontSize: 18,
        fontFamily: "微软雅黑",
      },
      itemWidth: 20,
      itemHeight: 20,
      data: [
        {
          name: "生产规模",
          icon: "rect",
        },
      ],
    },
    {
      data: [
        {
          name: "产量",
        },
      ],
      itemWidth: 30,
      itemHeight: 15,
      top: "6%",
      left: "60%",
      textStyle: {
        color: "#FF9019",
        fontSize: 18,
      },
    },
  ],
  grid: {
    top: "20%",
    left: "15%",
  },

  xAxis: {
    type: "category",
    axisLabel: {
      color: "#b3efff",
      interval: 0,
      fontSize: 18,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#0a3e98",
      },
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#195384",
        type: "dotted",
      },
    },
    data: xData,
  },
  yAxis: [
    {
      type: "value",
      name: "万亩",
      min: 0,
      nameTextStyle: {
        color: "#b3efff",
        fontSize: 18,
      },
      axisLine: {
        lineStyle: {
          color: "#0a3e98",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#0a3e98",
          type: "dotted",
        },
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          color: "#b3efff",
          fontSize: 18,
        },
      },
    },
    {
      type: "value",
      name: "吨",
      min: 0,
      nameTextStyle: {
        color: "#d3efff",
        fontSize: 18,
      },
      axisLine: {
        lineStyle: {
          color: "#0a3e98",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#0a3e98",
          type: "dotted",
        },
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          color: "#d3efff",
          fontSize: 18,
        },
      },
    },
  ],
  series: [
    {
      name: "生产规模",
      type: "pictorialBar",
      symbolSize: [20, 10],
      symbolOffset: [0, -6],
      symbolPosition: "end",
      z: 12,
      tooltip: {
        show: false,
      },
      color: "#e8b004",
    },
    {
      name: "生产规模",
      type: "pictorialBar",
      symbolSize: [20, 10],
      symbolOffset: [0, 7],
      z: 12,
      tooltip: {
        show: false,
      },
    },
    {
      name: "生产规模",
      type: "bar",
      barWidth: "20",
      barGap: "10%",
      barCateGoryGap: "10%",
      itemStyle: {
        normal: {
          barBorderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
            {
              offset: 0,
              color: "#f8df70",
            },
            {
              offset: 1,
              color: "#f9c116",
            },
          ]),
          opacity: 1,
        },
        emphasis: {
          barBorderRadius: 0,
        },
      },
    },
    {
      name: "产量",
      type: "line",
      yAxisIndex: 1,
      symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
      lineStyle: {
        width: 3,
        color: "#1491a8", // 线条颜色
      },
      itemStyle: {
        color: "#5bae23", //拐点颜色
        borderColor: "#96c24e", //拐点边框颜色
        borderWidth: 2, //拐点边框大小
      },
      symbolSize: 8, //设定实心点的大小
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#29a5d530",
          },
          {
            offset: 0.6,
            color: "#29a5d520",
          },
          {
            offset: 1,
            color: "#29a5d510",
          },
        ]),
      },
      data: [40, 50, 35, 41, 85, 60, 30],
    },
  ],
};
</script>

<style scoped></style>