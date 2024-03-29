import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import avatar from "../../assets/logo.svg";
import { useUserContainer } from "@/contexts/user";

const AvatarDropdown = ({ menu }: { menu?: boolean }) => {
  const { user } = useUserContainer();
  const navigate = useNavigate();
  const onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
    if (key === "logout") {
      return;
    }

    if (key === "settings") {
      navigate("/settings");

      return;
    }

    navigate(`/auth/${key}`);
  };

  const menuHeaderDropdown = (
    <Menu
      css={{
        ".anticon": {
          marginRight: "8px",
        },
        ".ant-dropdown-menu-item": {
          minWidth: "160px",
        },
      }}
      selectedKeys={[]}
      onClick={onMenuClick}
    >
      {menu && (
        <>
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
          <Menu.Divider />
        </>
      )}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return user?.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span
        css={(t) => ({
          display: "flex",
          alignItems: "center",
          height: "100%",
          padding: "0 12px",
          cursor: "pointer",
          transition: "all 0.3s",
          color: t.colors.textColor,
        })}
      >
        <Avatar
          size="small"
          css={(t) => ({
            margin: "20px 0",
            marginRight: 8,
            color: t.colors.primary,
            verticalAlign: "top",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
          })}
          src={avatar}
          alt="avatar"
        />
        <span>{user.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <span>
      <Spin
        size="small"
        css={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default AvatarDropdown;
