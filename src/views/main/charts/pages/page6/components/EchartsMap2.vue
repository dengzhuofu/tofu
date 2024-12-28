<template>
  <div class="content">
    <div ref="charts" style="width: 750px; height: 450px; margin: 0 auto"></div>
  </div>
</template>

<script>
  import { onMounted, getCurrentInstance } from "vue";
  import * as echarts from "echarts";
  import guangdong from "@/assets/guangdong.json";
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

  export default {
    setup() {
      onMounted(() => {
        const charts = echarts.init(getCurrentInstance().refs.charts);
        initCharts(charts);
        let i = 0;
      });
      const newData = [
        {
          name: "广州市",
          product: 980,
          buy: 554,
        },
        {
          name: "东莞市",
          product: 780,
          buy: 554,
        },
        {
          name: "中山市",
          product: 780,
          buy: 554,
        },
        {
          name: "佛山市",
          product: 780,
          buy: 554,
        },
        {
          name: "深圳市",
          product: 780,
          buy: 554,
        },
        {
          name: "惠州市",
          product: 780,
          buy: 554,
        },
        {
          name: "珠海市",
          product: 780,
          buy: 554,
        },
        {
          name: "清远市",
          product: 780,
          buy: 554,
        },
        {
          name: "韶关市",
          product: 780,
          buy: 554,
        },
        {
          name: "肇庆市",
          product: 780,
          buy: 554,
        },
        {
          name: "云浮市",
          product: 780,
          buy: 554,
        },
        {
          name: "阳江市",
          product: 780,
          buy: 554,
        },
        {
          name: "茂名市",
          product: 780,
          buy: 554,
        },
        {
          name: "湛江市",
          product: 780,
          buy: 554,
        },
        {
          name: "河源市",
          product: 780,
          buy: 554,
        },
        {
          name: "梅州市",
          product: 780,
          buy: 554,
        },
        {
          name: "汕尾市",
          product: 780,
          buy: 554,
        },
        {
          name: "揭阳市",
          product: 780,
          buy: 554,
        },
        {
          name: "汕头市",
          product: 780,
          buy: 554,
        },
        {
          name: "潮州市",
          product: 780,
          buy: 554,
        },
        {
          name: "江门市",
          product: 780,
          buy: 554,
        },
        {
          name: "越秀区",
          product: 920,
          buy: 580,
        },
        {
          name: "荔湾区",
          product: 870,
          buy: 532,
        },
        {
          name: "天河区",
          product: 960,
          buy: 521,
        },
        {
          name: "海珠区",
          product: 1030,
          buy: 650,
        },
        {
          name: "白云区",
          product: 980,
          buy: 606,
        },
        {
          name: "黄埔区",
          product: 950,
          buy: 425,
        },
        {
          name: "番禺区",
          product: 1200,
          buy: 740,
        },
        {
          name: "花都区",
          product: 750,
          buy: 530,
        },
        {
          name: "南沙区",
          product: 890,
          buy: 500,
        },
        {
          name: "增城区",
          product: 1100,
          buy: 840,
        },
        {
          name: "从化区",
          product: 1030,
          buy: 690,
        },
        {
          name: "赤坎区",
          product: 950,
          buy: 610,
        },
        {
          name: "霞山区",
          product: 890,
          buy: 560,
        },
        {
          name: "坡头区",
          product: 1015,
          buy: 671,
        },
        {
          name: "麻章区",
          product: 1060,
          buy: 690,
        },
        {
          name: "遂溪县",
          product: 1020,
          buy: 654,
        },
        {
          name: "徐闻县",
          product: 920,
          buy: 498,
        },
        {
          name: "廉江市",
          product: 1220,
          buy: 820,
        },
        {
          name: "雷州市",
          product: 785,
          buy: 578,
        },
        {
          name: "吴川市",
          product: 913,
          buy: 523,
        },
        {
          name: "茂南区",
          product: 990,
          buy: 640,
        },
        {
          name: "电白区",
          product: 1020,
          buy: 685,
        },
        {
          name: "高州市",
          product: 875,
          buy: 535,
        },
        {
          name: "化州市",
          product: 920,
          buy: 580,
        },
        {
          name: "信宜市",
          product: 1040,
          buy: 718,
        },
        {
          name: "云城区",
          product: 980,
          buy: 620,
        },
        {
          name: "云安区",
          product: 1050,
          buy: 690,
        },
        {
          name: "新兴县",
          product: 910,
          buy: 565,
        },
        {
          name: "郁南县",
          product: 1030,
          buy: 662,
        },
        {
          name: "罗定市",
          product: 990,
          buy: 617,
        },
        {
          name: "江城区",
          product: 940,
          buy: 610,
        },
        {
          name: "阳东区",
          product: 1010,
          buy: 680,
        },
        {
          name: "阳西县",
          product: 970,
          buy: 583,
        },
        {
          name: "阳春市",
          product: 890,
          buy: 600,
        },
        {
          name: "蓬江区",
          product: 1020,
          buy: 640,
        },
        {
          name: "江海区",
          product: 960,
          buy: 670,
        },
        {
          name: "新会区",
          product: 990,
          buy: 653,
        },
        {
          name: "台山市",
          product: 920,
          buy: 590,
        },
        {
          name: "开平市",
          product: 1000,
          buy: 654,
        },
        {
          name: "鹤山市",
          product: 980,
          buy: 630,
        },
        {
          name: "恩平市",
          product: 1040,
          buy: 710,
        },
        {
          name: "香洲区",
          product: 1040,
          buy: 630,
        },
        {
          name: "斗门区",
          product: 975,
          buy: 657,
        },
        {
          name: "金湾区",
          product: 960,
          buy: 610,
        },
      ];

      function initCharts(charts) {
        const data = [];

        const geoCoordMap = {
          广东: guangdong,
          广州市: guangzhou,
          深圳市: shenzhen,
          潮州市: chaozhou,
          惠州市: huizhou,
          珠海市: zhuhai,
          汕头市: shantou,
          中山市: zhongshan,
          东莞市: dongguan,
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
        echarts.registerMap("广东", guangdong);
        charts.setOption(options);

        function switchMap(params) {
          const name = params.name;
          if (geoCoordMap[name]) {
            echarts.registerMap(name, geoCoordMap[name]); //关键是如何用名字来置换地区

            options.series[0].map = name;
            charts.setOption(options);
            // this.render() // 重新渲染地图的方法
          }
        }

        charts.on("click", (params) => {
          switchMap(params);
        });

        charts.on("dblclick", () => {
          echarts.registerMap("广东", guangdong);
          options.series[0].map = "广东";
          charts.setOption(options);
        });
      }

      const options = {
        tooltip: {
          backgroundColor: "",
          trigger: "axis",
        },
        legend: {
          show: false,
        },
        series: [
          {
            tooltip: {
              trigger: "item",
              formatter: function (item) {
                let tipHtml = "";
                tipHtml =
                  '<div style="background:#d3efff;border-radius:10px;padding-top:10px;box-shadow:0 0 10px #666">' +
                  '<div style="color:#fff;height:20px;border-radius:6px;font-size:12px;line-height:20px;background-color:#007700;text-align:center;margin:0 2px;">' +
                  item.data.name +
                  "</div>" +
                  '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                  '<span style="font-size:15px;font-weight:bold;">' +
                  "售出量：" +
                  item.data.product +
                  "吨" +
                  "</span>" +
                  "</div>" +
                  '<div style="text-align:center;color:#494949;padding:8px 6px">' +
                  '<span style="font-size:15px;font-weight:bold;">' +
                  "购买量：" +
                  item.data.buy +
                  "吨" +
                  "</span>" +
                  "</div>" +
                  "</div>";
                return tipHtml;
              },
            },
            name: "广东省数据",
            type: "map",
            map: "广东", // 自定义扩展图表类型
            aspectScale: 1,
            zoom: 0.65, //缩放
            showLegendSymbol: false,
            label: {
              normal: {
                show: true,
                color: "#ff5168",
                fontSize: 17,
              },
              emphasis: {
                show: true,
                color: "#ff9127",
                fontSize: 17,
              },
            },
            itemStyle: {
              normal: {
                areaColor: {
                  type: "linear-gradient",
                  x: 0,
                  y: 300,
                  x2: 0,
                  y2: 0,
                  global: true, // 缺省为 false
                },
                borderColor: "#ff45cb",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: {
                  type: "linear-gradient",
                  x: 0,
                  y: 300,
                  x2: 0,
                  y2: 0,
                  global: true, // 缺省为 false
                },
              },
            },
            layoutCenter: ["50%", "50%"],
            layoutSize: "180%",
            markPoint: {
              symbol: "none",
            },
            data: newData,
          },
          {
            tooltip: {
              show: true,
            },
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              brushType: "stroke",
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  global: false, // 缺省为 false
                },
              },
            },
            label: {
              normal: {
                color: "#fff",
              },
            },
            symbol: "circle",
            symbolSize: 18,
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              normal: {
                show: true,
                position: [1, 0, 0, 0],
                backgroundColor: "rgba(0,2,89,.75)",
                padding: [0, 0],
                borderRadius: [0, 3, 3, 0],
                lineHeight: 28,
                color: "#ffffff",
                rich: {
                  fline: {
                    padding: [0, 5, 0, 10],
                    color: "#ffffff",
                    fontSize: 16,
                  },
                  tline: {
                    padding: [0, 10, 0, 5],
                    color: "#ffffff",
                    fontSize: 16,
                  },
                },
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              color: "#00FFF6",
            },
            symbol: "rect",
            symbolSize: [1, 50],
            z: 999,
          },
        ],
      };
    },
  };
</script>
<style scoped>
  .content {
    /* background-color: #0e2152; */
    margin-top: 10px;
    height: 100%;
  }
</style>
