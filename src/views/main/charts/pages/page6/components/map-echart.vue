<template>
  <div class="content">
    <div ref="charts" style="width: 700px; height: 470px; margin: -10px auto"></div>
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
import { getProductBaseInfo } from "@/api/fetchBases";
import { cityPoints } from "@/config/data";
const { proxy } = getCurrentInstance();
const geoCoordMap = {
  广东: gdMap,
  广州市: guangzhou,
  深圳市: shenzhen,
  潮州市: chaozhou,
  惠州市: huizhou,
  珠海市: zhuhai,
  汕头市: shantou,
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
// 城市总产量数据
let piontdata = [
  {
    name: "越秀区",
    value: 92,
    coord: [113.261034, 23.132107],
    time: "2023-04-25",
    phone: "15361782938",
    type: "增城迟菜心",
    from: "广州市",
    baseName: "广州从化新田水果专业合作社",
  },
];

let pointdataGD = [
  {
    name: "广州市",
    value: 1350,
    coord: [113.264385, 23.129112],
    baseCount: 5,
  },
  {
    name: "深圳市",
    value: 1190,
    coord: [114.057939, 22.543099],
    baseCount: 5,
  },
  {
    name: "珠海市",
    value: 167,
    coord: [113.576677, 22.270978],
    baseCount: 5,
  },
  {
    name: "汕头市",
    value: 555,
    coord: [116.681972, 23.354091],
    baseCount: 5,
  },
  {
    name: "佛山市",
    value: 743,
    coord: [113.121416, 23.021548],
    baseCount: 5,
  },
  {
    name: "韶关市",
    value: 293,
    coord: [113.597522, 24.810403],
    baseCount: 5,
  },
  {
    name: "湛江市",
    value: 724,
    coord: [110.359377, 21.270708],
    baseCount: 5,
  },
  {
    name: "肇庆市",
    value: 405,
    coord: [112.465091, 23.047191],
    baseCount: 5,
  },
  {
    name: "江门市",
    value: 451,
    coord: [113.081901, 22.578738],
    baseCount: 5,
  },
  {
    name: "茂名市",
    value: 608,
    coord: [110.925456, 21.660574],
    baseCount: 5,
  },
  {
    name: "惠州市",
    value: 475,
    coord: [114.416196, 23.109937],
    baseCount: 5,
  },
  {
    name: "梅州市",
    value: 434,
    coord: [116.122238, 24.288615],
    baseCount: 5,
  },
  {
    name: "汕尾市",
    value: 302,
    coord: [115.375154, 22.786211],
  },
  {
    name: "河源市",
    value: 307,
    coord: [114.696828, 23.746461],
    baseCount: 5,
  },
  {
    name: "阳江市",
    value: 251,
    coord: [111.982589, 21.857963],
    baseCount: 5,
  },
  {
    name: "清远市",
    value: 383,
    coord: [113.056031, 23.682011],
    baseCount: 5,
  },
  {
    name: "东莞市",
    value: 825,
    coord: [113.751791, 23.020673],
    baseCount: 5,
  },
  {
    name: "中山市",
    value: 320,
    coord: [113.392601, 22.517212],
    baseCount: 5,
  },
  {
    name: "潮州市",
    value: 264,
    coord: [116.622604, 23.65695],
    baseCount: 5,
  },
  {
    name: "揭阳市",
    value: 605,
    coord: [116.372708, 23.549701],
    baseCount: 5,
  },
  {
    name: "云浮市",
    value: 246,
    coord: [112.044491, 22.915094],
    baseCount: 5,
  },
];
let maxProduce = 0;
onMounted(() => {
  initCharts();
  load();
});
const load = async () => {
  const data = await getProductBaseInfo({
    flag: 2,
  });
  if (data) {
    //统计各城市数据（基地数量和总产量）
    const cityMap = new Map();
    data.forEach((item) => {
      let cityData = cityMap.get(item.city);
      if (!cityData) {
        cityData = {
          name: item.city,
          baseCount: 0,
          value: 0,
          unit: item.outputUnit,
          coord: cityPoints.get(item.city),
        };
      }
      cityData.baseCount++;
      cityData.value += Number(item.annualOutput || 0);
      cityMap.set(item.city, cityData);
    });
    piontdata = data.map((item) => {
      return {
        name: item.region,
        value: item.annualOutput,
        baseName: item.baseName,
        coord: [item.lng, item.lat],
        phone: item.iphoneNumber
          ? item.iphoneNumber.slice(0, 3) + "******" + item.iphoneNumber.slice(9)
          : "无",
        mainProduct: item.mainProduct,
        outputUnit: item.outputUnit,
      };
    });
    pointdataGD = Array.from(cityMap.values());
    // 得出最大产量
    pointdataGD.forEach((item) => {
      maxProduce = Math.max(item.value, maxProduce);
    });
  }
  initCharts();
};

function initCharts() {
  const charts = echarts.init(proxy.$refs.charts);
  const data = [];

  function switchMap(params) {
    const name = params.name;
    if (geoCoordMap[name]) {
      if (params.data) {
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
  }

  charts.on("click", (params) => {
    switchMap(params);
  });

  charts.on("dblclick", () => {
    echarts.registerMap("广东", gdMap);
    option.series[0].map = "广东";
    option.series[0].markPoint.data = switchPiontmap(pointdataGD);
    option.series[0].data = switchPiontmap(pointdataGD);
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
  let seriesdata = [
    //散点图
    {
      type: "map",
      map: "广东",
      // 设置虚拟数据
      data: switchPiontmap(pointdataGD),
      //series[] 类型:scatter 数据
      markPoint: {
        symbolSize: 50,
        tooltip: {
          show: false,
          formatter: function (item) {
            let tipHtml = "";
            if (item.data) {
              tipHtml =
                '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' +
                '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' +
                item.data.baseName +
                "</div>" +
                '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                '<span style="font-size:15px;font-weight:bold;">' +
                "总产量：" +
                item.data.value +
                "吨" +
                "</span>" +
                "</div>" +
                // '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                // '<span style="font-size:15px;font-weight:bold;">' +
                // "上市时间：" +
                // item.data.time +
                // "</span>" +
                // "</div>" +
                '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                '<span style="font-size:15px;font-weight:bold;">' +
                "电话：" +
                item.data.phone +
                "</span>" +
                "</div>" +
                '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                '<span style="font-size:15px;font-weight:bold;">' +
                "生产种类：" +
                item.data.mainProduct +
                "</span>" +
                "</div>" +
                "</div>";
            }

            return tipHtml;
          },
        },
      },
      tooltip: {
        show: true,
        formatter: function (item) {
          let tipHtml = "";
          if (item.data) {
            tipHtml =
              '<div style="background:#fff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' +
              '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#5861a2;text-align:center;margin:0 2px;">' +
              item.data.name +
              "</div>" +
              '<div style="text-align:center;color:#494949;padding:8px 6px">' +
              '<span style="font-size:15px;font-weight:bold;">' +
              "生产基地数目：" +
              item.data.baseCount +
              "</div>" +
              '<div style="text-align:center;color:#494949;padding:8px 6px">' +
              '<span style="font-size:15px;font-weight:bold;">' +
              "生产总量：" +
              item.data.value +
              item.data.unit +
              "</span>" +
              "</div>" +
              "</div>";
          }

          return tipHtml;
        },
      },
      roam: true,
      label: {
        show: true,
      },
    },
  ];

  function opt(max, min, vmp, unit, flag1, flag2) {
    let optn = {
      visualMap: {
        min: min,
        max: max,
        text: [vmp, "单位：" + unit],
        realtime: false,
        calculable: true,
        inRange: {
          color: ["lightskyblue", "yellow", "orangered"],
        },
        textStyle: {
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          color: "#FFF",
        },
        bottom: "20%",
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
  var option = opt(maxProduce || 1350, 0, "总产量", "吨", true, false);
  echarts.registerMap("广东", gdMap);
  charts.setOption(option, true);
}
</script>
