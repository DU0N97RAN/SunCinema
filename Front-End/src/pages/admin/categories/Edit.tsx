import React, { useEffect } from "react";
import { Button, Form, Input, message, Space } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { editCate } from "../../../redux/slice/CategorySlice";
import configRoute from "../../../config";

type Props = {};

const EditCategory = (props: Props) => {
  const [form] = Form.useForm();
  const { categories } = useAppSelector(
    (state: any) => state.categoriesReducer
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const select = categories?.find((item: any) => item?._id === id);
  console.log(select);
  useEffect(() => {
    if (select) {
      form.setFieldsValue({ title: select?.title });
    }
  }, []);

  const onFinish = async ({ title }: any) => {
    const { meta } = await dispatch(editCate({ _id: id, title }));
    if (meta.requestStatus == "fulfilled") {
      message.success({ content: "Sửa thành công" });
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

export default EditCategory;
