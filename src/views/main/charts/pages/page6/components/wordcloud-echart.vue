<template>
  <div>
    <div class="title1"> 高频词汇: </div>
    <div class="content"> <div ref="charts" style="width: 400px; height: 250px"></div> </div
  ></div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
import { getWordList } from "@/api/new";
import {useRouter} from "vue-router"
const router = useRouter()
const { proxy } = getCurrentInstance();
let jsonlist = [];
onMounted(() => {
  load();
});
const load = async () => {
  const data = await getWordList({ type: 0, flag: 2 });
  jsonlist = data.map((item) => {
    return { name: item.name, value: item.count };
  });
  initCharts();
};
function initCharts() {
  const charts = echarts.init(proxy.$refs.charts);
  const option = {
    // 数据可以点击
    tooltip: {
      show: true,
      borderColor: "#fe9a8bb3",
      borderWidth: 1,
      padding: [10, 15, 10, 15],
      confine: true,
      backgroundColor: "rgba(255, 255, 255, .95)",
      textStyle: {
        color: "",
        lineHeight: 22,
      },
      extraCssText: "box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;",
    },
    series: [
      {
        // 词的类型
        type: "wordCloud",
        // 设置字符大小范围
        sizeRange: [14, 30],
        rotationRange: [-30, 0, 30],
        textStyle: {
          // 生成随机的字体颜色
          color: function () {
            return (
              "rgb(" +
              [
                Math.round(Math.random() * 50 + 205),
                Math.round(Math.random() * 105 + 150),
                Math.round(Math.random() * 255),
              ].join(",") +
              ")"
            );
          },
        },
        // 不要忘记调用数据
        data: jsonlist,
      },
    ],
  };
  charts.setOption(option);
  // 点击跳转
  charts.on("click", (params) => {
    router.push({
      path: "/moreDetail",
      query: {
        key: params.name,
      },
    });
  });
}
</script>
<style scoped>
.title1 {
  color: #17f7ffaf;
  font-size: 28px;
  margin-left: -320px;
  font-weight: 800;
}
.content {
  margin-top: -10px;
  height: 100%;
}
</style>
