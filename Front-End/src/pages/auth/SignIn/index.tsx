import { Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../../components/auth/AuthForm";
import configRoute from "../../../config";
import config from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { authAsyncLogin } from "../../../redux/slice/AuthSlice";


type Props = {};
const SignIn = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    document.title = "SignIn"
    const { meta, payload } = await dispatch(authAsyncLogin(values));
    if (meta.requestStatus == "fulfilled") {
      notification.success({
        message: 'Đăng nhập thành công',
      });
      setTimeout(() => {
        navigate(config.routes.home)
      }, 2000);
    } else {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: `${payload}`,
      });
    }
  };

  return (
    <AuthForm onFinish={onFinish} form={form} name="Đăng Nhập" isSignUp={true} sign="Đăng Ký" />
  );
};

export default SignIn;
