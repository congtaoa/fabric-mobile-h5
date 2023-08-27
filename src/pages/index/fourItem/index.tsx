import { FC, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, ScrollView, Image } from "@tarojs/components";
import "../twoItem/index.scss";
import icon1 from "../../../assets/images/bg.png";
import icon2 from "../../../assets/images/ic.png";
import icon3 from "../../../assets/images/qc.png";
import { isIPhoneX } from "../../../widget/Tools";
import ColorComponent from "../twoItem/color";
import { getCanvasWH } from "../../../widget/util";

const FourItemComponent: FC<{
  canvasRef: any;
}> = ({ canvasRef }) => {
  const size = getCanvasWH();
  const list = [
    { icon: icon1, name: "背景色" },
    { icon: icon2, name: "背景图" },
    { icon: icon3, name: "清除背景" },
  ];

  const [showColor, setShowColor] = useState<boolean>(false);

  const itemIndexTap = (index: number) => {
    switch (index) {
      case 0:
        setShowColor(true);
        break;
      case 1:
        Taro.chooseImage({
          count: 1, // 默认9
          sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
          success: function (res) {
            Taro.getImageInfo({
              // 获取图片宽高
              src: res.tempFilePaths[0],
              success: function (resp) {
                const tempFiles = res.tempFiles;
                // onAddChildrenTap({
                //   index: 1,
                //   imgStr: tempFiles[0].originalFileObj,
                //   imgW: resp.width,
                //   imgH: resp.height,
                // });
                if (tempFiles[0].originalFileObj) {
                  const reader = new FileReader();
                  reader.readAsDataURL(tempFiles[0].originalFileObj);
                  // 图片文件完全拿到后执行
                  reader.onload = () => {
                    // 转换成base64格式
                    const base64Img = reader.result;
                    canvasRef.setBackgroundImage(
                      base64Img,
                      canvasRef.renderAll.bind(canvasRef),
                      {
                        // 保证背景图1:1铺满容器
                        scaleX: size[0] / resp.width, //计算出图片要拉伸的宽度
                        scaleY: size[1] / resp.height, //计算出图片要拉伸的高度
                      }
                    );
                  };
                }
              },
            });
          },
        });
        break;
      case 2:
        // 设置为null , 设置为""无效
        canvasRef.setBackgroundImage(null, canvasRef.renderAll.bind(canvasRef));
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
      </View>
      <ColorComponent
        typeKey="bg"
        show={showColor}
        onClose={() => setShowColor(false)}
        canvasRef={canvasRef}
      />
    </>
  );
};

export default FourItemComponent;
