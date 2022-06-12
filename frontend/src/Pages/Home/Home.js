import React from "react";
import style from "./Home.module.css";

import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import Dashboard from "../Dashboard/Dashboard";
import UrlDetails from "../UrlDetails/UrlDetails";

const Home = () => {
  const { iconState } = useSelector((state) => state.app);

  const AdminPages = () => {
    return iconState === "Dashboard" ? (
      <Dashboard />
    ) : (
      <UrlDetails urlCode={iconState} />
    );
  };

  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.main}>
        <Navbar />
        <div className={style.content}>{<AdminPages />}</div>
      </div>
    </div>
  );
};

export default Home;
