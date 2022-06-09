//params:参数对象，
//isGetTotalCount:是否需要响应头里面的X-Total-Count
function request(params,isGetTotalCount=false) {
	return new Promise((resolve, reject) => {
		wx.showLoading({
			title: '加载中',
		})
		wx.request({
			...params,
			url: "http://localhost:5000"+params.url,
			success: (res) => {
				if(isGetTotalCount){
					resolve({
						list:res.data,
						// 注意原来是字符串形式的数字
						total:+res.header['X-Total-Count']
					})
				}else{
					resolve(res.data)
				}
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				wx.hideLoading()
			}
		})
	})
}

export default request