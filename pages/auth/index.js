// pages/auth/index.js
const app = getApp()
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    encryptedData: '',
    rawData: '',
    iv: '',
    signature: '',
    code: ''
  },
  //获取用户信息
  async getUserInfo() {
    //获取用户信息
    await wx.getUserInfo({
      withCredentials: 'false',
      lang: 'zh_CN',
      timeout: 10000,
      success: (result) => {
        console.log(result);
        this.setData({
          encryptedData: result.encryptedData,
          rawData: result.rawData,
          iv: result.iv,
          signature: result.signature
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  //授权
  async login() {
     //获取用户当前的授权状态
     await wx.getSetting({
      success: (result) => {
        console.log(result);
        console.log(result.authSetting)
        if (result.authSetting['scope.userInfo'] === false) {
          //打开用户设置界面
          wx.openSetting({
            success: (result) => {
              if (result.authSetting['scope.userInfo'] === true) {
                //调用函数，获取用户信息
                this.getUserInfo()
              }
            },
            fail: () => {},
            complete: () => {}
          });
        } else {
          //调用函数，获取用户信息
          this.getUserInfo()
        }

      },

    });
    if(!this.data.iv){
      wx.showToast({
        title: '请重新授权',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      return
    }
    //微信登录
    await wx.login({
      timeout: 10000,
      success: (result) => {
        // console.log(result);
        //获取登录返回的code
        this.setData({
          code: result.code
        })
        app.myRequest({
          url: 'users/wxlogin',
          data: {
            ...this.data
          },
          method: 'POST'
        }).then(res => {
          console.log(res);
          // 将数据本地存储起来
          wx.setStorageSync('token', res.token);
          wx.setStorageSync('rawData', this.data.rawData);
          //消息提示
          wx.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 1500,
            success: (result) => {
              //授权成功后返回上一页
              wx.navigateBack({
                delta: 1
              });
            },
            fail: () => {},
            complete: () => {}
          });
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