// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    introduce: ''
  },
  //查看图片
  checkPhoto(e) {
    console.log(e);
    wx.previewImage({
      urls: [e.currentTarget.dataset.url]
    })
  },
  //跳转购物车页面
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/index'
    });
  },
  //加入购物车
  addToCart() {
    //从本地存储中获取数据
    const cartArr = wx.getStorageSync('cartArr') || [];
    //注意数组方法findIndex，根据当前商品goods_id查找索引
    const goodsIndex = cartArr.findIndex(item => {
      //goods_id相同的时候，返回索引值
      return item.goods_id === this.data.detailData.goods_id
    });
    console.log("当前商品的索引是", goodsIndex);
    //没有存过的商品，索引就为-1，初始化数据，并把数量goods_count设置为1
    if (goodsIndex === -1) {
      //提取当前商品的核心信息
      const {
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo
      } = this.data.detailData;
      //添加到数组中
      cartArr.push({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        //初始化选中状态
        goods_checked: true,
        //初始化数量为1
        goods_count: 1
      });
    } else {
      //如果有，就数量累加
      cartArr[goodsIndex].goods_count += 1;
    }
    console.log(cartArr);
    //把数据保存到本地存储中
    wx.setStorageSync('cartArr', cartArr);
    //弹窗提示用户添加成功
    wx.showToast({
      title: '加入购物车成功',
      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    wx.request({
      url: "https://api.zbztb.cn/api/public/v1/goods/detail",
      data: {
        goods_id: goods_id
      },
      success: res => {
        this.setData({
          detailData: res.data.message,
          // 富文本详情内容，由于 ios 系统不支持 webp 图片格式，替换成 jpg 格式
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