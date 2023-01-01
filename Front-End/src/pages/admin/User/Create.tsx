import { Form, Button, message } from "antd";
import moment from "moment";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '../../../components/admin/Form&Table/UserForm';
import config from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createUser } from "../../../redux/slice/userSlice"
type Props = {}

const UserCreate = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any[]>([]);
  const [newPass, setNewPass] = useState<string>('')
  const { errorMessage, isSucess, isErr } = useAppSelector((state) => state.userReducer);
  const [showPass, setShowPass] = useState<any>(true);
  useEffect(() => {
    document.title = "Admin | Add Users";
    if (isSucess) {
      message.success({ content: "Thêm thành công", key: "handling" });
      navigate(config.routes.adminUserList);
    }
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, [isSucess, isErr]);

  const onFinish = (data: any) => {
    const dob = new Date(moment(data.dob).format());
    data.avatar = data?.avatarList?.fileList;
    dispatch(createUser({ ...data, dob }))
  };

  const onReset = () => {
    form.resetFields();
    setAvatarList([]);
  };
  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.adminUserList}>DS Người dùng</Link>
      </Button>
      <UserForm
        onFinish={onFinish}
        form={form}
        avatarList={avatarList}
        setAvatarList={setAvatarList}
        onReset={onReset}
        newPass={newPass}
        setNewPass={setNewPass}
        showPass={showPass}
        userId={undefined} />
    </div>
  )
}

export default UserCreate