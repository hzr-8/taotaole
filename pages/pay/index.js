// pages/pay/index.js
const app = getApp()
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartData: [],
    totalPrice: 0,
    order_number: '',
    pay: {}
  },
  //创建订单
  async getOrder() {
    //拿到总价格
    const totalPrice = JSON.stringify(this.data.totalPrice)
    //  console.log(totalPrice);
    //拿到收货地址
    const address = this.data.address.addressDetail
    //  console.log(address);
    //拿到goods订单数组,接口需要的参数
    const cartData = this.data.cartData
    //遍历cartData，拿到新的数组对象
    var arr = cartData.map(item => {
      const {
        goods_id,
        goods_price,
        goods_count
      } = item
      //创建接口需要的新对象
      const obj = {
        goods_id,
        goods_price,
        goods_number: goods_count
      }
      return obj
    })
    //  console.log(arr);
    //发送创建订单请求
    await app.myRequest({
      url: 'my/orders/create',
      method: 'POST',
      data: {
        order_price: totalPrice,
        consignee_addr: address,
        goods: arr
      },
      header:{
        Authorization:wx.getStorageSync('token')
      }
    }).then(res => {
      console.log(res);
      const {
        order_number
      } = res
      this.setData({
        order_number
      })
    })
    //获取支付参数
    await app.myRequest({
      url: 'my/orders/req_unifiedorder',
      method: 'POST',
      data: {
        order_number: this.data.order_number
      }
    }).then(res => {
      console.log(res);
      this.setData({
        pay: res.pay
      })
      console.log(this.data.pay);
    })
  },
  //支付
  async pay() {
    //判断有没有token，没有token就跳转到授权页面
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    //调用创建订单函数
    await this.getOrder()
    //结构支付需要的参数
    const{timeStamp,nonceStr,signType,paySign} = this.data.pay
    console.log(timeStamp,nonceStr,signType,paySign);
    //发起支付
    wx.requestPayment({
      timeStamp,
      nonceStr,
      package:this.data.pay.package,
      signType,
      paySign,
      success: (result) => {
        console.log(result);
      },
      fail: () => {},
      complete: () => {}
    });
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
    const arr = cartData.filter(item => {
      return item.goods_checked === true
    })
    // console.log(arr);
    //获取总价格
    let totalPrice = this.data.totalPrice
    arr.forEach(item => {
      totalPrice += item.goods_count * item.goods_price
    })
    //存入数据
    this.setData({
      address,
      cartData: arr,
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