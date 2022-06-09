import request from '../../util/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tel: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 设置手机号
    formInputChange(event) {
        this.setData({
            tel: event.detail.value
        })
    },
    // 确认提交表单
    submitForm() {
        wx.setStorageSync('tel', this.data.tel)
        // 先看看有无该用户通过手机号和别名联合判断，没有就插入新用户
        request({
            url: `/users?tel=${this.data.tel}&nickName=${wx.getStorageSync('token').nickName}`,
            method: "GET"
        }).then(res => {
            // 新用户
            if (res.length === 0) {
                wx.showToast({
                    title: '成功绑定手机号',
                    duration: 2000,
                    success: () => {
                        setTimeout(() => {
                            request({
                                url: "/users",
                                method: "post",
                                data: {
                                    ...wx.getStorageSync('token'),
                                    tel: this.data.tel
                                }
                            }).then(res => {
                                wx.navigateBack({
                                    delta: 2,
                                })
                            })
                        }, 2000)

                    }
                })
            } else { //老用户
                wx.showToast({
                    title: '你已经绑定过该手机号,无需认证',
                    icon: "none",
                    duration: 2000,
                    success: () => {
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 2,
                            })
                        }, 2000)
                    }
                })
            }
        })
    }
})