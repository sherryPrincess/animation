<template>
  <div id="content"></div>
</template>
<style lang="scss">
  body:not(.ready) {
    overflow-x: hidden;
    overflow-y: auto;
  }
  #content {
    width: 960px;
    margin: 0 auto;
  }
  #content blockquote {
    margin: 0;
    margin-bottom: .85em;
    padding: 0 15px;
    color: #858585;
    border-left: 4px solid #e5e5e5
  }

  #content blockquote:first-child {
    margin-top: 0
  }

  #content table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    overflow: auto
  }

  #content table td, #content table th {
    padding: 6px 13px;
    border: 1px solid #ddd
  }

  #content table tr {
    background-color: #fff;
    border-top: 1px solid #ccc
  }

  #content table tr:nth-child(2n) {
    background-color: #f8f8f8
  }

  #content table th {
    font-weight: 700
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
    mounted () {
      var renderer = new marked.Renderer()
      renderer.waring = function (text) {
        return '<p class="tip">\n' + text + '</p>\n'
      }
      marked.setOptions({
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
      axios.get('../../static/markdown/docs/test.md').then(function (res) {
        document.getElementById('content').innerHTML = marked(res['data'])
      }).catch(function (error) {
        console.log(error)
      })
    },
    watch: {},
    methods: {}
  }
</script>

