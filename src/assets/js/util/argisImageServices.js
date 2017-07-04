export default class ArcgisImagesServices {
  constructor () {
    this.author = 'fdd';
    this.version = '1.0.0';
  }
  loadArcMapService (layerConfig) {
    if (!layerConfig || !layerConfig['layerName'] || layerConfig['layerName'] === '' || layerConfig['layerUrl'] === '') {
      return false;
    }
    let params = {};
    if (layerConfig['value'] && layerConfig['value'] != '') {
      params[layerConfig['fields']] = layerConfig['value']
    }
    let source = new ol.source.TileArcGISRest({
      url: layerConfig['layerUrl'],
      params: params,
      wrapX: false
    });
    if (this.layerName === layerConfig['layerName']) {
      this.removeArcMapTitle()
    } else {
      this.layerName = layerConfig['layerName'];
    }
    let layer = new ol.layer.Tile({
      layerName: layerConfig['layerName'],
      isImage: true,
      source: source
    });
    if (layer) {
      config.Maps.map.addLayer(layer);
    }
  }
  removeArcMapTitle () {
    config.Maps.removeTileLayerByLayerName(this.layerName)
    this.layerName = ''
  }
}