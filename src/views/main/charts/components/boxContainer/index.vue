<template>
  <div class="box-container">
    <four-angel>
      <div class="title-wrapper">
        <div class="boxTitle">
          {{ props.boxTitle }}
          <div class="image">
            <img src="@/assets/chart/icon-wave.gif" alt="Image" />
          </div>
        </div>
      </div>
      <div class="content-wrapper" :style="contentWrapperStyle">
        <div class="main-content">
          <slot></slot>
        </div>
      </div>
    </four-angel>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import fourAngel from '../fourAngel/index.vue'

const props = defineProps({
  boxTitle: {
    type: String,
    default: ''
  },
  isHidden: {
    type: Boolean,
    default: false
  }
})

const overflowVisible = ref(props.isHidden)

const contentWrapperStyle = `height: calc(100% - 28px); overflow: ${
  overflowVisible.value ? 'hidden' : 'visible'
};`
</script>
<style lang="less" scoped>
.box-container {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 50px;
  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    .boxTitle {
      height: 28px;
      line-height: 40px;
      width: 100%;
      font-size: 1.1rem;
      // color: #b3efff;
      color: #fff;
      font-weight: bold;

      position: absolute;
      top: -40px;
      left: 0;
      // text-align: left;
      display: flex;
      .image {
        /* 图片容器样式 */

        display: flex;
        align-items: flex-start;
        img {
          /* 图片样式 */
          position: absolute;
          right: 0;
          max-width: 100%;
          max-height: 100%;
          margin-top: 15px;
        }
      }
    }
  }
  .content-wrapper {
    padding: 10px;
    .main-content {
      height: calc(100% - 28px);
      width: 100%;
    }
  }
}
</style>
