import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link } from "react-router-dom";
import { removeFoodItem } from "../../../redux/slice/FoodSlice";
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../ultils";

type Props = {};

const FoodList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { food, errMess } = useAppSelector((state) => state.food); //
  const deleteFood = (data: string | undefined) => {
    dispatch(removeFoodItem(data))
      .unwrap()
      .then(() => {
        message.success({ content: "Xoá thành công", key: "handling" });
      })
      .catch(() => {
        message.error({ content: { errMess } });
      });
  };
  const columnUserList: any = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (_: any, { image, _id }: any) => (
        <Link to={_id}>
          <img src={image} style={{ width: "100px" , height: "60px"}} />
        </Link>
      ),
      width: 120,
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (_: any, { name, _id }: any) => <Link to={_id}>{name}</Link>,
    },

    {
      title: "Giá",
      dataIndex: "price",
      render: (_: any, record: any) => <p>{formatCurrency(record?.price)}</p>,
      width: 140,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_: any, record: any) => (
        <p>{record?.status === 0 ? "Đang bán" : "Ngừng bán"}</p>
      ),
    },
    {
      title: "SL trong kho",
      dataIndex: "stock",
      render: (_: any, record: any) => <p>{record?.stock}</p>,
    },

    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: "100px",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
          {/* <Popconfirm
            title={`Xóa ${record?.name ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => deleteFood(record?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  const data: Props[] = food?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      price: item?.price,
      stock: item?.stock,
      status: item?.status,
      image: item?.image[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
    };
  });
  console.log(data);

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/food/create">Tạo mới</Link>
      </Button>
      <DataTable column={columnUserList} data={data} />
    </div>
  );
};

export default FoodList;
