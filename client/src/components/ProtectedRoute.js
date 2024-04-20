import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import { getCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSilce";
import { Layout, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);

  console.log("StateUser   ", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },

    {
      label: `${user ? user.name : " "}`,
      icon: <UserOutlined />,

      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Log out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading);
      const response = await getCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data))

      } else {
        dispatch(setUser(null));
        message.error(response.message);
        dispatch(hideLoading);
      }
    } catch (error) {
      dispatch(hideLoading);
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  } , []);

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>

          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
