import React from "react";
import { Tabs } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProCard from "@/components/ProCard";
import ResetForm from "./ResetForm";

const { TabPane } = Tabs;

export default () => {
  return (
    <PageHeaderWrapper content="">
      <ProCard>
        <Tabs>
          <TabPane tab="基本信息" key="1">
            <ResetForm />
          </TabPane>
        </Tabs>
      </ProCard>
    </PageHeaderWrapper>
  );
};
