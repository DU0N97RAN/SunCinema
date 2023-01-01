import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { Button, Form, Modal } from "antd";
import ImageUpload from "../../upload";
type Props = {};

const Avatar = (props: Props) => {
  const [image, setImage] = useState<any[]>([]);
  const { currentUser, isLogged } = useAppSelector(
    (state) => state.authReducer
  );
  const { users } = useAppSelector((state) => state.userReducer);
  const id = currentUser._id;
  const user = users?.find((item: any) => item._id === id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values: any) => {
    setIsModalOpen(false);
    console.log(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <img
        onClick={showModal}
        className="cursor-pointer"
        src={
          user && user?.avatar[0]?.url
            ? user?.avatar[0]?.url
            : "https://th.bing.com/th/id/R.71c4453ad27286d6fd431c271f737cf7?rik=kKxKeEyNDatElA&pid=ImgRaw&r=0&sres=1&sresct=1"
        }
      />

      {/* modal */}
      <Modal
        title="Cập nhật avatar"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          // onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Avatar">
            <ImageUpload imageList={image} limit={1} key={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Avatar;
