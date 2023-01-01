import { useState } from "react";
import { Button, Form, message } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { createMovie } from "../../../redux/slice/Movie";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import moment from "moment";
import MovieForm from "../../../components/admin/Form&Table/MovieForm";
type Props = {};

const CreateMovie = (props: Props) => {
  const [image, setImage] = useState<any  []>([]);
  const [form] = Form.useForm();
  document.title = "Admin | Tạo Phim"
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    values.releaseDate = new Date(moment(values.releaseDate).format());
    values.image = values.avatarList?.fileList;
    delete values?.avatarList;
    const { meta, payload } = await dispatch(createMovie(values));
    if (meta.requestStatus == "fulfilled") {
      message.success("Thêm thành công");
      navigate(configRoute.routes.adminMovie);
    } else {
      message.error(`${payload}`);
    }
  };

const onReset = () => {
  form.resetFields();
  setImage([]);
}
  return (
    <>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/movies">DS phim</Link>
      </Button>
      <MovieForm image={image} setImage={setImage} form={form} onFinish={onFinish} onReset={onReset}/>
    </>
  );
};

export default CreateMovie;
