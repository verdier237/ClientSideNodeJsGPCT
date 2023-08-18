import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ScheduleOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Admins",
            key: "/inventory",
            icon: <UserOutlined />,
          },
          {
            label: "Enseignants",
            key: "/orders",
            icon: <UserOutlined />,
          },
          {
            label: "Etudiants",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Planning",
            key: "/planning",
            icon: <ScheduleOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
