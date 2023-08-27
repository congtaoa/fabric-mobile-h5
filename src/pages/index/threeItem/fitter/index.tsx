import { FC } from "react";
import { fabric } from "fabric";
import { View, Text } from "@tarojs/components";
import { AtFloatLayout, AtSlider } from "taro-ui";
import "../../twoItem/index.scss";
import { CommonCanvasChildrenType, fitterList } from "../../twoItem/typeList";
import { getFilter, getFabricFilterType } from "../../../../widget/Tools";
import { useFitterImageInfo } from "../../../../hooks/useIndexState";

// 若图片尺寸过大使用滤镜时候会自动截取图片... 待解决
const FitterComponent: FC<CommonCanvasChildrenType> = ({
  show,
  canvasRef,
  onClose,
}) => {
  const [fitterInfo] = useFitterImageInfo();

  const createFilter = (sourceImg, type, options = null) => {
    let filterObj;
    // capitalize first letter for matching with fabric image filter name
    const fabricType = getFabricFilterType(type);
    const ImageFilter = fabric.Image.filters[fabricType];
    if (ImageFilter) {
      filterObj = new ImageFilter(options);
      filterObj.options = options;
      sourceImg.filters.push(filterObj);
    }
    sourceImg.applyFilters();
    canvasRef.renderAll();
    return filterObj;
  };

  const applyFilterChange = (value, type, key) => {
    const activeObject = canvasRef.getActiveObject();
    // console.log(activeObject.filters, value, type, key, "9");
    let itemFilter: any = getFilter(activeObject, type);
    if (itemFilter) {
      itemFilter[key] = value;
      if (value == 0) {
        const { length } = activeObject.filters;
        let item, i;
        for (i = 0; i < length; i += 1) {
          item = activeObject.filters[i];
          if (item.type === type) {
            activeObject.filters.splice(i, 1);
            break;
          }
        }
      }
    } else {
      const imgFilter = createFilter(activeObject, type);
      imgFilter[key] = value;
    }
    activeObject.applyFilters();
    canvasRef.renderAll();
  };

  const changeFitter = (value: number, index: number) => {
    const v = (value / 100).toFixed(2);
    switch (index) {
      case 0:
        applyFilterChange(parseFloat(v), "Blur", "blur");
        break;
      case 1:
        applyFilterChange(parseFloat(v), "Grayscale", "grayscale");
        break;
      case 2:
        applyFilterChange(parseFloat(v), "Brightness", "brightness");
        break;
      case 3:
        applyFilterChange(parseFloat(v), "Contrast", "contrast");
        break;
      case 4:
        applyFilterChange(parseFloat(v), "Saturation", "saturation");
        break;
      default:
        break;
    }
  };

  return (
    <AtFloatLayout key="fitter" isOpened={show} onClose={onClose}>
      <View>
        {fitterList.map((item: any, index: number) => (
          <View
            className="at-row at-row__align--center at-row__justify--around mb-1"
            key={item.name}
          >
            <Text
              style={{
                fontSize: "13px",
                color: "#c8c8c8",
                marginRight: "12px",
                width: "13vw",
              }}
            >
              {item.name}
            </Text>
            <View style={{ width: "70vw" }}>
              <AtSlider
                blockSize={18}
                key={item.name}
                max={100}
                activeColor="#fff"
                showValue
                backgroundColor="#8a8a8a"
                value={parseFloat(fitterInfo?.[item.key])}
                onChanging={(v) => {
                  requestAnimationFrame(() => changeFitter(v, index));
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </AtFloatLayout>
  );
};

export default FitterComponent;
