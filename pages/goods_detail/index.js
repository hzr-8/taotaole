// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{},
    introduce:''
  },
  //查看图片
  checkPhoto(e){
    wx.previewImage({
      urls:[e.currentTarget.dataset.url]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const{goods_id} = options
    wx.request({
      url:"https://api.zbztb.cn/api/public/v1/goods/detail",
      data:{goods_id:goods_id},
      success:res=>{
        this.setData({
          detailData:res.data.message,
          introduce: res.data.message.goods_introduce.replace(/jpg.+?webp/g, 'jpg')
        })
      }
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