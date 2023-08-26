import { FC } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "../../twoItem/index.scss";
import icon5 from "../../../../assets/images/hf.png";
import icon6 from "../../../../assets/images/vf.png";
import { CommonCanvasChildrenType } from "../../twoItem/typeList";

const FlipComponent: FC<CommonCanvasChildrenType> = ({
  show,
  canvasRef,
  onClose,
}) => {
  const flipList = [
    { icon: icon5, name: "水平翻转" },
    { icon: icon6, name: "垂直翻转" },
  ];

  const flipTap = (index: number) => {
    const activeObj = canvasRef.getActiveObject();
    switch (index) {
      case 0:
        activeObj.set({
          flipY: !activeObj.flipY,
        });
        break;
      case 1:
        activeObj.set({
          flipX: !activeObj.flipX,
        });
        break;
      default:
        break;
    }
    canvasRef.renderAll();
  };

  return (
    <AtFloatLayout key="flip" isOpened={show} onClose={onClose}>
      <View className="arrow-item-view-row">
        {flipList.map((item: any, index: number) => (
          <View
            className="bottom-item-child-col"
            key={item.name}
            onClick={() => flipTap(index)}
          >
            <Image src={item.icon} className="bottom-item-child-img" />
            <Text className="bottom-item-child-title">{item.name}</Text>
          </View>
        ))}
      </View>
    </AtFloatLayout>
  );
};

export default FlipComponent;
