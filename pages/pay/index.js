// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cartData:[],
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //本地获取收货地址
    const address = wx.getStorageSync('address');
    // console.log(address);
    //本地获取要购买的商品
    const cartData = wx.getStorageSync('cartArr')
    // console.log(cartData);
    //遍历数组，当商品被选中时才是要购买的商品
    const arr = cartData.filter(item=>{
        return item.goods_checked===true
    })
    // console.log(arr);
    //获取总价格
    let totalPrice = this.data.totalPrice
    arr.forEach(item=>{
      totalPrice += item.goods_count*item.goods_price
    })
    //存入数据
    this.setData({
      address,
      cartData:arr,
      totalPrice
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