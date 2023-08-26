import { FC, memo } from "react";
import { View, Text } from "@tarojs/components";
import { AtFloatLayout, AtSlider } from "taro-ui";
import "../../twoItem/index.scss";
import { useCurrentTextBox, useCurrentImageBox } from "../../../../hooks/useIndexState";

export interface TranChildrenType {
  typeKey: string;
  show: boolean;
  onClose: () => void;
  canvasRef: any;
}

const TranComponent: FC<TranChildrenType> = ({
  typeKey,
  show,
  onClose,
  canvasRef,
}) => {
  const [currentTextBox, setCurrentTextBox] = useCurrentTextBox();
  const [currentImageBox, setCurrentImageBox] = useCurrentImageBox();

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

  return (
    <AtFloatLayout key="tran" isOpened={show} onClose={onClose}>
      <View className="at-row at-row__justify--center">
        <Text style={{ fontSize: "16px", color: "#fff" }}>不透明度</Text>
      </View>
      <View className="slider-item-view-common">
        <Text
          style={{
            fontSize: "13px",
            color: "#c8c8c8",
            marginRight: "12px",
          }}
        >
          不透明度
        </Text>
        <View style={{ width: "64vw" }}>
          <AtSlider
            max={100}
            blockSize={18}
            activeColor="#fff"
            showValue
            value={
              typeKey === "Image" ? currentImageBox?.opacity
              ? parseFloat(currentImageBox?.opacity) * 100
              :100 :
              currentTextBox?.opacity
                ? parseFloat(currentTextBox?.opacity) * 100
                : 100
            }
            backgroundColor="#8a8a8a"
            onChanging={(v) => {
              if (typeKey === "Image") {
                setCurrentImageBox({
                  ...currentImageBox,
                  opacity: (v / 100).toFixed(2),
                });
              } else {
                setCurrentTextBox({
                  ...currentTextBox,
                  opacity: (v / 100).toFixed(2),
                });
              }
              requestAnimationFrame(() => updateAttr("opacity", (v / 100).toFixed(2)));
            }}
          />
        </View>
      </View>
    </AtFloatLayout>
  );
};

export default memo(TranComponent);
