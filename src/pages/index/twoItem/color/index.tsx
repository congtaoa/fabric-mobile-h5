import { FC, memo } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "../../twoItem/index.scss";
import { isIPhoneX } from "../../../../widget/Tools";
import tmIcon from "../../../../assets/images/tm.png";
import { colors } from "../typeList/index";
import {
  useCurrentTextBox,
  useCanvasBg,
} from "../../../../hooks/useIndexState";

export interface ColorChildrenType {
  typeKey: string;
  show: boolean;
  onClose: () => void;
  canvasRef: any;
}

const ColorComponent: FC<ColorChildrenType> = ({
  show,
  onClose,
  canvasRef,
  typeKey,
}) => {
  const [currentTextBox, setCurrentTextBox] = useCurrentTextBox();
  const [canvasBg, setCanvasBg] = useCanvasBg();
  const updateAttr = (
    type:
      | "fill"
      | "fontStyle"
      | "fontWeight"
      | "opacity"
      | "underline"
      | "fontFamily"
      | "stroke"
      | "strokeWidth"
      | "imgUrl",
    val: string | undefined
  ) => {
    const obj = canvasRef.getActiveObject();
    obj.set({ [type]: val });
    canvasRef.renderAll();
  };

  return (
    <AtFloatLayout key="color" isOpened={show} onClose={onClose}>
      <View className="at-row at-row__justify--center mb-1">
        <Text style={{ fontSize: "16px", color: "#fff" }}>颜色</Text>
      </View>
      <View
        className="at-row at-row--wrap"
        style={{
          height: isIPhoneX() ? "220px" : "200px",
        }}
      >
        {colors.map((item: string, index: number) => (
          <View
            key={item}
            className="at-col at-col-2 color-dot-view"
            onClick={() => {
              if (typeKey === "bg") {
                canvasRef.setBackgroundColor(item);
                canvasRef.renderAll();
                setCanvasBg(item);
              } else {
                updateAttr("fill", item);
                setCurrentTextBox({ ...currentTextBox, color: item });
              }
            }}
          >
            <View
              className="color-dot-view2"
              style={{
                borderColor:
                  typeKey === "TextBox"
                    ? item == currentTextBox?.color
                      ? "#fff"
                      : "transparent"
                    : canvasBg == item
                    ? "#fff"
                    : "transparent",
              }}
            >
              {index == 0 ? (
                <Image src={tmIcon} className="color-dots" />
              ) : (
                <View
                  className="color-dots"
                  style={{ backgroundColor: item }}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </AtFloatLayout>
  );
};

export default memo(ColorComponent);
