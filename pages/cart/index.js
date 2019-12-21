// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArr:[],
    totalMoney:0,
    totalCount:0,
    checkAll: false
  },
  //获取收获地址
  getAddressHandle(){
    //获取用户授权
    wx.getSetting({
      success: (result)=>{
        console.log(result);
        console.log(result.authSetting);
        console.log(result.authSetting['scope.address'])
        // 如果用户点击了拒绝，需要引导用户重新在设置界面开启，否则收货地址接口无法调用
        if (result.authSetting['scope.address'] === false){
          // 打开用户设置界面
          wx.openSetting({
            success:res=>{
              // console.log(res);
              // 如果用户在设置界面开启了授权
              if (res.authSetting['scope.address'] === true){
                // // 通过 API 方式调用收货地址
                wx.chooseAddress({

                })
              }
            }
          });
        }
        // false      !!授权窗口点击了取消-用户拒绝了授权 - 打开设置界面 - 让用户点击开启授权
        // undefined  从来没有调用过授权请求的情况
        // true       授权窗口点击了确定-用户授权了
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    // 通过 API 方式调用收货地址
    wx.chooseAddress({

    })
  },
  //加减数量事件
  changeCount(e){
    // console.log(e);
    const{
      number,
      index,
    } = e.currentTarget.dataset;
    //获取列表数据
    const {cartArr} = this.data
    //判断数量不能为负数
    if(cartArr[index].goods_count===1&&number===-1){
      wx.showModal({
        content: '你真的不要我了吗',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            //删除商品
            cartArr.splice(index,1)
            // 更新数据
            this.updateCart(cartArr);
          }
        },
      });
    }else{
      //改变number数量
      cartArr[index].goods_count += number
      this.updateCart(cartArr)
    }
  },

  //改变选中状态
  changeCheck(e){
    const{
      //当前商品索引值
      index
    } = e.currentTarget.dataset
    const{cartArr} = this.data
     // 改变按钮选中状态
    cartArr[index].goods_checked = !cartArr[index].goods_checked;

     // 调用更新方法
     this.updateCart(cartArr);
  },

   // 全选按钮
   changeCheckAll() {
    let {
      checkAll,
      cartArr
    } = this.data;
    cartArr.forEach(v => {
        v.goods_checked = !checkAll;
      });
    this.updateCart(cartArr);
  },

  //更新总价格，总数量，本地存储
  updateCart(cartArr){
    let totalCount = 0
    let totalMoney = 0
    // 遍历cartArr
    cartArr.forEach(v=>{
      if(v.goods_checked){
        totalMoney += v.goods_count * v.goods_price;
        ++totalCount;
      }
    });
    this.setData({
      totalCount,
      totalMoney,
      cartArr,
      checkAll:cartArr.length===totalCount
    })
    //更新本地存储
    wx.setStorageSync('cartArr',cartArr)
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
    const cartArr = wx.getStorageSync('cartArr') || [];
    this.setData({
      cartArr
    })
    console.log(this.data.cartArr);
    this.updateCart(cartArr)
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