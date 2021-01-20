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

  return (
    <div
      css={{
        display: "flex",
        float: "right",
        height: "48px",
        marginLeft: "auto",
        overflow: "hidden",
      }}
    >
      <Avatar menu />
    </div>
  );
};

export default GlobalHeaderRight;
