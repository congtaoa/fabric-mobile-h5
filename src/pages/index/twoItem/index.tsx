import { useState, FC } from "react";
import { View, Text, ScrollView, Image } from "@tarojs/components";
import "./index.scss";
import icon1 from "../../../assets/images/1.png";
import icon2 from "../../../assets/images/text.png";
import icon3 from "../../../assets/images/3.png";
import icon4 from "../../../assets/images/4.png";
import icon5 from "../../../assets/images/5.png";
import icon6 from "../../../assets/images/dis.png";
import icon9 from "../../../assets/images/copy.png";
import icon10 from "../../../assets/images/mul.png";
import { isIPhoneX } from "../../../widget/Tools";

import FontComponent from "./fontView";
import ColorComponent from "./color";
import StyleComponent from "./style";
import TranComponent from "./transparent";
import ArrowComponent from "./arrow";
import LayerComponent from "./layer";

const TwoItemComponent: FC<{
  canvasRef: any;
}> = ({ canvasRef }) => {
  const list = [
    { icon: icon9, name: "复制" },
    { icon: icon1, name: "改字" },
    { icon: icon2, name: "字体" },
    { icon: icon3, name: "颜色" },
    { icon: icon4, name: "样式" },
    { icon: icon5, name: "透明度" },
    { icon: icon6, name: "微调" },
    { icon: icon10, name: "图层" },
  ];
  // 微调
  const [showSmall, setSmall] = useState<boolean>(false);
  // 图层
  const [showLayer, setShowLayer] = useState<boolean>(false);
  // 字体
  const [showFamily, setShowFamily] = useState<boolean>(false);
  // 颜色
  const [showColor, setShowColor] = useState<boolean>(false);
  // 样式
  const [showStyle, setShowStyle] = useState<boolean>(false);
  // 透明度
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
        if (activeObj) {
          activeObj.editable = true;
          activeObj.enterEditing();
          activeObj.selectAll();
        }
        break;
      case 2:
        setShowFamily(true);
        break;
      case 3:
        setShowColor(true);
        break;
      case 4:
        setShowStyle(true);
        break;
      case 5:
        setOpacity(true);
        break;
      case 6:
        setSmall(true);
        break;
      case 7:
        setShowLayer(true);
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
      <FontComponent
        show={showFamily}
        onClose={() => setShowFamily(false)}
        canvasRef={canvasRef}
      />
      <ColorComponent
        typeKey="TextBox"
        show={showColor}
        onClose={() => setShowColor(false)}
        canvasRef={canvasRef}
      />
      <StyleComponent
        show={showStyle}
        onClose={() => setShowStyle(false)}
        canvasRef={canvasRef}
      />
      <TranComponent
        typeKey="TextBox"
        show={isOpacity}
        onClose={() => setOpacity(false)}
        canvasRef={canvasRef}
      />
      <ArrowComponent
        show={showSmall}
        onClose={() => setSmall(false)}
        canvasRef={canvasRef}
      />
      <LayerComponent show={showLayer} onClose={() => setShowLayer(false)}  canvasRef={canvasRef} />
    </>
  );
};

export default TwoItemComponent;
