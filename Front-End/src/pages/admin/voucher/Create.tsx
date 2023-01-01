import React, { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import VoucherForm from "../../../components/admin/Form&Table/VoucherForm";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { createData } from "../../../redux/slice/voucherSlice";
import moment from "moment";

type Props = {};

const AdminVoucherCreate = (props: Props) => {
  const [avatarList, setAvatarList] = useState<any[]>([]);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Admin | Create Post";
  }, []);
  const { errorMessage } = useAppSelector((state) => state.voucherReducer);
  const upperText = (text: any) => {
    return text.toUpperCase();
  };
  const onFinish = async ({ timeValid, ...values }: any) => {
    try {
      const [x, y] = timeValid;
      const timeStart = new Date(moment(x).format());
      const timeEnd = new Date(moment(y).format());
      values.imagesFile = values?.avatarList?.fileList;
      values.code = upperText(values.code);
      await dispatch(createData({ ...values, timeStart, timeEnd })).unwrap();
      message.success("Thêm Voucher thành công");
      navigate(config.routes.AdminVouchers);
    } catch (error) {
      message.error(errorMessage);
    }
  };

  const onReset = () => {
    form.resetFields();
    setAvatarList([]);
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={config.routes.AdminVouchers}>DS Voucher</Link>
      </Button>
      <VoucherForm
        form={form}
        onFinish={onFinish}
        onReset={onReset}
        avatarList={avatarList}
        setAvatarList={setAvatarList}
        isCreate={true}
      />
    </div>
  );
};

export default AdminVoucherCreate;
