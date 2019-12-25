// pages/user/index.js
const app = getApp()
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rawData: {},
    collect:0
  },
  //登录
  login() {
    wx.navigateTo({
      url: '/pages/auth/index',
      success: (result) => {
      },
      fail: () => {},
      complete: () => {}
    });
  },
  //查询全部订单
  allOrder(){
    wx.navigateTo({
      url: '/pages/order/index'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //判断是否登录过,有就直接拿数据渲染
    if (wx.getStorageSync('rawData')) {
      const rawData = JSON.parse(wx.getStorageSync('rawData'))
      // console.log(rawData);
      this.setData({
        rawData
      })
    }
    const collect = wx.getStorageSync('collectArr')
    this.setData({
      collect:collect.length
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})