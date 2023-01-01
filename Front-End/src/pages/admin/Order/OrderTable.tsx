import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Image, InputRef, Tag } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom';
import { EditOutlined } from "@ant-design/icons";
import { formatCurrency, formatDate, formatTime } from '../../../ultils';
import SearchMutiple from './SearchByCate';


type Props = {
   data: any
}

const OrderTable = ({ data }: Props) => {
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef<InputRef>(null);


   const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: any,
   ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };

   const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
   };

   const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
         <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
               ref={searchInput}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
               style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => clearFilters && handleReset(clearFilters)}
                  size="small"
                  style={{ width: 90 }}
               >
                  Reset
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     confirm({ closeDropdown: false });
                     setSearchText((selectedKeys as string[])[0]);
                     setSearchedColumn(dataIndex);
                  }}
               >
                  Filter
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     close();
                  }}
               >
                  close
               </Button>
            </Space>
         </div>
      ),
      filterIcon: (filtered: boolean) => (
         <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
         record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text) =>
         searchedColumn == dataIndex ? (
            <Highlighter
               highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ''}
            />
         ) : (
            text
         ),
   });
   const dataSource: Props[] = data?.map((item: any, index: any) => {
      return {
         key: index + 1,
         _id: item?._id,
         status: item?.status,
         createdAt: item?.createdAt,
         qrCode: item?.qrCode,
         ticketId: item?.ticketId,
         totalPrice: formatCurrency(item?.totalPrice),
         userId: item?.userId,
         ticket: item?.ticketId?.quantity,
         code: item?.shortId
      };
   });

   const columns: ColumnsType<any> = [
      {
         title: 'Mã đơn',
         dataIndex: 'code',
         key: 'code',
         ...getColumnSearchProps('code'),
         render: (_: any, { code, _id }: any) => <Link to={`${_id}`}>{code}</Link>
      },
      {
         title: 'Ngày đặt',
         dataIndex: 'createdAt',
         key: 'createdAt',
         ...getColumnSearchProps('createdAt'),
         sortDirections: ['descend', 'ascend'],
         render: (_: any, { createdAt }: any) => <p>{formatDate(createdAt)} {formatTime(createdAt)}</p>
      },
      {
         title: 'SL Vé',
         dataIndex: 'ticket',
         key: 'ticket',
         ...getColumnSearchProps('ticket'),
         sorter: (a, b) => a.ticket.length - b.ticket.length,
         sortDirections: ['descend', 'ascend'],
      },
      {
         title: 'Tổng tiền',
         dataIndex: 'totalPrice',
         key: 'totalPrice',
         ...getColumnSearchProps('totalPrice'),
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
         render: (_: any, record: any) => (
            <>
               {record?.status === 1 ? <Tag color="#87d068"> Đã thanh toán   </Tag> : record?.status === 3 ? <Tag color="#d06d68"> Đã xuất vé </Tag> : <Tag color="processing">Đang chờ thanh toán / thanh toán lỗi</Tag>}
            </>
         )
      },

      {
         title: 'Người đặt',
         dataIndex: 'userId',
         key: 'userId',
         ...getColumnSearchProps('userId.username'),
         sorter: (a, b) => a.userId.username.length - b.userId.username.length,
         sortDirections: ['descend', 'ascend'],
         render: (_: any, { userId }: any) => <p>{userId?.username}</p>
      },

      {
         title: 'QR',
         dataIndex: 'qrCode',
         key: 'qrCode',
         render: (_: any, { qrCode }: any) => <Image
            width={40}
            height={40}
            src="error"
            fallback={qrCode}
         />
      },
      {
         title: "ACTION",
         key: "action",
         fixed: "right",
         render: (_: any, record: any) => (
            <Space size="middle">
               <Link to={`${record._id}`}>
                  <EditOutlined
                     style={{ color: "var(--primary)", fontSize: "18px" }}
                  />
               </Link>

            </Space>
         ),
      },
   ];
   return (
      <div>
         <Table columns={columns} dataSource={dataSource} />
      </div>
   )
}

export default OrderTable