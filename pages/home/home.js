import request from '../../util/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loopList: [],
        goodsList: []
    },
    // renderGoods所需参数，加载第几页
    current: 1,
    // onReachBottom使用，判断是否加载完了所有数据
    total: 0,
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.renderSwiper(),
            this.renderGoods()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.data.goodsList.length === this.total) {
            return
        }
        this.current++
        this.renderGoods()
    },
    // 渲染轮播图片
    renderSwiper() {
        request({
            url: '/recommends',
            method: 'GET'
        }).then(res => {
            this.setData({
                loopList: res
            })
        })
    },
    // 加载商品
    renderGoods() {
        request({
            url: `/goods?_page=${this.current}&_limit=5`,
            method: "GET"
        }, true).then(res => {
            this.total = res.total
            this.setData({
                goodsList: [...this.data.goodsList, ...res.list]
            })
        })
    },
    // 跳转至详情页,携带id和title
    changePage(event) {
        var id = event.currentTarget.dataset.id
        var title = event.currentTarget.dataset.title

        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}&title=${title}`,
        })
    },
    // 点击搜索框，跳转到搜索页面
    handleEvent() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
})