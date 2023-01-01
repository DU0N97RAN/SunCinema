import moment from "moment";
import React, { useState, useEffect } from "react";
import { convertDate, convertDateToNumber } from "../../../ultils";
import CountdownComp from "../Countdown";

type Props = {
  nextStep: any;
  children: any;
  rightContent: any;
  name: any;
  ticket: any;
  send?:any
};
const PaymentStep = ({
  nextStep,
  children,
  rightContent,
  name,
  ticket,
  send,
}: Props) => {
  let today: any = new Date();
  let a = convertDate(ticket?.createdAt) + 1000 * 60 *9;
  let deadline = a - convertDate(today) + moment(today).unix() * 1000;
  
  return (
    <>
      <div className="flex flex-row justify-center mt-16 ">
        <div className="w-[55%]">
          <div className="bg-[#f6710d] h-[680px] ">
            <div className="flex items-center justify-between p-2">
              <h1 className="text-3xl p-3 text-white ">{name}</h1>
              <div className="">
                <CountdownComp
                  deadline={deadline}
                  info={send}
                />
              </div>
            </div>
            {children}
          </div>
        </div>
        <div className="w-[20%] bg-white ml-10 h-[680px] ">{rightContent}</div>
      </div>
    </>
  );
};


export default PaymentStep
