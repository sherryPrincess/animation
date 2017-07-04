<template>
  <div class="congestion-popup">
    <div class="congestion-popup-content">
      <div class="popup-header">
        <span class="iconfont icon-guanbi popup-guanbi" @click="close()"></span>
        <div class="title">
          <span class="main-title">{{mainTitle}}</span>
          <span class="sec-title" v-show="secTitle != ''">({{secTitle}})</span>
        </div>
      </div>
      <div class="popup-middle">
        <ul>
          <li>{{location}}</li>
          <li>{{mileagepeg}}</li>
          <li>{{'拥堵 ' + count + 'km, 时速 ' + speed + ' km/h'}}</li>
        </ul>
      </div>
      <div class="popup-bottom">
        <img src="../../../../static/images/qipao_jiao.png" alt="">
      </div>
      <transition name="fade">
        <div class="panel-loading" v-show="loading">
          <loading></loading>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss">
  .congestion-popup {
    width: 188px;
    height: 100px;
    padding: 10px;
    border-radius: 4px;
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: #000;
      transition: .5s;
      opacity: .2;
      border-radius: 4px;
      transform: rotateX(56.7deg) skewX(-25deg);
      position: relative;
      top: 65px;
      left: 80px;
    }
    .congestion-popup-content {
      .popup-header {
        height: 30px;
        width: 175px;
        line-height: 30px;
        padding: 0 10px;
        overflow: hidden;
        span:nth-child(2) {
          float: right;
          margin-right: 20px;
          /*color: #1b9de8;*/
          /*cursor: pointer;*/
        }
        .icon-guanbi {
          float: right;
          cursor: pointer;
          font-size: 10px;
          color: #585858;
          &:hover {
            color: #026dbf;
          }
        }
        .title {
          width: 160px;
          overflow: hidden;
          .main-title {
            font-size: 14px;
            font-weight: 700;
            color: #2a2a2a;
          }
        }
      }
      .panel-loading {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .popup-middle {
        ul {
          padding-left: 10px;
          li {
            height: 20px;
            line-height: 20px;
            color: #585858;
            font-size: 12px;
          }
        }
      }
      .popup-bottom {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0px);
      }
    }

  }
</style>
<script>
  import Loading from '../../layout/Loading'
  export default {
    data () {
      return {
        params: {},
        mainTitle: '',
        secTitle: '',
        loading: false,
        location: '',
        mileagepeg: '',
        count: '',
        speed: ''
      }
    },
    watch: {
      params: function (v, ov) {
        if (v && v['id'] && v['attr']) {
          this.loading = true
          this.getDetail(v)
          this.removeBottom(v['id'])
        }
      }
    },
    methods: {
      getDetail (params) {
        console.log(params)
        this.mainTitle = params['attr']['xname']
        this.secTitle = params['attr']['roaddir']
        this.location = params['attr']['loc']
        this.mileagepeg = params['attr']['mileagepeg']
        this.count = params['attr']['count']
        this.speed = params['attr']['speed']
        this.loading = false
      },
      removeBottom (id) {
        let overlay = config.Maps.map.getOverlayById(id + 'overlay')
        if (overlay) {
          let ele = overlay.getElement()
          if (ele) {
            $(ele).find('.ol-popup-bottom').remove()
          }
        }
      },
      close () {
        config.Maps.removeOverlayById(this.params['id'] + 'overlay')
      }
    },
    components: {
      Loading
    }
  }
</script>
