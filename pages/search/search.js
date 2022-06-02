import request from '../../util/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            search: this.search.bind(this)
        })
    },

    search(value) {
        // 有两种情况：1：商品分类title字段模糊匹配关键字 
        //2：商品详情title字段模糊匹配关键字
        //两种情况跳转页面不同，用type字段区分
        return Promise.all(
            [
                request({
                    url: `/categories?title_like=${value}`
                }),
                request({
                    url: `/goods?title_like=${value}`
                })
            ]
        ).then(res => (
            [
                ...res[0].map(item => ({
                    ...item,
                    text: item.title,
                    type: 1
                })),
                ...res[1].map(item => ({
                    ...item,
                    text: item.title,
                    type: 2
                })),
            ]
        ))
    },
    // 点击搜索项跳转
    selectResult(e) {
        // console.log('select result', e.detail.item)
        // type====1,跳转至商品分类;type===2，跳转至商品详情
        if (e.detail.item.type === 1) {
            wx.navigateTo({
                url: `/pages/searchList/searchList?id=${e.detail.item.id}&name=${e.detail.item.title}`,
            })
        } else {
            wx.navigateTo({
                url: `/pages/detail/detail?id=${e.detail.item.id}&title=${e.detail.item.title}`,
            })
        }
    }
})