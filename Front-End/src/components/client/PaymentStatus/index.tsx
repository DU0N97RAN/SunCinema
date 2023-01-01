import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";

type Props = {};

const PaymentSt = (props: Props) => {
   document.title = "Payment Status";
   const [search, useSearch] = useSearchParams();
   const [order, setOrder] = useState("");
   const [pmSt, setPmSt] = useState<boolean>();
   let item: any = search.get("status");
   const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
   let logo = webConfigs[0]?.logo[0]?.url
   useEffect(() => {
      if (item == "failed") {
         setPmSt(false)
      } else {
         setPmSt(true);
         let orderId = item.slice(16);
         setOrder(orderId)
      }
   }, [item]);

   return (
      <>
         <section className="container max-w-6xl px-3 mx-auto  mt-8 justify-center h-[550px] ">
            <div className="mx-auto my-0 flex justify-center h-full items-center bg-[#182b47] rounded-md flex-col" >
               <h1 className="font-bold text-gray-600 text-4xl uppercase">{webConfigs[0]?.storeName}</h1>
               <img src={logo} alt="" className="w-[250px] max-w-[250px] h-[150px] max-h-[150px]" />
               {pmSt ? (
                  <>
                     <h1 className="font-bold text-green-500 text-xl">Đặt hàng thành công</h1>
                     <p className="w-[450px] text-center text-lg mb-3 text-green-500 ">Đơn hàng <b>{order}</b> đã được thanh toán thành công.
                     
                     Vui lòng kiểm tra email để nhận thông tin đơn hàng</p>

                  </>
               ) : (
                  <>
                     <h1 className="font-bold text-red-500 text-xl">Đặt hàng lỗi</h1>
                     <Button className="w-[450px] text-center text-lg mb-3 text-red-600 ">
                        <Link to={"/"}> Đặt lại vé</Link>   
                     </Button>
                  </>
               )}
            </div>
         </section>


      </>
   );
};

export default PaymentSt;
