import React from 'react'
import { Button, Card, Form, FormInstance, Input, message, DatePicker, Select, Upload, Skeleton, InputNumber, Switch, Space } from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import ImageUpload from "../../upload"
import TextArea from 'antd/lib/input/TextArea';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
interface WebConfigFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   avatarList: any[];
   setAvatarList: React.Dispatch<any>;
   onReset?: () => void;
   edit?: boolean;
   editData?: boolean;
   loading?: boolean;
   hiddenBtn?: boolean
}

const { Option } = Select;
const WebConfigForm = ({ setAvatarList, avatarList, form, onFinish, onReset, hiddenBtn, editData = true }: WebConfigFormProps) => {
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}>
         <div className="grid grid-flow-col">
            {editData ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="logo" >
                        <ImageUpload imageList={avatarList} limit={1} key={1} />
                     </Form.Item>
                     <Form.Item label="Tên cửa hàng" name="storeName" rules={[{ required: true }]}>
                        <Input placeholder="Nhập nội dung" />
                     </Form.Item>

                     <Form.Item label="Địa chỉ" name="address_text" rules={[{ required: true }]} >
                        <Input placeholder="Nhập nội dung" />
                     </Form.Item>
                     <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]} >
                        <Input placeholder="Nhập nội dung" />
                     </Form.Item>

                  </Card>
                  <Card className="col-6 w-full">
                     <Form.Item label="Trạng thái" name="isMaintaince" rules={[{ required: true }]}>
                        <Select placeholder="Chọn nội dung">
                           <Option value={true}>bảo trì</Option>
                           <Option value={false}>Hoạt động</Option>
                        </Select>
                     </Form.Item>
                     <Form.Item label="Nhập iframe " name="map" rules={[{ required: true }]} >
                        <TextArea placeholder="Nhập nội dung" />
                     </Form.Item>

                     <p className='social_webconfig mb-3 before:mr-1'>Chọn mạng xã hội</p>
                     <Form.List name="social">

                        {(fields, { add, remove }) => (
                           <>
                              {fields.map(({ key, name, ...restField }) => (
                                 <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                       {...restField}
                                       name={[name, 'name']}
                                    >
                                       <Select placeholder="Chọn nội dung">
                                          <Option value="Facebook">Facebook</Option>
                                          <Option value="Instagram">Instagram</Option>
                                          <Option value="Email">Email</Option>
                                       </Select>
                                    </Form.Item>
                                    <Form.Item
                                       {...restField}
                                       name={[name, 'text']}

                                    >
                                       <Input placeholder="Nhập nội dung" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                 </Space>
                              ))}
                              <Form.Item>
                                 <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                 </Button>
                              </Form.Item>
                           </>
                        )}
                     </Form.List>
                     <div className="col-12">
                        <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                           <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                              {onReset && (
                                 <Button htmlType="button" onClick={onReset}>  Nhập lại  </Button>
                              )}
                              <Button htmlType="submit" type="primary" style={{ minWidth: 150 }}>
                                 Lưu
                              </Button>
                           </div>
                        </Card>
                     </div>
                  </Card>

               </>
            ) : (<>
               <Skeleton />
            </>)}
         </div>
      </Form>
   )
}

export default WebConfigForm;
