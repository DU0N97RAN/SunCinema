import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updatePass } from "../../../redux/slice/userSlice";
import Swal from "sweetalert2";
import { LogOut } from "../../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
type Props = {};

const ChangePassword = (props: Props) => {
  const [form] = Form.useForm();
  const { accessToken, currentUser } = useAppSelector(
    (state) => state.authReducer
  );
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  // console.log(currentUser._id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    dispatch(
      updatePass({
        token: accessToken,
        newPassword: values.password,
        oldPassword: values.oldPassword,
      })
    )
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Đổi mật khẩu thành công",
          text: "Bạn có muốn đăng nhập lại không",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(LogOut());
            navigate(configRoute.routes.signin);
          }
        });
      })
      .catch((err: any) => {
        Swal.fire({
          icon: "warning",
          title: `${err}`,
        });
      });
  };
  return (
    <>
      <div className="min-h-[200px] pt-5">
        <Form {...layout} name="nest-messages" onFinish={onFinish} form={form}>
          <Form.Item
            name="oldPassword"
            label={
              <label style={{ color: "white", fontSize: "18px" }}>
                Mật khẩu cũ
              </label>
            }
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password
              style={{
                height: "40px",
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <label style={{ color: "white", fontSize: "18px" }}>
                Mật khẩu mới
              </label>
            }
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password
              style={{
                height: "40px",
              }}
            />
          </Form.Item>
          <Form.Item
            dependencies={["password"]}
            hasFeedback
            name="confirm"
            label={
              <label style={{ color: "white", fontSize: "18px" }}>
                Nhập lại mật khẩu
              </label>
            }
            rules={[
              { required: true, message: "Không được để trống!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              style={{
                height: "40px",
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                margin: "20px 0",
                width: "150px",
                height: "50px",
                backgroundColor: "#151f32",
                fontSize: "17px",
              }}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
