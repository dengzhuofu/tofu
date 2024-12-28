<template>
  <div class="timeBodys2">
    <iTable :list="list"></iTable>
  </div>
</template>
<script>
import iTable from "./iTable1.vue";
import { getToday } from "@/utils/string"
import { getMarketList } from "@/api/productPrice"
export default {
  type: "title",
  data () {
    return {
      list: [],
    };
  },
  methods: {
    async load (time) {
      const data = await getMarketList({
        flag: 2,
        startTime: getToday(time),
      })
      if (data && data.length > 0) {
        this.list = data
      } else {
        this.load(time - 1)
      }
    }
  },
  mounted () {
    this.load(0)
  },
  components: { iTable },
};
</script>
<style lang="scss" scoped></style>
