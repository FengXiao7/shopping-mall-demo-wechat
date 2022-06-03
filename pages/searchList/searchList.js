import request from '../../util/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsList:[]
    },
    // 价格降序true
    priceOrder:true,
    // 好评率降序true
    commentOrder:true,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
          title: options.title,
        })
        this.getCategoryList(options.id)
    },
    // 获取某分类下的所有产品
    getCategoryList(id){
        request({
            url:`/categories/${id}?_embed=goods`,
            method:"GET"
        }).then(res=>{
            this.setData({
                goodsList:res.goods
            })
        })
    },
    // 点击产品，跳转到详情页
    handleTap(event){
        var id = event.currentTarget.dataset.id
        var title = event.currentTarget.dataset.title

        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}&title=${title}`,
        })
    },
    // 好评率排序
    handleComment(){
        this.commentOrder=!this.commentOrder
        this.setData({
            goodsList:this.commentOrder?this.data.goodsList.sort((item1,item2)=>parseInt(item1.goodcomment)-parseInt(item2.goodcomment)):this.data.goodsList.sort((item1,item2)=>parseInt(item2.goodcomment)-parseInt(item1.goodcomment))
        })
    },
    // 价格排序
    handlePrice(){
        this.priceOrder=!this.priceOrder
        this.setData({
            goodsList:this.priceOrder?this.data.goodsList.sort((item1,item2)=>item1.price-item2.price):this.data.goodsList.sort((item1,item2)=>item2.price-item1.price)
        })
    }
})