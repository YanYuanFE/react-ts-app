import ProLayout, { DefaultFooter, MenuDataItem, BasicLayoutProps as ProLayoutProps } from "@ant-design/pro-layout";
import React, { ReactNode } from "react";
import { Link, useHistory } from "react-router-dom";
import { Result, Button } from "antd";
import Authorized from "@/components/Authorized";
import RightContent from "@/components/GlobalHeader/RightContent";
import { getAuthorityFromRouter } from "@/utils/utils";
import logo from "@/assets/logo.svg";
import defaultSettings from "@/common/setting";
import { useUserContainer } from "@/contexts/user";
import { IRouter } from "@/common/router";

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/auth/login">Go Login</Link>
      </Button>
    }
  />
);
/**
 * use Authorized check all menu item
 */

const menuDataRender = (current: string | string[]) => (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(current)(item.children) : undefined,
    };
    return Authorized.check(item.authority, current, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = <DefaultFooter copyright={`${new Date().getFullYear()} Ant Design`} links={[]} />;

export interface BasicLayoutProps extends ProLayoutProps {
  children: ReactNode;
  location: { pathname: string };
  route: IRouter;
}

const BasicLayout = (props: BasicLayoutProps) => {
  const history = useHistory();
  const { user } = useUserContainer();
  const {
    children,
    location = {
      pathname: "/",
    },
    route,
  } = props;

  const authorized = getAuthorityFromRouter(route.routes, location.pathname || "/") || {
    authority: undefined,
  };

  return (
    <ProLayout
      locale={"zh-CN"}
      logo={logo}
      onMenuHeaderClick={() => history.push("/")}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: "首页",
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? <Link to={paths.join("/")}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender(user!.character)}
      rightContentRender={() => <RightContent theme={defaultSettings.navTheme} layout={defaultSettings.layout} />}
      {...props}
      route={props.route}
      {...defaultSettings}
    >
      <Authorized authority={authorized.authority} currentAuthority={user!.character} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default BasicLayout;
