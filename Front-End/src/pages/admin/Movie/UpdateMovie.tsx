import { Button, DatePicker, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { UpdateMovie } from "../../../redux/slice/Movie";
import moment from "moment";
import ImageUpload from "../../../components/upload";
import MovieForm from "../../../components/admin/Form&Table/MovieForm";

type Props = {};

const UpdateMovies = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const { id } = useParams();
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { movie } = useAppSelector((state) => state.movie);
  const data = movie?.find((item: any) => item._id === id);
  console.log(data);

  useEffect(() => {
    if (data) {
      setImage(data?.image as any[]);
      form.setFieldsValue({
        ...data,
        releaseDate: moment(data.releaseDate),
        movieTypeId: data?.movieTypeId?.map((item: any) => item?._id)
      });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    values._id = id;
    values.releaseDate = new Date(moment(values.releaseDate).format());
    let imageOld = values.avatarList?.fileList;
    if (imageOld) values.image = imageOld;
    else values.image = values?.image;
    dispatch(UpdateMovie(values))
      .unwrap()
      .then(() => {
        message.success({ content: "Sửa thành công" });
        navigate(configRoute.routes.adminMovie);
      })
      .catch(() => {
        message.error({ content: "Thất bại" });
      });
  };
  const onReset = () => {
    form.resetFields();
    setImage([]);
  };
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/movies">DS phim</Link>
      </Button>
      <MovieForm
        image={image}
        setImage={setImage}
        form={form}
        onFinish={onFinish}
        onReset={onReset}
      />
    </>
  );
};

export default UpdateMovies;
