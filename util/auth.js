// 1. 判断本地存储是否有手机号信息，如果有执行回调
// 2. 没有手机号，判断是否有token信息，如果有，引导调整手机号绑定
// 3 没有token授权信息， 我们让用户授权
function CheckAuth(callback){
	if(wx.getStorageSync('tel')){
	  //处理业务
	  callback()
	}else{
		// 有token完善手机号
	  if(wx.getStorageSync('token')){
		wx.navigateTo({
		  url: '/pages/telform/telform',
		})
	  }else{
		//   没有token先完善token
		wx.navigateTo({
		  url: '/pages/auth/auth',
		})
	  }
	}
  }
  
  export default CheckAuth