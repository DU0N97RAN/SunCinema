import { message, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppDispatch } from "../../../redux/hook";
import { getCurrentUser } from "../../../redux/slice/AuthSlice";


type Props = {};

const LoadingPushAccountInLocalStorage = (props: Props) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   dispatch(getCurrentUser({})).unwrap()
      .then((payload: any) => {
         message.success("Đăng Nhập thành công")
         navigate('/')
      })
      .catch((err: any) =>{
         notification.error({message: "Đăng nhập thất bại"});
         navigate(configRoute.routes.signin)
      }
      )
   return (
      <Spin size="large" />
   )
};

export default LoadingPushAccountInLocalStorage;
