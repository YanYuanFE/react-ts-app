import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector, useHistory } from "dva";
import { IResetPasswordBody, resetPassword } from "@/services/auth";
import styles from "./index.less";
import { UserModelState } from "@/models/user";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const handleResetPassword = async (
  setSubmitting: (flag: boolean) => void,
  params: IResetPasswordBody,
  cb: () => void,
) => {
  setSubmitting(true);
  try {
    const res = await resetPassword(params);
    if (res.code === 0) {
      message.info("重置密码成功！");
      setSubmitting(false);
      localStorage.clear();
      cb();
    } else {
      message.error(`${res.message}`);
      setSubmitting(false);
    }
  } catch (error) {
    message.error("重置密码失败！");
    setSubmitting(false);
  }
};

const ResetForm = () => {
  const [visible, setvisible] = useState(false);
  const [popover, setpopover] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const currentUser = useSelector(({ user }: { user: UserModelState }) => user.currentUser);
  const [form] = Form.useForm();
  const history = useHistory();

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    values.phone = currentUser.phone;
    await handleResetPassword(setSubmitting, values as IResetPasswordBody, () => {
      history.push("/auth/login");
    });
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

    return promise.resolve();
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;

    if (value && value === form.getFieldValue("password")) {
      return promise.reject("两次输入的密码一致！");
    }

    return promise.resolve();
  };

  return (
    <>
      <Form {...formItemLayout} form={form} layout="horizontal" className={styles.stepForm} hideRequiredMark>
        {/* <Form.Item
         label="手机号码"
         name="phone"
         rules={[
           {
             required: true,
             message: '请输入注册时的手机号！',
           },
           {
             pattern: /^\d{11}$/,
             message: '手机号码格式不正确！',
           },
         ]}
        >
         <Input size="large" placeholder="请输入手机号码" />
        </Form.Item> */}
        <Form.Item
          label="原始密码"
          name="old_password"
          className={
            form.getFieldValue("old_password") && form.getFieldValue("old_password").length > 0 && styles.password
          }
          rules={[
            {
              validator: checkPassword,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="new_password"
          rules={[
            {
              required: true,
              message: "请输入新密码！",
            },
            {
              validator: checkPassword,
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="new_password" placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          {/* <Button type="primary" onClick={onValidateForm}>
           下一步
          </Button> */}
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetForm;
