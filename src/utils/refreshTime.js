import { ref } from 'vue';
export function useRefreshTime() {
  let timer = ref(null);
  //300000ms = 5 mins
  const refreshTime = 1000;
  return { timer, refreshTime };
}
export function useRefreshSecondTime() {
  let secTimer = ref(null);

  //1000ms = 1 sec
  const secRefreshTime = 1000;

  return { secTimer, secRefreshTime };
}
