import * as api from '../../../store/api'

/**
 * 获取查询参数
 * @param params
 * @returns {{}}
 */
export const getParams = params => {
  let where = 'BLOCK_ID IN (';
  if (params['points'] && params['points'] instanceof Array && params['points'].length > 0) {
    params['points'].forEach(ele => {
      if (ele['id'] && ele['id'] !== '') {
        where += '\'' + ele['id'] + '\','
      }
    })
    where = where.substring(0, where.length - 1) + ')'
  }
  let param = {
    where: (where != '') ? where : params['where'],
    geometryType: 'esriGeometryEnvelope',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: '*',
    returnTrueCurves: false,
    returnGeometry: true,
    returnIdsOnly: false,
    returnCountOnly: false,
    returnZ: false,
    returnM: false,
    returnDistinctValues: false,
    f: 'pjson'
  };
  return param
}
/**
 * 获取相关路线
 * @param items
 */
export const getLines = items => {
  let params = getParams(items)
  api.getAliasLineGeometry(params).then(res => {
    let lines = res;
    if (lines) {
      lines = lines.map(ele => {
        if (ele['attributes'] && ele['attributes']['BLOCK_ID']) {
          ele['attributes']['id'] = ele['attributes']['BLOCK_ID'] + 'line'
        }
        return ele
      })
      if (lines && lines && lines.length > 0) {
        config.Maps.addPolylines(lines, {
          layerName: 'blockLegend',
          showStyle: true,
          selectable: true
        })
      }
    }
  })
}

/**
 *
 * @param layerConfig
 */
export const loadArcgisImages = layerConfig => {
  let params = {};
  if (layerConfig['value'] && layerConfig['value'] != '') {
    params[layerConfig['fields']] = layerConfig['value']
  }
  let source = new ol.source.TileArcGISRest({
    url: layerConfig['layerUrl'],
    params: params,
    wrapX: false
  });
  let layer = new ol.layer.Tile({
    layerName: layerConfig['layerName'],
    isImage: true,
    source: source
  });
  if (layer) {
    config.Maps.map.addLayer(layer);
  }
}

export const getArcgisImagesParams = params => {
  let _params = {

  }
  return _params
}