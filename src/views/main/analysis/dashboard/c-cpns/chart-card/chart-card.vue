<template>
  <div class="chart-card">
    <el-card class="box-card">
      <div class="card-header">
        <span>{{ header }}</span>
        <span class="more-link" @click="goBigCharts()">更多>></span>
      </div>
      <div class="divider"></div>
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface IProps {
  header?: string
}

withDefaults(defineProps<IProps>(), {
  header: '标题'
})
const router = useRouter()
const goBigCharts = () => {
  router.push('/charts/chartOne')
}
</script>

<style lang="less" scoped>
.chart-card {
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.more-link {
  cursor: pointer;
  color: #999;
}
.divider {
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
