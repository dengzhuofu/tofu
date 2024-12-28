<template>
  <div class="content">
    <div ref="charts" style="width: 450px; height: 350px; margin-top: -10px"></div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import china from "@/assets/china.json";
import gdMap from "@/assets/guangdong.json";
import guangzhou from "@/assets/mapJson/guangzhou.json";
import shenzhen from "@/assets/mapJson/shenzhen.json";
import chaozhou from "@/assets/mapJson/chaozhou.json";
import huizhou from "@/assets/mapJson/huizhou.json";
import zhuhai from "@/assets/mapJson/zhuhai.json";
import shantou from "@/assets/mapJson/shantou.json";
import dongguan from "@/assets/mapJson/dongguan.json";
import foshan from "@/assets/mapJson/foshan.json";
import heyuan from "@/assets/mapJson/heyuan.json";
import jiangmen from "@/assets/mapJson/jiangmen.json";
import jieyang from "@/assets/mapJson/jieyang.json";
import maoming from "@/assets/mapJson/maoming.json";
import meizhou from "@/assets/mapJson/meizhou.json";
import qingyuan from "@/assets/mapJson/qingyuan.json";
import shanwei from "@/assets/mapJson/shanwei.json";
import shaoguan from "@/assets/mapJson/shaoguan.json";
import yunfu from "@/assets/mapJson/yunfu.json";
import zhaoqing from "@/assets/mapJson/zhaoqing.json";
import zhanjiang from "@/assets/mapJson/zhanjiang.json";
import zhongshan from "@/assets/mapJson/zhongshan.json";
import yangjiang from "@/assets/mapJson/yangjiang.json";
import { getMarketStatistics } from "@/api/sale";
import { cityPoints } from "@/config/data";
const { proxy } = getCurrentInstance();
// 城市总产量数据
let piontdata = [
  {
    name: "越秀区",
    value: 92,
    sell: 12.7,
    price: 5.8,
    coord: [113.261034, 23.132107],
  },
];
let piontdataGD = [
  {
    name: "广州市",
    value: 1350,
    sell: 12.7,
    price: 5.8,
    coord: [113.264385, 23.129112],
    code: "GZ",
  },
];
// 最大产量值
let maxValue = 0;
onMounted(() => {
  initCharts();
  load();
});
const load = async () => {
  const data = await getMarketStatistics({
    flag: 2,
  });
  //统计城市数据
  const cityMap = new Map();
  if (data) {
    data.forEach((item) => {
      let cityData = cityMap.get(item.city);
      if (!cityData) {
        cityData = { name: item.city, value: 0, sell: 0, coord: cityPoints.get(item.city) };
      }
      item.productMarketData.forEach((product) => {
        cityData.value += Number(product.yield); //产量
        cityData.sell += Number(product.sales); //销售额
      });
      cityMap.set(item.city, cityData);
      maxValue = Math.max(cityData.value, maxValue);
    });
    piontdataGD = Array.from(cityMap.values());
    initCharts();
  }
};
function initCharts() {
  const charts = echarts.init(proxy.$refs.charts);
  const data = [];
  const geoCoordMap = {
    广东: gdMap,
    广州市: guangzhou,
    深圳市: shenzhen,
    潮州市: chaozhou,
    惠州市: huizhou,
    珠海市: zhuhai,
    汕头市: shantou,
    // 中山市: zhongshan,
    // 东莞市: dongguan,
    佛山市: foshan,
    河源市: heyuan,
    江门市: jiangmen,
    茂名市: maoming,
    梅州市: meizhou,
    清远市: qingyuan,
    汕尾市: shanwei,
    韶关市: shaoguan,
    揭阳市: jieyang,
    云浮市: yunfu,
    肇庆市: zhaoqing,
    湛江市: zhanjiang,
    阳江市: yangjiang,
  };

  function switchMap(params) {
    const name = params.name;
    if (geoCoordMap[name]) {
      echarts.registerMap(name, geoCoordMap[name]); //关键是如何用名字来置换地区
      option.series[0].map = name;
      option = opt(350, 0, "总产量", "吨", true, false);
      option.series[0].zoom = 1;
      option.series[0].center = undefined;
      option.series[0].markPoint.data = switchPiontmap(piontdata, params.data.code);
      option.series[0].data = switchPiontmap(piontdata, params.data.code);
      option.series[0].markPoint.tooltip.show = true;
      option.series[0].tooltip.show = false;
      charts.setOption(option);
    }
  }

  charts.on("click", (params) => {
    if (params.data) {
      switchMap(params);
    }
  });

  charts.on("dblclick", () => {
    echarts.registerMap("广东", gdMap);
    option.series[0].map = "广东";
    option.series[0].markPoint.data = switchPiontmap(piontdataGD);
    option.series[0].data = switchPiontmap(piontdataGD);
    option.series[0].markPoint.tooltip.show = false;
    option.series[0].tooltip.show = true;
    option = opt(1350, 0, "总产量", "吨", true, false);
    charts.setOption(option);
  });
  function switchPiontmap(Map, code) {
    let newArray = [];
    // 遍历数组，根据 code 筛选元素
    for (let i = 0; i < Map.length; i++) {
      if (Map[i].from === code) {
        newArray.push(Map[i]);
      }
    }
    return newArray;
  }
  function membersCheck(Map, code) {
    let x = 0;
    for (let i = 0; i < Map.length; i++) {
      if (code === piontdata[i].from) {
        x++;
      }
    }
    return x;
  }

  let seriesdata = [
    //散点图
    {
      type: "map",
      map: "广东",
      // 设置虚拟数据
      data: switchPiontmap(piontdataGD),

      //series[] 类型:scatter 数据
      markPoint: {
        symbol: "none",
        data: switchPiontmap(piontdataGD),
        tooltip: {
          show: true,
          formatter: function (item) {
            let tipHtml = "";

            // tipHtml =
            //   '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #81a380">' +
            //   '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#68945c;text-align:center;margin:0 2px;">' +
            //   item.data.name +
            //   "</div>" +
            //   '<div style="text-align:center;color:#494949;padding:8px 6px">' +
            //   '<span style="font-size:15px;font-weight:bold;">' +
            //   "生产产量：" +
            //   item.data.value +
            //   "吨" +
            //   "</span>" +
            //   "</div>" +
            //   '<div style="text-align:center;color:#494949;padding:8px 6px">' +
            //   '<span style="font-size:15px;font-weight:bold;">' +
            //   "平均价格：" +
            //   item.data.price +
            //   "元" +
            //   "</span>" +
            //   "</div>" +
            //   '<div style="text-align:center;color:#494949;padding:8px 6px">' +
            //   '<span style="font-size:15px;font-weight:bold;">' +
            //   "销售额：" +
            //   item.data.sell +
            //   "万元" +
            //   "</span>" +
            //   "</div>" +
            //   "</div>";
            return tipHtml;
          },
        },
      },
      tooltip: {
        show: true,
        formatter: function (item) {
          let tipHtml = "";

          if (item.data) {
            tipHtml +=
              item.name + "<br>" + "总产量：" + item.value + "<br>" + "销售额：" + item.data.sell;
          }
          // tipHtml =
          //   '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #81a380">' +
          //   '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#68945c;text-align:center;margin:0 2px;">' +
          //   item.data.name +
          //   "</div>" +
          //   '<div style="text-align:center;color:#494949;padding:8px 6px">' +
          //   '<span style="font-size:15px;font-weight:bold;">' +
          //   "生产产量：" +
          //   item.data.value +
          //   "吨" +
          //   "</span>" +
          //   "</div>" +
          //   '<div style="text-align:center;color:#494949;padding:8px 6px">' +
          //   '<span style="font-size:15px;font-weight:bold;">' +
          //   "平均价格：" +
          //   item.data.price +
          //   "元" +
          //   "</span>" +
          //   "</div>" +
          //   '<div style="text-align:center;color:#494949;padding:8px 6px">' +
          //   '<span style="font-size:15px;font-weight:bold;">' +
          //   "销售额：" +
          //   item.data.sell +
          //   "万元" +
          //   "</span>" +
          //   "</div>" +
          //   "</div>";
          return tipHtml;
        },
      },
      roam: true,
      label: {
        show: true,
      },
      name: "广东省数据",
      // 自定义扩展图表类型
      aspectScale: 1, //视角倾斜度
      zoom: 1, //缩放
      showLegendSymbol: false,
      // eslint-disable-next-line no-dupe-keys
      label: {
        // 默认的字体样式
        show: true,
        color: "#fff",
        fontSize: 12,
      },
      itemStyle: {
        // 默认的区域块颜色和样式
        areaColor: "#4c8045",
        borderColor: "#a9be7b",
        borderWidth: 2,
        shadowColor: "#c0d09d",
        shadowBlur: 10,
      },
      emphasis: {
        label: {
          // 悬浮高亮时的字体样式
          show: true,
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
        },
        itemStyle: {
          // 悬浮高亮时的地图背景色和边框颜色
          areaColor: "#d2b116",
          borderColor: "#fff",
          borderWidth: 2,
        },
      },
      layoutCenter: ["50%", "37%"],
      layoutSize: "95%",
    },
  ];

  function opt(max, min, vmp, unit, flag1, flag2) {
    let optn = {
      visualMap: {
        min: min,
        max: max,
        calculable: false,
        bottom: "100%",
      },
      tooltip: {
        formatter: function (params) {
          return params.name + ": " + params.value + unit;
        },
      },
      series: seriesdata,
    };
    return optn;
  }

  // eslint-disable-next-line no-var
  var option = opt(maxValue, 0, "总产量", "吨", true, false);
  echarts.registerMap("广东", gdMap);
  charts.setOption(option, true);
}
</script>
