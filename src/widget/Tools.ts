/*
 * 工具类
 */
import Taro from "@tarojs/taro";
import {intersectionWith, isEqual } from "lodash-es";
import FontFaceObserver from "../widget/font-face-observer";
import { iosFonts } from "../pages/index/twoItem/typeList";
import { getSystemInfo } from "./util";

export const isSpecial = (n: number | string): boolean => {
  n = n.toString();
  const pattern =
    /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
  if (pattern.test(n)) {
    return true;
  }
  return false;
};

// let ran = navigator.userAgent
// let isAndroid = ran.indexOf('Android') > -1 || ran.indexOf('Linux') > -1
// let isIOS = !!ran.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

export const getNavHeight = (): number => {
  const systemInfo = getSystemInfo();
  // 胶囊按钮位置信息
  const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();
  // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
  let _navBarHeight =
    (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
      menuButtonInfo.height +
      systemInfo.statusBarHeight || 0;
  return _navBarHeight;
};

/**
 * 判断null
 * @param obj
 * @returns {boolean}
 */
export const isNull = (obj) => {
  if (!obj) {
    return true;
  }
  if (typeof obj === "undefined") {
    return true;
  }
  if (obj === null) {
    return true;
  }
  if (obj === "") {
    return true;
  }
  if (obj.length === 0) {
    return true;
  }
  return false;
};

export const testUA = (str) => {
  return navigator.userAgent.indexOf(str) > -1;
};

export const isIPhoneX = () => {
  if (process.env.TARO_ENV === "h5") {
    return (
      (window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.width === 375 &&
        testUA("iPhone")) ||
      (window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.width === 414 &&
        window.screen.height === 896 &&
        testUA("iPhone")) ||
      (window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.height === 844 &&
        testUA("iPhone")) ||
      (window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.height === 926 &&
        testUA("iPhone")) ||
      (window.devicePixelRatio &&
        window.devicePixelRatio === 3 &&
        window.screen.height === 780 &&
        testUA("iPhone"))
    );
  }
  const { model } = Taro.getSystemInfoSync();
  return (
    model.search("iPhone X") != -1 ||
    model.search("11") != -1 ||
    model.search("12") != -1 ||
    model.search("13") != -1 ||
    model.search("14") != -1 ||
    model.search("15") != -1
  );
};

/**
 * 生成guid
 */
export const guid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const getQueryString = (name: string, url: string): string => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (!url || url == "") {
    url = window.location.href;
  }
  url = url.substring(url.lastIndexOf("?"));
  let r = url.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return "";
};

// 判断数组中是否包含某个对象
export const findItem = (arr, key, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == val) {
      return i;
    }
  }
  return -1;
};

// 手动拼接FormData字符串
// 函数边界处理没怎么做，各位可自行补充
// 数组和obj的情况没有处理，可以用postman发个请求看看格式，很简单的
export const createFormData = (values = {}, boundary = "") => {
  let result = "";

  for (let i in values) {
    result += `\r\n--${boundary}`;
    result += `\r\nContent-Disposition: form-data; name="${i}"`;
    result += "\r\n";
    result += `\r\n${values[i]}`;
  }

  // 如果obj不为空，则最后一行加上boundary
  if (result) {
    result += `\r\n--${boundary}`;
  }

  return result;
};

// 生成一个boundary字符串
// const boundary = `----FooBar${new Date().getTime()}`;
// const formData = createFormData(values, boundary);

// const { data } = await Taro.request({
//  url: "****",
//  method: "POST",
//  data: formData,
//  header: {
//    Accept: "application/json",
//    "Content-Type": `multipart/form-data; boundary=${boundary}`
//  }
// });

//绘制箭头方法
export const drawArrow = (
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  theta: number,
  headlen: number
) => {
  theta = typeof theta != "undefined" ? theta : 30;
  headlen = typeof theta != "undefined" ? headlen : 10;
  // 计算各角度和对应的P2,P3坐标
  let angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
    angle1 = ((angle + theta) * Math.PI) / 180,
    angle2 = ((angle - theta) * Math.PI) / 180,
    topX = headlen * Math.cos(angle1),
    topY = headlen * Math.sin(angle1),
    botX = headlen * Math.cos(angle2),
    botY = headlen * Math.sin(angle2);
  let arrowX = fromX - topX,
    arrowY = fromY - topY;
  let path = " M " + fromX + " " + fromY;
  path += " L " + toX + " " + toY;
  arrowX = toX + topX;
  arrowY = toY + topY;
  path += " M " + arrowX + " " + arrowY;
  path += " L " + toX + " " + toY;
  arrowX = toX + botX;
  arrowY = toY + botY;
  path += " L " + arrowX + " " + arrowY;
  return path;
};

//坐标转换
export const transformMouse = (mouseX: number, mouseY: number) => {
  return { x: mouseX, y: mouseY };
};

export const download = (url: string, filename: string, cb?: Function) => {
  // 具体实现方案参考微信公众号《趣谈前端》- iframe跨页通信和前端实现文件下载
  return fetch(url).then((res) =>
    res.blob().then((blob) => {
      let a = document.createElement("a");
      let urls = window.URL.createObjectURL(blob);
      a.href = urls;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(urls);
      cb && cb();
    })
  );
};

/**
 * @description: 根据json模板下载字体文件
 * @param {String} str
 * @return {Promise}
 */
export function downFontByJSON(str) {
  // const skipFonts = iosFonts;
  const objectFamilys = str.objects
    .filter((item) => {
      // 为text
      return item.type.includes("text");
    })
    .map((item) => item.fontFamily);
  // 剔除iosFonts中未有的字体
  const fontFamilys = intersectionWith(objectFamilys, iosFonts, isEqual);
  const fontFamilysAll = fontFamilys.map((fontName) => {
    const font = new FontFaceObserver(fontName);
    return font.load(null, 150000);
  });
  return Promise.all(fontFamilysAll);
}
