import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { BiSearch } from "react-icons/bi";
import Navbar from "./Navbar";
import config from "../../../config";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { TbLogout } from "react-icons/tb";
import { Button, Dropdown, Menu, message } from "antd";
import { LogOut } from "../../../redux/slice/AuthSlice";
import NavTop from "./NavTop";
type Props = {};

const ClientHeader = (props: Props) => {
  const { currentUser, isLogged } = useAppSelector(
    (state) => state.authReducer
  );
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const logo = webConfigs[0]?.logo[0]?.url;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    message.success({ content: "Đã đăng xuất" });
    dispatch(LogOut());
    navigate(config.routes.signin);
  };

  const menu = (
    <Menu
      style={{ zIndex: "10000" }}
      items={[
        {
          key: "1",
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: "3",
          label: (
            <div className="flex" onClick={() => logout()}>
              <TbLogout />
              Đăng xuất
            </div>
          ),
        },
      ]}
    />
  );
  const menuAD = (
    <Menu
      style={{ zIndex: "10000" }}
      items={[
        {
          key: "1",
          label: <Link to="/admin">Admin</Link>,
        },
        {
          key: "2",
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: "3",
          label: (
            <div className="flex" onClick={() => logout()}>
              <TbLogout />
              Đăng xuất
            </div>
          ),
        },
      ]}
    />
  );

  
  return (
    <>
    <NavTop />
      <div className={styles.headerWap}>
        <div className={`${styles.header}`}>
          <div className={styles.logo}>
            <Link to={config.routes.home}>
              <img
                src={
                  logo ??
                  "https://res.cloudinary.com/hungtv/image/upload/v1664432336/logo1_f9bumt.png"
                }
                alt=""
              />
            </Link>
          </div>
          {/* nav-bar */}
          <div className={styles.header_navbar}>
            <Navbar />
          </div>
          <div className={styles.header_right}>
            <form>
              <div className={styles.header_right_btn}>
                <Link to="/search">
                  <BiSearch />
                </Link>
              </div>
            </form>
            {isLogged == true ? (
              currentUser?.role == 1 ? (
                <Dropdown
                  overlay={menuAD}
                  placement="bottom"
                  arrow={{ pointAtCenter: true }}
                >
                  <Button
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                    }}
                  >
                    {currentUser.username ?? currentUser?.email}
                  </Button>
                </Dropdown>
              ) : (
                <Dropdown
                  overlay={menu}
                  placement="bottom"
                  arrow={{ pointAtCenter: true }}
                >
                  <Button
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                    }}
                  >
                    {currentUser.username ?? currentUser?.email}
                  </Button>
                </Dropdown>
              )
            ) : (
              <div className={styles.login}>
                <Link to={config.routes.signin}>Sign in</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientHeader;
