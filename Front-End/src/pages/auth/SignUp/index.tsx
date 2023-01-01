import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { Form, Input, message, notification } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { authAsyncRegister } from "../../../redux/slice/AuthSlice";
import configRoute from "../../../config";
import AuthForm from "../../../components/auth/AuthForm";
type Props = {};

const SignUp = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    document.title = "Đăng Ký";

  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch((authAsyncRegister(values)));
    if (meta.requestStatus == "fulfilled") {
      notification.info({
        message: 'Đăng ký thành công',
        description:
          `Chào ${payload?.username ?? payload?.email}, vui lòng vào email để xác nhận tài khoản!`,
      });
      setTimeout(() => {
        form.resetFields();
        navigate(config.routes.signin)
      }, 2000);
    } else {
      notification.error({
        message: 'Đăng ký thất bại',
        description:
          ` ${payload}`,
      });
    }
  };

  return (
    <AuthForm sign="Đăng Nhập" onFinish={onFinish} form={form} name="Đăng Ký" isSignUp={false} />
  );
};

export default SignUp;
