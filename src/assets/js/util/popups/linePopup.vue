<template lang="html">
  <div class="line-popup">
    <div class="overlay-warp">
      <div class="overlay-header">
        <span class="overlay-title">详情</span>
        <span class="overlay-subTitle" v-show="true"></span>
       <span class="iconfont icon-guanbi popup-guanbi" @click="close()"></span>
      </div>
      <div class="line-popup-overlay-body">
        <ul>
          <li v-for="(val, key) in showFields">
            <span>{{val}}</span><span>:</span><span v-if="val != '中心桩号'">{{popupDetailList[key]}}</span>
            <span v-if="val == '中心桩号'">{{popupDetailList[key] | formatZh}}</span>
          </li>
        </ul>
      </div>
    </div>
  <!--  <div class="popup-header">
      <span class="iconfont icon-guanbi popup-guanbi" @click="close()"></span>
      <span class="detail" v-if='show' @click='showDetail()'>详情</span>
      <div class="title">
        <span class="main-title"> {{popupDetailMainTitle}}</span>
        <span class="sec-title" v-show="popupDetailSecTitle != ''">({{popupDetailSecTitle}})</span>
      </div>
    </div>
    <div class="popup-middle">
      <div class="right">
        <ul>
          <li v-for="(val, key) in showFields">
            <span>{{val}}</span><span>:</span><span v-if="val != '中心桩号'">{{popupDetailList[key]}}</span>
            <span v-if="val == '中心桩号'">{{popupDetailList[key] | formatZh}}</span>
          </li>
        </ul>
      </div>
    </div>-->
  </div>
</template>
<style lang="scss">

  .line-popup{
    height: 100%;
    padding: 10px;
  }
  .popup-guanbi{
    cursor: pointer;
    &:hover{
      color: #1b9de8;
    }
  }
  .overlay-warp{
    width: 100%;
    height: 100%;
    .overlay-header{
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      border-bottom:1px solid #E3E3E3;
      font-size: 12px;
      font-family: "Microsoft YaHei", serif;
      color: #2a2a2a;
      span:nth-child(3){
        float: right;
      }
      .overlay-title{
        float: left;
      }
      .overlay-subTitle{
        float: left;
      }
      .overlay-tool{
        float: right;
        font-size: 12px;
        span{
          cursor: pointer;
        }
        .icon-yingjiyuan{
          margin-right: 10px;
          &:hover{
            &:before{
              content: "\e740"!important;
              color: #1B9DE8;
            }
          }
        }
        .icon-tupian{
          margin-right: 10px;
          &:hover{
            &:before{
              content: "\e73d"!important;
              color: #1B9DE8;
            }
          }
        }
        .icon-guanbi{
          font-size: 10px!important;
          &:hover{
            color: #1B9DE8;
          }
        }
        .moreMsg{
          display: inline-block;
          margin-right: 10px;
          width: 16px;
          height: 15px;
          &:hover{
          }
        }
      }
    }
    .line-popup-overlay-body{
      overflow: hidden;
      ul{
        padding: 0 10px;
        font-size: 12px;
        color: #2a2a2a;
        li{
          width: 315px;
          margin: 6px 0;
          line-height: 20px;
          .iconfont{
            font-size: 14px;
            color: #868686;
          }
          .liTitle{
            color: #636363;
            display: inline-block;
            margin: 0px 10px 0 0;
          }
          .msg{
            display: inline;
            line-height: 21px;
          }
          span:nth-child(3){
            margin-left: 20px;
          }
        }
        .popBodyTitil{
          .liMessage{
            font-size: 12px;
            font-weight: 600;
            margin: 18px 0 12px 0!important;
          }
        }
      }
    }
    .overlay-bottom{
      &:before{
        position: absolute;
        bottom: -16px;
        left: 50%;
        content: '';
        display: inline-block;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 15px solid #c2c2c2;
      };
      &:after{
        position: absolute;
        bottom: -15px;
        left: 50%;
        content: '';
        display: inline-block;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 15px solid #ffffff;
      }
    }
  }

  .markPop{
    .markPop-header{
      overflow: hidden;
      height: 26px;
      line-height: 18px;
      border-bottom:1px dashed #E3E3E3;
      font-size: 12px;
      font-family: "Microsoft YaHei", serif;
      color: #2a2a2a;
      .markPop-title{
        float: left;
      }
      .markPop-tool {
        float: right;
        font-size: 12px;
        span {
          cursor: pointer;
        }
        .icon-guanbi {
          font-size: 10px !important;
          &:hover {
            color: #1B9DE8;
          }
        }
      }
    }
    background-color: #fff;
    width: 265px;
    height: 150px;
    padding: 10px;
    -webkit-box-shadow: 1px 1px 3px #c8c6c7;
    -moz-box-shadow: 1px 1px 3px #c8c6c7;
    box-shadow: 1px 1px 3px #c8c6c7;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .biaoji-button {
      text-align: right;
      margin: 10px 9px 10px 0;
    }
    .userSignIwBox {
      margin: 10px 0 0 10px;
      color: #333;
    }
    .userSignIw-input{
      input{
        border: none;
        background-color: transparent;
        margin-top: -3px;
      }
    }
    .s-autocomplete div{
      margin-left: -10px;
      width: 245px;
    }
  }

  .featureOverlay{
    width: 244px;
    height:165px;
    padding: 0 10px;
    background-color: rgba(255,255,255,1);
    .popPanel-header{
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      border-bottom:1px solid #E3E3E3;
      font-size: 12px;
      font-family: "Microsoft YaHei", serif;
      color: #2a2a2a;
      .popPanel-title{
        float: left;
      }
      .popPanel-subTitle{
        float: left;
      }
      .popPanel-tool{
        float: right;
        font-size: 12px;
        span{
          cursor: pointer;
        }
        .icon-xianchangmiaoshu{
          margin-right: 10px;
          &:hover{
            color: #1B9DE8;
          }
        }
        .icon-yingjiyuan{
          margin-right: 10px;
          &:hover{
            &:before{
              content: "\e740"!important;
              color: #1B9DE8;
            }
          }
        }
        .icon-tupian{
          margin-right: 10px;
          &:hover{
            &:before{
              content: "\e73d"!important;
              color: #1B9DE8;
            }
          }
        }
        .icon-guanbi{
          font-size: 10px;
          &:hover{
            color: #1B9DE8;
          }
        }
      }
    }
    .popPanel-body-wrap{
      height: 150px;
    }
    .popPanel-bottom{
      &:before{
        position: absolute;
        bottom: -16px;
        left: 50%;
        content: '';
        display: inline-block;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 15px solid #c2c2c2;
      };
      &:after{
        position: absolute;
        bottom: -15px;
        left: 50%;
        content: '';
        display: inline-block;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 15px solid #ffffff;
      }
    }
    .popPanel-body{
      ul{
        padding: 0 10px;
        font-size: 12px;
        color: #2a2a2a;
        li{
          margin: 6px 0;
          .iconfont{
            font-size: 14px;
            color: #868686;
          }
          .liTitle{
            color: #636363;
            display: inline-block;
            margin: 0px 10px 0 0;
          }
          .msg{
            display: inline;
            line-height: 21px;
          }
        }
        .popBodyTitil{
          .liMessage{
            font-size: 12px;
            font-weight: 600;
            margin: 18px 0 12px 0!important;
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
        params: {},
        popupDetailList: {},
        popupDetailMainTitle: '',
        popupDetailSecTitle: '',
        show: true,
        showFields: {}
      }
    },
    watch: {
      params: function (v, ov) {
        if (v && v['layerName'] && v['attr']) {
          let layerConfig = config.layerConfig.getLayerConfigBytableName(v['layerName'])
          this.showFields = layerConfig['showFields']
          this.popupDetailList = v['attr']
          this.popupDetailMainTitle = v['attr'][layerConfig['MC']]
        }
      },
      showFields (val) {
        console.log(val)
      }
    },
    methods: {
      close () {
        config.Maps.removeFeatureByLayerName('GIS_LX')
        config.Maps.removeFeatureByLayerName('GIS_LD')
        config.Maps.closePopupById(this.params['id'] + 'overlay')
      },
      showDetail () {
        console.log('showDetail')
      },
      toolMenusClick (item) {
        if (item) {
          this.selMenu = item['alias']
          console.log(item)
        }
      }
    }
  }
</script>
