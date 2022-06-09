# 说明：

- 一个极其简单的购物微信小程序demo，用来练手的，很多地方都有现成的api可以调用，主要熟悉下开发流程

- 后端采用json-server，前端使用原生小程序组件和官方的weui组件库。

（weui组件库文档不是很完善。推荐看w3c的文档，有案例代码，会好很多。[微信小程序 WeUI·快速上手_w3cschool](https://www.w3cschool.cn/weixinapp/weixinapp-5f1j38oz.html)）

- 因为是练手项目，数据库的设计也不是很合理，比如所有商品的评论都是一样的。
- 也有很多重复的请求，暂时没有避免。

# 启动：

在db文件夹下启动json-server服务器：json-server --watch .\db.json -p 5000

# 疑问：

## event.currentTarget和event.target区别？

传送门：[e.target与e.currentTarget - 简书 (jianshu.com)](https://www.jianshu.com/p/77f94e5cad45)

## 什么时候把数据写在data里面，什么时候又写在外面？

我的感觉是页面需要的数据写在data里面，调用方法需要的数据写在外面。

# 开发历程：

## 第一天：

### json-server静态资源：

传送门：

[typicode/json-server：在不到30秒的时间内获得一个完整的假REST API，零编码（认真） (github.com)](https://github.com/typicode/json-server#static-file-server)

db.json同级目录下放一个public文件夹就行，里面放我们的静态资源，可以用url访问到

### 图片缩放：

我看了官方案例感觉很玄学，mode太多了，自己调试一下最好。

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

取传递的数据就在目标的options里面

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

## 第二天：

### vtabs：

官方文档没有案例可考，而且这个组件有严重bug

官方：[miniprogram-component-plus/vtabs.md at master · wechat-miniprogram/miniprogram-component-plus (github.com)](https://github.com/wechat-miniprogram/miniprogram-component-plus/blob/master/docs/vtabs.md)

可以找这篇博客解决：[(27条消息) 微信小程序vtabs源码分析解决组件滑动跳转混乱或不准确bug_ZGIT的博客-CSDN博客](https://blog.csdn.net/u014299266/article/details/114632000)

基础使用传送门：[(27条消息) 小程序vtabs_weixin_40790248的博客-CSDN博客_v-tabs](https://blog.csdn.net/weixin_40790248/article/details/123642504)

### 本地存储：

和h5的差不多

传送门：[存储 | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/storage.html)

### 获得用户授权：

这个有一个api：getUserProfile

传送门：[wx.getUserProfile(Object object) | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html)

### （wx.showToast）一闪而过页面跳转的问题：

传送门：[(27条消息) 怎么解决微信小程序提示信息（wx.showToast）一闪而过页面跳转的问题_欧世乐测试开发技术的博客-CSDN博客](https://blog.csdn.net/qq_43576028/article/details/103093032)

### Form表单组件

w3c:[微信小程序 WeUI·Form_w3cschool](https://www.w3cschool.cn/weixinapp/weixinapp-kcyb38p8.html)

官网：[Form | wechat-miniprogram / weui](https://wechat-miniprogram.github.io/weui/docs/form.html#form)

### tabBar和getUserProfile的坑：

一些底部栏是需要用户授权登录时才能查看完整内容，不能直接wx.getUserProfile,需要有一个按钮让用户点击授权才行。而且我是把跳转逻辑写在onShow里面，用户就算点返回，也还是会跳转至授权页面，这样感觉不怎么好，没想到啥好的方法解决。

### 左滑删除mp-slideview：

官网没有案例：[Slideview | wechat-miniprogram / weui](https://wechat-miniprogram.github.io/weui/docs/slideview.html)

w3c上有:[微信小程序 WeUI·Slideview_w3cschool](https://www.w3cschool.cn/weixinapp/weixinapp-4u1d38pd.html)



## 第三天:

### 一个bug：

点击加入购物车或者在购物车里面改变商品数目改变勾选状态，都会自动跳转至首页。我找了很久也不知道原因。

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/151.gif" style="zoom: 100%"></img>

<img src="https://picture-feng.oss-cn-chengdu.aliyuncs.com/img/152.gif" style="zoom: 100%"></img>

无意中发现好像是json-server的原因，我换了一个db.json就没有这个bug了，应该是数据部分有问题吧，还没有排查到详细原因，待会再看看。

### array.every:

太久没用过了，快忘了。全选用这个很方便

[数组方法 (javascript.info)](https://zh.javascript.info/array-methods)

### checkbox是否勾选：

官方推荐用checkbox-group来判断。我们全选这里就不向后台发多次请求了，真实业务情况应该是指向后台发一个请求就行，因为后台是json-server就不奢求了

[checkbox-group | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/component/checkbox-group.html)

### 头像选择：

我没有向后台存储数据，直接使用的是临时文件地址

[wx.chooseMedia(Object object) | 微信开放文档 (qq.com)](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html#功能描述)