let mixin = require('../../public/js/mixin2.0.js'),
  mx = null;
Page({
  data: {
    layer: {
      layerShow: true,
      layerStatus: '',
      layerContent: ''
    }
  },
  onLoad: function (options) {
    let t = this
    mx = new mixin(t)
    mx.layer({})
  },
  onReady: function () {
  }
})
