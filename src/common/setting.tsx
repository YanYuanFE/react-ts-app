import { Settings as ProSettings } from "@ant-design/pro-layout";

export interface DefaultSettings extends ProSettings {
  pwa: boolean;
}

const proSettings: DefaultSettings = {
  navTheme: "dark",
  // 拂晓蓝
  primaryColor: "#1890ff",
  layout: "side",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: "React App",
  // desc: "React Admin Dashboard",
  pwa: false,
  iconfontUrl: "",
};

export default proSettings;
