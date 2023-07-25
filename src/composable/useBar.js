// 按需引入
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  GridComponent,
]);

const useBar = (element) => {
  // 初始化，傳入HTML element
  const barChart = echarts.init(element);

  // 封裝相關參數依需求訂製
  const setOption = (data) => {
    const option = {
      legend: {
        orient: 'horizontal',
        align: 'left',
        left: '160',
        top: '10',
        itemGap: 25,
        itemHeight: 12,
        pageTextStyle: { fontWeight: '700' },
      },

      // tooltip 圖表提示框
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross', // 坐標軸指示器
        },
        textStyle: {
          fontWeight: '500',
          color: '#000000',
        },

        formatter: (params) => {
          let template = `<div class="font-bold text-left"><div class=" flex justify-start pl-5px text-base">${params[0].axisValueLabel}</div>`;
          params.forEach((d) => {
            template += `<div class=" font-normal flex items-center w-full mt-1 mb-1"><div class="w-15px h-8px ml-8px mr-8px" style="background-color:${
              d.color
            }"></div><div> ${
              d.seriesName
            }</div> :<span class="font-bold ml-8px"> ${
              d.data[d.seriesIndex + 1]
            }</span></div>`;
          });
          template += `</div>`;
          return template;
        },
      },

      grid: {
        left: '10px',
        right: '10px',
        bottom: '0px',
        top: '80px',
        containLabel: true,
      },
      dataset: {
        source: data.source,
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          boundaryGap: ['20%', '20%'],
          axisLine: {
            lineStyle: { color: '#CCCCCC', width: '0.5', type: 'solid' },
          },
          axisLabel: {
            margin: 8, // 刻度標籤與軸線之間的距離
            color: '#000000',
          },
        },
      ],
      yAxis: {
        name: '次數',
        nameTextStyle: {
          fontWeight: 'bolder',
          verticalAlign: 'bottom',
          align: 'right', // 文字水平對齊方式，默認自動
          color: '#000000',
        },
        nameGap: 20, //坐標軸名稱與軸線之間的距離
        axisLine: {
          show: true,
          lineStyle: { color: '#CCCCCC', width: '0.5', type: 'solid' },
        },
        axisLabel: {
          margin: 8, // 刻度標籤與軸線之間的距離
          color: '#000000',
        },
      },
      title: {
        text: '每週使用量分析', // 每週使用量分析
        top: '10',
        textStyle: { fontWeight: '700' },
      },
      // series: chartData.series,

      series: data.series,
    };
    return barChart.setOption(option);
  };

  // 封裝resize，RWD會使用到
  const resize = () => barChart.resize();

  return { setOption, resize };
};

export default useBar;
