import request from '../../util/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailInfo:{},
        current:0,
        commentList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: options.title,
        })
        this.getDetailInfo(options.id)
        this.getCommentInfo()
    },
    // 获取商品详细信息
    getDetailInfo(id){
      request({
        url:`/goods/${id}`,
        method:"GET"
      }).then(res=>{
        this.setData({
          detailInfo:res
        })
      })
    },
    //点击图片预览
    handleTap(event){
      wx.previewImage({
        current:event.currentTarget.dataset.current,
        urls: this.data.detailInfo.slides.map(item=>`http://localhost:5999${item}`)
      })
    },
    handleActive(event){
      this.setData({
        current:event.currentTarget.dataset.current
      })
    },
    // 获取评论信息
    getCommentInfo() {
      request({
        url: "/comments"
      }).then(res => {
        this.setData({
          commentList: res
        })
      })
    },
})