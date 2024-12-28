<template>
  <div class="header">
    <div class="title">柑橘大数据平台</div>
    <div class="navList">
      <button
        class="button type1"
        v-for="(navItem, index) in navList"
        :key="index"
        @click="nav(navItem.path)"
      >
        {{ navItem.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const curPath = ref('')
const navList = ref([
  {
    title: '返回',
    path: '/main'
  },
  { title: '云图一', path: '/charts/chartOne' },
  {
    title: '云图二',
    path: '/charts/chartTwo'
  }
  // {
  //   title: "页面三",
  //   path: "/charts/ganju3",
  // },
])
const nav = (path) => {
  curPath.value = path
  router.replace(path)
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  margin: 0 auto;
  height: 80px;
  box-sizing: border-box;
  position: relative;
  padding-top: 13px;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  letter-spacing: 3px;
  margin-bottom: -10px;
  background: url('@/assets/chart/nav.png') no-repeat center top;
}
.return {
  position: absolute;
  top: 0%;
  left: 5%;
}
.navList {
  position: absolute;
  top: 14%;
  right: 1%;
}

.button {
  position: relative;
  padding: 0.2em 1.3em;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  margin: 0em 0.8em;
}
.button.type1 {
  font-weight: bold;
  color: #00ffff;
}
.button.type1.type1::after,
.button.type1.type1::before {
  content: '';
  display: block;
  position: absolute;
  width: 20%;
  height: 20%;
  border: 2px solid;
  transition: all 0.6s ease;
  border-radius: 2px;
}
.button.type1.type1::after {
  bottom: 0;
  right: 0;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: #00ffff;
  border-right-color: #00ffff;
}
.button.type1.type1::before {
  top: 0;
  left: 0;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-top-color: #00ffff;
  border-left-color: #00ffff;
}
.button.type1.type1:hover:after,
.button.type1.type1:hover:before {
  width: 100%;
  height: 100%;
}
</style>
