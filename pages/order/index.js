// pages/order/index.js
const app = getApp()
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabIndex:0
  },
  //切换tab栏
  changeTab(e){
    // console.log(e);
    let {tabIndex} = this.data.tabIndex
    tabIndex = +e.currentTarget.dataset.index
    this.setData({tabIndex})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.myRequest({
      url:'my/orders/all',
      data:{
        type:1
      }
    }).then(res=>{
      // console.log(res);
      this.setData({
        orders:res.orders
      })
    })
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