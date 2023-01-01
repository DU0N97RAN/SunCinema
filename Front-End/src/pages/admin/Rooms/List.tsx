import React, { useEffect, useState } from "react";
import {
  Button,
  message,
  Popconfirm,
  Space,
  Tag,
  Pagination,
  Select,
  Tooltip,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link, useLocation } from "react-router-dom";
import {
  removeRoom,
  updateRoom,
  getRooms,
} from "../../../redux/slice/roomSlice";
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { defaultStatus } from "../../../ultils/data";
import configRoute from "../../../config";
const { Option } = Select;
type Props = {};

const AdminRoomList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { rooms, isFetching, isErr, errorMessage } = useAppSelector(
    (state: { roomReducer: any }) => state.roomReducer
  );

  useEffect(() => {
    document.title = "Admin | Rooms";
    dispatch(getRooms());
  }, [dispatch]);

  const deleteData = (data: string | undefined) => {
    dispatch(removeRoom(data))
      .unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errorMessage } });
      });
  };

  const changeStatus = (id: any, val: any) => {
    dispatch(updateRoom({ _id: id, status: val }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"))
      .catch((err: any) => message.error(err));
  };
  const columns: any = [
    {
      title: "Tên phòng chiếu",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <Link
            to={`${record?._id}`}
            style={{ color: "#262626", height: "10px" }}
            className="hover:text-red-700"
          >
            {record?.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Tổng ghế",
      dataIndex: "tongGhe",
      key: "tongGhe",
    },
    {
      title: "Số cột",
      dataIndex: "columns",
      key: "columns",
    },
    {
      title: "Số hàng",
      dataIndex: "rows",
      key: "rows",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <Select
          value={record?.status === 0 ? "Hoạt động" : "Dừng hoạt động"}
          onChange={(value: any) => {
            changeStatus(record?._id, value);
          }}
        >
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa ">
            <Link to={`${record?._id}?seatTypeId=${"123"}`}>
              <EditOutlined
                style={{ color: "var(--primary)", fontSize: "18px" }}
              />
            </Link>
          </Tooltip>
          {/* <Tooltip title="Xóa">
            <Popconfirm
              title={`Xem ${record?.username ?? record?._id}?`}
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => deleteData(record?._id)}
            >
              <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
            </Popconfirm>
          </Tooltip> */}
          <Tooltip title="Xem ghế ">
            <Link to={`/admin/seatsByRoom/${record?._id}`}>
              <EyeOutlined
                style={{ color: "var(--primary)", fontSize: "18px" }}
              />
            </Link>
          </Tooltip>
        </Space>
      ),
      width: 130,
    },
  ];

  const data: Props[] = rooms?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      columns: item?.columns,
      rows: item?.rows,
      seats: item?.seats,
      status: item?.status,
      tongGhe: item?.rows * item?.columns,
    };
  });

  useEffect(() => {
    if (isErr) {
      message.error({ content: `Failed: ${errorMessage} `, key: "handling" });
    }
  }, []);

  return (
    <div>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to="create">Thêm Phòng chiếu</Link>
        </Button>
        <Button>
          <Link to={configRoute.routes.adminSeatType}>Quản lí loại ghế</Link>
        </Button>
        <Button className="mb-5">
          <Link to={configRoute.routes.AdminFilmFormat}>
            Quản lí format film
          </Link>
        </Button>
      </div>
      <DataTable column={columns} data={data} loading={isFetching} />
    </div>
  );
};

export default AdminRoomList;
