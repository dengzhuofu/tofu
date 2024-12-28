<template>
  <div class="app-container" ref="drawDom">
    <nav-bar />
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, onBeforeUnmount, ref } from 'vue'

import { useDrawToVue3 } from '@yangtaowei/b-s-adaption/dist/index.esm.js'
import navBar from './components/navBar.vue'
let drawDom = ref(null)
const { calcRate, resize } = useDrawToVue3(drawDom, {
  baseWidth: 1920,
  baseHeight: 1080
})
onMounted(() => {
  calcRate()
  window.addEventListener('resize', resize, false)
  const container = drawDom.value
  if (container) {
    container.style.overflow = 'hidden'
  }
})
onBeforeUnmount(() => window.removeEventListener('resize', resize, false))
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(15, 15, 15);
  background-blend-mode: lighten;
  background-size: cover;
  background-position: center;

  .main-container {
    height: calc(100% - 65px);
    box-sizing: border-box;
    padding-bottom: 10px;
    width: 100%;
    height: 100%;
  }
}

::-webkit-scrollbar {
  display: none;
}
.app-container::after {
  background: url('@/assets/chart//bg2.png') no-repeat center center;
  opacity: 0.5;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-blend-mode: lighten;
  background-size: cover;
  background-position: center;
  z-index: -1; /*-1 可以当背景*/
  -webkit-filter: blur(5px);
  filter: blur(5px);
}
</style>
