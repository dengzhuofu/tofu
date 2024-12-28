<template>
  <div class="home-container">
    <z-row>
      <z-col class="echartList" :span="6">
        <div class="chart-item" style="height: 28%; margin: 5px">
          <box-container :boxTitle="'广东省柑橘行情分析'">
            <!-- <mapChart1 /> -->
          </box-container>
        </div>
        <div class="chart-item" style="height: 28%; margin: 5px">
          <box-container :boxTitle="'柑橘各品种供需形势'">
            <!-- <BarChart4 /> -->
          </box-container>
        </div>
        <div class="chart-item" style="height: 28%; margin: 5px">
          <box-container :boxTitle="'柑橘舆情分析'">
            <!-- <WordCloud /> -->
          </box-container>
        </div>
      </z-col>
      <z-col class="echartList" :span="10">
        <div class="chart-item" style="height: 44.5%; margin: 5px">
          <box-container :boxTitle="'广东省柑橘采购导图'">
            <!-- <MapEChart /> -->
          </box-container>
        </div>
        <div class="chart-item" style="height: 44.5%; margin: 5px">
          <box-container :boxTitle="'全国柑橘产销地分布'">
            <!-- <MapEchart2 /> -->
          </box-container>
        </div>
      </z-col>
      <z-col class="echartList" :span="7">
        <div class="chart-item" style="height: 28%; margin: 5px">
          <box-container :boxTitle="'柑橘主要城市表现力'">
            <!-- <lineChart /> -->
          </box-container>
        </div>
        <div class="chart-item" style="height: 61%; margin: 5px">
          <box-container :boxTitle="'柑橘销售城市排行'">
            <!-- <BarChart7 /> -->
          </box-container>
        </div>
      </z-col>
    </z-row>
  </div>
</template>

<script setup>
import { ZRow, ZCol } from '../../../../../utils/components'
import boxContainer from '../../components/boxContainer/index.vue'
// import BarChart4 from './components/bar-chart4.vue'
// import WordCloud from './components/wordcloud-echart.vue'
// import mapChart1 from './components/mapchart.vue'
// import lineChart from './components/lineChart2.vue'
// import MapEChart from './components/map-echart.vue'
// import MapEchart2 from './components/map-echart2.vue'
// import BarChart7 from './components/bar-chart7.vue'
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  height: 93%;
  position: fixed;

  .echartList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    .chart-item {
      height: 32%;
      width: 100%;
    }
  }
}
</style>
