import { Button, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import WebConfigForm from "../../../components/admin/Form&Table/WebConfigForm";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateData } from "../../../redux/slice/webConfig"


type Props = {};

const WebConfigEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarList, setAvatarList] = useState<any[]>([]);
  const { id } = useParams();
  const { webConfigs } = useAppSelector( (state:any) => state.WebConfigReducer);
  const dataSelected = webConfigs.find((item: any) => item._id === id);
  useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.code ?? dataSelected?._id}`;
    if (dataSelected) {
      setAvatarList(dataSelected?.logo as any[]);
      form.setFieldsValue({
        ...dataSelected,
        address_text: dataSelected?.address[0]?.text,
        map: dataSelected?.address[0]?.iframe
      });
    }
  }, [dataSelected]);

  const onReset = () => {
    form.resetFields();
    setAvatarList([]);
  };

  const onFinish = async (values: any) => {
    let address = [{ text: values.address_text, iframe: values.map }]
    let logo = values?.avatarList?.fileList;
    values._id  = id;
    let upload = { ...values, address, logo }
    dispatch(updateData(upload)).unwrap()
       .then(() => { message.success('Update thành công'); navigate(configRoute.routes.webConfig) })
       .catch(() => message.error('Tạo thất bại'))
  };

  return (
    <div>
      <div>
        <Button className="mb-3" type="primary">
          <Link to={configRoute.routes.webConfig}>Danh sách</Link>
        </Button>
        <WebConfigForm
          form={form}
          onFinish={onFinish}
          onReset={onReset}
          avatarList={avatarList}
          setAvatarList={setAvatarList}
        />
      </div>
    </div>
  );
};

export default WebConfigEdit;
