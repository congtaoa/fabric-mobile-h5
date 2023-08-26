import { FC, memo } from "react";
import { View, Text } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "../../twoItem/index.scss";
import { isIPhoneX } from "../../../../widget/Tools";
import { CommonCanvasChildrenType, iosFonts } from "../typeList/index";
import { useCurrentTextBox, useCurrentFont } from "../../../../hooks/useIndexState";

const FontComponent: FC<CommonCanvasChildrenType> = ({
  show,
  onClose,
  canvasRef
}) => {
  const [currentFont, setCurrentFont] = useCurrentFont();
  const [currentTextBox, setCurrentTextBox] = useCurrentTextBox();

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

  const cancelFont = () => {
    updateAttr("fontFamily", currentFont);
    setCurrentFont(currentFont);
    onClose();
  }

  return (
    <AtFloatLayout
      key="font"
      isOpened={show}
      onClose={() => {
        onClose();
      }}
    >
      <View className="title-font-row">
        <View
          className="btn-des"
          onClick={() => {
            cancelFont();
          }}
        >
          撤消
        </View>
        <Text style={{ fontSize: "16px", color: "#fff" }}>字体</Text>
        <View
          className="btn-des"
          onClick={() => {
            setCurrentFont(currentTextBox?.familyValue);
            onClose();
          }}
        >
          确定
        </View>
      </View>
      <View
        className="font-view-scroll"
        style={{
          height: isIPhoneX() ? "260px" : "240px",
        }}
      >
        {iosFonts.map((item: any) => (
          <View
            className="font-list-item"
            key={item}
            onClick={() => {
              updateAttr("fontFamily", item);
              setCurrentTextBox({...currentTextBox, familyValue: item})
            }}
          >
            <Text
              style={{
                fontSize: "20px",
                color: item == currentTextBox?.familyValue ? "#fff" : "#6a6a6a",
                fontFamily: item,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </AtFloatLayout>
  );
};

export default memo(FontComponent);
