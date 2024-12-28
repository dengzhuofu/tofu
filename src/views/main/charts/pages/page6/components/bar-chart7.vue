<template>
  <div class="content">
    <div ref="charts" style="width: 480px; height: 590px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import { getCitySaleRanking } from "@/api/sale";
const { proxy } = getCurrentInstance();
const chartContainer = ref(null);
//Y轴的数据，和数据值位置一一对应
let cate = ["北京", "广州", "上海", "深圳", "成都", "武汉", "湖南", "浙江", "杭州", "重庆", "天津"];
//数据值，顺序和Y轴的名字一一对应
let barData = [1530, 1400, 1340, 1259, 1200, 1000, 1090, 888, 699, 934, 677];
let unit = "吨";
onMounted(() => {
  //初始化图表
  initChart();
  load();
});
const load = async () => {
  const data = await getCitySaleRanking({
    flag: 2,
  });
  if (data) {
    cate = data.map((item) => {
      unit = item.unit || "吨";
      return item.city;
    });
    barData = data.map((item) => {
      return item.sales;
    });
    initChart();
  }
};
const initChart = () => {
  const myChart = echarts.init(proxy.$refs.charts);
  let option = {
    title: {
      text: "月均销售量",
      left: "330",
      textStyle: {
        //文字颜色
        color: "#fff",
        //字体风格,'normal','italic','oblique'
        fontStyle: "normal",
        //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: "bold",
        //字体系列
        fontFamily: "sans-serif",
        //字体大小
        fontSize: 17,
      },
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    //图表位置
    grid: {
      left: "5%",
      right: "10%",
      bottom: "3%",
      containLabel: true,
    },
    //X轴
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      //不显示X轴刻度线和数字
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: "category",
      data: cate,
      //升序
      inverse: true,
      splitLine: { show: false },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        //y轴文字的配置
        textStyle: {
          color: "#fff",
          margin: 20,

          fontSize: 20,
        },
      },
      // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
      //key和图间距
      offset: 10,
      //动画部分
      animationDuration: 300,
      animationDurationUpdate: 300,
      //key文字大小
      nameTextStyle: {
        fontSize: 5,
      },
    },
    series: [
      {
        //柱状图自动排序，排序自动让Y轴名字跟着数据动
        realtimeSort: true,
        name: unit,
        type: "bar",
        data: barData,
        barWidth: 14,
        barGap: 10,
        smooth: true,
        valueAnimation: true,
        //Y轴数字显示部分
        label: {
          normal: {
            show: true,
            position: "right",
            valueAnimation: true,
            offset: [5, -2],
            textStyle: {
              color: "#FFF",
              fontSize: 16,
            },
          },
        },
        itemStyle: {
          emphasis: {
            barBorderRadius: 7,
          },
          //颜色样式部分
          normal: {
            barBorderRadius: 7,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#f3ecd9 " },
              { offset: 1, color: "#fcb3d3" },
            ]),
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style>
/* #chart {
  width: 600px;
  height: 400px;
} */
</style>
