<template>
  <div class="popup-panel-video">
    <div class="popup-header">
      <span class="iconfont icon-guanbi popup-guanbi" @click="close()"></span>
      <span class="detail" v-if='show' @click='showDetail()'>详情</span>
      <div class="title">
        <span class="main-title">{{popupDetailMainTitle}}</span>
        <span class="sec-title" v-show="popupDetailSecTitle != ''">({{popupDetailSecTitle}})</span>
      </div>
    </div>
    <div class="popup-middle">
      <div class="left" @click="player()">
        <video :src="videoSrc"></video>
        <div class="player-button">
          <span class="iconfont icon-fangdachakan"></span>
        </div>
      </div>
      <div class="right">
        <ul>
          <li v-for="(val, key) in showFields">
            <span>{{val}}</span><span>:</span><span v-if="val != '中心桩号'">{{popupDetailList[key]}}</span>
            <span v-if="val == '中心桩号'">{{popupDetailList[key] | formatZh}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="popup-bottom">
      <ul>
        <li v-for="val in bottomConfig"
            :class="{true:'popup-bottom-tool', false:''}[selMenu == val.alias]"
            @click="toolMenusClick(val)">
          <span class="iconfont" :class="'icon-' + val.icon"></span>
          <span>{{val.name}}</span>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="panel-loading" v-show="loading">
        <loading></loading>
      </div>
    </transition>
  </div>
</template>
<style lang="scss">
  .popup-panel-video {
    width: 100%;
    height: 100%;
    padding: 10px;
    .popup-header {
      height: 30px;
      width: 340px;
      line-height: 30px;
      padding: 0 10px;
      color: #fff;
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
        .main-title {
          font-size: 14px;
          font-weight: 700;
          color: #2a2a2a;
        }
      }
    }
    .popup-middle {
      overflow: hidden;
      padding: 10px;
      .left {
        height: 125px;
        width: 135px;
        border: 1px solid #dedede;
        float: left;
        .player-button {
          width: 36px;
          height: 36px;
          border-radius: 18px;
          background-color: #e0e0e0;
          opacity: .8;
          position: relative;
          top: -81px;
          left: 52px;
          display: none;
          span {
            width: 16px;
            height: 16px;
            color: #585858;
            opacity: .8;
            display: block;
            margin-left: auto;
            margin-right: auto;
            line-height: 38px;
          }
        }
        video {
          width: 100%;
          height: 100%;
        }
        &:hover{
          cursor: pointer;
          .player-button {
            display: block!important;
          }
        }
      }
      .right {
        float: left;
        margin-left: 10px;
        height: 125px;
        overflow-y: hidden;
        overflow-x: hidden;
        ul {
          li {
            line-height: 20px;
            width: 200px;
            overflow: hidden;
            span:nth-child(1) {
              color: #585858;
            }
          }
        }
        &:hover {
          overflow-y: auto;
        }
      }
    }
    .popup-bottom {
      height: 30px;
      width: 340px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 12px;
      ul {
        overflow: hidden;
        padding-left: 19px;
        li {
          float: left;
          width: 100px;
          margin-right: 1px;
          height: 26px;
          line-height: 26px;
          border: 1px solid #fff;
          &:hover {
            cursor: pointer;
            color: #1b9de8;
            border: 1px solid #5fbaef;
            border-radius: 3px;
          }
          span {
            margin-left: 5px;
            line-height: 24px;
            display: inline-block;
          }
          &:nth-child(1) {
            span:nth-child(1) {
              color: #13be00;
              display: inline-block;
            }
          }
          &:nth-child(2) {
            span:nth-child(1) {
              color: #e63c23;
              display: inline-block;
            }
          }
          &:nth-child(3) {
            span:nth-child(1) {
              color: #1b9de8;
              display: inline-block;
            }
          }
        }
        .popup-bottom-tool {
          color: #1b9de8 !important;
          width: 100px !important;
          border-radius: 3px !important;
          border: 1px solid #5fbaef !important;
          &:hover {
            cursor: pointer !important;
          }
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
  }
</style>
<script>
  import * as api from '../../../store/api'
  import detailImages from './detailImages'
  import Loading from '../../layout/Loading'
  import * as utils from '../../../assets/js/utils/utils'
  import router from '../../../router'
  export default {
    data () {
      return {
        params: {},
        popupDetailList: {},
        layerName: '',
        tableName: '',
        isRightMenusSearch: false,
        popupDetailMainTitle: '',
        popupDetailSecTitle: '',
        show: false,
        videoSrc: '',
        loading: false,
        showFields: {},
        selMenu: '',
        bottomConfig: [
          {
            alias: 'startPoint',
            name: '设置起点',
            icon: 'qizhidian',
            model: '路径分析'
          },
          {
            alias: 'endPoint',
            name: '设置止点',
            icon: 'qizhidian',
            model: '路径分析'
          },
          {
            alias: 'circleSeach',
            name: '周边搜索',
            icon: 'chaxun',
            model: '周边资源'
          }
        ],
        styleConfig: {
          width: 134,
          height: 134
        }
      }
    },
    watch: {
      params: function (v, ov) {
        if (v && v['layerName']) {
          this.getDetail(v)
        } else {
          console.info('参数不正确！')
        }
      }
    },
    methods: {
      getDetail (params) {
        let layerConfig = config.layerConfig.getLayerConfigByLayerName(params['layerName'])
        if (layerConfig) {
          this.layerName = layerConfig['layerName']
          this.tableName = layerConfig['tableName']
          this.showDetailTool = params['showDetailTool']
          if (params['isRightMenusSearch']) { // 此参数用于判断是否是右键查询
            this.isRightMenusSearch = params['isRightMenusSearch']
          }
          let _params = {
            layerName: this.tableName,
            filter: layerConfig['keyWord'] + '=\'' + params['id'] + '\''
          }
          this.loading = true
          api.getPopDetail(_params).then(res => {
            this.loading = false
            this.showFields = layerConfig['showFields']
            this.popupDetailList = res['attributes']
            this.popupDetailMainTitle = res['attributes'][layerConfig['MC']]
          })
        }
      },
      close () {
        if (this.params['id']) {
          config.Maps.closePopupById(this.params['id'] + 'overlay')
        }
        $('#alert-content').remove()
      },
      showDetail () {
        if (this.isRightMenusSearch) {
          router.push({name: 'searchDetailRoute', query: {layer: this.tableName, id: this.params.id, type: '01'}})
        } else {
          router.push({name: 'searchDetailRoute', query: {layer: this.tableName, id: this.params.id}})
        }
      },
      toolMenusClick (item) {
        if (item) {
          this.selMenu = item['alias']
          config.variables.feature = null
          if (this.params && this.params['id']) {
            config.Maps.closePopupById(this.params['id'] + 'overlay')
            let point = config.Maps.map.getOverlayById(this.params['id'])
            if (point && point.get('feature')) {
              config.variables.feature = point.get('feature')
            } else {
              point = config.Maps.getFeatureById(this.params['id'])
              config.variables.feature = point
            }
            if (item['model'] === '周边资源') {
              if (point && point instanceof ol.Feature) {
                window.rightMenuClickPosition = point.getGeometry().getCoordinates()
                console.log('周边资源', window.rightMenuClickPosition)
              } else if (point instanceof ol.Overlay) {
                window.rightMenuClickPosition = point.getPosition()
                console.log('周边资源', window.rightMenuClickPosition)
              }
              window.setTimeout(() => {
                utils.appStore().dispatch('changeLocation', window.rightMenuClickPosition)
                this.close()
              }, 100)
              utils.appStore().dispatch('nearByShowAction', true)
            } else {
              config.Maps.closePopupById(this.params['id'] + 'overlay')
              utils.appStore().dispatch('ljfxShowAction', true)
              window.setTimeout(() => {
                utils.appStore().dispatch('getFeat', item['alias'])
              }, 100)
            }
          }
        } else {
          console.info('参数错误！')
        }
      },
      player () {
        utils.appStore().dispatch('setPanelState', true)
      }
    },
    components: {
      detailImages,
      Loading
    }
  }
</script>
