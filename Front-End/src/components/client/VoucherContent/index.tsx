import React from 'react'
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hook';
import NewsDetailComponent from '../NewsDetailComponent'

type Props = {}

const VoucherContent = (props: Props) => {
  const { id } = useParams();
  const { vouchers } = useAppSelector((state:any) => state.voucherReducer);
  const dataSelected = vouchers?.find((item:any) => item?._id === id);

  return (
    <>
      <NewsDetailComponent data={dataSelected} dataArr={vouchers} loading={false} dataName="voucher" />

    </>
  )
}

export default VoucherContent