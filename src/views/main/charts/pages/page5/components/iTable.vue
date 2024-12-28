<template>
  <div class="tableCom">
    <div class="tableHead">
      <div
        class="tableHeadItem"
        v-for="(item, index) in head"
        :key="index"
        :style="{ flex: item.flex }"
      >
        {{ item.title }}
      </div>
    </div>
    <Vue3SeamlessScroll
      :step="0.5"
      :wheel="true"
      :hover="true"
      :list="list"
      class="tableBody"
    >
      <div class="tableBody2" v-for="(item, index) in list" :key="index">
        <div class="tableBody2Item" :style="{ flex: head[0].flex }">
          <div class="index1">{{ item.time }}</div>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[1].flex }">
          <span class="num">{{ item.product }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[1].flex }">
          <span class="num">{{ item.region }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[2].flex }">
          <span class="num">{{ item.price }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[3].flex }">
          <span
            class="time2"
            :style="{
              color: item.lifting && item.lifting < 0 ? '#00FF00' : 'white'
            }"
            >{{ item.lifting || '-' }}</span
          >
        </div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

export default {
  name: 'tableCom',
  components: { Vue3SeamlessScroll },
  props: {
    head: {
      type: Array,
      default() {
        return [
          {
            title: '时间',
            flex: 1
          },
          {
            title: '品种',
            flex: 1
          },
          {
            title: '地区',
            flex: 1
          },
          {
            title: '价格(元/斤)',
            flex: 1
          },
          {
            title: '涨幅',
            flex: 1
          }
        ]
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.tableCom {
  width: calc(100% - 0px);
  margin-left: 0px;
  position: relative;
  height: 100%;
  overflow: hidden;

  .tableHead {
    width: 100%;
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;

    .tableHeadItem {
      font-size: 18px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: rgb(255, 255, 253);
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      padding-left: 15px;
    }
  }

  .tableBody {
    width: 100%;
    position: relative;
    height: calc(100% - 34px);
    overflow: hidden;

    .tableBody2 {
      min-height: 34px;
      padding-top: 5px;
      padding-bottom: 5px;
      background: rgba(96, 137, 169, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;

      .tableBody2Item {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        padding-left: 15px;
      }
    }

    .tableBody2:nth-child(2n) {
      background: rgba(#8c7f96, 0.3);
      color: 007700;
    }
  }
}
</style>
