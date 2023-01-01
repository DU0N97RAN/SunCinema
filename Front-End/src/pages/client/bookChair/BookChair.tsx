import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  RenderInfoSeats,
  RenderSeatClient,
} from "../../../components/admin/RenderSeats/RenderSeatClient";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getRooms } from "../../../redux/slice/roomSlice";
import { getOneSBSTById } from "../../../redux/slice/SeatBySTSlice";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";
import { formatDate, formatTime } from "../../../ultils";
import "./BookChair.scss";
type Props = {};

const BookChair = (props: Props) => {
  const dispatch = useAppDispatch();
  // let id = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let idRoom = searchParams.get("room");
  let idShowtime = searchParams.get("showtime");
  const [seats, setSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState<any>();
  const [row, setRow] = useState<number>();
  const [column, setColumn] = useState<number>();
  const [seatFile, setSeatFile] = useState<any>();
  const { rooms } = useAppSelector((state) => state.roomReducer);
  const { stList } = useAppSelector((state) => state.ShowTimeReducer);
  const { seatType } = useAppSelector((state) => state.seatTypeReducer);
  const showtime = stList.find((item: any) => item._id === idShowtime);  
  const roomSelect = rooms?.find((item: any) => item?._id === idRoom);  
  React.useEffect(() => {
    dispatch(getAlSt({}));
    dispatch(getRooms());

    (async () => {
      const { payload } = await dispatch(getOneSBSTById(idRoom));
      setSeats(payload);
    })();
    document.title = "Chọn ghế"
  }, []);

  React.useEffect(() => {
    setColumn(roomSelect?.columns);
    setRow(roomSelect?.rows);
  }, []);
  let { currentUser } = useAppSelector((state) => state.authReducer);

  return (
    <>
      <div className="container">
        {/* chair */}
        <div className="mt-5 grid grid-cols-[900px,300px] gap-10 ">
          <div className="border border-[#ccc] rounded-md ">
            <div className="bg-[#182b47] h-[50px] flex gap-3 text-white p-2 justify-between items-center uppercase font-bold">
              <p> Tên phim :{showtime?.movieId?.name} </p>
              <p>  Phòng chiếu :{roomSelect?.name} -  {roomSelect?.formatId?.name}</p>
              <p>Giờ chiếu: {formatTime(showtime?.startAt)} ,ngày <span className="">{formatDate(showtime?.date)}</span> </p>
            </div>
            <div className="p-5 text-center">
              <p className="text-white">
                Để chọn ghế vui lòng chọn ghế ưa thích theo icon
              </p>
              <p className="text-white">
                Click tiếp vào ghế đã chọn để xoá lựa chọn
              </p>
              <div className="my-5">
                <img
                  className="mx-auto"
                  src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img49.png"
                  alt=""
                />
              </div>
            </div>

            {/* chair */}
            <RenderSeatClient
              setSeatFile={setSeatFile}
              seatFile={seatFile}
              row={row}
              column={column}
              seatDetails={seatDetails}
              setSeatDetails={setSeatDetails}
              seats={seats}
              setSeats={setSeats}
              roomId={roomSelect}
              showtime={showtime}
              userId={undefined}
            />
            {/* end chair */}
            <div className="mb-10 flex justify-around mx-20">
              {seatType?.map((item: any) => (
                <div className="flex" key={item._id}>
                  <p
                    className={`w-5 h-5 `}
                    style={{ backgroundColor: `${item.color}` }}
                  ></p>
                  <span className="text-white pl-2 capitalize">
                    {item.name}
                  </span>
                </div>
              ))}

              <div className="flex">
                <p className="w-5 h-5 bg-[#35d406]"></p>
                <span className="text-white pl-2"> Ghế Đã Chọn</span>
              </div>
              <div className="flex">
                <p className="w-5 h-5 bg-red-700"></p>
                <span className="text-white pl-2"> Ghế Đã Bán</span>
              </div>
            </div>
          </div>
          <div className="h-[598px] bg-[url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/bg04.png)]">
            <div className="text-center">
              <Link to={`/`}>
                <button className="rounded-3xl mt-14 border border-white text-white w-40 h-12">
                  Chọn lại phim
                </button>
              </Link>
            </div>
            <div>
              <img
                className="mx-auto w-[200px] mt-2"
                src={showtime?.movieId?.image[0]?.url}
                alt=""
              />
            </div>
            <RenderInfoSeats
              row={undefined}
              column={undefined}
              seatDetails={undefined}
              setSeatDetails={undefined}
              seatFile={undefined}
              setSeatFile={undefined}
              seats={undefined}
              setSeats={undefined}
              roomId={roomSelect}
              showtime={showtime}
              userId={currentUser}
            />
          </div>
        </div>
        {/* end chair */}
      </div>
    </>
  );
};

export default BookChair;
