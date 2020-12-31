import "@emotion/react";

declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      layoutBodyBackground: string;
      headingColor: string;
      textColorSecondary: string;
      success: string;
      warning: string;
      error: string;
      primary: string;
      textColor: string;
    };
    fontSizes: {
      base: number;
    };
  }
}
