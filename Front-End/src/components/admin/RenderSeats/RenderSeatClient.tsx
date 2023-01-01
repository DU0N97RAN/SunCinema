import { async } from "@firebase/util";
import { Collapse, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addSeats, removeArrSeats } from "../../../redux/slice/SeatSlice";
import {
  createTicketDetail,
  ticketDetailByShowTime,
} from "../../../redux/slice/TicketDetailSlice";
import { createTicket } from "../../../redux/slice/ticketSlice";
import { formatCurrency } from "../../../ultils";
import styles from "../Form&Table/room.module.scss";

type Props = {
  row: any;
  column: any;
  seatDetails: any;
  setSeatDetails: any;
  seatFile: any;
  setSeatFile: any;
  seats: any;
  setSeats: any;
  roomId: any;
  showtime: any;
  userId: any;
  adminPreview?: any
};
export const RenderInfoSeats = ({
  row,
  column,
  seats,
  setSeats,
  seatDetails,
  setSeatDetails,
  seatFile,
  setSeatFile,
  roomId,
  showtime,
  userId,
}: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { arrSeats } = useAppSelector((state) => state.SeatsReducer);
  let idShowtime = searchParams.get("showtime");
  let i = 0;
  const sum = (a: any, b: any) => {
    i++;
    return a + b.totalPriceSeat;
  };
  const total = arrSeats.reduce(sum, 0);
  let cart: any = [];

  localStorage.setItem(
    "cart",
    JSON.stringify({
      cart: arrSeats,
    })
  );
  cart = JSON.parse(localStorage.getItem("cart") as string);
  const navigate = useNavigate();
  const onSubmit = async () => {
    let ticket = cart?.cart?.map((item: any, index: number) => {
      return (item = {
        seatId: item._id,
        showTimeId: idShowtime,
        price: item.totalPriceSeat,
        roomId: roomId,
      });
    });
    dispatch(createTicket(ticket))
      .unwrap()
      .then((payload: any) => {
        //@ts-ignore
        navigate("/combo", { state: payload });
        dispatch(removeArrSeats());
      })
      .catch((err: any) => {
        console.log(err.message);
        alert(err);
      });
  };
  useEffect(() => {
    dispatch(
      ticketDetailByShowTime({ idShowTime: idShowtime, idRoom: roomId })
    );
  }, [dispatch]);

  return (
    <>
      <div className="text-white px-3 mt-5">
        <p>
          Ghế đã chọn:
          {arrSeats?.map((item: any) => (
            <span className="text-white" key={item._id}>
              {" " + item.row + item.column + ", "}
            </span>
          ))}
        </p>
        <div className="border border-white px-3 my-2"></div>
        <p>
          Tổng:
          <span className="text-red-600 text-2xl pl-5">
            {formatCurrency(total)}
          </span>
        </p>

        <div className="text-center">
          {total !== 0 && (
            <button
              onClick={() => onSubmit()}
              className="rounded-3xl my-5 bg-red-600 border border-white text-white w-36 h-12"
            >
              Tiếp tục
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export const RenderSeatClient = ({
  row,
  column,
  seats,
  setSeats,
  seatDetails,
  setSeatDetails,
  seatFile,
  setSeatFile,
  roomId,
  showtime,
  adminPreview
}: Props) => {
  const [elClick, setElClick] = useState();
  const dispatch = useAppDispatch();
  const { ticketByShowTime } = useAppSelector(
    (state) => state.TicketDetailReducer
  );
  useEffect(() => {
    handleSubmit();
  }, [seats]);
  useEffect(() => {
    clearSelectedSeats();
  }, []);
  const [classSeatChoose, setClassSeatChoose] = useState("");

  const clearSelectedSeats = () => { };

  const getClassNameForSeats = (seatValue: any) => {
    let seatStatus = seatValue?.status;
    let dynamicClass;
    if (seatStatus == 1) {
      // booked
      dynamicClass = styles.seatBlockedClient;
    } else if (seatStatus == 2) {
      // Seat Selected
      dynamicClass = styles.seatSelected;
    }
    if (ticketByShowTime.length !== 0) {
      ticketByShowTime?.map((item: any) => {
        if (seatValue._id === item.seatId) {
          dynamicClass = styles.seatBooked;
        }
      });
    }
    return `${dynamicClass} ${styles.seatsClient} `;
  };

  const handleSubmit = () => {
    const groupByRowName = seats?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = arrayItem.row;
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});

    setSeatDetails({ ...groupByRowName });
    setSeatFile({ ...groupByRowName });
  };
  const price = roomId?.formatId?.extraPrice + showtime?.price;

  const onSeatClick = (seatValue: any, rowIndex: any, key: any) => {
    seatValue = {
      ...seatValue,
      totalPriceSeat: seatValue?.seatTypeId?.extraPrice + price,
    };
    let checkSeat = ticketByShowTime.find(
      (item: any) => item.seatId === seatValue._id
    );

    let item = JSON.parse(JSON.stringify(seatValue));

    if (item?.status === 1) {
      return;
    } else if (item?.status === 0) {
      item["status"] = 2;

      if (ticketByShowTime.length == 0) {
        if (seatValue?.status === 0) {
          dispatch(addSeats(seatValue));
        }
      } else {
        if (checkSeat) {
          console.log("Ghế đang giữ");
          return;
        } else {
          dispatch(addSeats(seatValue));
        }
      }
    } else if (item?.status === 2) {
      item["status"] = 0;
      dispatch(addSeats(seatValue));
    }

    seatDetails[key][rowIndex] = { ...item };
    setSeatDetails({ ...seatDetails });
  };
  const RenderSeatsContain = () => {
    let seatArray = [];
    for (let key in seatDetails) {
      let colValue = seatDetails[key]?.map((seatValue: any, rowIndex: any) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>

          {adminPreview ? (
            <>
              {rowIndex === 0 && <span className={styles.colNameAd}>{key}</span>}
              {rowIndex === 0 && <span className={styles.colNameAd2}>{key}</span>}
            </>
          ) : (
            <>{rowIndex === 0 && <span className={styles.colName}>{key}</span>}</>
          )}
          <span
            style={{ backgroundColor: `${seatValue?.seatTypeId?.color}` }}
            className={`${getClassNameForSeats(seatValue)}`}
            onClick={() => {
              onSeatClick(seatValue, rowIndex, key);
            }}
          >
            {rowIndex + 1}
          </span>

          {seatDetails && rowIndex === seatDetails[key].length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
          {rowIndex === 0 && <span className={styles.colName2}>{key}</span>}
        </span>
      ));
      seatArray.push(colValue);
    }
    return <div className={styles.seatsLeafContainer}>{seatArray}</div>;
  };
  return (
    <div className="p-̀̀̀̀5 mx-̀̀5 w-full">
      <div className="pt-5 m-5">{RenderSeatsContain()}</div>
    </div>
  );
};
// export default RenderSeatClient;
