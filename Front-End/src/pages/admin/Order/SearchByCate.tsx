import { Button, Collapse, Form, Input, Select } from 'antd'
import { orderMutipleOption } from '../../../ultils/data'
import {SearchOutlined} from "@ant-design/icons"

type Props = { data: any, onFinish: any,onReset:any }
const { Option } = Select;
const { Panel } = Collapse;
const SearchByCate = ({ data, onFinish,onReset }: Props) => {
   const [form] = Form.useForm();
   return (
      <div className='mb-3'>
         <Collapse expandIcon={({ isActive }) => <SearchOutlined />}>
            <Panel header="Tìm kiếm" key="1" showArrow={true}>
               <Form form={form} onFinish={onFinish}>
                  <Form.Item >
                     <Input.Group compact>
                        <Form.Item
                           name='optionData'
                           noStyle
                           rules={[{ required: true, message: 'Bắt buộc nhập' }]}
                        >
                           <Select placeholder="Chọn danh mục tìm kiếm" >
                              {orderMutipleOption?.map((item: any) => (
                                 <Option value={item?.value} key={item?.value}>
                                    {item?.name}
                                 </Option>
                              ))}
                           </Select>
                        </Form.Item>
                        <Form.Item
                           name='searchValue'
                           noStyle
                           rules={[{ required: true, message: 'Bắt buộc nhập' }]}
                        >
                           <Input style={{ width: '60%' }} placeholder="Nội dung tìm kiếm" />
                        </Form.Item>
                     </Input.Group>
                  </Form.Item>
                  <div className="flex gap-3">
                     <Form.Item>
                        <Button type='primary' htmlType='submit'>Submit</Button>
                     </Form.Item>
                     <Form.Item>
                        <Button htmlType='reset' onClick={onReset}>Reset</Button>
                     </Form.Item>
                  </div>
               </Form>
            </Panel>
         </Collapse>
      </div>
   )
}

export default SearchByCate