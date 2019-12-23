const baseURL = 'https://api.zbztb.cn/api/public/v1/';

export const myRequest = (params) => {
   // v2.0 如果有 header 就直接使用，没有就赋值空对象
   params.header = params.header || {};
   // v2.0 检查 url 的字符串中是否包含了 my/ 路径，如果包含，就在请求头带上token
   if (params.url.includes('my/')===true){
     params.header.Authorization = wx.getStorageSync('token');
   }
  // 显示加载框
  wx.showLoading({
    title: '玩命加载中...',
  });
  return new Promise((resolve, reject) => {
    // 发起请求
    wx.request({
      //结构所有参数
      ...params,
      url: baseURL + params.url,
      // 请求成功的回调函数
      success: res => {
        //对应.then(res=>{})
        resolve(res.data.message);
      },
      // 请求失败的回调函数
      fail: error => {
        //对应.catch(error=>{})
        reject(error);
      },
      // 完成，不管成功还是失败都执行
      complete: () => {
        // 不管成功还是失败都执行隐藏提示框
        wx.hideLoading();
        // 下拉刷新结束
        wx.stopPullDownRefresh();
        //隐藏导航栏刷新小菊花
        wx.hideNavigationBarLoading();
      }
    });
  })

}