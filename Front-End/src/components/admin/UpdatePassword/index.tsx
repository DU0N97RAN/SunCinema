import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Radio } from "antd";
import { UserApi } from "../../../service/userApi";
import { useAppDispatch } from "../../../redux/hook";
import { updatePass } from "../../../redux/slice/userSlice";
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
interface updatePassProps {
  userId: any;
  token: any;
}

const UpdatePassWord = ({ userId, token }: updatePassProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title={`User: ${userId}`}
        okText="Đổi mật khẩu"
        cancelText="Thoát"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(({ password }) => {
              form.resetFields();
              onCreate(password);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const onCreate = (val: any) => {
    dispatch(updatePass({ token, newPassword: val }))
      .then(() => {
        setOpen(false);
        message.success("Đổi mật khẩu thành công");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Đổi mật khẩu
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default UpdatePassWord;
