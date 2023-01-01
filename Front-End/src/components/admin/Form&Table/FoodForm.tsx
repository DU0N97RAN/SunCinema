import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createFood } from "../../../redux/slice/FoodSlice";
import { Link, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { validateMessages } from "../../../ultils/FormMessage";
import ImageUpload from "../../../components/upload";
import { defaultStatus } from "../../../ultils/data";

type Props = {
  onFinish: any;
  form: any;
  avatarList: any;
  setAvatarList: any;
};

const FoodForm = ({ onFinish, form, avatarList, setAvatarList }: Props) => {
   return (
      <>
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
         >
            <Form.Item label="Ảnh" >
               <ImageUpload imageList={avatarList} limit={1} />
               <small>(Tải lên ít nhất 1 ảnh )</small>
            </Form.Item>
            <Form.Item
               name="name"
               label="Tên"
               rules={[{ required: true }]}
            >
               <Input placeholder="Tên" />
            </Form.Item>

            <Form.Item label="Giá bán" name="price" rules={[{ required: true, type: "number", min: 10000 }]}>
               <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder='Giá bán'
                  style={{ width: '100%' }}
               />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status" rules={[{ required: true }]}>
               <Select>
                  {defaultStatus.map((item: any) => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
               </Select>
            </Form.Item>

            <Form.Item label="Số lượng trong kho" name="stock" rules={[{ required: true }]}>
               <InputNumber min={1} placeholder="Số lượng trong kho" style={{ width: '100%' }} />
            </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FoodForm;
