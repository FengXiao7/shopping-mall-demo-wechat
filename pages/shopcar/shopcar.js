import CheckAuth from '../../util/auth'
import request from '../../util/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopCartInfo: [],
        slideButtons: [{
            type: 'warn',
            text: '删除'
        }],
    },
    /**
     * 生命周期函数--监听页面显示。检查权限，有就获取购物车信息
     */
    onShow() {
        CheckAuth(() => {
            // 获取当前用户的购物车信息
            var tel = wx.getStorageSync('tel')
            var username = wx.getStorageSync('token').nickName
            request({
                url: `/carts?_expand=good&tel=${tel}&username=${username}`,
                method: "GET"
            }).then(res => {
                this.setData({
                    shopCartInfo: res
                })
            })
        })
    },
    // 每项商品选择框触发回调
    handleTap(event) {
        var item = event.currentTarget.dataset.item
        item.checked = !item.checked
        this.handleChange(item)
    },
    // 数量-
    handleMinus(event) {
        var item = event.currentTarget.dataset.item
        if (item.number === 1) {
            return
        }
        item.number--
        this.handleChange(item)
    },
    // 数量+
    handleAdd(event) {
        var item = event.currentTarget.dataset.item
        item.number++
        this.handleChange(item)
    },
    // 接收一项改变后的商品数据
    handleChange(item) {
        this.setData({
            shopCartInfo: this.data.shopCartInfo.map(s => {
                return s.id === item.id ? item : s
            })
        })
        // console.log(item)
        request({
            url: `/carts/${item.id}`,
            method: "PUT",
            data: {
                "username": item.username,
                "tel": item.tel,
                "goodId": item.goodId,
                "number": item.number,
                "checked": item.checked,
              }
        })
    },
    // 删除回调
    slideButtonTap(event){
        var id = event.currentTarget.dataset.id
        this.setData({
            shopCartInfo:this.data.shopCartInfo.filter(s=>s.id!==id)
        })
        request({
            url:`/carts/${id}`,
            method:"DELETE"
        })
    },
    //全选回调
    handleAll(event){
        // 全反选
        if(event.detail.value.length===0){
            this.setData({
                shopCartInfo:this.data.shopCartInfo.map(item=>({...item,checked:false}))
            })
        }else{//全选
            this.setData({
                shopCartInfo:this.data.shopCartInfo.map(item=>({...item,checked:true}))
            }) 
        }
    }
})