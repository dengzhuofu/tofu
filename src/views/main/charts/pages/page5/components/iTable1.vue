<template>
  <div class="tableCom">
    <div class="tableHead">
      <div class="tableHeadItem" v-for="(item, index) in head" :key="index" :style="{ flex: item.flex }">
        {{ item.title }}
      </div>
    </div>
    <Vue3SeamlessScroll :step="0.5" :wheel="true" :hover="true" :list="list" class="tableBody">
      <div class="tableBody2" v-for="(item, index) in list" :key="index">
        <div class="tableBody2Item" :style="{ flex: head[0].flex }">
          <span class="num">{{ item.recordDate }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[1].flex }">
          <span class="num">{{ item.name }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[2].flex }">
          <span class="num">{{ item.market }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[3].flex }">
          <span class="num">{{ item.averagePrice }}</span>
        </div>
        <div class="tableBody2Item" :style="{ flex: head[4].flex }">
          <span class="num">{{ item.unit }}</span>
        </div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

export default {
  name: "tableCom",
  components: { Vue3SeamlessScroll },
  props: {
    head: {
      type: Array,
      default () {
        return [
          {
            title: "时间",
            flex: 1,
          },
          {
            title: "产品",
            flex: 0.8
          },
          {
            title: "批发市场",
            flex: 2,
          },
          {
            title: "平均价格",
            flex: 0.8,
          },
          {
            title: "单位",
            flex: 0.8
          }
        ];
      },
    },
    list: {
      type: Array,
      default () {
        return [];
      },
    },
  },
  data () {
    return {};
  },
  watch: {},
  mounted () { },
  methods: {},
};
</script>

<style lang="scss" scoped>
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
      color: #ffffff;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;
      padding-left: 15px;
      flex: 1;
    }


  }

  .tableBody {
    position: relative;
    height: calc(100% - 34px);
    overflow: hidden;

    .tableBody2 {
      min-height: 34px;
      padding-top: 5px;
      padding-bottom: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: row;

      .tableBody2Item {
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #eef2f6;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: row;
        padding-left: 15px;


      }
    }

    .tableBody2:nth-child(2n) {
      background: #0000AA22
    }
  }
}
</style>
