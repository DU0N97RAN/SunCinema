import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";
import { createCategories } from "../../../redux/slice/CategorySlice";
import configRoute from "../../../config";

type Props = {};

const CreateCategory = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    const { meta } = await dispatch(createCategories(values));
    if (meta.requestStatus == "fulfilled") {
      message.success({ content: "Thêm thành công" });
      navigate(configRoute.routes.adminCategories);
    } else {
      message.error({ content: "Lỗi" });
    }
  };
  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminCategories}>DS Danh mục</Link>
      </Button>
      <Button style={{ marginLeft: "20px" }}>
        <Link to={configRoute.routes.AdminPosts}>DS Bài viết</Link>
      </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Name"
          rules={[
            { required: true, message: "Không được để trống" },
            { min: 5 },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCategory;
