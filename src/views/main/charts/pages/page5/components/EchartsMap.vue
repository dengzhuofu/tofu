<template>
  <div class="content">
    <div ref="charts" style="width: 420px; height: 300px; margin-top: -5px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, Vue } from "vue";
import * as echarts from "echarts";
import china from "@/assets/china.json";
import guangdong from "@/assets/mapJson/provinceMapJson/guangdong.json";
import henan from "@/assets/mapJson/provinceMapJson/henan.json";
import neimenggu from "@/assets/mapJson/provinceMapJson/neimenggu.json";
import heilongjiang from "@/assets/mapJson/provinceMapJson/heilongjiang.json";
import xinjiang from "@/assets/mapJson/provinceMapJson/xinjiang.json";
import hubei from "@/assets/mapJson/provinceMapJson/hubei.json";
import liaoning from "@/assets/mapJson/provinceMapJson/liaoning.json";
import shandong from "@/assets/mapJson/provinceMapJson/shandong.json";
import shanxi2 from "@/assets/mapJson/provinceMapJson/shanxi.json";
import shanghai from "@/assets/mapJson/provinceMapJson/shanghai.json";
import guizhou from "@/assets/mapJson/provinceMapJson/guizhou.json";
import chongqing from "@/assets/mapJson/provinceMapJson/chongqing.json";
import anhui from "@/assets/mapJson/provinceMapJson/anhui.json";
import fujian from "@/assets/mapJson/provinceMapJson/fujian.json";
import hunan from "@/assets/mapJson/provinceMapJson/hunan.json";
import hainan from "@/assets/mapJson/provinceMapJson/hainan.json";
import jiangsu from "@/assets/mapJson/provinceMapJson/jiangsu.json";
import qinghai from "@/assets/mapJson/provinceMapJson/qinghai.json";
import guangxi from "@/assets/mapJson/provinceMapJson/guangxi.json";
import ningxia from "@/assets/mapJson/provinceMapJson/ningxia.json";
import zhejiang from "@/assets/mapJson/provinceMapJson/zhejiang.json";
import hebei from "@/assets/mapJson/provinceMapJson/hebei.json";
import xianggang from "@/assets/mapJson/provinceMapJson/xianggang.json";
import taiwan from "@/assets/mapJson/provinceMapJson/taiwan.json";
import aomen from "@/assets/mapJson/provinceMapJson/aomen.json";
import gansu from "@/assets/mapJson/provinceMapJson/gansu.json";
import sichuan from "@/assets/mapJson/provinceMapJson/sichuan.json";
import tianjin from "@/assets/mapJson/provinceMapJson/tianjin.json";
import jiangxi from "@/assets/mapJson/provinceMapJson/jiangxi.json";
import shanxi1 from "@/assets/mapJson/provinceMapJson/3C.json";
import xizang from "@/assets/mapJson/provinceMapJson/xizang.json";
import jilin from "@/assets/mapJson/provinceMapJson/jilin.json";
import beijing from "@/assets/mapJson/provinceMapJson/beijing.json";
import yunnan from "@/assets/mapJson/provinceMapJson/yunnan.json";
import { getSaleLocation } from "@/api/sale";
const { proxy } = getCurrentInstance();
//当前地图
let currentMap = ref("china");
//点数据
const points = ref([
  // 散点图数据
  // { name: "新疆", value: [87.628579, 43.793301], itemStyle: { color: "#00EEFF" } }, // 新疆
  // { name: "四川", value: [104.076452, 30.651696], itemStyle: { color: "#00EEFF" } }, // 四川
  // { name: "甘肃", value: [103.826777, 36.060634], itemStyle: { color: "#00EEFF" } }, // 甘肃
  // { name: "云南", value: [102.709372, 25.046432], itemStyle: { color: "#00EEFF" } }, // 云南
  // { name: "广西", value: [108.327537, 22.816659], itemStyle: { color: "#00EEFF" } }, // 广西
  // { name: "湖南", value: [112.982951, 28.116007], itemStyle: { color: "#00EEFF" } }, // 湖南
  // { name: "山东", value: [117.020725, 36.670201], itemStyle: { color: "#00EEFF" } }, // 山东
  // { name: "河南", value: [113.753094, 34.767052], itemStyle: { color: "#FF8300" } }, // 河南
  // { name: "山西", value: [112.578781, 37.813948], itemStyle: { color: "#00EEFF" } }, // 山西
  // { name: "福建", value: [119.296194, 26.101082], itemStyle: { color: "#00EEFF" } }, // 福建
  // { name: "浙江", value: [120.152575, 30.266619], itemStyle: { color: "#00EEFF" } }, // 浙江
  // { name: "江苏", value: [118.763563, 32.061377], itemStyle: { color: "#00EEFF" } }, // 江苏
  // { name: "北京", value: [116.407387, 39.904179], itemStyle: { color: "#FFB30088" } }, // 北京
  // { name: "陕西", value: [108.953939, 34.266611], itemStyle: { color: "#00EEFF" } }, // 陕西
  // { name: "广东", value: [113.266887, 23.133306], itemStyle: { color: "#00EEFF" } }, // 广东
]);
// 线数据
const linesData = ref([]);
//航线的矢量图
const planePath =
  "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
//下级地图的散点信息
const nextPoints = ref([
  // { name: "乌鲁木齐", value: [87.628579, 43.793301], itemStyle: { color: "#00EEFF" } },
  // { name: "成都", value: [104.076452, 30.651696], itemStyle: { color: "#00EEFF" } },
  // { name: "兰州", value: [103.826777, 36.060634], itemStyle: { color: "#00EEFF" } },
  // { name: "昆明", value: [102.709372, 25.046432], itemStyle: { color: "#00EEFF" } },
  // { name: "南宁", value: [108.327537, 22.816659], itemStyle: { color: "#00EEFF" } },
  // { name: "长沙", value: [112.982951, 28.116007], itemStyle: { color: "#00EEFF" } },
  // { name: "济南", value: [117.020725, 36.670201], itemStyle: { color: "#00EEFF" } },
  // { name: "郑州", value: [113.753094, 34.767052], itemStyle: { color: "#FF8300" } },
  // { name: "太原", value: [112.578781, 37.813948], itemStyle: { color: "#00EEFF" } },
  // { name: "福州", value: [119.296194, 26.101082], itemStyle: { color: "#00EEFF" } },
  // { name: "杭州", value: [120.152575, 30.266619], itemStyle: { color: "#00EEFF" } },
  // { name: "南京", value: [118.763563, 32.061377], itemStyle: { color: "#00EEFF" } },
  // { name: "北京", value: [116.407387, 39.904179], itemStyle: { color: "#FFB30088" } },
  // { name: "西安", value: [108.953939, 34.266611], itemStyle: { color: "#00EEFF" } },
  // { name: "广州", value: [113.266887, 23.133306], itemStyle: { color: "#00EEFF" } },
]);

//发请求获取数据
const load = async () => {
  const data = await getSaleLocation({ flag: 2 });
  if (data) {
    linesData.value = data.map((item) => {
      return {
        coords: [
          [item.startLng, item.startLat],
          [item.endLng, item.endLat],
        ],
      };
    });
    initCharts();
  }
};

onMounted(() => {
  initCharts();
  load();
});
//省份的Json文件信息
const provinceNumber = {
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
//初始化图表
function initCharts() {
  // 地图的option配置
  const option = {
    title: {
      text: "菜心销售流向图",
      x: "center",
      y: "top",
      textStyle: {
        color: "#FFFFFF",
      },
    },
    tooltip: {
      trigger: "item",
      show: true,
      enterable: true,
      formatter: "{b}",
    },
    geo: {
      map: "china",
      layoutSize: "125%",
      layoutCenter: ["50%", "50%"],
      label: {
        // 图形上的文本标签
        show: false,
        textStyle: {
          color: "#fff",
        },
        emphasis: {
          // 鼠标放上去高亮的样式
          textStyle: {
            color: "#fff",
          },
        },
      },
      itemStyle: {
        // 地图区域的样式设置
        borderColor: "#5089EC",
        borderWidth: 1,
        areaColor: {
          //地图区域的颜色
          type: "radial", // 径向渐变
          x: 0.5, // 圆心
          y: 0.5, // 圆心
          r: 0.8, // 半径
          colorStops: [
            {
              // 0% 处的颜色
              offset: 0,
              color: "rgba(0, 102, 154, 0)",
            },
            {
              // 100% 处的颜色
              offset: 1,
              color: "rgba(0, 102, 154, .4)",
            },
          ],
        },
        // 鼠标放上去高亮的样式
        emphasis: {
          areaColor: "#2386AD",
          borderWidth: 0,
        },
      },
    },
    series: [
      // 散点系列数据
      {
        type: "effectScatter", // 带有涟漪特效动画的散点（气泡）图
        coordinateSystem: "geo", //该系列使用的坐标系:地理坐标系
        // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
        effectType: "ripple",
        // 配置何时显示特效。可选'render'和'emphasis' 。
        showEffectOn: "render",
        rippleEffect: {
          // 涟漪特效相关配置。
          period: 10, // 动画的周期，秒数。
          scale: 4, // 动画中波纹的最大缩放比例。
          // 波纹的绘制方式，可选 'stroke' 和 'fill'。
          brushType: "fill",
        },
        zlevel: 1, // 所有图形的 zlevel 值。
        data: points.value,
      },
      // 线条系列数据
      {
        type: "lines",
        zlevel: 2,
        symbol: ["none", "arrow"], // 标记的图形: 箭头
        symbolSize: 10, // 标记的大小
        effect: {
          // 线条特效的配置
          show: true,
          period: 6, // 特效动画的时间，单位s
          trailLength: 0, // 特效尾迹的长度。取值[0,1]值越大，尾迹越重
          symbol: planePath, // 特效图形的标记 可选'circle'等
          symbolSize: 15, // 特效标记的大小
        },
        lineStyle: {
          // 线条样式
          normal: {
            color: "#00FF00",
            width: 2.5, // 线条宽度
            opacity: 0.6, // 尾迹线条透明度
            curveness: 0.2, // 尾迹线条曲直度
          },
        },
        data: linesData.value,
      },
    ],
  };
  const charts = echarts.init(proxy.$refs.charts);
  //注册地图
  echarts.registerMap("china", china);
  charts.setOption(option);
  //更新下级地图
  function switchMap(params) {
    const name = params.name; //拿到点击的省份
    if (provinceNumber[name]) {
      echarts.registerMap(name, provinceNumber[name]);
      currentMap.value = name;
      option.geo.map = currentMap.value; //更新地图
      // option.series[1].data = nextLineData.value; //下级地图的航线不要
      // 根据当前的省市的值筛选散点信息
      // const filteredPoints = nextPoints.value.filter((point) => {
      //   return point.name === currentMap.value;
      // });
      // 根据当前的省市的值筛选散点信息
      // const filteredPoints = nextPoints.value.filter((point) => {
      //   return point.name.includes(currentMap.value) && point.name.includes(params.name);
      // }).map((point) => {
      //   return point.name;
      // });
      // option.series[0].data = filteredPoints.value
      // option.series[0].data = nextPoints.value; //下级地图的散点信息
      charts.setOption(option);
    }
  }
  // 单击进入下一个地图
  charts.on("click", (params) => {
    switchMap(params);
  });
  // 双击回到原来的中国地图
  charts.on("dblclick", () => {
    if (currentMap.value !== "china") {
      // 回到中国地图
      echarts.registerMap("china", china);
      //更新变量名
      currentMap.value = "china";
      option.geo.map = currentMap.value;
      option.series[1].data = linesData.value
      charts.setOption(option);
    }
  });
}
</script>
<style scoped>
.content {
  margin-top: 10px;
  height: 80%;
}
</style>
