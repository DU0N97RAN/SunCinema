import React from "react";
import { Button, Form, Input, message, Space } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { createMovieType } from "../../../redux/slice/movieTypeSlice";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
type Props = {};

const CreateMovieType = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createMovieType(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminMovieType);
    } else {
      message.error(`${payload}`);
    }
  };

  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovieType}>DS Thể loại</Link>
        </Button>
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovie}>DS Phim</Link>
        </Button>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="movieName"
          label="Tên thể loại phim"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateMovieType;
