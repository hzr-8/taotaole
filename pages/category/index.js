// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateData: wx.getStorageSync('cateData') || [],
    rightData: wx.getStorageSync('rightData') || [],
    activeIndex: 0
  },
  //切换tab索引的事件函数
  changeTab(e) {
    // console.log(e)
    //点击的时候，主动更新activeIndex的值
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      rightData: this.data.cateData[index].children
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发起请求
    if (this.data.cateData.length === 0) {
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/categories',
        success: res => {
          // console.log(res)
          const cateData = res.data.message;
          const rightData = cateData[0].children;
          wx.setStorageSync('cateData', cateData);
          wx.setStorageSync('rightData',rightData);
          this.setData({
            cateData,
            //将右边数据保存到rightData中
            rightData
          })
        }
      })
    }
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