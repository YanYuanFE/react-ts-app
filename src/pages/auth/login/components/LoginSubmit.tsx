import { Button, Form } from "antd";
import React from "react";
import { ButtonProps } from "antd/es/button/button";

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }: { className?: string } & ButtonProps) => {
  return (
    <FormItem>
      <Button
        size="large"
        css={{
          width: "100%",
          marginTop: "24px",
        }}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </FormItem>
  );
};

export default LoginSubmit;
