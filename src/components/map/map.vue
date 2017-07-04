<template lang="html">
  <div class="content">
    <div id="map"></div>
    <div class="map-legends">
      <ul>
        <li><span class="legend-red"></span>拥堵</li>
        <li><span class="legend-orange"></span>缓行</li>
        <li><span class="legend-green"></span>畅通</li>
        <li><span class="legend-gray"></span>无数据</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss" scoped>
  .content{
    width:100%;
    height:100%;
    #map{
      width:100%;
      height:100%;
    }
    .map-legends{
      width: 200px;
      height:auto;
      border: 1px #007aff solid;
      position: absolute;
      left: 10px;
      bottom: 10px;
      background-color: #fff;
      ul li{
        line-height: 30px;
        list-style-type:none;
        span{
          width: 50px;
          height: 5px;
          display: inline-block;
          margin-right:20px;
        }
        .legend-red{
          background-color: #F23030;
        }
        .legend-orange{
          background-color: #FF9F1A;
        }
        .legend-green{
          background-color: #17BF00;
        }
        .legend-gray{
          background-color: #C0C0C0;
        }
      }
    }
  }

</style>
<script>
  import Maps from '../../assets/js/map/map'
  export default{
    name: 'map',
    data () {
      return {
      }
    },
    components: {
    },
    mounted () {
      let params = $.extend(config.mapConfig.baseLayers[0], {
        center: config.mapConfig.center,
        zoom: config.mapConfig.zoom
      })
      config.Maps = new Maps()
      config.Maps.getMapParams('map', params)
      setTimeout(function () {
        config.Maps.addTileLayer()
      }, 2000)
    },
    methods () {

    }
  }
</script>
