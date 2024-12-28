<template>
  <div class="main-header">
    <div class="menu-content">
      <div class="menu-icon" @click="handleMenuIconClick">
        <el-icon size="28px" style="margin-left: 20px">
          <component :is="isFold ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
      <div class="content">
        <header-crumb />
        <header-info />
      </div>
    </div>

    <!-- <div class="tab">
      <header-tab />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
// import HeaderTab from './c-cpns/header-tab.vue'

// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

// 1.记录状态
const isFold = ref(false)
function handleMenuIconClick() {
  // 1.内部改变状态
  isFold.value = !isFold.value

  // 2.将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 7px 6px rgba(0, 0, 0, 0.2);

  .menu-content {
    display: flex;
    align-items: center;
  }

  .menu-icon {
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }

  .tab {
    display: flex;
    justify-content: center;
  }
}
</style>
