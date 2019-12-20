// pages/goods_list/index.js
import {
  myRequest
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData:{},
    tabIndex:0
  },
  changeTab(e){
    // console.log(e);
    const tabIndex = +e.currentTarget.dataset.index
    this.setData({
      tabIndex
    })
  },
  /*  // 封装列表页请求数据
   getGoods(obj) {

    myRequest({
      // url 路径，注意有 goods 
      url: 'goods/search',
      // data 请求的参数
      data: {
        // cid 从分类页过来的 cid 值
        // cid: "5"
        ...obj
      }
    }).then(res => {
      this.setData({
        goodsData: res
      })
    })
  }, */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const {cid,query} = options
    // console.log(cid);
    wx.request({
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
    })
    /* this.getGoods({
      // 传递 cid，根据分类 id 查询数据
      cid
    }); */
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