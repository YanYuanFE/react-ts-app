import { Settings as ProSettings } from "@ant-design/pro-layout";
import React from "react";
import Avatar from "./AvatarDropdown";
import styles from "./index.less";

export interface GlobalHeaderRightProps extends Partial<ProSettings> {
  theme?: ProSettings["navTheme"] | "realDark";
}

const ENVTagColor = {
  dev: "orange",
  test: "green",
  pre: "#87d068",
};

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = ({ theme, layout }) => {
  let className = styles.right;

  if (theme === "dark" && layout === "top") {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar menu />
    </div>
  );
};

export default GlobalHeaderRight;
