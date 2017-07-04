<template>
  <div class="popup-panel">
    <div class="popup-header">
      <span class="iconfont icon-guanbi popup-guanbi" @click="close()"></span>
      <span class="detail" v-if='showDetailTool' @click='showDetail()'>详情</span>
      <div class="title">
        <span class="main-title" :title="popupDetailMainTitle">{{popupDetailMainTitle}}</span>
        <span class="sec-title" v-show="popupDetailSecTitle != ''">({{popupDetailSecTitle}})</span>
      </div>
    </div>
    <div class="popup-middle">
      <div class="left">
        <detail-images v-if="multiMedia && multiMedia.length > 0" :images="multiMedia"
                       :styles="styleConfig"></detail-images>
        <img v-else src="static/images/no_pics.png">
      </div>
      <div class="right">
        <ul>
          <li v-for="(val, key) in showFields">
            <span>{{val}}</span><span>:</span><span v-if="val !== '中心桩号' && val !== '阻断原因' && val !== '预计恢复' && val !== '最后维修'">{{popupDetailList[key]}}</span>
            <span v-if="val === '中心桩号' && popupDetailList[key]">{{popupDetailList[key] | formatZh}}</span>
            <span v-if="val === '预计恢复' && popupDetailList[key]">{{popupDetailList[key] | dateFormat('YYYY年M月D日')}}</span>
            <span v-if="val === '阻断原因' && popupDetailList[key]">{{popupDetailList[key] | formatReason}}</span>
            <span v-if="val === '最后维修' && popupDetailList[key] !== null ">{{popupDetailList[key] | dateFormat('YYYY年M月D日')}}</span>
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
  .popup-panel {
    width: 100%;
    height: 100%;
    padding: 10px;
    .popup-header {
      height: 30px;
      width: 340px;
      line-height: 30px;
      padding: 0 10px;
      span:nth-child(2) {
        float: right;
        margin-right: 20px;
        color: #1b9de8;
        cursor: pointer;
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
        .main-title {
          font-size: 14px;
          font-weight: 700;
          float: left;
          color: #2a2a2a;
          width: 280px!important;
          height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .popup-middle {
      overflow: hidden;
      padding: 10px;
      .left {
        height: 134px;
        width: 135px;
        border: 1px solid #dedede;
        float: left;
        .detail-images {
          height: 125px !important;
          width: 125px !important;
          margin: 4px;
        }
        img {
          height: 134px;
          width: 135px;
          display: inherit;
        }
      }
      .right {
        float: left;
        margin-left: 10px;
        height: 140px;
        width:200px;
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
  import router from '../../../router'
  import * as api from '../../../store/api'
  import detailImages from './detailImages'
  import * as utils from '../../../assets/js/utils/utils'
  import Loading from '../../layout/Loading'
  export default {
    data () {
      return {
        params: {},
        layerName: '',
        tableName: '',
        isRightMenusSearch: false,
        popupDetailList: {},
        popupDetailMainTitle: '',
        popupDetailSecTitle: '',
        showDetailTool: false,
        multiMedia: null,
        showFields: {},
        selMenu: '',
        loading: false,
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
          // 现在除了桥梁有服务其他无服务
          if (layerConfig['keyWord'].toLowerCase() === 'qldm') {
            api.getImgurl(layerConfig['keyWord'].toLowerCase(), params['id']).then(res => {
              this.multiMedia = res
            })
          }
        }
      },
      close () {
        if (this.layerName && this.layerName !== 'V_GL_BLOCK_TEMP') {
          config.Maps.removeFeatureByLayerName(this.layerName)
        }
        if (this.params['id']) {
          config.Maps.closePopupById(this.params['id'] + 'overlay')
        }
        $('#alert-content').remove()
      },
      showDetail () {
        if (this.isRightMenusSearch) {
          router.push({name: 'searchDetailRoute', query: {layer: this.tableName, id: this.params.id, type: '01'}})
        } else {
          router.push({
            name: 'searchDetailRoute',
            query: {layer: this.tableName, id: this.params.id, type: this.params.type}
          })
        }
      },
      toolMenusClick (item) {
        if (item) {
          this.selMenu = item['alias']
          config.variables.feature = null
          if (this.params && this.params['id']) {
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
              } else if (point instanceof ol.Overlay) {
                window.rightMenuClickPosition = point.getPosition()
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
      }
    },
    components: {
      detailImages,
      Loading
    }
  }
</script>
