import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateSliderThunk } from "../../../redux/slice/Slider";
import moment from "moment";
import ImageUpload from "../../../components/upload";

type Props = {};

const UpdateSlider = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { slider, errMess } = useAppSelector((state) => state.slider);
  const data = slider.find((item: any) => item._id === id);
  const [dataUpdate, setDataUpdate] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setImage(data?.images as any[]);
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);
  const { movie } = useAppSelector((state) => state.movie);
  const { posts } = useAppSelector((state) => state.PostReducer);

  useEffect(() => {
    if (movie && data) {
      setDataUpdate([...movie, ...posts]);
    }
  }, [movie, posts]);

  const onFinish = async (values: any) => {
    values._id = id;
    let imageOld = values.avatarList?.fileList;
    if (imageOld) values.image = imageOld;
    else values.image = values?.image;
    let checkURL = movie?.filter((item: any) => (item?.slug)?.includes(values?.url));
    if (!checkURL || checkURL?.length > 0) {
      values.url = values.url
    } else {
      values.url = `/post/${values.url}`
    }
    console.log(values)
    dispatch(UpdateSliderThunk(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminSlider);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };

  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminSlider}>DS Slider</Link>
      </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Image">
          <ImageUpload imageList={image} limit={1} key={1} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Tên"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="Nội dung"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Url"
          name="url"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Select>
            {dataUpdate?.map((item: any) => (
              <Select.Option value={item.slug} key={item._id}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
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

export default UpdateSlider;
