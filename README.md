

# fabric-mobile-h5

低仿`创客贴-制作-设计页`功能。基于 fabric.js 和 taro-react 开发的`移动端`图片编辑器，可自定义字体、图片滤镜、设计模板，导入，导出等。

*  Taro(3.6.13)环境目前只适配了h5模式。
*  全局React Hooks组件式开发

![预览1](https://github.com/congtaoa/fabric-mobile-h5/assets/18671378/18a13e63-08de-4de7-a5ab-bf436ba16652)

![预览2](https://github.com/congtaoa/fabric-mobile-h5/assets/18671378/3e33c6ae-9579-47cb-82b9-4fcf71350885)

![预览3](https://github.com/congtaoa/fabric-mobile-h5/assets/18671378/c244d2c1-f96a-4f5d-8281-58f23d405ea8)

## 现有功能

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
