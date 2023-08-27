import { useState, FC, memo } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView, Image } from "@tarojs/components";
import "../twoItem/index.scss";
import icon1 from "../../../assets/images/1.png";
import icon2 from "../../../assets/images/dis.png";
import icon3 from "../../../assets/images/5.png";
import icon4 from "../../../assets/images/fz1.png";
import icon7 from "../../../assets/images/copy.png";
import icon8 from "../../../assets/images/mul.png";
import icon9 from "../../../assets/images/jian.png";
import icon10 from "../../../assets/images/lvj.png";
import { isIPhoneX } from "../../../widget/Tools";
import FlipComponent from "./flip";
import ArrowComponent from "../twoItem/arrow";
import LayerComponent from "../twoItem/layer";
import TranComponent from "../twoItem/transparent";
import FitterComponent from "./fitter";

const ThreeItemComponent: FC<{
  canvasRef: any;
}> = ({ canvasRef }) => {
  const list = [
    { icon: icon7, name: "复制" },
    { icon: icon1, name: "换图" },
    { icon: icon9, name: "裁剪" },
    { icon: icon10, name: "滤镜" },
    { icon: icon8, name: "图层" },
    { icon: icon4, name: "翻转" },
    { icon: icon3, name: "透明度" },
    { icon: icon2, name: "微调" },
  ];

  const [showFitter, setShowFitter] = useState<boolean>(false);
  const [showSmall, setSmall] = useState<boolean>(false);
  const [showFlip, setShowFlip] = useState<boolean>(false);
  const [showLayer, setShowLayer] = useState<boolean>(false);
  const [isOpacity, setOpacity] = useState<boolean>(false);

  const paste = (_clipboard) => {
    _clipboard.clone(function (clonedObj) {
      canvasRef.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 20,
        top: clonedObj.top + 20,
        evented: true,
      });
      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = canvasRef;
        clonedObj.forEachObject(function (obj) {
          canvasRef.add(obj);
        });
        clonedObj.setCoords();
      } else {
        canvasRef.add(clonedObj);
      }
      _clipboard.top += 20;
      _clipboard.left += 20;
      canvasRef.setActiveObject(clonedObj);
    });
  };

  const itemIndexTap = (index: number) => {
    const activeObj = canvasRef.getActiveObject();
    switch (index) {
      case 0:
        activeObj.clone(function (cloned) {
          paste(cloned);
        });
        canvasRef.renderAll();
        break;
      case 1:
        Taro.chooseImage({
          count: 1,
          sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            const tempFiles = res.tempFiles;
            if (tempFiles[0].originalFileObj) {
              const reader = new FileReader();
              reader.readAsDataURL(tempFiles[0].originalFileObj);
              // 图片文件完全拿到后执行
              reader.onload = () => {
                // 转换成base64格式
                const base64Img = reader.result;
                activeObj.setSrc(base64Img, () => {
                  canvasRef.renderAll();
                });
              };
            }
          },
        });
        break;
        break;
      case 2:
        // 裁剪
        break;
      case 3:
        // 滤镜
        setShowFitter(true);
        break;
      case 4:
        setShowLayer(true);
        break;
      case 5:
        setShowFlip(true);
        break;
      case 6:
        setOpacity(true);
        break;
      case 7:
        setSmall(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <View
        className="two-item-com"
        style={{
          height: isIPhoneX() ? "108px" : "80px",
          paddingBottom: isIPhoneX() ? "28px" : "8px",
        }}
      >
        <ScrollView className="scroll-x-view" scrollX scrollWithAnimation>
          {list.map((item: any, index: number) => (
            <View
              style={{ display: "inline-block" }}
              key={item.name}
              onClick={() => itemIndexTap(index)}
            >
              <View className="bottom-item-child-col">
                <Image src={item.icon} className="bottom-item-child-img" />
                <Text className="bottom-item-child-title">{item.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TranComponent
          typeKey="Image"
          show={isOpacity}
          onClose={() => setOpacity(false)}
          canvasRef={canvasRef}
        />
        <ArrowComponent
          show={showSmall}
          onClose={() => setSmall(false)}
          canvasRef={canvasRef}
        />
        <LayerComponent
          show={showLayer}
          onClose={() => setShowLayer(false)}
          canvasRef={canvasRef}
        />
        <FlipComponent
          show={showFlip}
          onClose={() => setShowFlip(false)}
          canvasRef={canvasRef}
        />
        <FitterComponent
          show={showFitter}
          onClose={() => setShowFitter(false)}
          canvasRef={canvasRef}
        />
      </View>
    </>
  );
};

export default memo(ThreeItemComponent);
