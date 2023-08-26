import { FC } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "../../twoItem/index.scss";
import icon1 from "../../../../assets/images/top.png";
import icon2 from "../../../../assets/images/front.png";
import icon3 from "../../../../assets/images/back1.png";
import icon4 from "../../../../assets/images/bo.png";

export interface LayerChildrenType {
  show: boolean;
  canvasRef: any;
  onClose: () => void;
}

const LayerComponent: FC<LayerChildrenType> = ({
  show,
  canvasRef,
  onClose,
}) => {
  const list = [
    { icon: icon1, name: "置顶层" },
    { icon: icon2, name: "上一层" },
    { icon: icon3, name: "下一层" },
    { icon: icon4, name: "置底层" },
  ];

  const layerTap = (index: number) => {
    const activeObj = canvasRef.getActiveObject();
    switch (index) {
      case 1:
        activeObj.bringToFront();
        break;
      case 2:
        activeObj.bringForward();
        break;
      case 3:
        activeObj.sendBackwards();
        break;
      case 4:
        activeObj.sendToBack();
        break;
      default:
        break;
    }
    canvasRef.renderAll();
  }

  return (
    <AtFloatLayout key="style" isOpened={show} onClose={onClose}>
      <View className="arrow-item-view-row">
        {list.map((item: any, index: number) => (
          <View
            className="bottom-item-child-col"
            key={item.name}
            onClick={() => layerTap(index + 1)}
          >
            <Image src={item.icon} className="bottom-item-child-img" />
            <Text className="bottom-item-child-title">{item.name}</Text>
          </View>
        ))}
      </View>
    </AtFloatLayout>
  );
};

export default LayerComponent;
