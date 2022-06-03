// pages/category/category.js
import request from '../../util/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vtabs:[],
    activeTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url:"/categories?_embed=goods"
    }).then(res=>{
      this.setData({
        vtabs:res
      })
    })
  },

  handleTap(evt){
    console.log(evt.currentTarget.dataset.id)
    var id = evt.currentTarget.dataset.id
    var title = evt.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  }
})