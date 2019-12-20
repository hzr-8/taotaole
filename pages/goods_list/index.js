// pages/goods_list/index.js
const app = getApp()
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData:{},
    tabIndex:0,
    pagenum:1,
    query:'',
    cid:0
  },
  changeTab(e){
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
    const {cid,query} = options
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
      url:'goods/search',
      data:{
        query,
        cid,
        pagenum:this.data.goodsData.pagenum,
        pagesize:10
      }
    }).then(res=>{
      console.log(res);
      this.setData({
        goodsData:res,
        pagenum:res.pagenum,
        cid,
        query
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
    console.log('下拉刷新');
    app.myRequest({
      url:'goods/search',
      data:{
        query:this.data.query,
        cid:this.data.cid,
        pagenum:this.data.pagenum,
        pagesize:10
      }
    }).then(res=>{
      console.log(res);
      this.setData({
        goodsData:res,
        pagenum:res.pagenum
      })
    })
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