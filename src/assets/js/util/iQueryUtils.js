/**
 * Created by FDD on 2017/1/16.
 */
import * as api from '../../../store/api'
import * as utils from './utils'
import * as arcgisServicesUtils from './ArcgisServicesUtil'
import PopouWin from '../util/showPopupWin'

/**
 * poi查询
 * @param params
 */
export const identifySearch = params => {
  api.poiService(params.coordinate).then(res => {
    if (res['data'] && res['data'].length > 0) {
      let points = utils.sortIQueryData(params.coordinate, res['data'])
      if (points) {
        let layerName = points['features'][0]['attributes']['layerName']
        points['features'][0]['attributes']['imgSrc'] = config.markConfig.getMarkConfigByetype(layerName)['imgURL']
        points['features'][0]['attributes']['imgSrcHover'] = config.markConfig.getMarkConfigByetype(layerName)['hover']
        // config.Maps.addTypePoints([points['features'][0]], '', {
        //   layerName: layerName
        // })
        let showPopupWin = new PopouWin(config.Maps)
        showPopupWin.showPopupWindow(params.coordinate, {
          offset: [-8, -30],
          layerName: layerName,
          id: points['features'][0]['attributes']['id'],
          isCenter: true,
          text: 'G2(京沪高速)发生崩塌阻断',
          bottomClass: 'ol-popup-bottom-image'
        });
      }
    }
  })
}

/**
 * i查询触发事件
 * @param evt
 * @param type
 */
export const iQuery = (evt, type) => {
  switch (type) {
    case 'GIS_LX':
      showLxInfo(type, evt);
      break;
    case 'GIS_LD':
      showLuduanInfo(type, evt);
      break;
    case 'gzwQuery':
      identifySearch(evt);
      break;
  }
}

/**
 * 获取i查询参数
 * @param layerArr
 * @param evt
 * @returns {*}
 */
export const getParams = (layerArr, evt) => {
  try {
    let mapZoom = config.Maps.map.getView().getZoom();
    let resolution = config.Maps.map.getView().getResolution();
    let coordinate = evt.coordinate;
    let point = new ol.geom.Point(coordinate);
    let extent = point.getExtent();
    let buf = ol.extent.buffer(extent, resolution * mapZoom);
    let minx = buf[0], miny = buf[1], maxx = buf[2], maxy = buf[3];
    let wkt = "POLYGON((" + minx + " " + miny + "," + minx + " " + maxy + "," + maxx + " " + maxy + "," + maxx + " " + miny + "," + minx + " " + miny + "))";
    let params = null;
    if (layerArr.length > 0) {
      params = {
        resolution: resolution,
        geometry: wkt,
        identityType: "all",
        layers: JSON.stringify(layerArr)
      };
    }
    return params;
  } catch (e) {

  }
}

/**
 * 获取配置
 * @param type
 * @returns {[*]}
 */
export const getConfig = type => {
  let lineArr = config.layerConfig.layers;
  let returnData = lineArr.filter(ele => {
    return ele['layerName'] === type
  })
  return [
    {
      name: returnData[0]['tableName']
    }
  ]
}

/**
 * 加载路段信息
 * @param type
 * @param event
 */
export const showLuduanInfo_ = (type, event) => {
  let layerArr = getConfig(type);
  let params = getParams(layerArr, event);
  config.Maps.removeFeatureByLayerName(type);
  api.mapServer(params).then(res => {
    let lines = res['data'][0];
    if (lines) {
      lines['features'] = lines['features'].map(ele => {
        if (ele['attributes'] && ele['attributes']['OBJECTID']) {
          ele['attributes']['id'] = ele['attributes']['OBJECTID']
        }
        return ele
      })
      if (lines && lines['features'] && lines['features'].length > 0) {
        config.Maps.addPolylines(lines['features'], {
          layerName: type,
          showStyle: true,
          selectable: true
        })
      }
    }
  })
}

/**
 * 加载路线信息
 * @param type
 * @param event
 */
export const showLxInfo_ = (type, event) => {
  let layerArr = getConfig(type);
  let params = getParams(layerArr, event);
  config.Maps.removeFeatureByLayerName(type);
  api.mapServer(params).then(res => {
    let lines = res['data'][0];
    if (lines) {
      lines['features'] = lines['features'].map(ele => {
        if (ele['attributes'] && ele['attributes']['OBJECTID']) {
          ele['attributes']['id'] = ele['attributes']['OBJECTID']
        }
        return ele
      })
      if (lines && lines['features'] && lines['features'].length > 0) {
        config.Maps.addPolylines(lines['features'], {
          layerName: type,
          showStyle: true,
          selectable: true
        })
      }
    }
  })
}
/**
 * arcgis服务（路线）
 * @param type
 * @param event
 */
export const showLxInfo = (type, event) => {
  config.Maps.removeFeatureByLayerName(type);
  arcgisServicesUtils.loadFeatureByCircle(event.coordinate, type)
}
/**
 * arcgis服务（路段）
 * @param type
 * @param event
 */
export const showLuduanInfo = (type, event) => {
  config.Maps.removeFeatureByLayerName(type);
  arcgisServicesUtils.loadFeatureByCircle(event.coordinate, type)
}