// pages/auth/auth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    handleTap(){
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success:(res)=>{
          wx.setStorageSync('token', res.userInfo)
          wx.navigateTo({
          url: '/pages/telform/telform',
          })
        },
        fail:()=>{
          wx.showToast({
            title: '请授权',
            icon:"none"
          })
        }
      })
    }
})