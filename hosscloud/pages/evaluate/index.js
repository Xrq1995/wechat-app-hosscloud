//index.js
//获取应用实例
const app = getApp();
var api = require('../../api.js');
var aes = require('../../static/aes/aesUtil.js');

Page({
  data: {
    repairurl: null,
    orderno: null,
    projectname: null,
    createdt: null,
    descs: null
  },
  
  onLoad: function () {
    // console.log(app.globalData.userInfo)
    
    this.setData({
      repairurl: wx.getStorageSync('repairurl'),
      orderno: wx.getStorageSync('orderno'),
      projectname: wx.getStorageSync('projectname'),
      createdt: wx.getStorageSync('createdt')
    })
  },
  onReady: function(){
    // wx.navigateBack({ changed: true }); //返回上一页
  },
  searchdescs: function (e) {
    // console.log(e.detail.value)
    this.setData({ descs: e.detail.value });
  },
  tosore: function(e){
    console.log(e)
  },
  repiarSue: function(){
    if (!this.data.descs) {
      wx.showModal({
        title: '错误',
        content: '请输入投诉内容',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    }else{
      let data = {
        "orderNo": this.data.orderno, 
        "descs": this.data.descs
      }
      console.log(data)
      wx.request({
        url: api.api.basePath + api.api.repiarSue, //接口地址
        method: "POST",
        data: JSON.stringify(data).encode(),
        header: {
          'content-type': 'application/json', // 默认值
          'token': wx.getStorageSync('token')
        },
        success: res => {
          console.log(res.data)
          if (res.data.status == 200) {
            // wx.navigateBack({ changed: true });
            wx.showToast({
              title: '投诉成功',
              icon: 'success',
              duration: 1000,
              success:function(res){
                setTimeout(function(){
                  wx.navigateBack({ changed: true })
                },1000)
              }
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '投诉失败' + res.data.message,
              showCancel: false, //不显示取消按钮
              confirmText: '确定'
            })
          }
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  }
})
