import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import DataTable from "../../../components/admin/Form&Table/Table"
import { Space, Typography, message, Tooltip, Button, Select, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { defaultStatus } from '../../../ultils/data';
import { removeData, updateData, getAlPost } from "../../../redux/slice/PostSlice"

import { formatDate } from '../../../ultils';
import { getUsers } from '../../../redux/slice/userSlice';
import { getCategories } from '../../../redux/slice/CategorySlice';
import configRoute from '../../../config';
type Props = {}
const { Text } = Typography;
const { Option } = Select;

const AdminPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Admin | List Post";
    dispatch(getAlPost())
  }, [dispatch]);

  const { posts, errorMessage } = useAppSelector(state => state.PostReducer);

  const deleteData = (data: string | undefined) => {
    dispatch(removeData(data)).unwrap()
      .then(() => message.success('Xóa thành công'))
      .catch(() => message.error(errorMessage))
  };

  const changeStatus = (id: any, value: any,title:any) => {
    dispatch(updateData({ _id: id, status: value, title: title })).unwrap()
    .then(() => {
      message.success('Thay đổi trạng thái thành công');
      dispatch(getAlPost())
    });
  }

  const columns: any[] = [
    {
      title: "Thumbnail",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (_: any, record: any) => (
        <Link to={`${record._id}`}><img width="40px" height="40px" src={record?.thumbnail} alt="" className="object-cover" /></Link>
      ),
      width: 50
    },
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (item: any, record: any) => (
        <Link to={`${record._id}`}>
          <Text className="text-[#1890ff]">{item.length >= 30 ? `${item.substring(0, 30)}...` : item}</Text>
        </Link>
      ),
      width: 220
    },
    {
      title: "Mô tả",
      key: "desc",
      dataIndex: "desc",
      render: (_: any, { desc }: any) => (
        <div dangerouslySetInnerHTML={{ __html: desc.length >= 50 ? `${desc.substring(0, 50)}...` : desc }} className="leading-5">
        </div>
      ),
      width: 220
    },
    {
      title: "Người viết",
      key: "author",
      dataIndex: "author",
      render: (_: any, { author }: any) => (
        <Tooltip title={author?.email}>{author?.username}</Tooltip>
      ),
      width: 220
    },
    {
      title: "Danh mục",
      key: "category",
      dataIndex: "category",
      width: 220
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_: any, { _id, status, title }: any) => (
        <Select value={status === 0 ? 'active' : 'inActive'}
          onChange={(value: any) => { changeStatus(_id, value, title) }}>
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>{item?.name}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Ngày tạo",
      key: "create",
      dataIndex: "create",
      width: 120
    },
    {
      title: "Ngày sửa gần nhất",
      key: "update",
      dataIndex: "update",
      width: 120
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined style={{ color: 'var(--primary)', fontSize: '18px' }} />
          </Link>
          <Popconfirm
            title={`Delete ${record?.name ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteData(record?._id)}
          >
            <DeleteOutlined style={{ color: 'red', fontSize: '18px' }} />
          </Popconfirm>
        </Space>
      ),
      width: 30
    },

  ];

  const data: Props[] = posts?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      title: item?.title,
      thumbnail: item?.imagesFile[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      author: item?.userId,
      status: item?.status,
      desc: item?.desc,
      create: formatDate(item?.createdAt),
      update: formatDate(item?.updatedAt),
      category: item?.categoryId?.title
    }
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px", marginRight: "12px" }}>
        <Link to="add">Tạo Bài viết</Link>
      </Button>
      <Button  style={{ marginBottom: "20px" }}>
        <Link to={configRoute.routes.adminCategories}>DS Danh mục</Link>
      </Button>
      <DataTable column={columns} data={data} />

    </div>
  )
}

export default AdminPosts
