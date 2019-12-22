// pages/goods_detail/index.js
const app = getApp()
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    introduce: '',
    active:false
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
  //收藏商品
  addCollect(){
    const collectArr = wx.getStorageSync('collectArr')||[]
    let active = this.data.active
    const goodsIndex = collectArr.findIndex(item=>{
      //如果有就返回索引值，没有返回的是-1
      return item.goods_id===this.data.detailData.goods_id
    })
    //没有就添加
    if(goodsIndex===-1){
        //获取需要的数据
      const{
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo
      }=this.data.detailData
      //添加到数组中
      collectArr.push({goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        active:!active})
      //消息提示
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1500,
        success: (result)=>{
          active=!active
          this.setData({active})
          //存入本地
          wx.setStorageSync('collectArr',collectArr)
        },
      });
    }else{
      collectArr.splice(goodsIndex,1)
        //消息提示
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 1500,
        success: (result)=>{
          active=!active
          this.setData({active})
          //存入本地
          wx.setStorageSync('collectArr',collectArr)
        },
      });
    }
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
  onLoad: async function (options) {
    const {
      goods_id
    } = options
    await app.myRequest({
      url: "goods/detail",
      data: {
        goods_id: goods_id
      },
    }).then(res=>{
      this.setData({
        detailData: res,
        // 富文本详情内容，由于 ios 系统不支持 webp 图片格式，替换成 jpg 格式
        introduce: res.goods_introduce.replace(/jpg.+?webp/g, 'jpg')
      })
    })
    /* await wx.request({
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
    }) */
    //从本地获取商品是否有收藏
    const collectArr = wx.getStorageSync('collectArr');
    //用filter遍历数组
    let arr = collectArr.filter(item=>{
      if(item.goods_id===this.data.detailData.goods_id){
        return true
      }
    })
    if(arr.length){
      this.setData({
        active:arr[0].active
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