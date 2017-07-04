<template>
  <div class="detail-images">
    <div id="detail-images" class="img-wrap clearfix"
         :style="{width: images.length * (styles.width - 9) + 'px', left: '-' + current * (styles.height - 9) + 'px'}">
      <div v-for="item in images" class="img" :style="{width: styles.width - 9 + 'px', height: styles.height -9 + 'px'}">
        <img v-if="images.length > 0" :style="{width: styles.width - 9 + 'px', height: styles.height -9 + 'px'}"
             onerror="this.src='static/images/no_pics.png'" :src="basePath + item.path">
        <img v-else src="static/images/no_pics.png">
      </div>
    </div>
    <span @click="goto('next')"
          class="img-next iconfont icon-xiayiye"
          v-if="current !== images.length - 1"></span>
    <span @click="goto('last')"
          class="img-last iconfont icon-shangyiye"
          v-if="current !== 0"></span>
    <span class="pages">
      {{current + 1}}/{{images.length}}
    </span>
    <span class="year">
      {{year}}
    </span>
  </div>
</template>
<style lang="scss">
  .detail-images {
    margin: 0px auto;
    position: relative;
    overflow: hidden;
    &:hover {
      span {
        opacity: 1 !important;
      }
    }
    span {
      opacity: 0 !important;
    }

    .img-next {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translate(0, -50%);
    }
    .img-last {
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translate(0, -50%);
    }
    .pages, .year {
      position: absolute;
      display: inline-block;
      background: rgba(0, 0, 0, .5);
      border-radius: 3px;
      padding: 5px;
      overflow: hidden;
      text-align: center;
      color: #fff;
    }
    .pages {
      right: 5px;
      bottom: 5px;

    }

    .year {
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      line-height: 20px;
      text-align: center;
      padding: 0;
      border-radius: 0;
    }

    .iconfont {
      z-index: 1;
      display: inline-block;
      background: rgba(0, 0, 0, .5);
      border-radius: 50%;
      text-align: center;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, .8);
      }
    }

    .img-wrap {
      position: absolute;
      left: 0;
      .img {
        position: relative;
        float: left;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: none;
          cursor: zoom-in;
        }
      }
    }
  }
</style>
<script>
  export default {
    props: {
      images: {
        type: Array,
        default: function () {
          return []
        }
      },
      styles: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    updated () {
      let options = {
        url: 'data-original'
      }
      /* eslint-disable no-new */
      new Viewer(document.getElementById('detail-images'), options)
    },
    data () {
      return {
        current: 0,
        basePath: 'http://' + config.service.detailPicUrl,
        year: ''
      }
    },
    watch: {
      current: function (v, ov) {
        this.year = this.images[v]['year']
      },
      images: function (v, ov) {
        this.year = v[0]['year']
      }
    },
    methods: {
      goto (_e) {
        let lengths = this.images.length
        if (_e === 'last' && this.current > 0) {
          this.current = this.current - 1
        } else if (_e === 'next' && this.current < lengths - 1) {
          this.current = this.current + 1
        }
      }
    }
  }
</script>
