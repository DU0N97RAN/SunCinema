import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { updateRoom } from "../../../redux/slice/roomSlice";
import RoomForm from "../../../components/admin/Form&Table/RoomForm";
import config from "../../../config";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";

type Props = {};

const AdminRoomEdit = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { rooms } = useAppSelector((state: any) => state.roomReducer);
  const dataSelected = rooms.find((item: any) => item._id === id);
  const [seatFile, setSeatFile] = useState();
  const [rowFile, setRowFile] = useState<any>(dataSelected?.rows);
  const [colFile, setSColFile] = useState<any>(dataSelected?.columns);
  const [seatsEdit, setSeatsEdit] = useState<any>([])
  const [showSeatTye, setShowSeatTye] = useState(true)
  const [adminRenderSeat, setAdminRenderSeat] = useState(false)

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getOneSBSTById(id));
      let a = payload[0]?.seatTypeId
      setSeatsEdit(a)
    })();
    setShowSeatTye(true);
  }, [id]);

  useEffect(() => {
    document.title = `Admin | Edit ${dataSelected?.name ?? dataSelected?._id}`;
    if (dataSelected && seatsEdit) {
      form.setFieldsValue({
        ...dataSelected,
        formatId: dataSelected?.formatId?._id,
        seatTypeId: seatsEdit?._id
      });
    }
  }, [dataSelected, seatsEdit]);


  const onFinish = (data: any) => {
    data.seatsEdit = seatFile;
    data._id = id;
    console.log(dataSelected, data);
    if (data.rows < dataSelected.rows || data.columns < dataSelected.columns) {
      if (data.rows < dataSelected.rows) {
        message.error({
          content: `Không nhập Row nhỏ hơn ${dataSelected.rows}`,
        });
      }
      if (data.columns < dataSelected.columns) {
        message.error({
          content: `Không nhập Column nhỏ hơn ${dataSelected.columns}`,
        });
      }
    } else {
      dispatch(updateRoom(data))
        .unwrap()
        .then(() => {
          message.success("Update thành công");
          navigate(config.routes.adminRooms);
        })
        .catch((err: any) => message.error(err));
    }
  };

  return (
    <div>
      <Button type="primary" style={{ marginBottom: "20px" }}>
        <Link to="/admin/rooms">DS phòng</Link>
      </Button>
      <RoomForm
        onFinish={onFinish}
        form={form}
        seatFile={seatFile}
        setSeatFile={setSeatFile}
        edit={true}
        rowFile={rowFile}
        colFile={colFile}
        setRowFile={setRowFile}
        setColFile={setSColFile}
        seats={seatsEdit}
        setSeats={setSeatsEdit}
        showSeatTye={showSeatTye}
        adminRenderSeat={adminRenderSeat}
        showTable={false}
      />
    </div>
  );
};

export default AdminRoomEdit;
