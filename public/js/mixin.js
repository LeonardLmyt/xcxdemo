const decorator = Sup => class extends Sup {
  constructor(...args) {
    super(...args)
  }
  fatherClass(){
  }
}

class SuperClass {
  constructor(wx) {
    Object.assign(this, { wx })
  }
  layer(p) {
    /* 弹出提示
       @param {[String]} state 提示类型 layer-loading--加载 layer-warning--警告 layer-errer--错误
       @param {[String]} content 提示内容
       @param {[Number]} time 提示时长 -1 为永久
    */
    let l = this.wx.data.layer,
      timeout
    if (!timeout) {
      l.state = !!p.state ? p.state : 'layer-loading'
      l.content = !!p.content ? p.content : '加载中...'
      l.show = false
      this.wx.setData({
        layer: l
      })
      if (!(p.time === -1 || !('time' in p))) {
        timeout = setTimeout(function () {
          l.show = true
          this.wx.setData({
            layer: l
          })
          clearTimeout(timeout)
        }.bind(this), (!!p.time ? p.time | 0 : 2) * 1000)
      }
    }
  }

  close() {
    /* 关闭提示 */
    let l = this.wx.data.layer
    l.show = true
    this.wx.setData({
      layer: l
    })
  }
}

class MyClass extends decorator(SuperClass) {
  constructor(wx) {
    super(wx)
  }
  parentClass() {
  }
}

module.exports = MyClass