import oneIcon from "../../../../assets/images/ex.png";
import twoIcon from "../../../../assets/images/text.png";
import threeIcon from "../../../../assets/images/ic.png";
import fourIcon from "../../../../assets/images/add.png";

export const bottomList = [
  { icon: oneIcon, name: "换模板" },
  { icon: twoIcon, name: "换文字" },
  { icon: threeIcon, name: "换图片" },
  { icon: fourIcon, name: "添加" },
];


export const colors = [
  "transparent",
  "#000",
  "#fff",
  "#F12",
  "#06c",
  "#27d",
  "#35a",
  "#D22",
  "#ea4",
  "#bf4",
  "#ac9",
  "#de2",
  "#d99",
  "#b2b",
  "#c4c",
  "#a1a",
  "#d9d",
  "#efe",
  "#bbb",
  "#ccc",
  "#abc",
];
// 字体
export const iosFonts = [
  "华康金刚黑",
  "汉体",
  "造字工房云川体",
  "锐字潮牌真言",
];

// 滤镜
export const fitterList = [
  { name: "模糊", key: "blur", type: "Blur" },
  { name: "灰度", key: "grayscale", type: "Grayscale" },
  { name: "亮度", key: "brightness", type: "Brightness" },
  { name: "对比度", key: "contrast", type: "Contrast" },
  { name: "饱和度", key: "saturation", type: "Saturation" },
];

export interface CommonCanvasChildrenType {
  show: boolean;
  canvasRef: any;
  onClose: () => void;
}
