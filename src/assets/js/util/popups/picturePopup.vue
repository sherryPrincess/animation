<template>
  <div class="picture-popup">
    <div class="popup-header">
      <span class="iconfont icon-guanbi popup-guanbi" @click="closePopup()"></span>
      <span class="detail" v-if='showDetailTool' @click='showDetail()'>详情</span>
      <div class="title">
        <span class="main-title iconfont icon-xiangqingxinxi">{{mainTitle}}</span>
        <span class="sec-title" v-show="secTitle != ''">({{secTitle}})</span>
      </div>
    </div>
    <div class="popup-middle">
      <div class="picture-player">
        <img class="images-content" :src="prop.src"></img>
        <div class="player-control">
          <span class="iconfont icon-kuaitui" @click="backward()"></span>
          <span class="iconfont icon-playe" :class="{ true: 'icon-zanting', false: 'icon-bofang' }[isPlay]"
                @click="play()"></span>
          <span class="iconfont icon-kuaijin" @click="forward()"></span>
          <span class="images-msg">
        <span>{{prop.lxmc}}</span>
        <span style="margin-left: 10px;">{{prop.lxdm}}</span>
      </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .picture-popup {
    width: 100%;
    height: 100%;
    /*padding: 10px;*/
    .popup-header {
      height: 32px;
      width: 530px;
      line-height: 32px;
      padding: 0 10px;
      background-color: #1B9DE8;
      color: #ffffff;
      .icon-guanbi {
        float: right;
        cursor: pointer;
        font-size: 10px;
        &:hover {
          color: #026dbf;
        }
      }
      .title {
        .main-title {
          font-size: 14px;
          font-weight: 400;
          &:before {
            margin-right: 5px;
          }
        }
      }
    }
    .popup-middle {
      height: 288px;
      width: 530px;
      padding: 10px;
      background-color: #ffffff;
      .picture-player {
        position: relative;
        width: 100%;
        height: 100%;
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
  }
</style>
<script>
  export default {
    data () {
      return {
        showDetailTool: false,
        mainTitle: '详情信息',
        secTitle: '',
        prop: {
          src: 'http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg',
          lxmc: '北坞村路',
          lxdm: 'C1002'
        },
        isPlay: false
      }
    },
    methods: {
      closePopup () {
        console.log('关闭')
        config.Maps.closePopupById(this.params['id'] + 'overlay')
      },
      showDetail () {
        console.log('showDetail')
      },
      backward () {
        console.log('后退')
      },
      forward () {
        console.log('前进')
      },
      play () {
        console.log('播放')
        this.isPlay = !this.isPlay
      }
    }
  }
</script>
