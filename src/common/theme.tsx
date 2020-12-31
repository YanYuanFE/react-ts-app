import { tint } from "polished";

const black = "#000";
const fontSizeBase = 14;
const succesColor = "#52c41a";

export const theme = {
  colors: {
    layoutBodyBackground: "#f0f2f5",
    headingColor: tint(0.2, black),
    textColorSecondary: tint(0.55, black),
    textColor: tint(0.85, black),
    primary: "#1890ff",
    success: succesColor,
    warning: "#faad14",
    error: "#f5222d",
  },
  fontSizes: {
    base: fontSizeBase,
  },
};
