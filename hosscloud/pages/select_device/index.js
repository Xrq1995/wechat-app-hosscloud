//路径根据自己项目路径修改
var ias = require("../../api.js")

Page({
  data: {
    roomID:null,
    installationPosition:"",
    list:null
  },
  /**
  * 监听页面开在加载的状态
  *    页面加载完成之后就不会在执行
  */
  onLoad: function (option) {
    // //this指的就是本页面对象
    console.log(wx.getStorageSync("roomid"));
    var _this = this
    _this.setData({
      roomID: option.id
    })
    _this.requestRoom();
    console.log('index---------onLoad()')
    
  },
  
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list.equipList, str = "list.equipList";
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].category == id) {
        list[i].isDelete = !list[i].isDelete
      } else {
        list[i].isDelete = false
      }
    }
    this.setData({
      [str]: list
    });
  },
  requestRoom:function(e){
    let _this = this, 
          roomID = wx.getStorageSync("roomid");
    console.log(roomID);
    //路径根据自己项目路径修改
    ias.requestLoading('GET', ias.api.roomDetail + '?id=' + _this.data.roomID, {}, '正在加载数据', function (res) {
        //res就是我们请求接口返回的数据
        console.log(res)
        // 缓存数据
        wx.setStorageSync('installationPosition', res.results.buildingName + '-' + res.results.floorName + '-' + res.results.name);
        wx.setStorageSync('roomID', res.results.id);

        _this.setData({
          list:res.results
        })
      }, function () {
        wx.showToast({
          title: '加载数据失败',
        })
      })
  },
  repair: function (e) {
    var id = e.currentTarget.id ,_this = this;
    wx.navigateTo({
      url: '../repair_task/index?deviceID=' + id 
    })
  }
});
