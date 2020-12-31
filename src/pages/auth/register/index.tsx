import { Button, Form, Input, Popover, Progress, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div
      css={(t) => ({
        color: t.colors.success,
        transition: "color 0.3s",
      })}
    >
      Strong
    </div>
  ),
  pass: (
    <div
      css={(t) => ({
        color: t.colors.warning,
        transition: "color 0.3s",
      })}
    >
      Medium
    </div>
  ),
  poor: (
    <div
      css={(t) => ({
        color: t.colors.error,
        transition: "color 0.3s",
      })}
    >
      Poor
    </div>
  ),
};
const passwordProgressMap: {
  ok: "success";
  pass: "normal";
  poor: "exception";
} = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register = () => {
  const history = useHistory();
  const [visible, setvisible] = useState(false);
  const [prefix, setprefix] = useState("86");
  const [popover, setpopover] = useState(false);
  const confirmDirty = false;
  const [form] = Form.useForm();

  const getPasswordStatus = () => {
    const value = form.getFieldValue("password");

    if (value && value.length > 9) {
      return "ok";
    }

    if (value && value.length > 5) {
      return "pass";
    }

    return "poor";
  };

  const onFinish = (values: { [key: string]: any }) => {
    console.log(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("两次输入的密码不一致！");
    }

    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject("密码不能为空！");
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject("");
    }

    if (value && confirmDirty) {
      form.validateFields(["confirm"]);
    }

    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setprefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={`progress-${passwordStatus}`}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={"progress"}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div
      css={{
        width: "368px",
        margin: "0 auto",
      }}
    >
      <h3>注册</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <Tooltip title="系统展示用户名">
          <FormItem
            name="name"
            rules={[
              {
                required: true,
                message: "用户名不能为空！",
              },
            ]}
          >
            <Input size="large" placeholder="请输入用户名" />
          </FormItem>
        </Tooltip>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }

            return node;
          }}
          content={
            visible && (
              <div
                css={{
                  padding: "4px 0",
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  css={{
                    marginTop: 10,
                  }}
                >
                  密码强度
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            css={
              form.getFieldValue("password")?.length > 0 && {
                marginBottom: "24px",
                ".ant-form-item-explain": {
                  display: "none",
                },
              }
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="请输入密码" />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: "请确认密码！",
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="请确认密码" />
        </FormItem>
        <InputGroup compact>
          <Select
            size="large"
            value={prefix}
            onChange={changePrefix}
            style={{
              width: "20%",
            }}
          >
            <Option value="86">+86</Option>
          </Select>
          <Tooltip title="登录账号">
            <FormItem
              css={{
                width: "80%",
              }}
              name="phone"
              rules={[
                {
                  required: true,
                  message: "请输入手机号码注册！",
                },
                {
                  pattern: /^\d{11}$/,
                  message: "手机号码格式不正确！",
                },
              ]}
            >
              <Input size="large" placeholder="请输入手机号码" />
            </FormItem>
          </Tooltip>
        </InputGroup>
        <FormItem>
          <Button size="large" loading={false} css={{ width: "50%" }} type="primary" htmlType="submit">
            注册
          </Button>
          <Link
            css={{
              float: "right",
              lineHeight: "40px",
            }}
            to="/auth/login"
          >
            登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};

export default Register;
