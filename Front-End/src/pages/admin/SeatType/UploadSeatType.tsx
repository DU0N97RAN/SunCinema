import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateSeatType } from "../../../redux/slice/SeatTypeSlice";

type Props = {};

const UploadSeatType = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { seatType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.seatTypeReducer
  );
  const data = seatType?.find((item) => item._id === id);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (item: any) => {
    item._id = id;
    dispatch(updateSeatType(item))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminSeatType);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminSeatType}>Quản lí loại ghế</Link>
        </Button>
      </div>
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
          label="Giá Extra"
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadSeatType;
