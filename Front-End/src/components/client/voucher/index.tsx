import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAlVc } from "../../../redux/slice/voucherSlice";
import { Link } from "react-router-dom";
import NewsContent from "../NewsContent";
type Props = {};

const Voucher = (props: any) => {
  const dispacth = useAppDispatch();
  useEffect(() => {
    dispacth(getAlVc());
  }, []);
  const { vouchers } = useAppSelector((state) => state.voucherReducer);
  return (
    <NewsContent data={vouchers} path={''} dataName="voucher" />
  );
};

export default Voucher;
