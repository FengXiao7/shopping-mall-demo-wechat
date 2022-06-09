import request from '../../util/request'
import CheckAuth from '../../util/auth'
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
    //点击图片预览
    handleTap(event){
      wx.previewImage({
        current:event.currentTarget.dataset.current,
        urls: this.data.detailInfo.slides.map(item=>`http://localhost:5000${item}`)
      })
    },
    // 控制激活样式
    handleActive(event){
      this.setData({
        current:event.currentTarget.dataset.current
      })
    },
    //加入购物车回调，需要完善授权信息
    handleAdd(){
      CheckAuth(()=>{
        var tel=wx.getStorageSync('tel')
        var username=wx.getStorageSync('token').nickName
        var goodId=this.data.detailInfo.id
        // 发一个请求看下后台有没有同一个账号买过同一个商品
        request({
          url:'/carts',
          method:"GET",
          data:{
            tel,
            username,
            goodId
          }
        }).then(res=>{
          // 没有买过相关商品，初始化购物车的该商品的购买信息
          if(res.length===0){
            return  request({
              url:'/carts',
              method:"POST",
              data:{
                username,
                tel,
                goodId,
                number:1,
                checked:false
              }
            })
          }
          // 买过同一商品，对应数量加1
          else{
            return request({
              url:`/carts/${res[0].id}`,
              method:"PUT",
              data:{
                ...res[0],
                number:res[0].number+1
              }
            })
          }
        }).then(res=>{
    
          wx.showToast({
            title: '加入购物车成功',
          })
        })
      })
    },
    // 跳转至购物车
    handleChange(){
      wx.switchTab({
        url: '/pages/shopcar/shopcar',
      })
    }
})