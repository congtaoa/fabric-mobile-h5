import { FC, memo, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "./index.scss";

export interface TempChildrenType {
  show: boolean;
  localList: any[];
  tempItemTap: (e: any) => void; //
  onClose: () => void;
}

const BaseDemo = memo((props: any) => {
  return (
    <>
      {props.list.length > 0 ? (
        <View className="temp-list-view">
          {props.list.map((item: any) => (
            <Image
              key={item.id}
              src={item.img}
              style={{ width: "30vw", height: "48vw" }}
              onClick={() => props.itemTap(item)}
            />
          ))}
        </View>
      ) : (
        null
      )}
    </>
  );
});

const TempComponent: FC<TempChildrenType> = ({
  show,
  localList,
  tempItemTap,
  onClose,
}) => {
  useEffect(() => {
    localList.map((item) => {
      item.img = JSON.parse(localStorage.getItem("tplImgs") || "{}")[item.id];
    });
  }, []);

  return (
    <AtFloatLayout key="color" isOpened={show} onClose={onClose}>
      <View className="demo-list">
        <BaseDemo list={localList} itemTap={(i) => tempItemTap(i)} />
      </View>
    </AtFloatLayout>
  );
};

export default TempComponent;
