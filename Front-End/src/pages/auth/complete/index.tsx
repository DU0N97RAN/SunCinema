import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notification } from "antd";
import { AuthApi } from "../../../service/authApi";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import configRoute from "../../../config";
const Complete = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { webConfigs } = useAppSelector((state) => state.WebConfigReducer);

  let logo = webConfigs[0]?.logo[0]?.url
  const token = searchParams.get("token");
  const clickBtn = () => {
    AuthApi.createOrUpdateUser(token as any, { status: 1 })
      .then(() => {
        notification.success({
          message: "Xác thực thành công",
          description: ` vui lòng đăng nhập để tiếp tục`,
        });
        setTimeout(() => {
          navigate(configRoute.routes.signin);
        }, 2000);
      })
      .catch((res) => {
        notification.error({
          message: "Xác thực thất bại",
          description: ` ${res.response.data}`,
        });
      });
  };

  return (
    <section className="container max-w-6xl px-3 mx-auto  mt-8 justify-center h-[550px] ">
      <div className="mx-auto my-0 flex justify-center h-full items-center bg-[#182b47] rounded-md flex-col" >
        <h1 className="font-bold text-gray-600 text-4xl uppercase">{webConfigs[0]?.storeName}</h1>
        <img src={logo} alt="" className="w-[250px] max-w-[250px] h-[150px] max-h-[150px]" />
        <h1 className="font-bold text-sky-500 text-xl">Verify your email</h1>
        <p className="w-[450px] text-center text-lg mb-3 text-gray-600 ">Verifying your email gives you access to more features on {webConfigs[0]?.storeName}. Click the button below to join our community of luving movie </p>
        <button style={{ opacity: 1 }} onClick={clickBtn} className="rounded-full  bg-[#3188ea] p-2 w-[220px] text-white font-bold" >Confirm email</button>
      </div>
    </section>
  );
};

export default Complete;
