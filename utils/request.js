const baseURL = 'https://api.zbztb.cn/api/public/v1/';

export const myRequest = (params) => {
  // 显示加载框
  wx.showLoading({
    title: '网管，好卡啊...',
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
        // 在手机里面，还有主动调用隐藏加载的API
        wx.stopPullDownRefresh();
      }
    });
  })

}