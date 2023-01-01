import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuAdminLayout from "./Menu";
import { Dropdown, message, Layout, Badge, Avatar, Button, Divider, Card } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import configRoute from "../../config";
import { LogOut } from "../../redux/slice/AuthSlice";
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<any>['items'][string];

type AdminLayoutProps = {
  children: JSX.Element;
  title: string;
  BCR: JSX.Element;
};

const AdminLayout = ({ children, title, BCR }: AdminLayoutProps) => {
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    message.success({ content: "Đã đăng xuất" });
    dispatch(LogOut());
    navigate(configRoute.routes.signin);
  };

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {
    return { key, icon, children, label, } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem(<Link to={`/admin/users/${currentUser?._id}`}>Profile</Link>, "Profile", <UserOutlined />),
    getItem(<Button type="link" onClick={handleSignout}>Logout</Button>, "Logout", <LogoutOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint="md" collapsedWidth={50} >
        <div style={{ padding: "0 16px", height: 46, lineHeight: "50px", fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: "#fff", textAlign: "center", }}>
          <Link to="/" style={{ color: "#fff" }}>
            {collapsed ? `${webConfigs[0]?.storeName?.slice(0, 1)}` : `${webConfigs[0]?.storeName}`}
          </Link>
        </div>
        <MenuAdminLayout />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "#ffff" }}>
          <div className="flex justify-end gap-7 pr-3 flex-wrap" >
            <div className="">
              <Badge dot>
                <Link to="#">New message</Link>
              </Badge>
            </div>
            <div className="">
              <Dropdown menu={{ items }} placement="bottomRight">
                <div className="flex items-center cursor-pointer">
                  <UserOutlined style={{ fontSize: 16, marginRight: 8 }} title="User" />
                  <span>{currentUser?.username}</span>
                </div>
              </Dropdown></div>
          </div>
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div style={{ margin: '16px 0' }} id="breadcrumbLocation">
            {BCR}
          </div>
          <div style={
               {
                backgroundColor: "#fff",
                padding: 10,
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                borderRadius: 4,
              }
          }>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>



  );
};

export default AdminLayout;
