<template>
  <div class="content">
    <div ref="charts" style="width: 480px; height: 350px; margin: -10px auto"></div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import { getMainCitySale } from "@/api/sale";
import { dateToMonth, getToday } from "@/utils/string";
const { proxy } = getCurrentInstance();
const tData = ["北京", "上海", "广州", "深圳"];
let xData = ["5月", "6月", "7月", "8月", "9月"];
const curMonth = dateToMonth(getToday(0))
for (let i = 0; i <= 5; i++) {
  xData[i] = curMonth + i  -5 + '月'
}
let datas = [
  [18.5, 19.2, 19.6, 18.8, 19.3],
  [17.2, 16.8, 17.5, 17.9, 17.3],
  [21.2, 20.6, 21.5, 21.1, 20.9],
  [19.6, 19.8, 20.1, 19.5, 20.3],
  [18.9, 19.1, 19.5, 18.7, 19.4],
  [20.6, 19, 19.1, 20.5, 18.7],
];

onMounted(() => {
  initCharts();
  load();
});
const load = async () => {
  // 要查询的城市参数
  let cities = "";
  tData.forEach((item) => {
    cities += item + ";";
  });
  const data = await getMainCitySale({
    flag: 2,
    cities,
    endTime: getToday(0),
  });
  if (data) {
    //处理数据，将每条数据的时间处理成月份
    data.forEach((item) => {
      item.month = dateToMonth(item.statisticsTime) + "月";
    });
    //将城市和月份作为map的键，值为销售量
    const dataMap = new Map();
    tData.forEach((city) => {
      xData.forEach((month) => {
        dataMap.set(city + month, 0);
      });
    });
    data.forEach((item) => {
      let dataValue = dataMap.get(item.city + item.month);
      if (!dataValue) {
        dataValue = 0;
      }
      dataValue += Number(item.sales);
      dataMap.set(item.city + item.month, dataValue);
    });
    const dataList = Array.from(dataMap.values());
    datas = [];
    for (let i = 0; i < tData.length; i++) {
      datas.push(dataList.slice(i * xData.length, (i + 1) * xData.length));
    }
    initCharts();
  }
};
function initCharts() {
  const charts = echarts.init(proxy.$refs.charts);
  const option = {
    title: {
      text: "",
      textStyle: {
        color: "#d3efff",
      },
      x: "center",
      y: "top",
    },
    legend: {
      show: true,
      x: "center", //center 或 数值
      y: 10,
      icon: "stack",
      itemWidth: 20,
      itemHeight: 20,
      textStyle: {
        color: "#d3efff",
        fontSize: 15,
      },
      data: tData,
    },
    grid: {
      left: 20,
      right: 50,
      top: 80,
      bottom: 100,
      containLabel: true,
    },

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255,255,255)", // 提示框背景颜色
      borderColor: "#01a9b4", // 边框颜色
      borderWidth: 2, // 边框宽度
      padding: 10, // 提示框内边距
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        const data1 = params[0];
        const month = data1.name;
        let result = month + "<br>";
        params.forEach((item) => {
          result += item.seriesName + "：" + item.value + "吨<br>";
        });
        return result;
      },
      textStyle: {
        // 文本样式
        color: "#01a9b4",
        fontSize: 14,
        fontWeight: "bold",
      },
      extraCssText:
        "border-radius: 8px; box-shadow: 0 0 8px rgba(0, 0, 0, 0.3); position: absolute; z-index: 9999;", // 样式补充，包含边框圆角和阴影
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        axisLabel: {
          color: "#d3efff",
          fontSize: 18,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#397cbc",
          },
        },
        // 坐标轴上的坐标点标识
        axisTick: {
          show: true,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "#195384",
          },
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "万吨",
        splitLine: {
          show: true,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#d3efff",
            width: 1,
          },
        },
        axisTick: {
          show: true,
        },
        axisLabel: {
          interval: 0,
          color: "#d3efff",
          fontSize: 18,
        },
        splitArea: {
          show: false,
        },
      },
    ],
    series: tData.map((name, index) => ({
      name: name,
      type: "bar",
      barWidth: "10%",
      itemStyle: {
        color:
          index === 0
            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fccb05",
                },
                {
                  offset: 1,
                  color: "#f5804d",
                },
              ])
            : index === 1
            ? "#8bd46e"
            : index === 2
            ? "#248ff7"
            : "#fe6460",
        barBorderRadius: 5,
      },
      data: datas[index],
    })),
  };
  charts.setOption(option);
}
</script>

<style scoped>
.content {
  margin-top: 10px;
  height: 100%;
}
</style>
