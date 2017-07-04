<template>
  <div class="deformation-popup" id="deformation-popup">
    <div class="popup-header">
      <span class="iconfont icon-guanbi popup-guanbi" @click="closePopup()"></span>
      <span class="detail" v-if='showDetailTool' @click='showDetail()'>详情</span>
      <div class="title">
        <span class="main-title">{{popupDetailMainTitle}}</span>
        <el-select v-show="showYear" class="year-select" v-model="currentYear" filterable size="mini" placeholder="请选择">
          <el-option
            :key="item.value"
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="sec-title" v-show="popupDetailSecTitle != ''">{{popupDetailSecTitle}}</span>
      </div>
    </div>
    <div class="popup-middle">
      <div id="deformation-images" class="img-wrap clearfix" @mouseover="mouseover()"
           @mouseout="mouseout()"
           :style="{width: images.length * 84 + 'px'}">
        <div v-for="(item, index) in images" class="img-con"
             @click="checkItem(index)"
             :class="{true: 'imageSel', false: ''}[current == index]">
          <img v-if="images.length > 0" onerror="this.src='static/images/no_pics.png'" :src="item[filed]">
          <img v-else src="static/images/no_pics.png">
        </div>
      </div>
      <span @mouseover="mouseover()" class="iconfont icon-shangyiye showTopFlip" @click="goto('lastPage')"></span>
      <span @mouseover="mouseover()" class="iconfont icon-xiayiye showTopFlip" @click="goto('nextPage')"></span>
      <div class="image-detail-content">
        <img :src="currentPic" onerror="this.src='static/images/no picture.png'">
        <span @click="goto('next')"
              class="img-next iconfont icon-xiayiye"
              v-if="current !== images.length - 1"></span>
        <span @click="goto('last')"
              class="img-last iconfont icon-shangyiye"
              v-if="current !== 0"></span>
        <span class="pages">
          {{current + 1}}/{{images.length}}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .deformation-popup {
    padding: 10px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    width: 470px;
    height: 410px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-235px, -205px);
    -ms-transform: translate(-235px, -205px);
    -webkit-transform: translate(-235px, -205px);
    background-color: #fff;
    .popup-header {
      height: 30px;
      width: 450px;
      line-height: 30px;
      padding: 0 10px;
      .icon-guanbi {
        float: right;
        cursor: pointer;
        font-size: 10px;
        color: #585858;
        &:hover {
          color: #026dbf;
        }
      }
      .detail {
        float: right;
        font-size: 10px;
        color: #000;
        margin-right: 10px;
        &:hover {
          color: #026dbf;
          cursor: pointer;
        }
      }
      .title {
        .main-title {
          font-size: 14px;
          font-weight: 700;
          color: #2a2a2a;
        }
        .sec-title {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .year-select {
          width: 80px;
          margin-left: 10px;
        }
      }
    }
    .popup-middle {
      overflow: hidden;
      padding: 10px;
      height: 370px;
      width: 450px;
      .img-wrap {
        width: 100%;
        height: 64px;
        position: relative;
        .img-con {
          width: 70px;
          height: 60px;
          float: left;
          border: 2px solid #FFFFFF;
          margin-left: 10px;
          &:hover {
            border-color: #1B9DE8;
            cursor: pointer;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        div:nth-child(1) {
          margin-left: 0px;
        }
        .imageSel {
          border-color: #1B9DE8;
        }
      }
      .showTopFlip {
        display: block;
        position: absolute;
        color: #FFFFFF;
        line-height: 60px;
        width: 20px;
        height: 60px;
        background: rgba(0, 0, 0, 0.6);
        top: 52px;
        &:hover {
          cursor: pointer;
          color: #026dbf;
        }
      }
      .icon-shangyiye {
        left: 22px;
      }
      .icon-xiayiye {
        right: 10px;
      }
      .image-detail-content {
        height: 295px;
        width: 100%;
        margin-top: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        .img-next {
          position: absolute;
          top: 60%;
          right: 25px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          transform: translate(0, -50%);
          &:hover {
            cursor: pointer;
            color: #026dbf;
          }
        }
        .img-last {
          position: absolute;
          top: 60%;
          left: 25px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          transform: translate(0, -50%);
          &:hover {
            cursor: pointer;
            color: #026dbf;
          }
        }
        .pages {
          position: absolute;
          display: inline-block;
          background: rgba(0, 0, 0, .5);
          border-radius: 3px;
          padding: 2px 8px;
          overflow: hidden;
          text-align: center;
          color: #fff;
          left: 50%;
          bottom: 5px;
          transform: translate(0, -50%);
        }
      }
    }
  }
</style>
<script>
  import * as utils from '../../../assets/js/utils/utils'
  export default {
    data () {
      return {
        params: {},
        showDetailTool: false,
        popupDetailMainTitle: '', // 主标题
        popupDetailSecTitle: '', // 副标题
        showYear: false, // 是否显示年份下拉框
        images: [], // 图片数组
        current: 0, // 当前index
        currentPic: '', // 当前选中图片
        filed: '', // 图片地址对应的字段
        options: [], // 年份数组
        currentYear: '',
        showTopFlip: false, // 是否显示翻页按钮
        names: [] // 如变形图左侧列表
      }
    },
    watch: {
      current: function (newValue, oldValue) {
        this.currentPic = this.images[newValue][this.filed]
      },
      params: function (newValue, oldValue) {
        if (newValue) {
          this.changeParams(newValue)
          if (this.current > 5) {
            $('.img-wrap').css('left', '-' + this.current * 84 + 'px')
          }
        }
      }
    },
    methods: {
      closePopup () {
        $('#deformation-popup').remove()
        utils.appStore().dispatch('setImageIndex', '-1')
      },
      showDetail () {
        console.log('详情')
      },
      checkItem (index) {
        this.current = index
        if (this.names && this.names.length === this.images.length) {
          this.popupDetailSecTitle = this.names[index]['name']
        }
        utils.appStore().dispatch('setImageIndex', index)
      },
      goto (type) {
        let left = $('.img-wrap').css('left')
        let number = Math.abs(parseInt(left) / 84)
        if (type === 'last') {
          if (this.current > 0) {
            this.current--
          } else {
            this.current = 0
          }
          if (this.names && this.names.length === this.images.length) {
            this.popupDetailSecTitle = this.names[this.current]['name']
          }
          utils.appStore().dispatch('setImageIndex', this.current)
        } else if (type === 'next') {
          if (this.current < this.images.length - 1) {
            this.current++
          } else {
            this.current = this.images.length - 1
          }
          if (this.names && this.names.length === this.images.length) {
            this.popupDetailSecTitle = this.names[this.current]['name']
          }
          utils.appStore().dispatch('setImageIndex', this.current)
        } else if (type === 'nextPage') {
          if (this.images.length - number > 0) {
            if (this.images.length - number > 5) {
              $('.img-wrap').css('left', '-' + (number + 5) * 84 + 'px')
            }
          }
        } else if (type === 'lastPage') {
          if (number > 5) {
            $('.img-wrap').css('left', '-' + (number - 5) * 84 + 'px')
          } else {
            $('.img-wrap').css('left', '0px')
          }
        }
        if (type === 'next' || type === 'last') {
          if (this.current > 5) {
            $('.img-wrap').css('left', '-' + this.current * 84 + 'px')
          } else {
            $('.img-wrap').css('left', '0px')
          }
        }
      },
      changeParams (newValue) {
        if (newValue && newValue['images']) {
          this.images = newValue['images']
        }
        if (newValue && (newValue['current'] || newValue['current'] === 0)) {
          this.current = newValue['current']
        }
        if (newValue && newValue['mainTitle']) {
          this.popupDetailMainTitle = newValue['mainTitle']
        }
        if (newValue && newValue['secTitle']) {
          this.popupDetailSecTitle = newValue['secTitle']
        }
        if (newValue && newValue['showYear']) {
          this.showYear = newValue['showYear']
        }
        if (newValue && newValue['filed']) {
          this.filed = newValue['filed']
        }
        if (newValue && newValue['years']) {
          this.options = newValue['years']
          this.currentYear = this.options[0]['value']
        }
        if (this.images && (this.current || this.current === 0)) {
          this.currentPic = this.images[this.current][this.filed]
        }
        if (newValue && newValue['showDetailTool']) {
          this.showDetailTool = newValue['showDetailTool']
        }
        if (newValue && newValue['names']) {
          this.names = newValue['names']
        }
      },
      mouseover () {
        $('.showTopFlip').css('display', 'block')
      },
      mouseout () {
        $('.showTopFlip').css('display', 'none')
      }
    }
  }

</script>
