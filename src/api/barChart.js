import service from '@/utils/request'
import { useRouterQuery } from '@/utils/getRouterQuery.js'
export function getBarData() {
  const { station } = useRouterQuery()
  return service({
    url: `${window.apiConfig.baseURL}/report/usageRate/weekly/${station.value}}`,
    method: 'get',
    // params: query,
  })
}
