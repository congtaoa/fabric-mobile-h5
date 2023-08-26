import { FC } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "../../twoItem/index.scss";
import icon1 from "../../../../assets/images/left.png";
import icon2 from "../../../../assets/images/up.png";
import icon3 from "../../../../assets/images/right.png";
import icon4 from "../../../../assets/images/down.png";
import { CommonCanvasChildrenType } from "../typeList";

const ArrowComponent: FC<CommonCanvasChildrenType> = ({
  show,
  canvasRef,
  onClose,
}) => {
  const list = [
    { icon: icon1, name: "左移" },
    { icon: icon2, name: "上移" },
    { icon: icon3, name: "右移" },
    { icon: icon4, name: "下移" },
  ];

  const directionMove = (index: number) => {
    const activeObj = canvasRef.getActiveObject();
    // 1左 2上 3右 4下
    switch (index) {
      case 1:
        activeObj.set({
          left: activeObj.left - 2,
        });
        canvasRef.renderAll();
        break;
      case 2:
        activeObj.set({
          top: activeObj.top - 2,
        });
        canvasRef.renderAll();
        break;
      case 3:
        activeObj.set({
          left: activeObj.left + 2,
        });
        canvasRef.renderAll();
        break;
      case 4:
        activeObj.set({
          top: activeObj.top + 2,
        });
        canvasRef.renderAll();
        break;
      default:
        break;
    }
  };

  return (
    <AtFloatLayout key="arrow" isOpened={show} onClose={onClose}>
      <View className="arrow-item-view-row">
        {list.map((item: any, index: number) => (
          <View
            className="bottom-item-child-col"
            key={item.name}
            onClick={() => {
              directionMove(index + 1)
            }}
          >
            <Image src={item.icon} className="bottom-item-child-img" />
            <Text className="bottom-item-child-title">{item.name}</Text>
          </View>
        ))}
      </View>
    </AtFloatLayout>
  );
};

export default ArrowComponent;
