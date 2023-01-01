import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Button, Skeleton, Avatar, List, InputNumber } from "antd";
import { formatCurrency, formatDateString, formatTime } from "../../../ultils";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentStep from "../PaymentStep";
import { createFD } from "../../../redux/slice/FoodDetail";

type Props = {
  updateFieldsFood: any;
};
const ChooseCombo = ({ updateFieldsFood }: Props) => {
  const deadline = Date.now() + 1000 * 60 * 10;
  const { food } = useAppSelector((state) => state.food);
  let foodActive = food?.filter((item: any) => item?.status == 0);
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const [tempPrice, setTempPrice] = useState<any>();
  const [info, setInfo] = useState<any>();
  const { movie } = useAppSelector((state) => state.movie);
  const { state } = useLocation();
  const [foodOrder, setFoodOrder] = useState<any[]>([]);
  const [foodPrice, setFoodPrice] = useState<any>(0);
  const [cart, setCart] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let movieSelect = movie?.find(
    (item: any) => item?._id === state?.populatedDetail[0]?.showTimeId?.movieId
  );

  useEffect(() => {
    document.title = "Choose Combo";
    if (foodActive) {
      setInitLoading(false);
      setList(foodActive);
    }
  }, [food]);

  useEffect(() => {
    if (state && movieSelect) {
      setInfo(state?.populatedDetail);
      setTempPrice(state?.ticket?.totalPrice);
    }
  }, [state, movieSelect]);

  useEffect(() => {
    if (foodOrder) {
      const totalPrice = foodOrder.reduce((total, currentValue) => {
        return total + currentValue.price;
      }, 0);
      setFoodPrice(totalPrice);
    }
  }, [foodOrder]);

  const handleFood = (qt: any, val: any) => {
    let foodprice = val?.price * qt;
    let pl = { foodId: val, quantity: qt, price: foodprice };
    setCart([...cart, pl]);
  };
  useEffect(() => {
    if (cart) {
      const arrayFiltered: any[] = [];
      const groupById = cart?.reduce((accumulator: any, arrayItem: any) => {
        let rowName = arrayItem?.foodId?._id;
        if (accumulator[rowName] == null) {
          accumulator[rowName] = [];
        }
        accumulator[rowName].push(arrayItem);
        return accumulator;
      }, {});

      for (const key in groupById) {
        let item = groupById[key];
        const last = item[item.length - 1];
        if (last?.quantity > 0) {
          arrayFiltered.push(last);
        }
      }
      setFoodOrder(arrayFiltered);
    }
  }, [cart]);

  const nextStep = () => {
    dispatch(createFD(foodOrder))
      .unwrap()
      .then((data: any) => {
        let stateToNextStep = {
          ...state,
          finalPrice: tempPrice + foodPrice,
          foodDetailId: data?._id,
          foodDetail: foodOrder,
        };
        navigate("/payment", { state: stateToNextStep });
      });
  };

  const listRender = () => {
    return (
      <div className="bg-[#ffffff] h-[550px] max-h-[550px] w-[98%] mx-auto p-3">
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item: any) => (
            <List.Item actions={[<a key="list-loadmore-edit"></a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item?.image[0]?.url} />}
                  title={<b className="uppercase">{item?.name}</b>}
                  description={`stock: ${item?.stock > 0 ? item?.stock : "Đã hết"} , price: ${formatCurrency(
                    item?.price
                  )}`}
                />
                <InputNumber
                  min={0}
                  defaultValue={0}
                  max={item?.stock}
                  onChange={(val: any) => {
                    handleFood(val, item);
                  }}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  };

  const rightContent = () => {
    return (
      <>
        <div className="w-[80%] mx-auto p-2">
          <img src={movieSelect?.image[0]?.url} alt="" className=" h-[140px]" />
        </div>
        <h1 className="font-bold uppercase px-4 pt-2">{movieSelect?.name}</h1>
        {info && (
          <>
            <ul className="px-4 py-3">
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Rạp</b>: {webConfigs[0]?.storeName} |
                {info && <>{info[0]?.seatId?.roomId?.name}</>}
              </li>
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Suất chiếu</b>:
                {info && formatTime(info[0]?.showTimeId?.startAt)} |
                {formatDateString(info[0]?.showTimeId?.date)}
              </li>
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Food</b> :
                {foodOrder?.map((item: any) => (
                  <span key={item?.foodId?._id}>
                    {item?.foodId?.name}
                    {`(${item?.quantity})`},
                  </span>
                ))}
              </li>
              <li className="border-b-2 border-dotted border-black leading-10">
                <b>Ghế</b>:
                {info &&
                  info?.map((item: any) => (
                    <span key={item?._id}>
                      {item?.seatId?.row}
                      {item?.seatId?.column},
                    </span>
                  ))}
              </li>
            </ul>
          </>
        )}
        <h2 className="px-4 text-base">
          Tổng Giá:
          <span className="font-semibold text-xl text-[#dcdcd]">
            {formatCurrency(tempPrice)}
          </span>
        </h2>
        <h2 className="px-4 text-base">
          Giá đồ ăn:
          <span className="font-semibold text-xl text-[#dcdcd]">
            {formatCurrency(foodPrice)}
          </span>
        </h2>
        <h2 className="px-4 text-base">
          Tổng:
          <span className="font-semibold text-xl text-[#f6710d]">
            {formatCurrency(tempPrice + foodPrice)}
          </span>
        </h2>
        <Button
          onClick={nextStep}
          style={{
            width: "47%",
            marginLeft: "17px",
            backgroundColor: "#f6710d",
            border: "none",
          }}
          type="primary"
          htmlType="submit"
          className="hover: text-red-600"
        >
          Tiếp tục
        </Button>
      </>
    );
  };
  return (
    <>
      <PaymentStep
        children={listRender()}
        nextStep={nextStep}
        rightContent={rightContent()}
        name="Chọn đồ ăn"
        ticket={state?.ticket}
        send={undefined}
      />
    </>
  );
};
export default ChooseCombo;
