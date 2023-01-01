import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  message,
  DatePicker,
  Select,
  Upload,
  Skeleton,
  InputNumber,
  Switch,
} from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import ImageUpload from "../../upload";
import { defaultStatus } from "../../../ultils/data";
import TextArea from "antd/lib/input/TextArea";
import VoucherUserUsed from "../VoucherUserUsed";

interface VoucherFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => void;
  avatarList: any[];
  setAvatarList: React.Dispatch<any>;
  onReset?: () => void;
  edit?: boolean;
  editData?: boolean;
  loading?: boolean;
  isCreate?: boolean;
  voucherId?: any;
  userId?: any;
}
const { Option } = Select;
const VoucherForm = ({
  setAvatarList,
  userId,
  voucherId,
  isCreate,
  avatarList,
  form,
  onFinish,
  onReset,
  edit = false,
  loading = false,
  editData = true,
}: VoucherFormProps) => {
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <div className="grid grid-flow-col">
        {editData ? (
          <>
            <Card className="col-6 w-full">
              <Form.Item label="Ảnh">
                <ImageUpload imageList={avatarList} limit={1} key={1} />
              </Form.Item>
              <Form.Item
                label="Mã Code"
                name="code"
                rules={[{ required: true }]}
              >
                <Input placeholder="Mã Voucher" />
              </Form.Item>
              <Form.Item
                label="Tên voucher"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Tên Voucher" />
              </Form.Item>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Nhập số lượng voucher"
                />
              </Form.Item>
              <Form.Item
                label="Nội dung"
                name="content"
                rules={[{ required: true }]}
              >
                <TextArea placeholder="Nhập nội dung" />
              </Form.Item>
              <Form.Item
                label="Thời gian hiệu lực"
                name="timeValid"
                rules={[{ required: true }]}
              >
                <DatePicker.RangePicker showTime />
              </Form.Item>
            </Card>
            <Card className="col-6 w-full">
              <Form.Item label="Mô tả ngắn" name="shortDesc">
                <Input />
              </Form.Item>
              <Form.Item
                label="Điều kiện giảm"
                name="condition"
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn điều kiện giảm">
                  <Option value={1}>Giảm theo tiền</Option>
                  <Option value={0}>Giảm theo %</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Số tiền hoặc % giảm theo điều kiện"
                name="conditionNumber"
                className="w-full"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Số tiền hoặc % giảm theo điều kiện"
                />
              </Form.Item>
              <Form.Item
                label="Số tiền tối thiểu để giảm"
                name="voucherVal"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Số tiền được giảm tối đa"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Giảm tối đa"
                name="voucherLimit"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, "")}
                  placeholder="Số tiền được giảm tối đa"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true }]}
              >
                <Select>
                  {defaultStatus.map((item: any) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              {!isCreate && (
                <VoucherUserUsed voucherId={voucherId} userId={userId} />
              )}
              <div className="col-12">
                <Card
                  style={{
                    position: "sticky",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "5px",
                    }}
                  >
                    {onReset && (
                      <Button htmlType="button" onClick={onReset}>
                        {" "}
                        Nhập lại{" "}
                      </Button>
                    )}
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{ minWidth: 150 }}
                    >
                      Lưu
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Skeleton />
          </>
        )}
      </div>
    </Form>
  );
};

export default VoucherForm;
