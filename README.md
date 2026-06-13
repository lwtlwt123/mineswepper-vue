# MinesweerperGame

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


<!-- 6.8调整 -->
文档方式
<!--  
    bug
 -->
点击打开过的格子还可以右键(解决) 2026.5.25
已标记会被自动递归顶掉状态(好像解决)

开始点击右键报错 不影响游戏 需修复 （已修复）

清除定时器（修复）

偶尔报错 gridlist 没有值
专家难度  数组遍历递归有问题 很多问题（修改）

计时器还剩停止计时一点没写完

修改清除定时器逻辑 加上切换页面判断清除传值
大量修改easylevel js 内容 重新构建剩余页面 还有bug

修改计时器切换不停止问题  基本ai解决

重新开始之后计时器不动了 (解决)

修复 右键点击直接显示所有雷的bug
修复游戏成功状态没有改变的bug

增加 数据记录功能





<!-- 
    优化
 -->
 扫雷算法不明确，游戏难度高，需优化 看5.25 能否完成（完成）2026.5.25

 双击数字 如果此时数字的雷已全部标记 打开剩余格子 （弃置）
 成功判断（完成）
 计时器 计步器 样式 难度 （80%）

修改计时器样式（完成）

结束后当前难度要重启成当前难度 （完成）

登陆页面样式登陆逻辑 连接数据库 接口（完成）

登录页面提示    （完成）


保持登陆状态
整理文档

token完成一半

 <!-- 
 日期
  -->

  2026.5.24 简单页面功能80%完成
  2026.5.25 简单页面功能90%完成 页面调整
  2026.5.28 所有页面功能80%完成 页面调整
  2026.5.29 所有页面功能90%完成 页面调整

 2026.06.04 接入登陆功能