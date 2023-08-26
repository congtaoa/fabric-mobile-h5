import { FC, memo } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtFloatLayout, AtSlider } from "taro-ui";
import "../../twoItem/index.scss";
import bIcon from "../../../../assets/images/b.png";
import bA from "../../../../assets/images/b_a.png";
import xIcon from "../../../../assets/images/x.png";
import xA from "../../../../assets/images/x_a.png";
import uIcon from "../../../../assets/images/u.png";
import uA from "../../../../assets/images/u_a.png";
import { useCurrentTextBox } from "../../../../hooks/useIndexState";
import { CommonCanvasChildrenType } from "../typeList";

const StyleComponent: FC<CommonCanvasChildrenType> = ({
  show,
  onClose,
  canvasRef,
}) => {
  const styleList = [
    { icon: bIcon, acIcon: bA, name: "加粗" },
    { icon: xIcon, acIcon: xA, name: "斜体" },
    { icon: uIcon, acIcon: uA, name: "下划线" },
  ];
  const [currentTextBox, setCurrentTextBox] = useCurrentTextBox();

  const updateAttr = (
    type:
      | "fill"
      | "fontStyle"
      | "fontWeight"
      | "opacity"
      | "fontSize"
      | "underline"
      | "fontFamily"
      | "stroke"
      | "strokeWidth"
      | "imgUrl",
    val: any
  ) => {
    const obj = canvasRef.getActiveObject();
    obj.set({ [type]: val });
    canvasRef.renderAll();
  };

  const styleTaped = (index) => {
    switch (index) {
      case 0:
        updateAttr(
          "fontWeight",
          currentTextBox?.isBold === "normal" ? "bold" : "normal"
        );
        setCurrentTextBox({
          ...currentTextBox,
          isBold: currentTextBox?.isBold === "normal" ? "bold" : "normal",
        });
        break;
      case 1:
        updateAttr(
          "fontStyle",
          currentTextBox?.isXieTi === "normal" ? "italic" : "normal"
        );
        setCurrentTextBox({
          ...currentTextBox,
          isXieTi: currentTextBox?.isXieTi === "normal" ? "italic" : "normal",
        });
        break;
      case 2:
        updateAttr("underline", !currentTextBox?.underline);
        setCurrentTextBox({
          ...currentTextBox,
          underline: !currentTextBox?.underline,
        });
        break;
      default:
        break;
    }
  };

  return (
    <AtFloatLayout key="style" isOpened={show} onClose={onClose}>
      <View className="at-row at-row__justify--center mb-1">
        <Text style={{ fontSize: "16px", color: "#fff" }}>样式</Text>
      </View>
      <View className="at-row at-row__justify--around">
        {styleList.map((item: any, index: number) => (
          <View
            className="bottom-item-child-col"
            key={item.name}
            onClick={() => styleTaped(index)}
          >
            <Image
              src={
                (currentTextBox?.isBold === "bold" && index == 0) ||
                (currentTextBox?.isXieTi === "italic" && index == 1) ||
                (currentTextBox?.underline && index == 2)
                  ? item.acIcon
                  : item.icon
              }
              className="bottom-item-child-img"
            />
            <Text
              className="bottom-item-child-title"
              style={{
                color:
                  (currentTextBox?.isBold === "bold" && index == 0) ||
                  (currentTextBox?.isXieTi === "italic" && index == 1) ||
                  (currentTextBox?.underline && index == 2)
                    ? "#fff"
                    : "#8a8a8a",
              }}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
      <View className="slider-item-view-common">
        <Text
          style={{
            fontSize: "13px",
            color: "#c8c8c8",
            marginRight: "12px",
          }}
        >
          文字大小
        </Text>
        <View style={{ width: "64vw" }}>
          <AtSlider
            blockSize={18}
            max={100}
            activeColor="#fff"
            showValue
            backgroundColor="#8a8a8a"
            value={currentTextBox?.fontSize}
            onChanging={(v) => {
              requestAnimationFrame(() => updateAttr("fontSize", v));
            }}
          />
        </View>
      </View>
    </AtFloatLayout>
  );
};

export default memo(StyleComponent);
