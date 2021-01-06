import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Tag, Space, message } from "antd";
import type { ProDescriptionsItemProps } from "@ant-design/pro-descriptions";
import ProDescriptions from "@ant-design/pro-descriptions";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import { get } from "@/services/request";

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: "序号",
    dataIndex: "index",
    valueType: "indexBorder",
  },
  {
    title: "标题",
    dataIndex: "title",
    copyable: true,
    ellipsis: true,
    width: 200,
    search: false,
  },
  {
    title: (_, type) => (type === "table" ? "状态" : "列表状态"),
    dataIndex: "state",
    initialValue: "all",
    filters: true,
    onFilter: true,
    valueType: "select",
    valueEnum: {
      all: { text: "全部", status: "Default" },
      open: {
        text: "未解决",
        status: "Error",
      },
      closed: {
        text: "已解决",
        status: "Success",
      },
    },
  },
  {
    title: "排序方式",
    key: "direction",
    hideInTable: true,
    hideInDescriptions: true,
    dataIndex: "direction",
    filters: true,
    onFilter: true,
    valueType: "select",
    valueEnum: {
      asc: "正序",
      desc: "倒序",
    },
  },
  {
    title: "标签",
    dataIndex: "labels",
    width: 120,
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "创建时间",
    key: "since",
    dataIndex: "created_at",
    valueType: "dateTime",
  },
  {
    title: "option",
    valueType: "option",
    dataIndex: "id",
    render: (text, row) => [
      <a href={row.url} key="show" target="_blank" rel="noopener noreferrer">
        查看
      </a>,
      <TableDropdown
        key="more"
        onSelect={(key) => message.info(key)}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

const Table = () => {
  const [type, setType] = useState("table");
  return (
    <>
      <Tabs activeKey={type} onChange={(e) => setType(e)}>
        <Tabs.TabPane tab="table" key="table" />
        <Tabs.TabPane tab="form" key="form" />
        <Tabs.TabPane tab="descriptions" key="descriptions" />
      </Tabs>
      {["table", "form"].includes(type) && (
        <ProTable<GithubIssueItem>
          columns={columns}
          type={type as "table"}
          request={async (params = {}) =>
            get<{
              data: GithubIssueItem[];
            }>("https://proapi.azurewebsites.net/github/issues", {
              params,
            })
          }
          pagination={{
            pageSize: 5,
          }}
          rowKey="id"
          dateFormatter="string"
          headerTitle="查询 Table"
          toolBarRender={() => [
            <Button key="3" type="primary">
              <PlusOutlined />
              新建
            </Button>,
          ]}
        />
      )}
      {type === "descriptions" && (
        <ProDescriptions
          style={{
            background: "#fff",
          }}
          columns={columns as ProDescriptionsItemProps<GithubIssueItem>[]}
          request={async (params) => {
            const msg = await get<{
              data: GithubIssueItem[];
            }>("https://proapi.azurewebsites.net/github/issues", {
              params,
            });
            return {
              ...msg,
              data: msg?.data[0],
            };
          }}
        />
      )}
    </>
  );
};

export default Table;
