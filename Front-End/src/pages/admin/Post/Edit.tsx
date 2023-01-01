import { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { updateData } from "../../../redux/slice/PostSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import PostForm from "../../../components/admin/Form&Table/PostForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../../config";
import configRoute from "../../../config";

type Props = {}

const AdminPostsEdit = (props: Props) => {
   const [form] = Form.useForm();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [avatarList, setAvatarList] = useState<any[]>([]);
   const { id } = useParams();
   const { posts, errorMessage } = useAppSelector((state) => state.PostReducer);

   const dataSelected = posts.find((item: any) => item._id === id);
   const currentUser = useAppSelector(state => state.authReducer.currentUser);

   useEffect(() => {
      document.title = `Admin | Edit ${dataSelected?.title ?? dataSelected?._id}`;
      if (dataSelected) {
         setAvatarList(dataSelected?.imagesFile as any[]);
         form.setFieldsValue({
            ...dataSelected,
            categoryId: dataSelected.categoryId && dataSelected.categoryId._id,
         });
      }
   }, [dataSelected]);

   const onReset = () => {
      form.resetFields();
      setAvatarList([]);
   };
   const onFinish = (data: any) => {
      data._id = id;
      let avatarList = data?.avatarList?.fileList;
      if (avatarList) data.imagesFile = avatarList;
      else data.imagesFile = dataSelected?.avatar;
      data.userId = currentUser._id
      dispatch(updateData(data))
         .unwrap()
         .then(() => {
            navigate(config.routes.AdminPosts);
            message.success("update thành công");
         })
         .catch(() => message.error(`${errorMessage}`));
   };

   return (
      <div>
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
      </div>
   )
}

export default AdminPostsEdit