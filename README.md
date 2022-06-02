# 说明：

一个极其简单的购物微信小程序demo，用来练手的，很多地方都有现成的api可以调用。

后端采用json-server，前端使用原生小程序组件。

# 开发历程：

## 第一天：

### json-server静态资源：

传送门：

[typicode/json-server：在不到30秒的时间内获得一个完整的假REST API，零编码（认真） (github.com)](https://github.com/typicode/json-server#static-file-server)

db.json同级目录下放一个public文件夹就行，里面放我们的静态资源，可以用url访问到

### 图片缩放：

我看了官方案例感觉很玄学，自己调试一下最好。

传送门：[image | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)

### json-server 响应头**X-Total-Count**：

我们使用_page和_limit进行拆分数据的时候，相应投有一个X-Total-Count字段可以告诉我们一共有多少条数据。

https://github.com/typicode/json-server#slice



### 用户下拉刷新页面：



### 引入第三方组件：

npm安装好对应组件后，点击微信开发者工具菜单栏的工具，选择构建npm

传送门：

[小程序扩展组件库 | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/component-plus/)

[引入@miniprogram-component-plus/sticky报错不存在？ | 微信开放社区 (qq.com)](https://developers.weixin.qq.com/community/develop/doc/000ae818344d10d79a8b6ac765b400)



### sticky有bug：

[在模拟器中,只在Iphone5中测试生效其余机型测试都不生效 · Issue #40 · wechat-miniprogram/miniprogram-component-plus (github.com)](https://github.com/wechat-miniprogram/miniprogram-component-plus/issues/40)



### 跳转页面：

```js
	// wx.navigateTo , can not navigateTo a tabbar page
    // wx.redirectTo ,关闭当前页面
    // wx.switchTab ，I can navigateTo a tabbar page
```

取传递的数据就在目标也options里面

```js
 /**
     * 生命周期函数--监听页面加载
     */
onLoad: function (options){
}
```

传送门：[wx.navigateTo(Object object) | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

### 图片预览：

传送门：[wx.previewImage(Object object) | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html)

### 引入weui的searchbar：

引入方法：[WeUI组件库简介 | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/weui/)

使用：官方文档没有案例可考……

传送门：

[Searchbar | wechat-miniprogram / weui](https://wechat-miniprogram.github.io/weui/docs/search.html#代码引入)

[(26条消息) 微信小程序searchbar搜索功能的使用_m0_59933933的博客-CSDN博客_小程序searchbar](https://blog.csdn.net/m0_59933933/article/details/120578682)