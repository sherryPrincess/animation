var config = {
  mapConfig: {
    center: [109.15169990462329, 31.74108365827285],
    zoom: 1,
    projection: 'EPSG:4326',
    baseLayers: [
      {
        layerName: 'vectorLabel',
        isDefault: true,
        layerType: 'TileArcGISRest',
        layerUrl: 'http://211.101.37.251:6080/arcgis/rest/services/lwzx/city/MapServer'
      },
      {
        center: [115.57877817276136, 27.33734153418296],
        layerName: 'jiangxi',
        isDefault: true,
        layerType: 'jiangxi',
        layerUrl: 'http://111.75.200.54:6080/arcgis/rest/services/JXGS_FOUR/MapServer'
      },
      {
        layerName: 'earth',
        layerType: 'TDTWMTS',
        layer: 'img',
        layerUrl: 'http://t0.tianditu.cn/img_c/wmts'
      },
      {
        layerName: 'panorama',
        layerType: 'TDTWMTS',
        layer: 'ter',
        layerUrl: 'http://t0.tianditu.com/ter_c/wmts'
      },
      {
        layerName: '天地图',
        layerType: 'WMTS',
        layer: 'vec',
        layerUrl: 'http://t0.tianditu.com/vec_c/wmts'
      }
    ],
    thematicLayers: [
      {
        layerName: '首都放射线',
        fields: 'layerDefs',
        alias: 'guogaow',
        layerUrl: 'http://10.254.0.39:6080/arcgis/rest/services/RoadNet/71118ThematicMap/MapServer',
        value: '0:CATALOG=7;1:CATALOG=7;2:CATALOG=7;3:CATALOG=7;4:CATALOG=7;5:CATALOG=7;6:CATALOG=7;7:CATALOG=7;8:CATALOG=7;9:CATALOG=7;'
      },
      {
        layerName: '东西横线',
        fields: 'layerDefs',
        alias: 'guogaow',
        layerUrl: 'http://10.254.0.39:6080/arcgis/rest/services/RoadNet/71118ThematicMap/MapServer',
        value: '0:CATALOG=18;1:CATALOG=18;2:CATALOG=18;3:CATALOG=18;4:CATALOG=18;5:CATALOG=18;6:CATALOG=18;7:CATALOG=18;8:CATALOG=18;9:CATALOG=18;'
      },
      {
        layerName: '南北纵线',
        fields: 'layerDefs',
        alias: 'guogaow',
        layerUrl: 'http://10.254.0.39:6080/arcgis/rest/services/RoadNet/71118ThematicMap/MapServer',
        value: '0:CATALOG=11;1:CATALOG=11;2:CATALOG=11;3:CATALOG=11;4:CATALOG=11;5:CATALOG=11;6:CATALOG=11;7:CATALOG=11;8:CATALOG=11;9:CATALOG=11;'
      },
      {
        layerName: '桥梁',
        fields: 'layerDefs',
        alias: 'bridge',
        layerUrl: 'http://10.254.0.39:6080/arcgis/rest/services/基础设施/BridgeThematicMap/MapServer',
        value: "1:QLKJ_KEY='1';2:QLKJ_KEY='1';3:QLKJ_KEY='1';4:QLKJ_KEY='1';5:QLKJ_KEY='1';6:QLKJ_KEY='1';7:QLKJ_KEY='1';8:QLKJ_KEY='1';9:QLKJ_KEY='1';10:QLKJ_KEY='1';11:QLKJ_KEY='1';12:QLKJ_KEY='1';13:QLKJ_KEY='1';14:QLKJ_KEY='1';15:QLKJ_KEY='1';16:QLKJ_KEY='1';17:QLKJ_KEY='1';18:QLKJ_KEY='1';19:QLKJ_KEY='1';20:QLKJ_KEY='1';21:QLKJ_KEY='1';22:QLKJ_KEY='1';23:QLKJ_KEY='1';25:QLKJ_KEY='1';25:QLKJ_KEY='1';26:QLKJ_KEY='1';27:QLKJ_KEY='1';28:QLKJ_KEY='1';29:QLKJ_KEY='1';30:QLKJ_KEY='1';31:QLKJ_KEY='1';32:QLKJ_KEY='1';33:QLKJ_KEY='1';34:QLKJ_KEY='1';35:QLKJ_KEY='1'"
      },
      {
        layerName: '隧道',
        fields: 'layerDefs',
        alias: 'tunnel',
        layerUrl: 'http://10.254.0.39:6080/arcgis/rest/services/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/TunnelThematicMap/MapServer',
        value: ''
      }
    ]
  }
}
