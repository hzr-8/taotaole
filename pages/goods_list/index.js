// pages/goods_list/index.js
const app = getApp()
// 在需要使用到  async await 的 js 中，手动引入 runtime.js， regeneratorRuntime 名字不能改
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {},
    tabIndex: 0,
    pagenum: 1,
    query: '',
    cid: 0,
    goods: [],
    total: 0,
    pagesize:10
  },
  changeTab(e) {
    // console.log(e);
    const tabIndex = +e.currentTarget.dataset.index
    this.setData({
      tabIndex
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const {
      cid,
      query
    } = options
    // console.log(cid);
    /* wx.request({
      url:'https://api.zbztb.cn/api/public/v1/goods/search',
      data:{
        query,
        cid,
        pagenum:this.data.goodsData.pagenum,
        pagesize:10
      },
      success:res=>{
        console.log(res);
        this.setData({
          goodsData:res.data.message
        })
      }
    }) */
    app.myRequest({
      url: 'goods/search',
      data: {
        query,
        cid,
        pagenum: this.data.goodsData.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res => {
      console.log(res);
      this.setData({
        goodsData: res,
        pagenum: res.pagenum,
        cid,
        query,
        goods: res.goods,
        total: res.total
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
    //下拉刷新重置pagenum
    this.data.pagenum = 1
    console.log('下拉刷新');
    app.myRequest({
      url: 'goods/search',
      data: {
        query: this.data.query,
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      console.log(res);
      this.setData({
        goodsData: res,
        pagenum: res.pagenum,
        goods: res.goods
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉加载");
    if (this.data.pagenum < Math.ceil(this.data.total / this.data.pagesize)) {
      //页面先加1
      this.setData({
        pagenum: ++this.data.pagenum
      })
      app.myRequest({
        url: 'goods/search',
        data: {
          query: this.data.query,
          cid: this.data.cid,
          pagenum: this.data.pagenum,
          pagesize: 10
        }
      }).then(res => {
        console.log(res);
        this.setData({
          goodsData: res,
          pagenum: res.pagenum,
          goods: this.data.goods.concat(res.goods)
        })
      })
    } else {
      //弹出提示框
      wx.showToast({
        title: "我是有底线的!",
        icon:"none"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})