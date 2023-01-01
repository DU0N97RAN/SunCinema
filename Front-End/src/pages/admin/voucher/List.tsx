import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import DataTable from "../../../components/admin/Form&Table/Table";
import {
  Space,
  Typography,
  message,
  Tooltip,
  Button,
  Select,
  Popconfirm,
  Tag,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { defaultStatus } from "../../../ultils/data";
import {
  removeData,
  updateData,
  getAlVc,
} from "../../../redux/slice/voucherSlice";
import moment from "moment";
import { formatCurrency } from "../../../ultils";
import { formatDistance, isEqual, parseISO } from "date-fns";
import isPast from "date-fns/isPast";
type Props = {};
const { Text } = Typography;
const { Option } = Select;

const AdminVoucherList = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Admin | List Voucher";
    dispatch(getAlVc());
  }, [dispatch]);

  const { vouchers, errorMessage } = useAppSelector(
    (state: any) => state.voucherReducer
  );


  const changeStatus = (id: any, value: any) => {
    dispatch(updateData({ _id: id, status: value }))
      .unwrap()
      .then(() => message.success("Thay đổi trạng thái thành công"));
  };
  const columns: any[] = [
    {
      title: "Thumbnail",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (_: any, record: any) => (
        <img
          width="40px"
          height="40px"
          src={record?.thumbnail}
          alt=""
          className="object-cover"
        />
      ),
      width: 50,
    },
    {
      title: "code",
      key: "code",
      dataIndex: "code",
      render: (item: any, record: any) => (
        <Link to={`${record._id}`}>
          <Text className="text-[#1890ff]">
            {item.length >= 30 ? `${item.substring(0, 30)}...` : item}
          </Text>
        </Link>
      ),
      width: 70,
    },
    {
      title: "SL",
      key: "quantity",
      dataIndex: "quantity",
      width: 50,
    },
    {
      title: "Condition",
      key: "condition",
      render: (_: any, record: any) => (
        <Tag color={record.condition ? "green" : "blue"}>
          {record.condition === 1
            ? `Giảm ${formatCurrency(record.conditionNumber)}`
            : `Giảm ${record.conditionNumber}%`}
        </Tag>
      ),
      width: 50,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: any, { _id, status }: any) => (
        <Select
          value={status === 0 ? "active" : "inActive"}
          onChange={(value: any) => {
            changeStatus(_id, value);
          }}
        >
          {defaultStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
      width: 50
    },
    {
      title: "Thời gian áp dụng",
      key: "time",
      render: (_: any, record: any) => (
        <Text>
          {moment(record.timeStart).format("DD/MM/YYYY HH:mm")} -
          {moment(record.timeEnd).format("DD/MM/YYYY HH:mm")}
        </Text>
      ),
      width: 260
    },
    {
      title: "Thời hạn ",
      key: "distance",
      render: (_: any, record: any) => <Text>{record.distance}</Text>,
      width: 80
    },
    {
      title: "Còn Hoạt động ?",
      key: "distance",
      render: (_: any, { isActive }: any) => <Text>{isActive ? "Quá hạn, không thể truy cập" : "Đang hoạt động"}</Text>,
      width: 80
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link to={`${record._id}`}>
            <EditOutlined
              style={{ color: "var(--primary)", fontSize: "18px" }}
            />
          </Link>
        </Space>
      ),
      width: 10,
    },
  ];

  const data: Props[] = vouchers?.map((item: any, index: any) => {
    let distanceV = formatDistance(
      parseISO(item?.timeStart),
      parseISO(item?.timeEnd)
    );
    let checkTime = isPast(parseISO(item?.timeEnd));
    return {
      key: index + 1,
      _id: item?._id,
      code: item?.code,
      thumbnail:
      item?.imagesFile[0]?.url ?? `${import.meta.env.VITE_HIDDEN_SRC}`,
      quantity: item?.quantity,
      status: item?.status,
      condition: item?.condition,
      content: item?.content,
      timeStart: item?.timeStart,
      timeEnd: item?.timeEnd,
      conditionNumber: item?.conditionNumber,
      activeQuantity: item?.quantity, // số lượng còn (sau khi trừ của user đã dùng)
      distance: distanceV,
      isActive: checkTime
    };
  });

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="add">Thêm Voucher</Link>
      </Button>
      <DataTable column={columns} data={data} />
    </div>
  );
};

export default AdminVoucherList;
