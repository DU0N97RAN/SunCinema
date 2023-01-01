import React, { useState, useEffect } from 'react';
import { Button, message, Select, TableColumnsType } from 'antd';
import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { Link, useSearchParams } from 'react-router-dom';
import { formatDate, formatTime } from '../../../ultils';
import { getAlSt } from '../../../redux/slice/ShowTimeSlice';
import { isPast, parseISO } from "date-fns";
import { defaultStatus } from '../../../ultils/data';
import { updateData } from "../../../redux/slice/ShowTimeSlice"
import configRoute from '../../../config';
import { convertDate } from '../../../ultils';
import { PlusOutlined } from '@ant-design/icons';
import DrawerShowTime from './DrawerShowTime';
import AdminShowTimesCreate from './Create';
type Props = {}
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
const NestedTable = (props: Props) => {
  const [payload, setPayload] = useState<any[]>([]);
  const [showByDate, setShowByDate] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Admin | Showtime"
    dispatch(getAlSt({}));
  }, [dispatch]);

  const { stList } = useAppSelector((state: any) => state.ShowTimeReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  let movieId = searchParams.get("movieId");
  let { movie } = useAppSelector((state: any) => state.movie);
  let movieSelect = movie.find((item: any) => item?._id === movieId);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (stList) {
      let itemGet = stList?.filter((item: any) => item?.movieId?._id === movieId);
      setPayload(itemGet);

    }
  }, [stList, movieId]);

  useEffect(() => {
    if (payload) {
      handleSubmit();
    }
  }, [payload]);

  const handleSubmit = () => {
    let sort: any[] = payload?.sort((a: any, b: any) => convertDate(a.startAt) - convertDate(b.startAt))
    const groupByDate = sort?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = formatDate(arrayItem.date)
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});
    setShowByDate({ ...groupByDate });
  };
  const changeStatus = (_id: any, val: any) => {
    dispatch(updateData({ _id: _id, status: val })).unwrap()
      .then(() => { message.success("Thay đổi trạng thái thành công"); setTimeout(() => {
        window.location.reload();
      }, 1000); })
      .catch(() => message.error("Lỗi"))
  };

  const expandedRowRender = (row: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: '', dataIndex: 'key', key: 'key', width: 0, className: "", render: (_: any, { key }: any) => <p className='text-white'>{key}</p> },
      { title: 'Thời gian chiếu ', dataIndex: 'startAt', key: 'startAt', width: 150, render: (_: any, { startAt, endAt }: any) => <p>Từ {startAt} đến {endAt}</p>, },
      {
        title: 'Phòng chiếu', dataIndex: 'room', width: 250, key: 'room', render: (_: any, { room, _id, status2 }: any) => (
          <>
            {status2 ? (
              <>
                {room?.map((roomItem: any) => (
                  <Button key={roomItem?._id} className="ml-3" disabled>
                    <Link to={`/book-chair?room=${roomItem?._id}&showtime=${_id}`}>
                      {roomItem?.name}
                    </Link>
                  </Button>
                ))}
              </>
            ) : (
              <>
                {room?.map((roomItem: any) => (
                  <Button key={roomItem?._id} className="ml-3">
                    <Link to={`/book-chair?room=${roomItem?._id}&showtime=${_id}`}>
                      {roomItem?.name}
                    </Link>
                  </Button>
                ))}
              </>
            )}
          </>
        )
      },
      { title: 'Trạng thái truy cập', dataIndex: 'status2', key: 'status2', width: 100, render: (_: any, { status2 }: any) => <p>{status2 ? "Quá hạn, không thể truy cập" : "Đang hoạt động"}</p> },
      {
        title: "Hành động",
        key: "status",
        width: 100,
        render: (_: any, { _id, status2, status }: any) => (
          <>
            {status2 ? (
              <>
                <Select disabled value={status === 0 ? "Hoạt động" : "Dừng hoạt động"}  >
                  {defaultStatus?.map((item: any) => (
                    <Select.Option value={item?.value} key={item?.value}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>

              </>
            ) : (
              <>
                <Select
                  value={status === 0 ? "Hoạt động" : "Dừng hoạt động"}
                  onChange={(value: any) => {
                    changeStatus(_id, value);
                  }}
                >
                  {defaultStatus?.map((item: any) => (
                    <Select.Option value={item?.value} key={item?.value}>
                      {item?.name}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
          </>
        ),
      },

    ];

    const data: any[] = [];
    for (let showKey in showByDate) {
      showByDate[showKey]?.map((item: any, index: any) => {
        if (formatDate(item?.date) == row?.date) {
          let checkTime = isPast(parseISO(item?.date))
          data.push({
            key: index,
            startAt: formatTime(item?.startAt),
            endAt: formatTime(item?.endAt),
            _id: item?._id,
            status: item?.status,
            room: item?.roomId,
            status2: checkTime
          })
        }

      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<any[]> = [
    { title: 'Ngày chiếu', dataIndex: 'date', key: 'date' },
    { title: '', dataIndex: 'key', key: 'key', width: 3, render: (_: any, { key }: any) => <p className='text-white'>{key}</p> },
  ];

  const data: any[] = [];
  for (let key in showByDate) {
    data.push({
      key: Math.floor(Math.random() * showByDate[key].length * 100),
      date: key,
    });
  }
  return (
    <div>
      <Button className='mr-3'>
        <Link to={configRoute.routes.adminMovie}>DS Phim</Link>
      </Button>
      <DrawerShowTime children={<AdminShowTimesCreate />} isCreate={true} />
      <h1 className='flex justify-center uppercase'> phim : {movieSelect?.name} </h1>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
      />

    </div>
  )
}

export default NestedTable