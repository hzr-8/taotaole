// pages/auth/index.js
const app = getApp()
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户信息
  getUserInfo(e) {
    //获取用户信息
    console.log(e);
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail
    //微信登录
    wx.login({
      success: (result) => {
        // console.log(result);
        //获取登录返回的code
        const {
          code
        } = result
        //向后台发送请求，换取token
        app.myRequest({
          url: 'users/wxlogin',
          data: {
            encryptedData,
            rawData,
            iv,
            signature,
            code
          },
          method: 'POST'
        }).then(res => {
          console.log(res);
          // debugger
          // 将数据本地存储起来
          wx.setStorageSync('token', res.token);
          wx.setStorageSync('rawData', rawData);
          //消息提示
          if (res) {
            wx.showToast({
              title: '授权成功',
              icon: 'success',
              success: (result) => {
                //授权成功后返回上一页
                wx.navigateBack({
                  delta: 1
                });
              },
            });
          }else{
            wx.showToast({
              title: '授权失败，请重新授权',
              icon: 'none',
            });
          }
        })
      },
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