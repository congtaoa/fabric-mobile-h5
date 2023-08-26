import { createHook } from "../widget/Hookleton";

export const useUserInfo = createHook<any>();

export const useCanvasBg = createHook<string>("#fff")

// 底部模块类型状态
export const useFirstBtns = createHook<{
  firstIndex: number;
  showPop: boolean;
}>({
  firstIndex: -1,
  showPop: false,
});

// 当先选中object 字体，回退原字体使用
export const useCurrentFont = createHook<string | undefined>(""); // 当前字体

// 当先选中object 文字
export const useCurrentTextBox = createHook<{
  familyValue?: string;
  color?: string;
  fontSize?: number;
  isBold?: string;
  isXieTi?: string;
  underline?: boolean;
  opacity?: string;
}>({ familyValue: "", color: "", fontSize: 18, isBold: "", isXieTi: "", underline: false, opacity: "1" }); // 当前选中文字


// 当先选中object img
export const useCurrentImageBox = createHook<{
  opacity?: string;
}>({  opacity: "1" });

