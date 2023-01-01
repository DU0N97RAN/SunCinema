import { Button, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import styles from "../../../pages/client/profile/profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { provices } from "../../../redux/slice/Provider";
import { updateUser } from "../../../redux/slice/userSlice";
import { formatDate } from "../../../ultils";
import Swal from "sweetalert2";

type Props = {};

const InfoUser = (props: Props) => {
  const [form] = Form.useForm();
  const { currentUser } = useAppSelector((state: any) => state.authReducer);
  const { users } = useAppSelector((state: any) => state.userReducer);
  const id = currentUser._id;
  const data = users?.find((item: any) => item._id === id);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    values._id = id;
    dispatch(updateUser(values))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err: any) => alert(err));
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data]);
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <Form {...layout} name="nest-messages" onFinish={onFinish} form={form}>
        <Form.Item
          name="email"
          label={
            <label style={{ color: "white", fontSize: "18px" }}>Email</label>
          }
        >
          <Input
            readOnly
            style={{
              cursor: "context-menu",
              height: "40px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="username"
          label={
            <label style={{ color: "white", fontSize: "18px" }}>Tên</label>
          }
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input
            style={{
              height: "40px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={
            <label style={{ color: "white", fontSize: "18px" }}>
              Số điện thoại
            </label>
          }
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input
            style={{
              height: "40px",
            }}
          />
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: "white", fontSize: "18px" }}>Địa chỉ</label>
          }
          name="address"
        >
          <Select>
            {provices &&
              provices?.map((item: any, index: any) => (
                <Select.Option value={item.name} key={index}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: "white", fontSize: "18px" }}>
              Giới tính
            </label>
          }
          name="gender"
        >
          <Radio.Group>
            <Radio value={0} style={{ color: "white", fontSize: "18px" }}>
              Nam
            </Radio>
            <Radio value={1} style={{ color: "white", fontSize: "18px" }}>
              Nữ
            </Radio>
          </Radio.Group>
        </Form.Item>
        <div className={styles.infoItems}>
          <div>Vai trò:{data?.role == 1 ? "Admin" : "Thành viên"}</div>
          <div>
            Trạng thái:
            {data.status === 0
              ? " Chưa xác thực"
              : data.status === 1
              ? " Đang hoạt động"
              : " Dừng hoạt động"}
          </div>
          <div>
            <span>Ngày đăng ký: {formatDate(data?.createdAt)}</span>-
            <span> Ngày sửa gần nhất: {formatDate(data?.updatedAt)}</span>
          </div>
        </div>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              margin: "20px 0",
              width: "150px",
              height: "50px",
              backgroundColor: "#151f32",
              fontSize: "17px",
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InfoUser;
