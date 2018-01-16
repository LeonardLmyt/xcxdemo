/*超类，实现多继承*/
function Super(wx) {
  this.wx = wx
  this.SuperParam = {

  }
  if (!this.layer) {
    /* 弹出提示
       @param {[String]} state 提示类型 layer-loading--加载 layer-warning--警告 layer-error--错误
       @param {[String]} content 提示内容
       @param {[Number]} time 提示时长 -1 为永久
    */
    Super.prototype.layer = function (p) {
      let that = this,
        layer = that.wx.data.layer,
        timeout,
        pLen = Object.keys(p).length
      if (!timeout) {
        layer.state = !!p.state ? p.state : 'layer-loading'
        layer.content = !!p.content ? p.content : '加载中...'
        layer.show = false
        that.wx.setData({
          layer: layer
        })
        if (!(!!(p.time === -1) || ((!!p.content && pLen === 1) || !pLen))) {
          timeout = setTimeout(function () {
            layer.show = true;
            that.wx.setData({
              layer: layer
            })
            clearTimeout(timeout);
          }, (!!p.time ? p.time | 0 : 2) * 1000)
        }
      }
    };
    /* 关闭提示 */
    Super.prototype.close = function () {
      let that = this,
        layer = that.wx.data.layer;
      layer.show = true;
      that.wx.setData({
        layer: layer
      })
    }
  }
}


function OtherSuper() {
  this.OtherSuperParam = 0;
}
OtherSuper.prototype.OtherSuperFunction = function () {

};

//Binding to a parent class
function MyClass(wx) {
  Super.call(this, wx);
  OtherSuper.call(this);
}

MyClass.prototype.MyClassFunction = function () {
};

// inherit one class
MyClass.prototype = Object.create(Super.prototype);
// mixin another
Object.assign(MyClass.prototype, OtherSuper.prototype);
// re-assign constructor
MyClass.prototype.constructor = MyClass;

module.exports = MyClass;