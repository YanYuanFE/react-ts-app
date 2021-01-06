import { DropDownProps } from "antd/es/dropdown";
import { Dropdown } from "antd";
import React from "react";
import styles from "./index.less";

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropDownProps, "overlay"> {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc | any;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topCenter" | "topRight" | "bottomCenter";
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown {...restProps} />
);

export default HeaderDropdown;
