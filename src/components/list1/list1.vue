<template>
  <div class="list1">
    <ul>
      <li v-for="item in lists">
        <span>{{item.code}}</span>
        <span>{{item.name}}</span>
        <span>{{item.desc}}</span>
        <span>{{item.bz}}</span>
      </li>
    </ul>
    <div class="circle"></div>
  </div>
</template>
<style lang="scss">
  .list1{
    ul{
      width: 300px;
      height: 800px;
      background-color: #04193E;
      li{
        border: 1px solid #fff;
        height: 100px;
        animation-name: swing, flipOutY;
        animation-duration: 0.7s, 0.9s;
        animation-timing-function: linear, ease;
        animation-delay: 1.1s, 3s;
        span{
          height: 30px;
          line-height: 30px;
          display: inline-block;
          list-style-type:none;
          width: calc(100% - 102px);
          float: left;
          font-family: 微软雅黑;
          width: 80px;
          color: #a8d3fc;
        }
      }
    }
    .circle{
      height: 100px;
      width: 100px;
      border-radius: 50px;
      border: 1px #ed9be8 solid;
      -webkit-animation: wave 5s infinite linear;
      animation: wave 5s infinite linear;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
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
@keyframes wave {

  0% {
    -webkit-transform: scale(0) rotate(0deg);
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1) rotate(1turn);
    transform: scale(1) rotate(1turn);
    opacity: 1;
  }
}
</style>
<script>
  export default{
    props: {},
    data () {
      return {
        lists: [
          {
            code: '1',
            name: '千千万万遍',
            desc: '为你',
            bz: '追风筝的人'
          },
          {
            code: '2',
            name: '千千万万遍',
            desc: '为你',
            bz: '追风筝的人'
          },
          {
            code: '3',
            name: '千千万万遍',
            desc: '为你',
            bz: '追风筝的人'
          },
          {
            code: '4',
            name: '千千万万遍',
            desc: '为你'
          },
          {
            code: '5',
            name: '千千万万遍',
            desc: '为你',
            bz: '追风筝的人'
          },
          {
            code: '6',
            name: '千千万万遍',
            desc: '为你',
            bz: '追风筝的人'
          }
        ]
      }
    },
    watch: {},
    methods: {}
  }
</script>
