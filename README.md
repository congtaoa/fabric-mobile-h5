

# fabric-mobile-h5

低仿`创客帖-制作-设计页`功能。基于 fabric.js 和 taro-react 开发的`移动端`图片编辑器，可自定义字体、图片滤镜、设计模板，导入，导出等。

*  Taro(3.6.13)环境目前只适配了h5模式。
*  全局React Hooks组件式开发



![预览1](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2d83a9b58474655903e1abd1f67ce10~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=352&h=762&e=gif&f=508&b=fefefe)



![n2.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9311389a1ef4431a95557739b65c68f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=360&h=744&e=gif&f=785&b=1a1a1a)

## 已有功能

[功能介绍文章](https://juejin.cn/post/7222141882515128375) 文字 + 动图。

*   保存为 PNG、JSON 文件
*   读取JSON模板
*   预览
*   插入文字/图片
*   复制
*   自定义字体，样式
*   字体模板
*   位置微调
*   图层及顺序调整
*   撤销/重做
*   背景属性设置
*   透明度
*   辅助线
*   图片替换
*   图片滤镜
*   图片翻转


### 安装运行
##### 环境
* node 14.18+
* taro 3.6.13
* react 18+

##### 1.推荐pnpm 安装依赖(国内建议增加淘宝镜像源)

##### 2.启动项目

```
pnpm run dev:h5
```

##### 3.打包项目

```
pnpm run build:h5
```


## TODO
*   [ ] 文字排列
*   [ ] 画布手势缩放
*   [ ] 图片裁剪
*   [ ] 字体大小优化

