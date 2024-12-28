<template>
  <div class="content">
    <div
      ref="charts"
      style="width: 380px; height: 400px; left: 80px; bottom: 30px"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
import guangdong from '@/assets/guangdong.json'
import { getProvinceSupplyData } from '@/api/supply'
const { proxy } = getCurrentInstance()
const geoCoordMap = {
  广州市: [113.507649675, 23.3200491021],
  东莞市: [113.863433991, 22.9430238154],
  中山市: [113.422060021, 22.5451775145],
  云浮市: [111.750945959, 22.9379756855],
  佛山市: [113.034025635, 23.0350948405],
  惠州市: [114.41065808, 23.1135398524],
  揭阳市: [116.079500855, 23.3479994669],
  梅州市: [116.126403098, 24.304570606],
  汕头市: [116.588650288, 23.2839084533],
  汕尾市: [115.572924289, 22.9787305002],
  江门市: [112.678125341, 22.2751167835],
  河源市: [114.913721476, 23.9572508505],
  深圳市: [114.025973657, 22.5960535462],
  清远市: [113.040773349, 23.9984685504],
  湛江市: [110.165067263, 21.2574631038],
  潮州市: [116.830075991, 23.7618116765],
  珠海市: [113.262447026, 22.1369146461],
  肇庆市: [112.37965337, 23.5786632829],
  茂名市: [110.931245331, 21.9682257188],
  阳江市: [111.777009756, 21.9715173045],
  韶关市: [113.594461107, 24.8029603119]
}
let customerBatteryCityData = [
  { name: '阳江市', value: 70 },
  { name: '茂名市', value: 20 }
  // { name: "广州市", value: 70 },
  // { name: "河源市", value: 70 },
  // { name: "湛江市", value: 120 },
  // { name: "潮州市", value: 70 },
  // { name: "东莞市", value: 70 },
  // { name: "深圳市", value: 0 },
  // { name: "清远市", value: 70 },
  // { name: "韶关市", value: 10 },
  // { name: "云浮市", value: 70 },
  // { name: "惠州市", value: 150 },
  // { name: "汕头市", value: 60 },
  // { name: "揭阳市", value: 80 },
  // { name: "中山市", value: 70 },
  // { name: "肇庆市", value: 70 },
  // { name: "珠海市", value: 120 },
  // { name: "汕尾市", value: 0 },
  // { name: "江门市", value: 70 },
  // { name: "梅州市", value: 70 },
  // { name: "佛山市", value: 10 },
]
onMounted(() => {
  initCharts()
  load()
})
const load = async () => {
  const data = await getProvinceSupplyData({
    flag: 2
  })
  if (data) {
    // 统计城市数据
    const cityMap = new Map()
    data.forEach((item) => {
      let cityData = cityMap.get(item.city)
      if (!cityData) {
        cityData = {
          name: item.city,
          value: 0,
          unit: item.unit,
          productMap: new Map()
        }
      }
      //基地供应总值
      let baseSupply = 0
      item.productSupply.forEach((productData) => {
        //城市产品的供应值
        let productSupply = cityData.productMap.get(productData.product)
        if (!productSupply) {
          productSupply = 0
        }
        productSupply += Number(productData.supply)
        cityData.productMap.set(productData.product, productSupply)
        //统计总供应值
        baseSupply += Number(productData.supply)
      })
      cityData.value += baseSupply
      cityMap.set(item.name, cityData)
    })
    customerBatteryCityData = Array.from(cityMap.values())
    //将城市的产品Map转为数组
    customerBatteryCityData.forEach((item) => {
      item.list = Array.from(item.productMap.entries()).map((item) => {
        return { product: item[0], supply: item[1] }
      })
    })
    initCharts()
  }
}
function initCharts() {
  const charts = echarts.init(proxy.$refs.charts)
  const option = {
    backgroundColor: 'rgba(0,0,0,0)',
    title: {
      text: '',
      x: 'center',
      y: 'top',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    tooltip: {
      trigger: 'item',
      show: true,
      enterable: true,
      backgroundColor: '#FFF',
      textStyle: {
        backgroundColor: 'rgba(0,99,0,0.8)'
      },
      formatter: function (item) {
        let tipHtml = ''
        if (item.data) {
          tipHtml = `城市：${item.name}<br>供应总值：${item.value} ${item.data.unit}<br>`
          item.data.list.forEach((item2) => {
            tipHtml +=
              item2.product +
              ': ' +
              item2.supply +
              ' ' +
              item.data.unit +
              '<br>'
          })
        }
        return tipHtml
      }
    },
    geo: [
      {
        map: 'guangdong',
        aspectScale: 1,
        layoutSize: '100%',
        layoutCenter: ['50%', '40%'],
        itemStyle: {
          areaColor: '#0E95F1',
          borderColor: '#e9e9e9',
          borderWidth: 1,
          shadowColor: '#0E95F1',
          shadowBlur: 20
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
            fontSize: 10
          },
          itemStyle: {
            areaColor: '#FFD181',
            borderColor: '#fff',
            borderWidth: 1
          }
        },
        zlevel: 3
      }
    ],
    series: [
      {
        geoIndex: 0,
        // coordinateSystem: 'geo',
        showLegendSymbol: true,
        type: 'map',
        label: {
          show: true,
          color: '#fff',
          fontSize: 10
        },
        itemStyle: {
          borderColor: '#2ab8ff',
          borderWidth: 1.1,
          areaColor: '#12235c',
          emphasis: {
            areaColor: '#2AB8FF',
            borderWidth: 0,
            color: 'red'
          }
        },
        map: 'guangdong', // 使用
        data: customerBatteryCityData
      },
      {
        type: 'lines',
        zlevel: 5,
        effect: {
          show: false,
          // period: 4, //箭头指向速度，值越小速度越快
          // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          // symbol: 'arrow', //箭头图标
          // symbol: imgDatUrl,
          symbolSize: 5 // 图标大小
        },
        lineStyle: {
          width: 17, // 尾迹线条宽度
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgb(199,145,41)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgb(199,145,41)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgb(223,176,32)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgb(223,176,32)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgb(199,145,41)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          opacity: 1, // 尾迹线条透明度
          curveness: 0 // 尾迹线条曲直度
        },
        label: {
          show: 0,
          position: 'end',
          formatter: '245'
        },
        silent: true
        // data: lineData(),
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 5,
        label: {
          show: false,
          position: 'bottom',
          formatter: (params) => this.data[params.dataIndex].value,
          padding: [4, 8],
          backgroundColor: '#003F5E',
          borderRadius: 5,
          borderColor: '#67F0EF',
          borderWidth: 1,
          color: '#67F0EF'
        },
        symbol: 'diamond',
        symbolSize: [17, 8],
        itemStyle: {
          //柱子顶
          color: '#ffd133',
          opacity: 1
        },
        silent: true
        // data: scatterData(),
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 4,
        label: {
          formatter: '{b}',
          position: 'bottom',
          color: '#fff',
          fontSize: 12,
          distance: 10,
          show: true
        },
        symbol: 'diamond',
        symbolSize: [17, 8],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgb(199,145,41)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgb(199,145,41)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgb(223,176,32)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgb(223,176,32)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgb(199,145,41)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          opacity: 1
        },
        silent: true,
        data: scatterData2()
      }
    ]
  }
  // 注册地图，key为option中设置的，value为地图数据
  echarts.registerMap('guangdong', guangdong)
  charts.setOption(option)
}

// 柱状体的底部
function scatterData2() {
  return customerBatteryCityData.map((item) => {
    return {
      name: item.name,
      value: geoCoordMap[item.name]
    }
  })
}
</script>
<style scoped></style>
