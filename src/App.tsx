import React from "react";
import zhCN from "antd/es/locale/zh_CN";
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
import { map } from "lodash";
import { IRouter, routes } from "./common/router";
import { ConfigProvider } from "antd";
import "./styles/index.less";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/common/theme";


const getRoutes = (routes?: IRouter[]) => {
  return map(routes, (route, index) => {
    const Comp = route.component;

    return (
      <Route
        path={!route.index ? route.path : undefined}
        element={<Comp route={route} />}
        key={index}
        index={route.index}
      >
        {route.routes ? getRoutes(route.routes) : null}
      </Route>
    );
  });
};


const App = () => {
  return (
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <ThemeProvider theme={theme}>
          <Routes>
            {getRoutes(routes)}
          </Routes>
        </ThemeProvider>
      </ConfigProvider>
    </HashRouter>
  );
};

export default App;
