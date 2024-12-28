<template>
  <div class="content">
    <div ref="charts" style="width: 800px; height: 460px; margin: 0 auto"></div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref } from "vue";
import * as echarts from "echarts";
import china from "@/assets/china.json";
import guangdong from "@/assets/guangdong.json";
import henan from "@/assets/mapJson/henan.json";
import neimenggu from "@/assets/mapJson/neimenggu.json";
import heilongjiang from "@/assets/mapJson/heilongjiang.json";
import xinjiang from "@/assets/mapJson/xinjiang.json";
import hubei from "@/assets/mapJson/hubei.json";
import liaoning from "@/assets/mapJson/liaoning.json";
import shandong from "@/assets/mapJson/shandong.json";
import shanxi2 from "@/assets/mapJson/shanxi2.json";
import shanghai from "@/assets/mapJson/shanghai.json";
import guizhou from "@/assets/mapJson/guizhou.json";
import chongqing from "@/assets/mapJson/chongqing.json";
import anhui from "@/assets/mapJson/anhui.json";
import fujian from "@/assets/mapJson/fujian.json";
import hunan from "@/assets/mapJson/hunan.json";
import hainan from "@/assets/mapJson/hainan.json";
import jiangsu from "@/assets/mapJson/jiangsu.json";
import qinghai from "@/assets/mapJson/qinghai.json";
import guangxi from "@/assets/mapJson/guangxi.json";
import ningxia from "@/assets/mapJson/ningxia.json";
import zhejiang from "@/assets/mapJson/zhejiang.json";
import hebei from "@/assets/mapJson/hebei.json";
import xianggang from "@/assets/mapJson/xianggang.json";
import taiwan from "@/assets/mapJson/taiwan.json";
import aomen from "@/assets/mapJson/aomen.json";
import gansu from "@/assets/mapJson/gansu.json";
import sichuan from "@/assets/mapJson/sichuan.json";
import tianjin from "@/assets/mapJson/tianjin.json";
import jiangxi from "@/assets/mapJson/jiangxi.json";
import shanxi1 from "@/assets/mapJson/shanxi1.json";
import xizang from "@/assets/mapJson/xizang.json";
import jilin from "@/assets/mapJson/jilin.json";
import beijing from "@/assets/mapJson/beijing.json";
import yunnan from "@/assets/mapJson/yunnan.json";
import { getPositionDistribution } from "@/api/sale";
const { proxy } = getCurrentInstance();
onMounted(() => {
  initCharts();
  load();
});
const geoCoordMap = {
  中国: china,
  广东: guangdong,
  河南: henan,
  内蒙古: neimenggu,
  黑龙江: heilongjiang,
  新疆: xinjiang,
  湖北: hubei,
  辽宁: liaoning,
  山东: shandong,
  陕西: shanxi2,
  上海: shanghai,
  贵州: guizhou,
  重庆: chongqing,
  安徽: anhui,
  福建: fujian,
  湖南: hunan,
  海南: hainan,
  江苏: jiangsu,
  青海: qinghai,
  广西: guangxi,
  宁夏: ningxia,
  浙江: zhejiang,
  河北: hebei,
  香港: xianggang,
  台湾: taiwan,
  澳门: aomen,
  甘肃: gansu,
  四川: sichuan,
  天津: tianjin,
  江西: jiangxi,
  山西: shanxi1,
  西藏: xizang,
  吉林: jilin,
  北京: beijing,
  云南: yunnan,
};
const img1 = "image://" + require("@/assets/chart/mapIcon/chandi2.png");
const img2 = "image://" + require("@/assets/chart/mapIcon/pifa2.png");
const img3 = "image://" + require("@/assets/chart/mapIcon/xiaoshou2.png");
const mapStyle = {
  fill: "#dbe196",
  filled: "rgba(248,255,170,0.2)",
  stroke: "#8a77a5",
  lineWidth: 1,
  shadowColor: "rgba(0, 0, 0, 0.5)",
  shadowBlur: 10,
};

const pointStyle = {
  产地: {
    symbol: img1,
    symbolSize: 20,
    color: "#E0FF62",
  },
  批发市场: {
    symbol: img2,
    symbolSize: 20,
    color: "#20C9AE",
  },
  销售地: {
    symbol: img3,
    symbolSize: 20,
    color: "#BF93FF",
  },
};

let pointData = [
  {
    name: "点1",
    type: "产地",
    coordinates: [116.397428, 39.90923],
  },
  {
    name: "点2",
    type: "批发市场",
    coordinates: [121.473701, 31.230416],
  },
  {
    name: "点3",
    type: "销售地",
    coordinates: [112.264434, 24.129162],
  },
];
let history = [];
const load = async () => {
  const data = await getPositionDistribution({
    flag: 2,
  });
  if (data) {
    pointData = data.map((item) => {
      return { name: item.location, type: item.location, coordinates: [item.lng, item.lat] };
    });
    initCharts();
  }
};
function initCharts() {
  const charts = echarts.init(proxy.$refs.charts);
  let currentMap = ref("china"); // 在图表初始化之后添加这一行
  function switchMap(params) {
    const name = params.name;
    if (geoCoordMap[name]) {
      echarts.registerMap(name, geoCoordMap[name]);
      option.geo.map = params.name;
      option.series[1].data = [];
      charts.setOption(option, false);
      currentMap.value = name;
    }
  }
  // 单击进入
  charts.on("click", (params) => {
    switchMap(params);
  });

  //双击退出
  charts.on("dblclick", () => {
    // 首先，将isDoubleClick设置为true
    if (currentMap.value !== "china") {
      // 注册全国地图并将地图设置回全国
      echarts.registerMap("china", china);
      option.geo.map = "china";
      charts.setOption(option, false);
      // 将当前地图设置回全国
      currentMap.value = "china";
    }
  });

  function mapCheckout(params) {
    const name = params.name;
    if (geoCoordMap[name]) {
      echarts.registerMap(name, geoCoordMap[name]);
      option.geo.map = name;
      option.series[0].map = name;
      option.geo.zoom = 1;
      option.geo.center = undefined;
      option.series[0].layoutSize = "85%";
      option.series[0].center = undefined;
      charts.setOption(option);
    }
  }
  function goback() {
    echarts.registerMap("中国", geoCoordMap["中国"]);
    option.geo.map = "中国";
    option.series[0].map = "中国";
    option.series[1].data = pointData;
    option.geo.zoom = 1;
    option.geo.center = undefined;
    option.series[0].layoutSize = "107%";
    option.series[0].center = undefined;
    charts.setOption(option);
  }
  charts.on("click", (params) => {
    mapCheckout(params);
  });

  charts.on("contextmenu", (params) => {
    window.event.returnValue = false;
    goback();
  });
  const scatterSeries = Object.entries(pointStyle).map(([type, style]) => ({
    type: "scatter",
    z: 60,
    name: type,
    coordinateSystem: "geo",
    data: pointData
      .filter((item) => item.type === type)
      .map((item) => ({
        name: item.name,
        value: item.coordinates,
      })),
    symbol: style.symbol,
    symbolSize: style.symbolSize,
    itemStyle: {
      color: style.color,
    },
  }));

  const legendData = Object.keys(pointStyle);
  const legend = {
    data: legendData,
  };

  charts.on("geoRoam", function (params) {
    let option = charts.getOption(); //获得option对象
    if (params.zoom !== null && params.zoom !== undefined) {
      //捕捉到缩放时
      option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
      option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
      charts.clear();
    } else {
      //捕捉到拖曳时
      option.geo[0].center = option.series[1].center; //下层的geo的中心位置随着上层geo一起改变
      charts.clear();
    }
    charts.setOption(option);
  });
  const option = {
    goDown: true, // 是否下钻
    geo: {
      map: "china",
      zoom: 1,
      roam: "scale",
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#1DE9B6",
          },
        },
        emphasis: {
          textStyle: {
            color: "rgb(183,185,14)",
          },
        },
      },
      itemStyle: {
        normal: {
          borderColor: "rgb(147, 235, 248)",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "#09132c", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#274d68", // 100% 处的颜色
              },
            ],
            globalCoord: true, // 缺省为 false
          },
        },
        emphasis: {
          areaColor: "rgb(46,229,206)",
          borderWidth: 0.1,
        },
      },
    },
    series: [...scatterSeries],
    legend: {
      top: 0,
      itemWidth: 20,
      itemHeight: 20,
      data: legendData,
      backgroundColor: "rgba(75,147,199,0.4)",
      borderWidth: "1px",
      borderRadius: 5,
      label: {
        show: true,
        color: "#007700",
        fontSize: 20,
      },
    },
  };
  echarts.registerMap("china", china);
  charts.setOption(option);
}
</script>
