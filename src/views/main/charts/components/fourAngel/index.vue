<template>
  <div class="four-container">
    <div class="fourBorder border1"></div>
    <div class="fourBorder border2"></div>
    <div class="fourBorder border3"></div>
    <div class="fourBorder border4"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fourAngel'
}
</script>

<style lang="less" scoped>
.four-container {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  background: rgba(149, 192, 198, 0.221);
  box-shadow: 1px 1px 16px rgb(8, 51, 120) inset;
  .fourBorder {
    position: absolute;
    width: 100px;
    height: 50px;
  }

  .border1 {
    left: -1px;
    top: -1px;
    border-left: 3px solid rgb(238, 72, 102);
    border-top: 3px solid rgb(238, 72, 102);
  }

  .border2 {
    right: -1px;
    top: -1px;
    border-right: 3px solid rgb(204, 204, 214);
    border-top: 3px solid rgb(204, 204, 214);
  }

  .border3 {
    left: -1px;
    bottom: -1px;
    border-left: 3px solid rgb(204, 204, 214);
    border-bottom: 3px solid rgb(204, 204, 214);
  }

  .border4 {
    right: -1px;
    bottom: -1px;
    border-right: 3px solid rgb(238, 72, 102);
    border-bottom: 3px solid rgb(238, 72, 102);
  }
}
</style>
