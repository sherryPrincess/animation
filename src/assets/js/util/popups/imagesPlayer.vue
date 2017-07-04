<template>
  <div class="picture-player">
    <div class="panel-header">
      <span class="panel-header-title">{{mainTitle}}</span>
      <span class="panel-header-subtitle" v-if="subtitle != ''">&nbsp;-&nbsp;{{subtitle}}</span>
      <span class="panel-header-close iconfont icon-guanbi" @click="onClose"></span>
    </div>
    <div class="panel-body">
      <img class="images-content" v-if="src" onerror="this.src='static/images/nopicture.png'" :src="src">
      <img class="images-content" v-else src="static/images/nopicture.png">
      <div class="player-control">
        <span class="iconfont icon-kuaitui" @click="backward()"></span>
        <span class="iconfont icon-playe" :class="{ true: 'icon-zanting', false: 'icon-bofang' }[isPlay]"
              @click="play()"></span>
        <span class="iconfont icon-kuaijin" @click="forward()"></span>
        <span class="images-msg">
        <span>{{lxmc}}</span>
        <span style="margin-left: 10px;">{{lxdm}}</span>
      </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .picture-player {
    position: relative;
    width: 500px;
    height: 350px;
    .panel-header {
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      box-sizing: border-box;
      width: 100%;
      color: #fff;
      background: #1b9de8;
      span {
        font-size: 14px;
      }
      .panel-header-return, .panel-header-title, .panel-header-subtitle {
        float: left;
      }
      .panel-header-close, .panel-header-min, .panel-header-custom {
        margin-left: 5px;
        float: right;
      }
      .panel-header-close, .panel-header-return, .panel-header-min, .panel-header-custom {
        transition: color .3s ease;
        &:hover {
          cursor: pointer;
          color: #07C8C7;
        }
      }
    }
    .panel-body {
      width: 500px;
      height: 280px;
      .images-content {
        width: 100%;
        height:100%;
      }
      .player-control {
        width: 100%;
        height: 32px;
        line-height: 32px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        span{
          cursor: pointer;
        }
        .icon-kuaitui {
          margin-left: 30px;
        }
        .icon-playe {
          margin-left: 20px;
        }
        .icon-kuaijin {
          margin-left: 20px;
        }
        .images-msg {
          float: right;
          margin-right: 15px;
        }
      }
    }

  }
</style>
<script>
  export default {
    data () {
      return {
        lxmc: '',
        lxdm: '',
        src: '',
        isPlay: false,
        params: {},
        coordinates: [],
        index: 0,
        timer: null,
        subtitle: '',
        mainTitle: '路况检测'
      }
    },
    computed: {
    },
    watch: {
      params: function (newValue) {
        console.log(newValue)
        if (newValue && config.variables.feature) {
          this.subtitle = newValue['LXDM']
          this.coordsAnalysis(newValue, config.variables.feature)
          this.getThisOverLayer()
        }
      },
      index: function (newValue) {
        this.overlay.setPosition(this.coordinates[newValue])
      }
    },
    methods: {
      play () {
        this.timer = window.setInterval(() => {
          if (this.coordinates.length > this.index) {
            this.index++
          } else {
            window.clearInterval(this.timer)
          }
        }, 1000)
      },
      forward () {
        window.clearInterval(this.timer)
        if (this.index < this.coordinates.length) {
          this.index++
        }
        console.log('forward')
      },
      backward () {
        window.clearInterval(this.timer)
        if (this.index > 0) {
          this.index--
        }
        console.log('backward')
      },
      getThisOverLayer () {
        this.overlay = config.Maps.map.getOverlayById(this.params['id'] + 'overlay')
      },
      coordsAnalysis (attr, feat) {
        this.coordinates = config.Maps.matchCoordinate(parseFloat(attr.QDZH), parseFloat(attr.ZDZH), feat, 0.023)
      },
      onClose () {
        console.log('close')
        config.Maps.closePopupById(this.params['id'] + 'overlay')
      }
    }
  }
</script>
