import React from 'react'
import { Button, Card, Form, FormInstance, Input, message, Modal, Select, Upload, Skeleton } from "antd";
import { validateMessages } from "../../../ultils/FormMessage";
import ImageUpload from "../../upload"
import { defaultStatus } from "../../../ultils/data"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAppSelector } from '../../../redux/hook';

interface PostFormProps {
   form: FormInstance<any>;
   onFinish: (values: any) => void;
   avatarList: any[];
   setAvatarList: React.Dispatch<any>;
   onReset?: () => void;
   edit?: boolean;
   editData?: boolean;
   loading?: boolean;
}
const PostForm = ({ setAvatarList, avatarList, form, onFinish, onReset, edit = false, loading = false, editData = true }: PostFormProps) => {
   const { categories, isFetching } = useAppSelector((state: any) => state.categoriesReducer);
   return (
      <Form layout="vertical" form={form} onFinish={onFinish} validateMessages={validateMessages}>
         <div className="grid grid-flow-col">
            {editData ? (
               <>
                  <Card className="col-6 w-full">
                     <Form.Item label="Ảnh" >
                        <ImageUpload imageList={avatarList} limit={5} key={1} />
                        <small>(Tải lên ít nhất 1 ảnh và tối đa 5 ảnh)</small>
                     </Form.Item>
                     <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, min: 5, whitespace: true }]}>
                        <Input placeholder="Nhập vào" />
                     </Form.Item>
                     <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                        <Select placeholder="Lựa chọn" allowClear showSearch optionFilterProp="children">
                           {categories?.map((item: any) => (
                              <Select.Option key={item._id} value={item._id}>
                                 {item.title}
                              </Select.Option>
                           ))}
                        </Select>
                     </Form.Item>

                     <Form.Item label="Trạng thái" name="status">
                        <Select>
                           {defaultStatus.map((item: any) => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
                        </Select>
                     </Form.Item>
                  </Card>
                  <Card className="col-6 w-full">
                     <Form.Item
                        label="Mô tả"
                        name="desc"
                        valuePropName="desc"
                        getValueFromEvent={(event, editor) => {
                           const data = editor.getData();
                           return data;
                        }}
                        rules={[{ required: true }]}>
                        <CKEditor editor={ClassicEditor}  config={{ placeholder: "Vui lòng nhập mô tả bài viết", ImageUpload }} data={form.getFieldValue("desc")} />
                     </Form.Item>

                     <Form.Item
                        label="Nội dung"
                        name="content"
                        valuePropName="content"
                        getValueFromEvent={(event, editor) => {
                           const data = editor.getData();
                           return data;
                        }}
                        rules={[{ required: true }]} >
                        <CKEditor editor={ClassicEditor} config={{ placeholder: "Vui lòng nhập nội dung bài viết" }} data={form.getFieldValue("content")} />
                     </Form.Item>

                     <div className="col-12">
                        <Card style={{ position: "sticky", bottom: "0", left: "0", width: "100%", border: 'none' }}>
                           <div style={{ display: "flex", justifyContent: "start", gap: "5px" }}>
                              {onReset && (
                                 <Button htmlType="button" onClick={onReset}>
                                    Nhập lại
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
            ) : (<>
               <Skeleton />
            </>)}
         </div>
      </Form>
   )
}

export default PostForm;
