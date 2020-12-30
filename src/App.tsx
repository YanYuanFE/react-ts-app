import React from "react";
import zhCN from "antd/es/locale/zh_CN";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
import { map } from "lodash";
import { IRouter, routes } from "./common/router";
import { ConfigProvider } from "antd";
import "./styles/index.less";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/common/theme";

const RouteWithSubRoutes = (route: IRouter) => {
  const Comp = route.component;

  return (
    <Route
      path={route.path}
      render={(props) => {
        return route.redirect ? (
          <Redirect to={route.redirect} />
        ) : Comp ? (
          <Comp {...props} route={route}>
            <DynamicRoute routes={route.routes} />
          </Comp>
        ) : (
          <>
            <DynamicRoute routes={route.routes} />
          </>
        );
      }}
    />
  );
};

const DynamicRoute = ({ routes }: { routes?: IRouter[] }) => {
  if (!routes) return null;

  return (
    <Switch>
      {map(routes, (route, index) => {
        return <RouteWithSubRoutes key={index} {...route} />;
      })}
    </Switch>
  );
};

const App = () => {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <ThemeProvider theme={theme}>
          <DynamicRoute routes={routes} />
        </ThemeProvider>
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;
