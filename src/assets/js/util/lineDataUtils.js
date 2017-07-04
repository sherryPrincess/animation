import * as api from '../../../store/api'

export const getParams = (points, val) => {
  let filter = 'BLOCK_ID IN ('
  points.forEach(ele => {
    if (ele['monitorType'] === val) {
      filter += "'" + ele['id'] +"'"
    }
  })
  filter = filter + ')'
  let params = {
    layerName: 'V_SYSDATE_BLOCKLINE',
    filter: filter
  }
  config.Maps.removeFeatureByLayerName('hightBlockLegend')
  api.getRoadGeometry(params).then(res => {
    if (res['data']['data'] && res['data']['data']['features'].length > 0) {
      config.Maps.addPolylines(res['data']['data']['features'], {
        layerName: 'hightBlockLegend',
        showStyle: true,
        style: {
          width: 6, color: '#FF0000'
        },
        selectStyle: {
          width: 4, color: '#0000EE'
        }
      })
    }
  })
}