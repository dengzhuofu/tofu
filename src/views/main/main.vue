<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header
          height="100px"
          style="margin-top: 10px; z-index: 10; background-color: transparent"
        >
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main :style="{ '--el-main-padding': '20px' }">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'

// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    margin: 10px;
    border-radius: 40px;
    box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2), 15px 0px 12px rgba(0, 0, 0, 0.3);
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-header {
    margin-left: 20px;
  }
  .el-main {
    background-color: transparent;
    margin-left: 20px;
  }
}
</style>
