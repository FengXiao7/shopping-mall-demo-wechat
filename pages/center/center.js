import CheckAuth from '../../util/auth'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{}
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        CheckAuth(()=>{
           this.setData({
                userInfo:wx.getStorageSync('token')
           })  
        })
    },
    handleTap(){
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            success:(res)=> {
                this.setData({
                    userInfo:{...this.data.userInfo,avatarUrl:res.tempFiles[0].tempFilePath}
                })
                wx.setStorageSync('token', {
                    ...wx.getStorageSync('token'),
                    avatarUrl:res.tempFiles[0].tempFilePath
                })
            }
          })
       
    }

    
})