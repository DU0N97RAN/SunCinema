import { Button, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { EditFood } from "../../../redux/slice/FoodSlice";
import FoodForm from "../../../components/admin/Form&Table/FoodForm";

type Props = {};

const UpdateFood = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { food, errMess } = useAppSelector((state) => state.food);
  const data = food.find((item: any) => item._id === id);
  const [avatarList, setAvatarList] = useState<any>([])

  useEffect(() => {
    if (data) {
      setAvatarList(data?.image as any[]);
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    values._id = id;
    let imageOld = values.avatarList?.fileList;
    if (imageOld) values.image = imageOld;
    else values.image = values?.image;
    dispatch(EditFood(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminFood);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  return (
    <>
      <Button className="mb-3">
        <Link to={configRoute.routes.adminFood}>DS Đồ ăn</Link>
      </Button>
      <FoodForm onFinish={onFinish} form={form} avatarList={avatarList} setAvatarList={setAvatarList} />
    </>
  );
};

export default UpdateFood;
