<template>
  <div class="content">
    <div ref="charts" style="width: 440px; height: 270px; margin:0 auto"></div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import { getProvinceSaleData } from "@/api/sale";

const { proxy } = getCurrentInstance()
onMounted(() => {
  load()
});

const load = async () => {
  const data = await getProvinceSaleData({
    flag: 2,
    searchType: 0
  })
  if (data && data.length > 0 && data[0]) {
    datas.yData1Unit = "单位：元/斤"
    datas.yData2Unit = "单位:"+data[0].saleUnit
    datas.xData = []
    datas.xdata = data.map(item => {
      return item.province
    })
    datas.yData1 = data.map(item => {
      return item.averagePrice
    })
    datas.yData2 = data.map(item => {
      return item.sales
    })
    initCharts()
  }
}

let barWidth = 23;
let symbolSize = [24, 16];
let symbolOffsetT = ["-70%", -8]; //修改绿色柱子头部椭圆位置
let symbolOffsetB = ["-72%", 8]; //修改绿色柱子底部椭圆位置
let symbolOffsetX = ["70%", -8];
let symbolOffsetY = ["70%", 8];
let normalColor = "#94a1a9";
let fontSize = 16;
let datas = {
  xdata: [],
  yData1: [],
  yData2: [],
  legendData: ['平均价格', '昨天销售量'],
  yData1Unit :"单位：",
  yData2Unit:"单位："
}

function initCharts () {
  const charts = echarts.init(proxy.$refs.charts);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      show: true,
      data: datas.legendData,
      textStyle: {
        color: 'rgba(255,255,255,1)',
        fontSize: 13
      },
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: normalColor
        }
      },
      axisLabel: {
        textStyle: {
          color: normalColor,
          fontSize: fontSize
        },
        margin: 20
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: normalColor
        }
      },
      data: datas.xdata,
    },
    yAxis: [{
      type: 'value',
      name: datas.yData1Unit,
      nameTextStyle: {
        color: "#b3efff",
        fontSize: fontSize
      },
      color: "#b3efff",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: normalColor
        }
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: normalColor,
          fontSize: fontSize
        }
      },
      axisLine: {
        lineStyle: {
          color: normalColor
        }
      },

    },
    {
      type: 'value',
      name: datas.yData2Unit,
      nameTextStyle: {
        fontSize: fontSize,
        color: "#b3efff",
      },
      color: "#b3efff",
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: normalColor,
          fontSize: fontSize
        }
      },
      axisLine: {
        lineStyle: {
          color: normalColor
        }
      },

    }
    ],
    series: [{ // 绿色柱子
      name: datas.legendData[0],
      tooltip: {
        show: true
      },
      type: 'bar',
      barWidth: barWidth, //柱子宽度
      barGap: 0.5, //柱子之间间距
      emphasis: {
        itemStyle: { //填充部分鼠标移上去颜色
          color: new echarts.graphic.LinearGradient(
            1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(255, 158, 21,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(151, 98, 11,0.8)'
            }
          ]),
        }
      },
      label: {
        show: false,
        position: "top",
        padding: 10,
        textStyle: {
          fontSize: fontSize
        }
      },
      yAxisIndex: 0,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            1, 0, 0, 0, [
            {
              offset: 0,
              color: '#FF9E15',
            },
            {
              offset: .4,
              color: '#BF8A0D'
            },
            {
              offset: .4,
              color: '#FFB911'
            },
            {
              offset: 1,
              color: '#FF9E15'
            }
          ]),
        }
      },
      data: datas.yData1,
    }, {
      yAxisIndex: 0,
      // 绿色柱子底部椭圆
      name: datas.legendData[0],
      tooltip: {
        show: false
      },
      type: 'pictorialBar',
      itemStyle: {
        color: {
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          type: "linear",
          global: false,
          colorStops: [
            {
              offset: 0,
              color: '#FFBC2E',
            },
            {
              offset: .4,
              color: '#BF8A0D'
            },
            {
              offset: .4,
              color: '#FFB911'
            },
            {
              offset: 1,
              color: '#FF9E15'
            }
          ],
        },
      },
      symbolRotate: 0,
      symbol: 'diamond',
      symbolSize: symbolSize,
      symbolOffset: symbolOffsetB,
      symbolPosition: 'start',
      data: datas.yData1,
      z: 1
    },
    {
      yAxisIndex: 0,
      // 绿色柱子头部椭圆
      name: datas.legendData[0],
      tooltip: {
        show: false
      },
      type: 'pictorialBar',
      itemStyle: {
        normal: {
          color: '#BF9C3D',
          borderWidth: 1,
          borderColor: '#19B3FF'
        }
      },
      symbolRotate: 0,
      symbol: 'diamond',
      symbolSize: symbolSize,
      symbolOffset: symbolOffsetT,
      symbolPosition: 'end',
      data: datas.yData1,
      z: 3
    }, {
      // 红色柱子
      name: datas.legendData[1],
      type: 'bar',
      // stack: 1,
      barWidth: barWidth, //柱子宽度
      // barGap: 0.5, //柱子之间间距
      yAxisIndex: 1,
      emphasis: {
        itemStyle: { //左侧未填充部分鼠标移上去颜色
          color: new echarts.graphic.LinearGradient(
            1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(235, 70, 80,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(151, 98, 11,0.8)'
            }
          ]),
          barBorderColor: 'rgba(235, 70, 80,0.8)'
        }
      },
      label: {
        show: false,
        position: "top",
        padding: 10,
        textStyle: {
          fontSize: fontSize
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            1, 0, 0, 0, [{
              offset: 0,
              color: '#ef498b',
            },
            {
              offset: .45,
              color: '#f07c82'
            },
            {
              offset: .45,
              color: '#c04851'
            },
            {
              offset: 1,
              color: '#82111f'
            }
          ]),
        }
      },
      data: datas.yData2,
    }, {
      yAxisIndex: 1,
      // 红色柱子底部椭圆
      name: datas.legendData[1],
      tooltip: {
        show: false
      },
      type: 'pictorialBar',

      itemStyle: {
        color: {
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          type: "linear",
          global: false,
          colorStops: [
            {
              offset: 0,
              color: '#ef498b',
            },
            {
              offset: .45,
              color: '#f07c82'
            },
            {
              offset: .45,
              color: '#c04851'
            },
            {
              offset: 1,
              color: '#82111f'
            }
          ],
        },
      },
      symbolRotate: 0,
      symbol: 'diamond',
      symbolSize: symbolSize,
      symbolOffset: symbolOffsetY,
      symbolPosition: 'start',
      data: datas.yData2,
      z: 1
    },
    {
      yAxisIndex: 1,
      // 红色柱子头部椭圆
      name: datas.legendData[1],
      tooltip: {
        show: false
      },
      type: 'pictorialBar',
      itemStyle: {
        normal: {
          color: '#b13d21',
        }
      },
      symbolRotate: 0,
      symbol: 'diamond',
      symbolSize: symbolSize,
      symbolOffset: symbolOffsetX,
      symbolPosition: 'end',
      data: datas.yData2,
      z: 7
    }
    ]
  };
  let is = true;
  charts.on('legendselectchanged', (e) => {
    if (!option.is) {
      option.series[1].symbolOffset = ["0%", 8];
      option.series[2].symbolOffset = ["0%", -8];
      option.series[4].symbolOffset = ["0%", 8];
      option.series[5].symbolOffset = ["0%", -8];
      option.is = true;
      charts.setOption(option)
    } else {
      option.series[1].symbolOffset = ["-70%", 8];
      option.series[2].symbolOffset = ["-72%", -8];
      option.series[4].symbolOffset = ["70%", 8];
      option.series[5].symbolOffset = ["70%", -8];
      option.is = false;
      charts.setOption(option)
    }
  });
  charts.setOption(option);
}
</script>
<style scoped>
.content {
  margin-top: 10px;
  height: 100%;
}
</style>
