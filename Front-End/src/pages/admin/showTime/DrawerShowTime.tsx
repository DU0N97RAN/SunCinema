import React, { useState } from 'react';
import { PlusOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Select, Space } from 'antd';
type Props = {
  children: JSX.Element;
  isCreate?: boolean;
  isShowList?: boolean
}

const DrawerShowTime = ({ children, isCreate, isShowList }: Props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <>
        {isCreate  && (
          <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} >
            Tạo suất chiếu mới
          </Button>
        )}
        {isShowList && (
          <Button type="primary" onClick={showDrawer} icon={<InfoCircleOutlined /> } >
            Xem danh sách
          </Button>
        )}
        <Drawer
          title={`${isCreate ? "Tạo suất chiếu" : "Danh sách giờ chiếu"}`}
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          {children}
        </Drawer>
      </>
    </>
  )
}

export default DrawerShowTime