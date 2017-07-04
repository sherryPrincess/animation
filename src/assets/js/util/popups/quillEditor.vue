<template>
  <div class="editor-content">
    <div class="quill-editor-example" v-show="showEditor">
      <span class="iconfont close icon-guanbi" v-show="showClose" @click.stop="close"></span>
      <!-- quill-editor -->
      <quill-editor ref="myTextEditor"
                    v-model="content"
                    :config="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </div>
    <div v-show="showContent" class="html ql-editor text-content" v-html="content" @click.stop="back"></div>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data () {
      return {
        params: '',
        showContent: false,
        showClose: true,
        showEditor: true,
        name: 'base-example',
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', { 'color': [] }, { 'background': [] }]
            ]
          }
        }
      }
    },
    watch: {
      params: function (v, ov) {
        if (v && v['id']) {
          this.getOverlay(v['id'] + 'overlay')
        }
      }
    },
    methods: {
      onEditorBlur (editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus (editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        console.log('editor ready!', editor)
      },
      close () {
        if (this.editor) {
          this.showEditor = false
          this.showContent = true
//          this.overlay.setOffset([-40, 43])
        }
      },
      back () {
        if (this.editor) {
          this.showEditor = true
          this.showContent = false
//          this.overlay.setOffset([-40, 5])
        }
      },
      getOverlay (id) {
        setTimeout(() => {
          this.overlay = config.Maps.map.getOverlayById(id)
        }, 100)
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    mounted () {
      console.log('this is my editor', this.editor)
    },
    components: {
      quillEditor
    }
  }
</script>
<style lang="scss">
  .editor-content {
    height: 150px;
    .quill-editor-example {
      width: 195px;
      min-height: 50px;
      height: 100%;
      position: relative;
      .ql-toolbar {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
      .close {
        position: absolute;
        top: 15px;
        right: 10px;
        z-index: 10;
        font-size: 13px;
        &:hover{
          cursor: pointer;
          color: #2387c0;
        }
      }
      .ql-container {
        position: absolute;
        top: 42px;
        bottom: 0px;
        width: 100%;
        height: auto;
      }
      .ql-container .ql-editor {
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: 1em;
        max-height: 25em;
      }
    }
    .text-content {
      width: 195px;
      min-height: 50px;
      max-height: 150px;
    }
  }
</style>
