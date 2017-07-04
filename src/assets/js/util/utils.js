import qs from 'qs'

/**
 * 返回浮点数
 * @param value
 * @returns {*}
 */
export const returnFloat = value => {
  let xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.000'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 3) {
      value = value.toString() + '00'
    }
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

/**
 * 获取查询参数
 * @returns {null}
 */
export const getSearch = () => {
  let [ search, searchObj ] = [ window.location.search, {} ]
  search = search.substr(1, search.length)
  searchObj = qs.parse(search)
  return searchObj
}

/**
 * 颜色值转换
 * @param color
 * @returns {string}
 */
export const colorToRgb = color => {
  if (!color) return;
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    sColorChange.push(1);
    return 'RGB(' + sColorChange.join(',') + ')';
  } else {
    return sColor;
  }
}

/**
 * i查询结果处理
 * @param result
 * @param point
 * @returns {{}}
 */
export const sortIQueryData = (point, result) => {
  let wgs84Sphere = new ol.Sphere(6378137);
  let sourceProj = config.Maps.map.getView().getProjection();
  let object = {};
  object.allCount = 0;
  object.features = [];
  let arr = result.filter((element, index, array) => {
    if (element.data && element.data.length > 0) {
      return element.data.map((ele, _index, _array) => {
        let coord = [ele.longitude, ele.latitude];
        let c1 = ol.proj.transform(coord, sourceProj, 'EPSG:4326');
        let _point = ol.proj.transform(point, sourceProj, 'EPSG:4326');
        ele['distance'] = wgs84Sphere.haversineDistance(c1, _point);
        ele['zh'] = 'K' + parseInt(ele.zxzh) + '+' + (Number(ele.zxzh) - parseInt(ele.zxzh)).toFixed(3) * 1000
        ele['layerName'] = element['layer']['alias']
        return ele
      })
    }
  })
  arr.map((_item, _index) => {
    let items = _item['data'].map((item, index) => {
      return {
        attributes: item,
        geometry: [item.longitude, item.latitude],
        geometryType: 'Point'
      }
    })
    object.features = object.features.concat(items)
    return items
  })
  object.features.sort(function (a, b) {
    return a['attributes']['distance'] > b['attributes']['distance'] ? 1 : -1
  })
  object.allCount = object.features.length
  return object
}

/**
 * 格式化阻断空间数据
 * @param items
 */
export const formatGeo = items => {
  try {
    let points = items.map(ele => {
      let object = {};
      if (ele.hasOwnProperty('geometry')) {
        object['geometry'] = ele['geometry'];
        delete ele['geometry']
      } else if (ele.hasOwnProperty('ptx') && ele.hasOwnProperty('pty') && ele.ptx !== 0 && ele.ptx !== 0) {
        object['geometry'] = [ele['ptx'], ele['pty']]
      }
      let img = getImages(ele);
      if (img) {
        ele['imgSrc'] = img['imgSrc'];
        ele['imgSrcHover'] = img['imgSrcHover']
      }
      object['attributes'] = ele;
      return object
    })
    config.Maps.removeFeatureByLayerName('warnPoints')
    config.Maps.addTypePoints(points, null, {
      layerName: 'warnPoints',
      showStyle: true
    })
  } catch (e) {
    console.log('空间标点出错了！！')
  }
}

export const formatLineGeometry = val => {
  try {
    config.Maps.removeFeatureByLayerName('blockLegend')
    if (val['data']['data'] && val['data']['data']['features'].length > 0) {
      let item = val['data']['data']['features'];
      item.map(ele => {
        if (ele['attributes'] && ele['attributes']['BLOCK_ID'])
        ele['id'] = ele['attributes']['BLOCK_ID'] + 'line'
        return ele;
      })
      config.Maps.addPolylines(item, {
        layerName: 'blockLegend'
      })
    }
  } catch (e) {

  }
}

/**
 * 获取标绘图片
 * @param ele
 * @returns {{imgSrc: string, imgSrcHover: string}}
 */
export const getImages = ele => {
  let [imgSrc, imgSrcHover] = ['', '']
  imgSrc = 'static/images/mark/2/map_marker_' + config.warning[ele['category']] + '.png'
  imgSrcHover = 'static/images/mark/1/map_marker_' + config.warning[ele['category']] + '.png'
  return {
    imgSrc: imgSrc,
    imgSrcHover: imgSrcHover
  }
}
/**
 * 高亮当前选中3s后解除
 * @param items
 * @param params
 */
export const flagFeature = (items, params) => {
  if (items && (items instanceof Array) && items.length > 0) {
    items.forEach(ele => {
      if (ele['id'] && ele['id'] !== '') {
        if (params['val'] && params['val'] !== '' && params['code']) {
          if (ele[params['code']] === params['val']) {
            config.Maps.highLightFeatureByID(ele['id'])
            config.Maps.highLightFeatureByID(ele['id'] + 'line')
          }
        } else {
          config.Maps.highLightFeatureByID(ele['id'])
          config.Maps.highLightFeatureByID(ele['id'] + 'line')
        }
      }
    })
    setTimeout(() => {
      items.forEach(ele => {
        if (ele['id'] && ele['id'] !== '') {
          config.Maps.unHighLightFeatureByID(ele['id'] + 'line')
        }
      })
    }, 3000)
  }
}

export const fomatZh = num => {
  if (!num || num === '') return;
  return ('K' + parseInt(num) + '+' + (Number(num) - parseInt(num)).toFixed(3) * 1000)
}
