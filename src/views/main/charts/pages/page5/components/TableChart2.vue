<template>
  <div class="itemBodys2">
    <iTable :list="list"></iTable>
  </div>
</template>

<script setup>
import iTable from "./iTable.vue";
import { getPriceList } from "@/api/productPrice"
import { onMounted, ref } from "@vue/runtime-core";
import { getToday } from '@/utils/string'

const list = ref([]);
onMounted(() => {
  load(0)
})
const load = async (time) => {
  const data = await getPriceList({
    flag:2,
    startTime:getToday(time)
  })
  if (data && data.length > 0) {
    list.value = data
  } else {
    load(time-1)
  }
}
</script>
<style lang="scss" scoped>
.itemBodys2 {
  position: relative;
  width: 100%;
  color: rgb(255, 255, 253);
}
</style>
