<template>
  <div class="weather">
    <div id="he-plugin-standard"></div>
  </div>
</template>
<script>
import { onMounted, defineComponent } from 'vue'
window.WIDGET = {
  "CONFIG": {
    "layout": "2",
    "width": "200",
    "height": "200",
    "background": "5",
    "dataColor": "FFFFFF",
    "borderRadius": "5",
    "language": "zh",
    "key": "fc6cd73f93eb46008f5d15eb669ebdde"
  }
};
export default defineComponent({
  setup () {
    onMounted(() => {
      weather()
    }
    );
    const weather = () => {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src =
        "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      document.body.appendChild(s);
    };
    return {};
  }
})
</script>
<style scoped>
.weather {
  width: 80px;
  height: 40px;
}
</style>