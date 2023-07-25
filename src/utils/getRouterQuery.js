import { ref } from 'vue';
export function useRouterQuery() {
  let params = new URLSearchParams(document.location.search);
  let station = ref(params.get('station'));
  return { station };
}
