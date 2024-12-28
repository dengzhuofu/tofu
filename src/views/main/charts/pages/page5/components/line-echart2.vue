<template>
  <div class="content">
    <div ref="chart" style="width: 450px; height: 275px"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { getBuyersIndex } from "@/api/temp";
import { getCurrentInstance, onMounted } from "vue";
import { getSpecificMonth } from "@/utils/string";
const { proxy } = getCurrentInstance();
let data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
onMounted(() => {
  initChart();
  load();
});
const load = async () => {
  const data = await getBuyersIndex({ flag: 2, endTime: getSpecificMonth(0) });
  if (data) {
    data.forEach((item) => {
      if (item.year === 2022) {
        data1[item.month - 1] = item.temp;
      } else if (item.year === 2023) {
        data2[item.month - 1] = item.temp;
      }
    });
    initChart();
  }
};
const initChart = () => {
  const chart = echarts.init(proxy.$refs.chart);
  const axisData = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];

  const barData1 = [];
  const barData2 = [];
  for (let i = 0; i < axisData.length; i++) {
    barData1.push(Math.min(data1[i], data2[i]));
    let yearOnYearGrowthRate = 0;
    if (data1[i] === 0) {
      yearOnYearGrowthRate = data2[i] === 0 ? 0 : 100;
    } else {
      yearOnYearGrowthRate = ((data2[i] - data1[i]) / data1[i]) * 100;
    }
    const growthText =
      yearOnYearGrowthRate > 0
        ? `增长: ${Math.abs(yearOnYearGrowthRate).toFixed(2)}%`
        : yearOnYearGrowthRate < 0
        ? `减少: ${Math.abs(yearOnYearGrowthRate).toFixed(2)}%`
        : "持平";
    barData2.push(growthText);
  }
  const option = {
    backgroundColor: "",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "cyan",
        },
      },
      formatter: function (params) {
        let tooltipStr =
          "<p>2022年 : " +
          data1[params[0].dataIndex] +
          " </p>" +
          "<p>2023年 : " +
          data2[params[0].dataIndex] +
          " </p>" +
          "<p>同比" +
          barData2[params[0].dataIndex] +
          " </p>";

        return tooltipStr;
      },
    },
    legend: {
      icon: "rect",
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ["2022", "2023"],
      right: "4%",
      top: "",
      textStyle: {
        fontSize: 12,
        color: "#F1F1F3",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      top: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
        },
        interval: 0, // 设置为 0，显示所有横坐标轴标签
      },
      data: axisData,
    },
    yAxis: {
      type: "value",
      name: "",
      axisTick: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#fff",
          fontSize: 14,
        },
      },
      splitLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        name: "2022",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 2,
          },
        },
        itemStyle: {
          normal: {
            color: "#FF0000", // 红色
            borderColor: "#FF0000", // 边框颜色使用结束颜色（红色）
            borderWidth: 8,
          },
        },
        data: data1,
      },
      {
        name: "2023",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 2,
          },
        },
        itemStyle: {
          normal: {
            color: "#00FF00", // 绿色
            borderColor: "#00FF00", // 边框颜色使用结束颜色（绿色）
            borderWidth: 8,
          },
        },
        data: data2,
      },

      // bar图
      {
        type: "bar",
        stack: "test",
        // barWidth:'10%',
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)",
          },
        },
        data: barData1,
        tooltip: {
          show: false,
        },
      },
      {
        type: "bar",
        stack: "test",
        barWidth: 4,
        itemStyle: {
          normal: {
            color: function (params) {
              if (data1[params.dataIndex] > data2[params.dataIndex]) {
                return "green";
              } else if (data1[params.dataIndex] < data2[params.dataIndex]) {
                return "red";
              } else {
                return "rgba(0,0,0,0)";
              }
            },
            barBorderRadius: 2,
          },
        },
        data: barData2,
        tooltip: {
          show: false,
        },
      },
    ],
  };
  chart.setOption(option);
};
</script>

<style scoped></style>
