import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import moment from "moment";
import ImageUpload from "../../../components/upload";
import { createSlider } from "../../../redux/slice/Slider";
type Props = {};

const CreateSlider = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movie } = useAppSelector((state) => state.movie);
  const { posts } = useAppSelector((state) => state.PostReducer);
  const onFinish = async (values: any) => {
    values.images = values.avatarList?.fileList;
    let checkURL = movie?.filter((item: any) => (item?.slug)?.includes(values?.url));
    if (!checkURL || checkURL?.length > 0) {
      values.url = values.url
    } else {
      values.url = `/post/${values.url}`
    }
    const { meta, payload } = await dispatch(createSlider(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminSlider);
    } else {
      message.error(`${payload}`);
    }
  };
  useEffect(() => {
    if (movie && data) {
      setData([...movie, ...posts]);
    }
  }, [movie, posts])

  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminSlider}>List Slider</Link>
      </Button>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Ảnh">
          <ImageUpload imageList={image} limit={1} key={1} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Không được để trống! " }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
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
            {data?.map((item: any) => (
              <Select.Option value={`${item?.slug}`} key={item._id}>
                {item?.name ?? `/post/${item?.title}`}
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

export default CreateSlider;
