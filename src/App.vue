<template>
  <div id="app">
    <div class="webgis-nav">
      <ul>
        <li v-for="item in lists" @click="target(item.desc)">{{item.name}}</li>
      </ul>
    </div>
    <div id="map"></div>
    <div id="overlay"></div>
  </div>
</template>

<script>
  import Maps from './assets/js/map/map'
  export default {
    name: 'app',
    data () {
      return {
        lists: [
          {
            code: 'initMap',
            name: '初始化全国地图',
            desc: 'initMap'
          },
          {
            code: '2',
            name: '初始化江西地图',
            desc: 'initJxMap'
          },
          {
            code: 'addTileLayer',
            name: '添加瓦片图层',
            desc: 'addTileLayer'
          },
          {
            code: 'addPointsFeature',
            name: '添加点（Feature）',
            desc: 'addPointsFeature'
          },
          {
            code: 'addPointsOverlay',
            name: '添加点（Overlay）',
            desc: 'addPointsOverlay'
          },
          {
            code: 'addLines',
            name: '添加线',
            desc: 'addLines'
          },
          {
            code: 'addPolygon',
            name: '添加面',
            desc: 'addPolygon'
          },
          {
            code: 'pointMoveByLine',
            name: '点沿线轨迹移动',
            desc: 'pointMoveByLine'
          },
          {
            code: 'pointMoveByLineMet',
            name: '点沿线轨迹移动算法',
            desc: 'pointMoveByLineMet'
          },
          {
            code: 'changeLayer',
            name: '切换图层',
            desc: 'changeLayer'
          }
        ]
      }
    },
    mounted () {
      this.initMap()
    },
    methods: {
      target (desc) {
        switch (desc) {
          case 'initMap':
            this.initMap()
            break
          case 'addTileLayer':
            this.addTileLayer()
            break
          case 'addPointsFeature':
            this.addPoints()
            break
          case 'addPointsOverlay':
            this.addPointsOverlay()
            break
          case 'addLines':
            this.addLines()
            break
          case 'addPolygon':
            break
          case 'changeLayer':
            break
          case 'pointMoveByLine':
            this.pointMoveByLine()
            break
          case 'pointMoveByLineMet':
            this.pointMoveByLineMet()
            break
        }
      },
      initMap () {
        let params = $.extend(config.mapConfig.baseLayers[0], {
          center: config.mapConfig.baseLayers[0].center,
          zoom: config.mapConfig.zoom,
          resolutions: 3
        })
        config.Maps = new Maps()
        config.Maps.getMapParams('map', params)
      },
      initJxMap () {
        let params = $.extend(config.mapConfig.baseLayers[1], {
          center: config.mapConfig.baseLayers[1].center,
          zoom: config.mapConfig.zoom,
          resolutions: 2
        })
        config.Maps = new Maps()
        config.Maps.getMapParams('map', params)
      },
      addTileLayer () {
        config.Maps.addTileLayer()
      },
      addPoints () {
        // let feature = [12127870.35928337, 3755068.0562904645]
        let feature = 'POINT (12127870.35928337 3755068.0562904645)'
        let params = {
          layerName: 'vectorLabel'
        }
        config.Maps.addPoints1(feature, params)
      },
      addPointsOverlay () {
        let feature = [11991358.00727271, 4073061.535091771]
        config.Maps.addPointsOverlay(feature, document.getElementById('overlay'))
      },
      addLines () {
        let feature = 'MULTILINESTRING ((13938220.0906 5426941.428, 13938222.3166 5427046.2214, 13938222.3162 5427121.7351, 13938222.3161 5427134.064, 13938223.429 5427211.1195, 13938222.315 5427389.8909, 13938225.6539 5427517.8071, 13938225.6539 5427544.007, 13938225.6532 5427650.3484, 13938228.9918 5427890.7774, 13938225.6513 5428088.0572, 13938225.6511 5428140.4603, 13938220.0841 5428362.4061, 13938218.9708 5428368.5713, 13938211.178 5428502.6664, 13938187.7993 5428847.9313, 13938152.1755 5429205.5409, 13938127.7987 5429362.709), (13938201.1665 5426939.8869, 13938203.3921 5427046.2214, 13938203.3919 5427134.0639, 13938203.3918 5427149.4751, 13938202.2784 5427211.1194, 13938203.3906 5427389.8908, 13938206.7296 5427517.8069, 13938206.7295 5427562.501, 13938207.8422 5427667.3016, 13938210.0675 5427890.7773, 13938207.8402 5428097.3046, 13938206.7269 5428140.4601, 13938200.0466 5428362.406, 13938198.9333 5428393.2323, 13938193.3669 5428501.1249, 13938169.9882 5428846.39, 13938132.1381 5429203.9995, 13938098.7413 5429432.1367, 13938088.04 5429498.8191))'
        let params = {
          layerName: 'vectorLabel'
        }
        config.Maps.addPolylines(feature, params)
      },
      pointMoveByLine () {
        let feature = 'MULTILINESTRING ((13938220.0906 5426941.428, 13938222.3166 5427046.2214, 13938222.3162 5427121.7351, 13938222.3161 5427134.064, 13938223.429 5427211.1195, 13938222.315 5427389.8909, 13938225.6539 5427517.8071, 13938225.6539 5427544.007, 13938225.6532 5427650.3484, 13938228.9918 5427890.7774, 13938225.6513 5428088.0572, 13938225.6511 5428140.4603, 13938220.0841 5428362.4061, 13938218.9708 5428368.5713, 13938211.178 5428502.6664, 13938187.7993 5428847.9313, 13938152.1755 5429205.5409, 13938127.7987 5429362.709), (13938201.1665 5426939.8869, 13938203.3921 5427046.2214, 13938203.3919 5427134.0639, 13938203.3918 5427149.4751, 13938202.2784 5427211.1194, 13938203.3906 5427389.8908, 13938206.7296 5427517.8069, 13938206.7295 5427562.501, 13938207.8422 5427667.3016, 13938210.0675 5427890.7773, 13938207.8402 5428097.3046, 13938206.7269 5428140.4601, 13938200.0466 5428362.406, 13938198.9333 5428393.2323, 13938193.3669 5428501.1249, 13938169.9882 5428846.39, 13938132.1381 5429203.9995, 13938098.7413 5429432.1367, 13938088.04 5429498.8191))'
        let params = {
          layerName: 'vectorLabel'
        }
        config.Maps.addPolyline(feature, params)
        config.Maps.splitPoint(feature, params)
      },
      pointMoveByLineMet () {
        let feature = 'MULTILINESTRING ((13938220.0906 5426941.428, 13938222.3166 5427046.2214, 13938222.3162 5427121.7351, 13938222.3161 5427134.064, 13938223.429 5427211.1195, 13938222.315 5427389.8909, 13938225.6539 5427517.8071, 13938225.6539 5427544.007, 13938225.6532 5427650.3484, 13938228.9918 5427890.7774, 13938225.6513 5428088.0572, 13938225.6511 5428140.4603, 13938220.0841 5428362.4061, 13938218.9708 5428368.5713, 13938211.178 5428502.6664, 13938187.7993 5428847.9313, 13938152.1755 5429205.5409, 13938127.7987 5429362.709), (13938201.1665 5426939.8869, 13938203.3921 5427046.2214, 13938203.3919 5427134.0639, 13938203.3918 5427149.4751, 13938202.2784 5427211.1194, 13938203.3906 5427389.8908, 13938206.7296 5427517.8069, 13938206.7295 5427562.501, 13938207.8422 5427667.3016, 13938210.0675 5427890.7773, 13938207.8402 5428097.3046, 13938206.7269 5428140.4601, 13938200.0466 5428362.406, 13938198.9333 5428393.2323, 13938193.3669 5428501.1249, 13938169.9882 5428846.39, 13938132.1381 5429203.9995, 13938098.7413 5429432.1367, 13938088.04 5429498.8191))'
        let params = {
          layerName: 'pointMoveByLineMet'
        }
        config.Maps.addPolyline(feature, params)
        config.Maps.addPolylineMet(feature, params)
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  #app{
    width: 100%;
    height: 100%;
    .webgis-nav{
      width: 300px;
      height:100%;
      color: #fff;
      background-color: #2d6987;
      border-right: 1px green solid;
      float: left;
      ul li{
        width: 80%;
        margin-left:auto;
        margin-right:auto;
        cursor: pointer;
        animation-name: swing, flipOutY;
        animation-duration: 0.7s, 0.9s;
        animation-timing-function: linear, ease;
        animation-delay: 1.1s, 3s;
      }
    }
    #map{
      float: left;
      width: calc(100% - 302px);
      height: 100%;
      background-color: #0e2231;
    }
    .overlay{
      width: 10px;
      height: 10px;
      border: 1px solid #000;
      bakcground-color: red;
      z-index: 3  ;
    }
  }
  @keyframes swing {
    20% {
      -webkit-transform: rotate3d(0, 0, 1, 3deg);
      transform: rotate3d(0, 0, 1, 3deg);
    }
    40% {
      -webkit-transform: rotate3d(0, 0, 1, -2deg);
      transform: rotate3d(0, 0, 1, -2deg);
    }
    60% {
      -webkit-transform: rotate3d(0, 0, 1, 1deg);
      transform: rotate3d(0, 0, 1, 1deg);
    }
    80% {
      -webkit-transform: rotate3d(0, 0, 1, -1deg);
      transform: rotate3d(0, 0, 1, -1deg);
    }
    100% {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
  }
  @keyframes flipOutY{
    0% {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
    30% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      opacity: 1;
      filter: alpha(opacity=100);
    }
    100% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: .3;
      filter: alpha(opacity=30);
    }
  }
</style>
