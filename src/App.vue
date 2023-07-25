<template>
  <div ref="barContainer" class="container"></div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { getBarData } from '@/api/barChart.js';
import { useRefreshTime } from '@/utils/refreshTime.js';
import useBar from '@/composable/useBar.js';

let barData = ref('');

const barContainer = ref(null);

function barChartFn() {
  const { setOption, resize } = useBar(barContainer.value);
  setOption(barData.value);
  window.addEventListener('resize', () => {
    resize();
  });
}

// 取得 api
async function getAsyncDataAPI() {
  // 取得 Bar Chart api
  try {
    const newBarData = await getBarData();

    barData.length = 0;
    barData.value = newBarData.data;
  } catch (err) {
    console.log('err:', err);
  }
}

let { timer, refreshTime } = useRefreshTime();

onMounted(async () => {
  const getAPI = async () => {
    getAsyncDataAPI();

    barChartFn();

    // 刷新資料
    clearInterval(timer);
    timer = setInterval(async () => {
      getAPI();
    }, refreshTime);
  };
  await getAPI();
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
}
</style>
