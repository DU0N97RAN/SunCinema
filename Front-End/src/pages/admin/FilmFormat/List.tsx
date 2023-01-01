import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Select,
  Skeleton,
  InputNumber,
  message,
  Space,
  Popconfirm,
} from "antd";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import DataTable from "../../../components/admin/Form&Table/Table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../ultils";
import {
  removeData,
  updateData,
  createData,
  getAllData,
} from "../../../redux/slice/FilmFormatSlice";
import { validateMessages } from "../../../ultils/FormMessage";
import { Link } from "react-router-dom";
import configRoute from "../../../config";

type Props = {};

const FilmFormatList = (props: Props) => {
  const { filmFormats, isFetching, errorMessage } = useAppSelector(
    (state) => state.FormatReducer
  );
  const [form] = Form.useForm();
  const [flag, setFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  //remove
  const removeFormat = (data: string | undefined) => {
    dispatch(removeData(data))
      .unwrap()
      .then(() => {
        message.success("Xóa thành công");
      });
  };
  useEffect(() => {
    setFlag(flag);
  }, [flag]);

  useEffect(() => {
    document.title = "Admin | FilmFormat Manager";
    dispatch(getAllData());
  }, [dispatch]);

  const onFinish = (valF: any) => {
    if (
      typeof valF === "object" &&
      (valF._id === null || valF._id === undefined || !valF._id)
    ) {
      setFlag(false);
      dispatch(createData(valF))
        .unwrap()
        .then(() => {
          form.resetFields();
          message.success("tao thành công");
        })
        .catch(() => {
          form.resetFields();
          message.error(errorMessage);
        });
    } else {
      setFlag(false);
      const dataA = filmFormats?.find((item: any) => item._id === valF);
      form.setFieldsValue({ ...dataA });
      if (flag) {
        dispatch(updateData(valF))
          .unwrap()
          .then(() => {
            form.resetFields();
            message.success("update thành công");
          })
          .catch(() => {
            form.resetFields();
            message.error(errorMessage);
          });
      } else {
        return;
      }
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const watchData = (val: any) => {
    setFlag(true);
  };
  const watchName = (val: any) => {
    setFlag(true);
  };

  const columns: any = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="overflow-auto surface-overlay">
          <p>{record?.name}</p>
        </div>
      ),
    },
    {
      title: "Giá extra",
      dataIndex: "extraPrice",
      key: "extraPrice",
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "var(--primary)", fontSize: "18px" }}
            onClick={() => onFinish(record?._id)}
          />
          {/* <Popconfirm
            title={`Delete ${record?.name ?? record?._id}?`}
            okText="OK"
            cancelText="Cancel"
            onConfirm={() => removeFormat(record?._id)}
          >
            <DeleteOutlined style={{ color: "red", fontSize: "18px" }} />
          </Popconfirm> */}
        </Space>
      ),
      width: 30,
    },
  ];
  const data: Props[] = filmFormats?.map((item: any, index: any) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      extraPrice: formatCurrency(item?.extraPrice),
    };
  });

  return (
    <div className="flex gap-3">
      <div className="col-6 w-full">
        <Button className="mb-5">
          <Link to={configRoute.routes.adminRooms}>Danh sách phòng chiếu</Link>
        </Button>
        <Button className="mb-5">
          <Link to={configRoute.routes.adminMovie}>Danh sách phim</Link>
        </Button>
        <DataTable column={columns} data={data} loading={isFetching} />
      </div>
      <div className="col-6 w-full">
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Tên "
              name="name"
              rules={[{ type: "string", required: true, whitespace: true }]}
            >
              <Input
                placeholder="Nhập vào"
                onChange={(e) => watchName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Tên " name="_id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Giá Extra"
              name="extraPrice"
              rules={[
                {
                  type: "number",
                  required: true,
                  min: 10000,
                  max: 200000,
                  whitespace: true,
                },
              ]}
            >
              <InputNumber
                min={10000}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                style={{ width: "100%" }}
                onChange={watchData}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ minWidth: "250px" }}
            >
              Lưu
            </Button>

            <Button htmlType="button" onClick={onReset} className="ml-5">
              Reset
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default FilmFormatList;
