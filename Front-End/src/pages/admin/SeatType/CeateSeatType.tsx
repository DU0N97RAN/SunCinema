import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { createSeatType } from "../../../redux/slice/SeatTypeSlice";

type Props = {};

const CeateSeatType = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { meta, payload } = await dispatch(createSeatType(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminSeatType);
    } else {
      message.error(`${payload.message}`);
    }
  };

  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminSeatType}>Quản lí loại ghế</Link>
      </Button>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Tên"
          rules={[{ required: true, message: "Không được để trống! ", min: 5 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="extraPrice"
          label="Giá Thêm"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Màu ghế"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input type="color" style={{ width: "100px", height: "40px" }} />
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

export default CeateSeatType;
