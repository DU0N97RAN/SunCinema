import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createFood } from "../../../redux/slice/FoodSlice";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { validateMessages } from "../../../ultils/FormMessage";
import ImageUpload from "../../../components/upload";
import FoodForm from "../../../components/admin/Form&Table/FoodForm";
type Props = {};

const CreateFood = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any>([]);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    values.image = values.avatarList?.fileList;
    const { meta, payload } = await dispatch(createFood(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminFood);
    } else {
      message.error(`${payload}`);
    }
  };

  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminFood}>Danh sách đồ ăn</Link>
      </Button>
      <FoodForm
        onFinish={onFinish}
        form={form}
        avatarList={avatarList}
        setAvatarList={setAvatarList}
      />
    </>
  );
};

export default CreateFood;
