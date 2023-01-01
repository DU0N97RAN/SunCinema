import { notification } from "antd";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import configRoute from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import Contact from "../Contact";

type PrivateRouteProps = {
  children: JSX.Element;
  acceptRole: number;
};
/* userInfo
   + status : 
            0 : chưa xác thực
            1 : Đã xác thực
            2 : Đã khóa
   + Role :
            0 : user
            1 : admin
*/

const PrivateRoute = ({ children, acceptRole }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { isLogged, currentUser } = useAppSelector(
    (state) => state.authReducer
  );
  const { users } = useAppSelector((state: any) => state.userReducer);
  const userLogin = users?.find((item: any) => item?._id == currentUser?._id);
  useEffect(() => {
    if (isLogged === false) {
      notification.info({
        message: "Đăng nhập trước khi thực hiện chức năng này",
      });
      navigate(configRoute.routes.signin);
    } else if (isLogged) {
      if (userLogin?.status == 2 || userLogin?.status == 0) {
        notification.info({
          message:
            "Tài khoản của bạn đã bị khóa hoặc chưa được xác thực , hãy liên hệ với quản trị viên !!",
        });
        navigate(configRoute.routes.contact);
      } else if (userLogin?.status == 1) {
        if (userLogin?.role !== 1) {
          notification.info({ message: "Đăng nhập với tư cách quản trị viên" });
          navigate(configRoute.routes.signin);
        } else {
          navigate(configRoute.routes.dashboard);
        }
      }
    }
  }, [currentUser]);

  return children;
};

export default PrivateRoute;
