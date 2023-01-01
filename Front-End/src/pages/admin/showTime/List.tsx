import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { Card, Collapse} from 'antd';
import {  Button } from 'antd';
import { Link } from 'react-router-dom';
import { formatDate, formatTime, convertMovieTime } from '../../../ultils'
import { getAlSt } from '../../../redux/slice/ShowTimeSlice'
import { useSearchParams } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';

type Props = {}
const { Panel } = Collapse;
const AdminShowTimeList = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Admin | Showtime"
    dispatch(getAlSt({}))
    handleSubmit()
  }, [dispatch]);

  const { stList } = useAppSelector((state: any) => state.ShowTimeReducer);
  const { movie } = useAppSelector((state) => state.movie);

  const [showByDate, setShowByDate] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  let movieId = searchParams.get("movieId");
  let movieSelect = movie?.find((item: any) => item?._id === movieId);
  const showTimeByMovieId = (stList?.filter((item: any) => item?.movieId?._id === movieId && item?.status == 0));
  console.log('showTimeByMovieId', showTimeByMovieId);

  // get by date
  const handleSubmit = () => {
    const groupByDate = showTimeByMovieId?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = formatDate(arrayItem.date)
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});
    setShowByDate({ ...groupByDate });

  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to={`/admin/showTimes/create?movieId=${movieId}`} style={{ color: '#ffff' }}>Create ShowTime</Link>
      </Button>
      <Collapse
        bordered={false}
        defaultActiveKey={['2']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Thông tin phim" key="1" className="site-collapse-custom-panel">
          <div className=''>
            <img src={movieSelect?.image[0]?.url} alt="" width="140px" height="140px" />
            <div><b>Tên phim : </b>{movieSelect?.name}</div>
            <div><b>Ngày khởi chiếu : </b>{formatDate(movieSelect?.releaseDate)}</div>
            <div><b>Thời lượng : </b>{convertMovieTime(movieSelect?.runTime) + 'h'}</div>
            <div><b>Tên phim : </b>{movieSelect?.name}</div>
          </div>
        </Panel>
        <Panel header="Thông tin suất chiếu" key="2" className="site-collapse-custom-panel">
          {showTimeByMovieId ? showTimeByMovieId?.map((item: any) => (
            <Card key={item?._id}  >
              <h1>Ngày chiếu : {formatDate(item?.date)}</h1>
              <div>Giờ chiếu : {formatTime(item?.startAt)} - {formatTime(item?.endAt)}</div>
              <div>Phòng chiếu :
                {item?.roomId?.map((roomItem: any) => (
                  <Button key={roomItem?._id}>
                    <Link to={`/book-chair?room=${roomItem?._id}&showtime=${item?._id}`}>
                      {roomItem?.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </Card>
          )) : (
            <>
              <p>Chưa có suất chiếu nào</p>
            </>
          )}
          {/* {renderShowByDate()} */}
        </Panel>
      </Collapse>

    </div>
  )
}

export default AdminShowTimeList