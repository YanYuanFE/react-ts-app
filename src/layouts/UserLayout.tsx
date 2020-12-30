import { DefaultFooter, getMenuData, getPageTitle, MenuDataItem } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/logo.svg";
import { DocumentTitle } from "@/components/DocumentTitle";
import proSettings from "@/common/setting";

export interface UserLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: "",
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  console.log(props);
  return (
    <DocumentTitle title={title}>
      <div
        css={(t) => ({
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "auto",
          background: t.colors.layoutBodyBackground,
        })}
      >
        <div
          css={{
            flex: 1,
            padding: "32px 0",
          }}
        >
          <div
            css={{
              textAlign: "center",
            }}
          >
            <div
              css={{
                height: "44px",
                lineHeight: "44px",
              }}
            >
              <Link to="/">
                <img
                  alt="logo"
                  css={{
                    height: "44px",
                    marginRight: "16px",
                    verticalAlign: "top",
                  }}
                  src={logo}
                />
                <span
                  css={(t) => ({
                    position: "relative",
                    top: "2px",
                    color: t.colors.headingColor,
                    fontWeight: 600,
                    fontSize: "33px",
                  })}
                >
                  {proSettings.title}
                </span>
              </Link>
            </div>
            <div
              css={(t) => ({
                marginTop: "12px",
                marginBottom: "40px",
                color: t.colors.textColorSecondary,
                fontSize: t.fontSizes.base,
              })}
            >
              {proSettings.title}！
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter links={[]} copyright="react" />
      </div>
    </DocumentTitle>
  );
};

export default UserLayout;
