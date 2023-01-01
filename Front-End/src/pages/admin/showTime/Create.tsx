import React, { useEffect, useState } from 'react'
import ShowTimeForm from '../../../components/admin/Form&Table/ShowTimeForm';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { createData } from '../../../redux/slice/ShowTimeSlice'
import { Button, Form, message } from 'antd'
import moment from 'moment';
import config from '../../../config';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import configRoute from '../../../config';
import DrawerShowTime from './DrawerShowTime';
import NestedTable from './NestedTable';

type Props = {}

const AdminShowTimesCreate = (_props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useAppSelector(state => state.ShowTimeReducer)
  const [form] = Form.useForm();
  const [extraPrice, setExtraprice] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [timeEnd, setTimeEnd] = useState();
  let movieId = searchParams.get("movieId");
  useEffect(() => { document.title = "Admin | Create - ShowTimes" }, [])

  const onFinish = async (values: any) => {
    values.startAt = new Date(moment(values.timeStart).format());
    values.endAt = new Date(moment(values.timeEnd).format());
    values.date = values.startAt

    dispatch(createData(values)).unwrap()
      .then(() => {
        message.success('Tạo thành công');
        navigate(config.routes.adminMovie)
      })
      .catch((error: any) => message.error(error.message))
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div>
      <Button className='mb-5 mr-3'>
        <Link to={configRoute.routes.adminMovie}>Quản lí phim</Link>
      </Button>
      <DrawerShowTime children={<NestedTable />} isCreate={false} isShowList={true} />
      <ShowTimeForm form={form}
        onFinish={onFinish}
        edit={true}
        onReset={onReset}
        extraPrice={extraPrice}
        setExtraprice={setExtraprice}
        movieId={movieId}
        setTimeEnd={setTimeEnd}
        timeEnd={timeEnd} />
    </div>
  )
}
export default AdminShowTimesCreate