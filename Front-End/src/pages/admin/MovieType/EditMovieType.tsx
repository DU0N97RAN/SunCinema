import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateMovieType } from "../../../redux/slice/movieTypeSlice";

type Props = {};

const EditMovieType = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movieType, isErr, isFetching, isSucess } = useAppSelector(
    (state) => state.movieTypeReducer
  );

  const data = movieType?.find((item: any) => item._id === id);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    values._id = id;
    dispatch(UpdateMovieType(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminMovieType);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  return (
    <>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovieType}>DS Thể loại</Link>
        </Button>
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to={configRoute.routes.adminMovie}>DS phim</Link>
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
          label="Tên phim"
          rules={[{ required: true, message: "Không được để trống! " }]}
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

export default EditMovieType;
