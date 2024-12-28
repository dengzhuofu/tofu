<template>
  <div class="home-container">
    <el-row :gutter="24">
      <el-col :span="6">
        <box-container class="one"></box-container>
      </el-col>
      <el-col :span="6">
        <box-container class="two"></box-container>
      </el-col>

      <el-col :span="7">
        <box-container></box-container>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import { ZRow, ZCol } from '../../../../../utils/components'
// import weather from './components/weather.vue'
import boxContainer from '../../components/boxContainer/index.vue'
// import MapEchart from './components/map-echart.vue'
// import EchartsMap from './components/EchartsMap.vue'
// import LineEchart2 from './components/line-echart2.vue'
// import lineEchart5 from './components/line-echart5.vue'
// import TableChart1 from './components/TableChart1.vue'
// import TableChart2 from './components/TableChart2.vue'
// import pieView3D from './components/3Dview.vue'
// import BarEchart2 from './components/bar-chart2.vue'
// import LineEchart6 from './components/line-echart6.vue'
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  margin: 0 auto;
  height: 93%;
  position: fixed;

  .one {
    height: 700px;
  }
}
</style>
