import { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import { createData } from "../../../redux/slice/PostSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import PostForm from "../../../components/admin/Form&Table/PostForm";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import configRoute from "../../../config";
type Props = {};

const AddPost = (props: Props) => {
   const [form] = Form.useForm();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const currentUser = useAppSelector(state => state.authReducer.currentUser);
   console.log('currentUser', currentUser);

   const [avatarList, setAvatarList] = useState<any[]>([]);
   const { errorMessage } = useAppSelector(state => state.FormatReducer);

   useEffect(() => { document.title = "Admin | Create Post" }, []);

   const onFinish = async (values: any) => {
      values.imagesFile = values?.avatarList?.fileList;
      values.userId = currentUser._id
      console.log('values', values);

      dispatch(createData(values)).unwrap()
         .then(() => { message.success('Tạo thành công'); navigate(config.routes.AdminPosts) })
         .catch(() => message.error(errorMessage))
   };

   const onReset = () => {
      form.resetFields();
      setAvatarList([]);
   };

   return (
      <>
         <Button type="primary" style={{ marginBottom: "20px" }}>
            <Link to={config.routes.AdminPosts}>DS Bài viết</Link>
         </Button>
         <Button style={{ marginLeft: "20px" }}>
            <Link to={configRoute.routes.adminCategories}>DS Danh mục</Link>
         </Button>
         <PostForm
            form={form}
            onFinish={onFinish}
            avatarList={avatarList}
            setAvatarList={setAvatarList}
            onReset={onReset}
         />
      </>
   );
};

export default AddPost;