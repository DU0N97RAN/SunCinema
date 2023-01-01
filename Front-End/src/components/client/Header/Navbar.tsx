import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={config.routes.home}>Trang chủ</Link>
          </li>
          <li>
            <Link to={`#`}>Phim</Link>
          </li>
          <li>
            <Link to={`#`}>Mua vé</Link>
          </li>
          <li>
            <Link to={`#`}>Giá vé</Link>
          </li>
          <li>
            <Link to={config.routes.news}>Tin tức</Link>
          </li>
          <li>
            <Link to={config.routes.contact}>Hỗ trợ</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
