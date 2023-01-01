import React, { useState, useEffect } from "react";
import { Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
type Props = {
  deadline: any;
  info?: any;
  onChange?: any;
};
const { Countdown } = Statistic;

const CountdownComp = ({ deadline, info, onChange }: Props) => {
  const navigate = useNavigate();
  const onFinish = () => {
    navigate(`/cancel`, { state: info });
  };
  const [timer, setTimer] = useState<any>();
  useEffect(() => {
    if (deadline) {
      setTimer(deadline);
    }
  }, []);

  return (
    <div className="text-white">
      <Countdown
        title="Đơn hàng sẽ hủy sau"
        value={timer}
        onFinish={onFinish}
        onChange={onChange}
      />
    </div>
  );
};

export default CountdownComp;
