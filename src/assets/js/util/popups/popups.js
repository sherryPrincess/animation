import Vue from 'vue'
import editerVue from './quillEditor'
import deformationPopupVue from './deformationPicture'

export const ele = {
  editor: editerVue,
  deformationPopup: deformationPopupVue
}
let Template

export const getPops = function (_str) {
  Template = Vue.extend(ele[_str])
}
let instance
// 创建实例
const initInstance = () => {
  instance = new Template({
    el: document.createElement('div')
  })
}
// 获取虚拟dom
export const getPopupElement = (_params) => {
  initInstance()
  instance.params = getParams(_params)
  document.body.appendChild(instance.$el)
  return instance.$el
}
// 参数
export const getParams = params_ => {
  return params_
}
