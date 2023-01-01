import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  DatePicker,
  FormInstance,
  Select,
  Skeleton,
  InputNumber,
  Form,
  Alert,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { validateMessages } from "../../../ultils/FormMessage";
import moment from "moment";
import { defaultStatus } from "../../../ultils/data";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import "antd/dist/antd.css";
import {
  formatTime,
  convertMovieTime,
  formatCurrency,
  formatDate,
} from "../../../ultils";
import { getAlSt } from "../../../redux/slice/ShowTimeSlice";

interface ShowTimeFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => void;
  onReset?: () => void;
  edit?: boolean;
  editUser?: boolean;
  loading?: boolean;
  extraPrice: any;
  setExtraprice: any;
  movieId: any;
  setTimeEnd: any;
  timeEnd: any;
}
const ShowTimeForm = ({
  form,
  movieId,
  onFinish,
  onReset,
  editUser = true,
}: ShowTimeFormProps) => {
  const dispatch = useAppDispatch();
  const { movie } = useAppSelector((state) => state.movie);
  const { rooms } = useAppSelector((state) => state.roomReducer);
  const [messRoom, setMessRoom] = useState<any>("");
  const [messTime, setMessTime] = useState<any>("");
  const [roomSelect, setRoomSelect] = useState<any>();
  const [timeEnd, setTimeEnd] = useState<any>();
  const [priceExtra, setPriceExtra] = useState<any>();
  const [days, setDays] = useState<any>();
  const [timeChose, setTimeChose] = useState<any>();
  const [sortByTime, setSortByTime] = useState<any>();
  const [hiddenRoom, setHiddenRoom] = useState<any>(false);
  const [stByDays, setStByDays] = useState<any>();
  const [roomList, setRoomList] = useState<any>([]);
  const [stLisst, setStLisst] = useState<any>([]);
  useEffect(() => {
    dispatch(getAlSt({}));
  }, []);
  const { stList } = useAppSelector((state: any) => state.ShowTimeReducer);

  let movieSelect = movie?.find((item: any) => item?._id === movieId);
  let movieTime = convertMovieTime(movieSelect?.runTime);
  let movieRelease = moment(movieSelect?.releaseDate).date();
  // flatten roomId
  const flatten = (arr: any) => {
    return arr.reduce((pre: any, cur: any) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur?.roomId);
    }, []);
  };
  useEffect(() => {
    if (stList) {
      setStLisst(stList);
    }
  }, [stList]);
  useEffect(() => {
    if (movieId) {
      form.setFieldsValue({
        movieId: movieId,
        releaseDate: moment(movieSelect?.releaseDate),
      });
    }
    if (rooms) {
      let roomActive = rooms?.filter((item: any) => item?.status == 0);
      setRoomList(roomActive);
    }
  }, [movieId, rooms]);
  useEffect(() => {
    if (timeEnd && priceExtra) {
      form.setFieldsValue({
        timeEnd: moment(timeEnd),
        price: priceExtra,
      });
    }
  }, [timeEnd]);

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current <= moment().endOf("day");
  };

  const validRange = (value: any, dateString: any) => {
    setTimeEnd(moment(value).add(movieTime));
    let timeStart = moment(value).hour();
    let dayStart = moment(value).date();
    let getDayStart = formatDate(dateString);
    let fullTimeStart = moment(value).format("HH:mm");

    setTimeChose(fullTimeStart);
    setDays(getDayStart);

    if (dayStart >= movieRelease) {
      if (timeStart >= 9 && timeStart <= 16) {
        setPriceExtra(20000);
      } else if (timeStart >= 17 && timeStart <= 21) {
        setPriceExtra(30000);
      } else {
        setPriceExtra(10000);
      }
    } else {
      if (timeStart >= 9 && timeStart <= 16) {
        setPriceExtra(40000);
      } else if (timeStart >= 17 && timeStart <= 21) {
        setPriceExtra(50000);
      } else {
        setPriceExtra(30000);
      }
    }
  };
  const watchRoomId = (val: any) => {
    setRoomSelect(val);
  };
  useEffect(() => {
    const sortStByDay = stLisst?.reduce((accumulator: any, arrayItem: any) => {
      let rowName = formatDate(arrayItem.date);
      if (accumulator[rowName] == null) {
        accumulator[rowName] = [];
      }
      accumulator[rowName].push(arrayItem);
      return accumulator;
    }, {});
    setStByDays(sortStByDay);
  }, [stLisst]);

  useEffect(() => {
    if (days && timeChose) {
      validateST();
    }
  }, [days, timeChose, stLisst]);

  const validateST = () => {
    for (let key in stByDays) {
      if (key == days) {
        let sortByTime = stByDays[key]?.reduce(
          (accumulator: any, arrayItem: any) => {
            let rowName = formatTime(arrayItem.startAt);
            if (accumulator[rowName] == null) {
              accumulator[rowName] = [];
            }
            accumulator[rowName].push(arrayItem);
            return accumulator;
          },
          {}
        );

        for (let time in sortByTime) {
          if (time == timeChose) {
            setMessTime("Cảnh báo: Khung giờ này đang tồn tại trên hệ thống");
            let roomExist = flatten(sortByTime[time]);
            let kiemtraphongtrong = roomList.filter((cv: any) => {
              return !roomExist.find((e: any) => {
                return e?._id == cv?._id;
              });
            });
            setRoomList(kiemtraphongtrong);
            if (kiemtraphongtrong?.length > 0) {
              setMessRoom(
                `Phòng đang trống: ${kiemtraphongtrong?.map(
                  (item: any) => item?.name
                )}`
              );
            } else {
              setMessRoom(
                "Không còn phòng nào trống, vui lòng chọn khung giờ khác"
              );
              setHiddenRoom(true);
            }
          } else {
            setMessRoom("");
            setMessTime("");
            setHiddenRoom(false);
          }
        }
      } else {
        console.log("Hello");
      }
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <div className="grid grid-flow-col">
        {editUser ? (
          <>
            <Card className="col-6 w-full">
              <Form.Item
                label="Chọn Phim"
                name="movieId"
                rules={[{ required: true }]}
              >
                <Select disabled>
                  {movie.map((item: any, index: any) => (
                    <Select.Option key={item._id} value={item[index]}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Ngày khởi chiếu"
                name="releaseDate"
                rules={[{ required: true }]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  value={movieSelect?.releaseDate}
                  disabled
                  className="w-full"
                />
              </Form.Item>
              <div className="flex flex-wrap justify-between">
                <Form.Item
                  label="Chọn thời gian phát sóng"
                  name="timeStart"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={validRange}
                    showNow={false}
                  />
                </Form.Item>

                <Form.Item
                  label="Thời gian kết thúc"
                  name="timeEnd"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    disabled
                    showTime={{ hideDisabledOptions: true, format: "HH:mm" }}
                    showNow={false}
                    format="YYYY-MM-DD HH:mm"
                    onChange={validRange}
                  />
                </Form.Item>
              </div>
              {messTime && (
                <div className="mt-[-10px] mb-3 text-red-600">
                  {" "}
                  <Alert message={messTime} type="warning" showIcon />
                </div>
              )}

              <Form.Item
                label="Chọn phòng chiếu"
                name="roomId"
                rules={[{ required: true }]}
              >
                {hiddenRoom == true ? (
                  <Select mode="multiple" onChange={watchRoomId} disabled>
                    {roomList.map((item: any, index: any) => (
                      <Select.Option key={item._id} value={item[index]}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Select mode="multiple" onChange={watchRoomId}>
                    {roomList.map((item: any, index: any) => (
                      <Select.Option key={item._id} value={item[index]}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              {messRoom && (
                <div className="mt-[-10px] mb-3 text-red-600">
                  {" "}
                  <Alert message={messRoom} type="error" showIcon />
                </div>
              )}
            </Card>
            <Card className="col-6 w-full">
              <small className="block text-red-600 w-[300px] font-semibold">
                <span className="text-black">Bảng giá extra:</span> <br />
                Từ 9.am - 16.am: phụ thu {formatCurrency(20000)}
                <br />
                Từ 17.am - 21.pm: phụ thu {formatCurrency(30000)}
                <br />
                Sau 21.pm: phụ thu {formatCurrency(10000)}
                <br />
                <b>
                  * Suất chiếu sớm: phụ thu {formatCurrency(20000)} + giờ chiếu
                </b>
              </small>
              <Form.Item
                label="price"
                name="price"
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
                  disabled
                  min={10000}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "40%" }}
                  step="10000"
                />
              </Form.Item>

              <Form.Item
                label="Chọn trạng thái"
                name="status"
                rules={[{ required: true }]}
              >
                <Select>
                  {defaultStatus &&
                    defaultStatus?.map((item: any) => (
                      <Select.Option value={item.value} key={item.value}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <div className="col-12">
                <Card
                  style={{
                    position: "sticky",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "5px",
                    }}
                  >
                    {onReset && (
                      <Button htmlType="button" onClick={onReset}>
                        Nhập lại
                      </Button>
                    )}
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{ minWidth: 150 }}
                    >
                      Lưu
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Skeleton />
          </>
        )}
      </div>
    </Form>
  );
};

export default ShowTimeForm;
