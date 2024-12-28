<template>
  <div class="content">
    <div ref="charts" style="width: 450px; height: 250px; margin: 5px auto"></div>
  </div>
</template>

    <script setup>
import { onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import { getSupplyDemand } from "@/api/supply";
const { proxy } = getCurrentInstance();
let name = ["其他"];
let data = [
  {
    name: "其他",
    value1: 66,
    value2: 70,
  },
];

onMounted(() => {
  initCharts();
  load();
});
// 显示的产品数量
let count = 5;
const load = async () => {
  const res = await getSupplyDemand({ flag: 2 });
  if (res) {
    data = res.map((item) => {
      return { name: item.product, value1: item.demand, value2: item.supply };
    });
    name = res.map((item) => {
      return item.product;
    });
    if (data.length > count) {
      //产品过多，后面的统计为其他

      let otherSuppy = 0;
      let otherDemand = 0;
      data.slice(count).forEach((item) => {
        otherSuppy += Number(item.value2);
        otherDemand += Number(item.value1);
      });
      data = data.slice(0, count - 1);
      data.push({ name: "其他", value1: otherDemand, value2: otherSuppy });
      name = name.splice(0, count - 1);
      name.push("其他");
    }
    initCharts();
  }
};
const getCurrentTime = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  return year + "-" + month + "-" + day;
};

function initCharts() {
  const charts = echarts.init(proxy.$refs.charts);
  const option = {
    graphic: [
      {
        type: "text",
        left: "3%",
        style: {
          text: getCurrentTime(),
          fill: "skyblue",
          fontSize: 18,
        },
      },
    ],
    xAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        textStyle: {
          color: "#fff",
        },
      },
      formatter: function (params) {
        return (
          params[0].name +
          "<br>" +
          params[0].marker +
          "" +
          params[0].seriesName +
          "：" +
          params[0].value +
          "万吨" +
          "<br>" +
          params[1].marker +
          "" +
          params[1].seriesName +
          "：" +
          params[1].value +
          "万吨" +
          "\n"
        );
      },
    },
    grid: {
      left: 80,
      top: 20,
      right: 80,
      bottom: 20,
    },
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#fff",
          fontSize: 14,
        },
        position: "left",
        data: name,
      },
    ],
    series: [
      {
        // 背景样式
        name: "需求量",
        type: "pictorialBar",
        barWidth: 10,
        stack: "总量",
        barGap: "-100%",
        symbol: "fixed",
        symbolRepeat: "repeat",
        legendHoverLink: false,
        itemStyle: {
          normal: {
            color: "#7cd0b3",
          },
        },
        label: {
          show: true,
          position: "outside",
          fontWeight: "bolder",
          align: "left",
          offset: [30, 0],
          formatter: function (p) {
            let name = data.filter(function (item) {
              return p.name === item.name;
            })[0];
            if (!name) {
              return "";
            }
            return "{a|" + name.value1 + "}" + "{c|/}" + "{b|" + name.value2 + "}";
          },
          rich: {
            a: {
              color: "#07D1FA",
              fontSize: 20,
            },
            b: {
              color: "#B0DEF5",
              fontSize: 20,
            },
            c: {
              color: "#fff",
              fontSize: 20,
            },
          },
        },
        data: data.map((item) => {
          return item.value1;
        }),
        symbolSize: [10, 25],
        symbolMargin: 5,
        animation: true,
        z: 0,
      },
      {
        name: "供给量",
        type: "pictorialBar",
        barWidth: 10,
        legendHoverLink: false,
        itemStyle: {
          // lenged文本
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
            {
              offset: 0,
              color: "rgba(48, 147, 238, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(14, 212, 255, 1)", // 100% 处的颜色
            },
          ]),
          borderColor: "#24c3ff",
        },
        silent: true,
        symbolRepeat: "fixed",
        symbolMargin: 5,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [10, 25],
        symbolPosition: "start",
        symbolOffset: [0, 0],
        data: data.map((item) => {
          return item.value2;
        }),
        z: 1,
      },
    ],
  };
  charts.setOption(option);
}
</script>

    <style scoped>
.content {
  /* background-color: #0e2152; */
  margin-top: 10px;
  height: 100%;
}
</style>
